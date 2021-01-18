from commons_web import init, _UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME, PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD
from commons_web import dump_text, find_clickable, find_editables, fill_edits, nicely_quit, signal_handler, click, shutdown
import time, re, sys, signal
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGPIPE, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

import atexit
atexit.register(shutdown)

init(sys.argv[1])
from commons_web import session

TIMELIMIT=30 # seconds
STATES=["BEGIN", "STATE LOGIN", "STATE FINDING ADF", "STATE DELETING ACCOUNT", "SIGNAL TERMINATED"]

RANDOM_STR=["Random",EMAIL,PASSWORD,USERNAME,BIRTHDAY,FIRSTNAME,LASTNAME,PHONENUMBER,HEIGHT,WEIGHT,AGE,GENDER,LOCATION,ZIPCODE]


def dump_text_wrapper(state):
    global session
    print("| " + state + " | ")
    dump_text()


find_clickable_widget = find_clickable

#--------------- 6 sets ----------------------#
login_clickable_set="continue with email|log in|sign in|login or register|register email|already have an account|i have an account|get started|next|continue|agree|start|existing user|next|done|agree|continue"
login_editable_set = {".*e-?mail.*":EMAIL,
                      ".*password.*":PASSWORD,
                      ".*user ?name.*":USERNAME,
                      ".*phone.*":PHONENUMBER,
                      ".*first ?name.*":FIRSTNAME,
                      ".*last ?name.*":LASTNAME,
                      ".*birthday.*|.*date of birth.*":BIRTHDAY,
                     }
adf_clickable_set="more|profile|me|setting|privacy|edit account|account|drawer|navigation|skip|change email|manage data|menu|landing|delete data"
adf_editable_set=None
delete_clickable_set="delete account|delete my account|delete|disable account|close account|close my account|ok|yes|agree|confirm|submit|send email|verify|continue|next"
delete_editable_set = {".*e-?mail.*":EMAIL,
                       ".*password.*":PASSWORD,
                       ".*user ?name.*":USERNAME,
                       ".*code.*":'1234'
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
            click(lc)
            #lc.click()
            dump_text_wrapper(STATES[1])
        if le:
            countle += 1
        time.sleep(3)
        if countle >= 3 or time.time() > timeout:
            break
    import ipdb; ipdb.set_trace(context=1)

#--------------- State Finding ADF -------------#
def state_finding_adf():
    global adf_clickable_set
    global session
    timeout = time.time() + TIMELIMIT
    while True:
        dc=find_clickable_widget(delete_clickable_set)
        if dc:
            dump_text_wrapper(STATES[2])
            break
        ac=find_clickable_widget(adf_clickable_set)
        if ac:
            click(ac)
            #ac.click()
            dump_text_wrapper(STATES[2])
        if time.time() > timeout:
            break
        time.sleep(3)
    import ipdb; ipdb.set_trace(context=1)


#--------------- State Deleting Account --------#
def state_delete_account():
    global delete_editable_set
    global delete_clickable_set
    timeout = time.time() + TIMELIMIT
    countle = 0
    while True:
        le=fill_edits(delete_editable_set)
        lc=find_clickable_widget(delete_clickable_set)
        if lc:
            click(lc)
            #lc.click()
            dump_text_wrapper(STATES[3])
            #break
        if le:
            countle += 1
        time.sleep(3)
        if countle >= 3 or time.time() > timeout:
            break
    import ipdb; ipdb.set_trace(context=1)


state_login()
state_finding_adf()
state_delete_account()
