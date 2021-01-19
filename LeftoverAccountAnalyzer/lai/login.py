from commons import _UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME, PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD, init2, find_edits, dump_text
from selenium.common.exceptions import InvalidElementStateException, WebDriverException
import sys
import re
import signal
import time

TIMELIMIT=30 # seconds
STATES=["BEGIN", "STATE LOGIN", "STATE FINDING ADF", "STATE DELETING ACCOUNT", "SIGNAL TERMINATED"]

RANDOM_STR=["Random",EMAIL,PASSWORD,USERNAME,BIRTHDAY,FIRSTNAME,LASTNAME,PHONENUMBER,HEIGHT,WEIGHT,AGE,GENDER,LOCATION,ZIPCODE]

init2(sys.argv[1])
from commons import session

def nicely_quit():
    global session
    session.close_app()
    session.quit()    
    sys.exit(0)

def signal_handler(sig, frame):
    dump_text_wrapper(STATES[4])
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
    print("| " + state + " | ")
    dump_text()


def fill_edits(infodict):
    edits = find_edits()
    if edits:
        for e in edits:
            flag = False
            for k,v in infodict.iteritems():
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
                e.clear()
                e.send_keys(PASSWORD)

    return edits

#--------------- 6 sets ----------------------#
login_clickable_set=".*continue with email.*|.*log ?in.*|.*sign ?in.*|^login or register$|.*register.*email.*|.*already have an account.*|.*i have an account.*|.*get started.*|.*next.*|.*continue.*|.*agree.*|.*start.*|.*existing user.*|.*next.*|.*done.*|.*agree.*|.*continue.*"
login_editable_set = {".*e-?mail.*":EMAIL,
                      ".*password.*":PASSWORD,
                      ".*user ?name.*":USERNAME,
                      ".*phone.*":PHONENUMBER,
                      ".*first ?name.*":FIRSTNAME,
                      ".*last ?name.*":LASTNAME,
                      ".*birthday.*|.*date of birth.*":BIRTHDAY,
                     }

#--------------- BEGIN --------------------------#
dump_text_wrapper(STATES[0])

#---------------- State Login -------------------#
def state_login():
    global login_editable_set
    global login_clickable_set
    timeout = time.time() + TIMELIMIT
    countle = 0
    while True:
        le=fill_edits(login_editable_set)
        lc=find_clickable_widget(login_clickable_set)
        if lc:
            lc.click()
            dump_text_wrapper(STATES[1])
        if le:
            countle += 1
        time.sleep(3)
        if countle >= 3 or time.time() > timeout:
            break
    import ipdb; ipdb.set_trace(context=1)


state_login()
