from commons import _UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME, PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD, init2, find_edits, dump_text
from selenium.common.exceptions import InvalidElementStateException, WebDriverException
import sys
import re
import signal
import time

STATES=["BEGIN", "IN REGISTER", "IN NEXT", "SIGNAL TERMINATED"]

LIMIT=8
RANDOM_STR=["Random",EMAIL,PASSWORD,USERNAME,BIRTHDAY,FIRSTNAME,LASTNAME,PHONENUMBER,HEIGHT,WEIGHT,AGE,GENDER,LOCATION,ZIPCODE]

init2(sys.argv[1])
from commons import session

screen_count = 0

def nicely_quit():
    global session
    session.close_app()
    session.quit()    
    sys.exit(0)

def signal_handler(sig, frame):
    dump_text_wrapper(STATES[3])
    print("___TERMINATED-BY-SIGNAL___")
    nicely_quit()

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGPIPE, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

def find_clickable_widget(pattern):
    global session
    clickables = session.find_elements_by_android_uiautomator('new UiSelector().clickable(true)')
    for p in pattern.split('|'):
        for c in clickables:
            try:
                cname=c.get_attribute('class')
            except:
                cname=""
            if 'EditText' in cname:
                continue
            
            try:
                text=c.get_attribute('text')
            except:
                text=None
            try:
                desc=c.get_attribute('content-desc')
            except:
                desc=None
            try:
                resc=c.get_attribute('resource-id')
            except:
                resc=None

            if ((text and re.search(p, text.encode('utf-8').strip(), re.IGNORECASE)) or
                (desc and re.search(p, desc.encode('utf-8').strip(), re.IGNORECASE)) or
                (resc and re.search(p, resc.encode('utf-8').strip(), re.IGNORECASE))):
                return c
                

def dump_text_wrapper(state):
    global session
    global screen_count
    print("[SCREEN] #" + str(screen_count) + " | " + state + " | ")
    dump_text()

#import ipdb; ipdb.set_trace()

dump_text_wrapper(STATES[0])

#---------------- Step 1 : register -------------------#
register_str="^sign up$|.*signup$|.*sign up.*email|^register$|^register for free$|.*in or register.*|.*create.*account.*$|.*get started.*|^start$|^start.*|^join$|^join now$|^continue with email$|^register with email$|^via email$|^confirm$|.*ibHome.*|.*try.*now.*|.*log.*in.*"
rflag = True
while True:
    excp = True
    screen_count += 1
    if rflag:
        register=find_clickable_widget(register_str)
        if register:
            register.click()
            time.sleep(2)
            dump_text_wrapper(STATES[1])
            excp = False
        else:
            rflag = False
        edits = find_edits()
        if edits:
            if excp:  # manual intervention
                dump_text_wrapper(STATES[1])
            break
    if screen_count >= LIMIT:
        time.sleep(3)
        print("___TEST-AGAIN-PLS___")
        nicely_quit()

#--------------- Step 2 : fill in information, quit when finish creating account or screen limit is reached -------------#
info = {".*e-?mail.*":EMAIL,
        ".*password.*":PASSWORD,
        ".*user ?name.*":USERNAME,
        ".*birthday.*|.*date of birth.*":BIRTHDAY,
        ".*first ?name.*":FIRSTNAME,
        ".*last ?name.*":LASTNAME,
        ".*phone.*":PHONENUMBER,
        ".*height.*":HEIGHT,
        ".*weight.*":WEIGHT,
        ".*age.*|.*how old are you.*":AGE,
        ".*gender.*|.*male.*":GENDER,
        ".*location.*":LOCATION,
        ".*zip.*":ZIPCODE,
        ".*social security.*":SSN,
        ".*driver license.*":DLN,
        ".*credit card.*":CREDITCARD
       }
next_str="^next$|^ok$|^allow$|^click$|^continue$|^advance$|^move forward$|^.*verify.*btn$|^no thanks$|.*->.*"
done_str="^finish$|^done$|^complete$|^submit$|.*create.*account.*|^set up$|.*verify.*|.*activation.*email.*|^register$|^confirm$|^join$|^sign up.*|^register with email$|^sign in$|.*log in.*|^start free trial$|^register for free$"

eflag = True
while True:
    screen_count += 1

    if screen_count >= LIMIT:
        dump_text_wrapper(STATES[2])
        print("___MAX-SCREEN-LIMIT-REACHED___")
        nicely_quit()

    if eflag:
        edits = find_edits()
        if edits:
            for e in edits:
                flag = False
                for k,v in info.iteritems():
                    try:
                        text=e.get_attribute('text')
                    except:
                        text=None
                    try:
                        desc=e.get_attribute('content-desc')
                    except:
                        desc=None
                    try:
                        resc=e.get_attribute('resource-id')
                    except:
                        resc=None

                    if ((text and re.search(k, text.encode('utf-8').strip(), re.IGNORECASE)) or
                        (desc and re.search(k, desc.encode('utf-8').strip(), re.IGNORECASE)) or
                        (resc and re.search(k, resc.encode('utf-8').strip(), re.IGNORECASE))):
                            e.clear()
                            e.send_keys(v)    
                            flag = True
                            break
                if not flag:
                    for r in RANDOM_STR:
                        try:
                            e.clear()
                            e.send_keys(r)
                            flag = True
                            break
                        except InvalidElementStateException:
                            continue

        nx=find_clickable_widget(next_str)
        if nx:
            nx.click()
            time.sleep(2)
            dump_text_wrapper(STATES[2])
            continue
        else:
            done=find_clickable_widget(done_str)
            if done:
                print("___GOOD-JOB___")
                done.click()
                nicely_quit()

        eflag = False
