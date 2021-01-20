#!/usr/bin/env python
from langdetect import detect
from os import environ
import re
import nltk.data
tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
from nltk.stem import WordNetLemmatizer
wlmz = WordNetLemmatizer()
########### Bug fix hack for unicode in Python 2.7 ############
import sys
stdout = sys.stdout
reload(sys)
sys.setdefaultencoding('utf-8')
sys.stdout = stdout
###############################################################
sys.path.insert(0, "/home/hoang/Documents/pyStatParser")
from stat_parser import Parser
parser = Parser()

vlabels = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
nlabels = ['NP']
plabels = ['PP']

def _lemmacheck(word1, word2, pos):
    return wlmz.lemmatize(word1.lower(), pos) == wlmz.lemmatize(word2.lower(), pos)

def _exceptioncheck(sentence, verb, noun):
    lang = detect(sentence.decode('utf-8'))

    if lang == 'zh-cn' or lang == 'vi': # Check if it is Chinese or Vietnamese like the case of We-Chat and Zalo
        return True
    else:
        s = nltk.word_tokenize(sentence)

    if len(s) == 1: #PROFILE_DeleteAccountButtonCaps
        if ("%s%s"%(verb,noun)).lower() in s[0].lower():
            return True

    if len(s) == 2:
        if _lemmacheck(s[0], verb, 'v') and _lemmacheck(s[1], noun, 'n'):
            return True

    if len(s) == 3: # special case for Tumblr
        if _lemmacheck(s[0], 'delete', 'v') and s[1].lower() == "this" and s[2].lower() == "tumblr":
            return True

    if len(s) <= 4: #delete_account
        for i in range(len(s)):
            if s[i].lower() == ("%s_%s"%(verb,noun)).lower():
                return True

    if len(s) >= 2 and len(s) <= 5:
        for i in range(len(s)-1):
            if _lemmacheck(s[i], verb, 'v') and _lemmacheck(s[i+1], noun, 'n'):
                return True
            if i <= len(s)-3 and _lemmacheck(s[i], verb, 'v') and _lemmacheck(s[i+2], noun, 'n'): # delete current account
                return True

    if len(s) >= 3 and len(s) <= 30:  # delete subscription in your account | to delete data, go to this link www.account.www
        pv = ps = pn = -1
        for i in range(len(s)):
            pv = i if _lemmacheck(s[i], verb, 'v') else pv
            ps = i if _lemmacheck(s[i], 'subscription', 'n') or _lemmacheck(s[i], 'data', 'n') else ps
            pn = i if _lemmacheck(s[i], noun, 'n') or (noun.lower() in s[i].lower()) else pn
        if -1 < pv < ps < pn:
            return True

    if len(s) >= 3 and len(s) <= 16: # account has been deleted |  This account has been temporarily deactivated because your face did not match the account holder.
        pn = pb = pv = -1
        for i in range(len(s)):
            pn = i if _lemmacheck(s[i], verb, 'n') else pn
            pb = i if _lemmacheck(s[i], 'be', 'v') else pb
            pv = i if _lemmacheck(s[i], noun, 'v') else pv
        if -1 < pn < pb < pv:
            return True

    if len(s) >= 15: # authorization, delete account, clear
        for i in range(1, len(s)-1):
            if _lemmacheck(s[i], verb, 'v') and _lemmacheck(s[i+1], noun, 'n') and s[i-1] == ',':
                return True

    if len(s) >= 33 and len(s) <= 38: # special case for Yahoo
        if _lemmacheck(verb,'terminate','v') and _lemmacheck(noun,'account','n'):
            return True

    return False

def sentcheck(paragraph, verb, noun):
    if type(paragraph) is not list:
        paragraph = tokenizer.tokenize(paragraph)
    vc = ('FP', 'Bad Sentence Input')
    for sentence in paragraph:
        try:
            cst = parser.parse(sentence)
        except TypeError:
            continue
        if '__DEV__' in environ:
            cst.pretty_print() # for debugging
        try:
            if _exceptioncheck(sentence, verb, noun):
                return ('TP','exception')
        except:
            pass
        vc  = verbcheck(verb, noun, cst)
        if vc[0] == 'TP':
            return vc
        else:
            if '__DEV__' in environ:
                print(vc) # for debugging
    return vc

def verbcheck(verb, noun, cst):
    gen = cst.subtrees()
    while True:
        try:
            st = gen.next()
            if st.height() == 2 and st.label() in vlabels and _lemmacheck(verb, st[0], 'v'):
                return nouncheck(noun, gen.next())
        except StopIteration:
            return ('FP','no verb found')

def nouncheck(noun, cst):
    if cst.label() not in nlabels:
        return ('FP', 'succeeding subtree is not a Noun Phrase')
    gen = cst.subtrees()
    while True:
        try:
            st = gen.next()
            if st.label() in plabels:
                pc = prepcheck(noun, st)
                if pc[0] == 'FP':
                    return pc
            elif st.height() == 2 and _lemmacheck(noun, st[0], 'n'):
                return ('TP','')
        except StopIteration:
            return ('FP', 'noun is not found in succeeding Noun Phrase subtree')

def prepcheck(noun, cst):
    gen = cst.subtrees()
    for leaf in gen.next().leaves():
        if _lemmacheck(noun, leaf, 'n'):
            return ('FP', 'noun is found in Preposition Phrase subtree')
    return ('TP','')


if __name__ == '__main__':
    #if len(sys.argv) != 3:
    #    print(('FP', 'Bad Sentence Input'))
    #    exit(0)
    regex = sys.argv.pop()
    words = filter(lambda s: s.strip() != '', regex.split('.*'))
    NOUN = words.pop()
    VERB = words.pop()
    PARAGRAPH = sys.argv.pop()
    print(sentcheck(PARAGRAPH, VERB, NOUN))
