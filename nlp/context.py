#!/usr/bin/env python
#import pdb
from os import environ
from semantics import sentcheck, tokenizer
import re

_lemmas = {"deactiv":"deactivate", "clos":"close", "delet":"delete", "verif":"verify"}

def _lemmalookup(word):
    return _lemmas[word] if word in _lemmas else word

def _lvlbuild():
    h = []
    h.append(_contbuild(("deactiv","clos","delet"),("account",), True))
    h.append(_contbuild(("reason","why"),("leav","clos","deactiv","delet"), False))
    h.append(_contbuild(("enter","type"),("address","email","password","name"), True))
    h.append(_contbuild(("confirm", "verif", "send", "check"), ("email","code","confirmation"), True)); h[-1].append((".*enter.*verification.*","enter","verification"))
    h.append(_contbuild(("call","contact"), ("customer",), True))
    return h

def _contbuild(stems1, stems2, lookup=True):
    context = []
    for s1 in stems1:
        for s2 in stems2:
            if lookup:
                context.append((".*%s.*%s.*" %(s1,s2),_lemmalookup(s1),_lemmalookup(s2)))
            else:
                context.append((".*%s.*%s.*" %(s1,s2),'',''))
    return context

def sentenize(document):
    document = document.split("\n")
    sentences = []
    for paragraph in document:
        sentences += tokenizer.tokenize(paragraph)
    return sentences

def contcheck(sentence, context):
    for c in context:
        if c[0]:
            if re.match(c[0], sentence, re.IGNORECASE):
                if c[1] and c[2]:
                    if '__DEV__' in environ:
                        print([sentence])
                        raw_input("Parsing above sentence with context (" + ",".join(c) + ")...")
                    try:
                        if sentcheck([sentence], c[1], c[2])[0] == "TP":
                            return True
                        else:
                            continue
                    except Exception as e: # not always stat_parser can parse all kind of sentence structures
                        print(e)
                        continue
                return True
            else:
                continue
        else:
            return True # context-free => match any sentence
    #pdb.set_trace()
    return False

def classifier(document):
    document = sentenize(document)
    h        = _lvlbuild()
    level    = -1
    flag     = False
    maxlvl   = len(h) - 1
    for sentence in document:
        if flag == False:
            if contcheck(sentence, h[0]):
                if '__DEV__' in environ:
                    print(sentence)
                    raw_input("Context checked and matched...")
                flag = True
                if level == -1:
                    level = 0
        for l in range(maxlvl, level, -1):
            if l > 0 and contcheck(sentence, h[l]):
                level = l
                break
        if flag and level == maxlvl:
            return level
    if flag and level >= 0:
        return level
    else:
        return -1

if __name__ == "__main__":
    import sys
    with open(sys.argv[1],'r') as f:
        print(classifier(f.read()))
