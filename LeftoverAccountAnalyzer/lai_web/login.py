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


state_login()
