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

LIMIT=4
screen_count=0

#---------------- Step 1 : Locate signup clickable  -------------------#
register_str="sign up|signup|sign up via email|register|create account|get started|start|join|join now|continue with email|register with email|via email|confirm|try now"
rflag = True
while True:
    excp = True
    screen_count += 1
    if rflag:
        register=find_clickable(register_str)
        if register:
            #register.click()
            click(register)
            time.sleep(2)
            dump_text()
            excp = False
        else:
            rflag = False
        edits = find_editables()
        if edits:
            if excp:  # manual intervention
                dump_text()
            break
    if screen_count >= LIMIT:
        time.sleep(3)
        print("___TEST-AGAIN-PLS___")
        nicely_quit()

#--------------- Step 2 : fill in information, quit when finish creating account or screen limit is reached -------------#
info = {".*e-?mail.*":EMAIL,
        ".*password.*":PASSWORD,
        ".*user.?name.*":USERNAME,
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
next_str="next|ok|allow|click|continue|advance|move forward"
done_str="finish|done|complete|submit|create account|set up|verify|activation email|register|confirm|join|sign up|register with email|sign in|log in|start free trial|register for free"

eflag = True
while True:
    screen_count += 1
    #print("screen_count is " + str(screen_count))
    if screen_count >= LIMIT:
        dump_text()
        print("___MAX-SCREEN-LIMIT-REACHED___")
        nicely_quit()
    if eflag:
        fill_edits(info)
        nx=find_clickable(next_str)
        if nx:
            #nx.click()
            click(nx)
            time.sleep(2)
            dump_text()
            continue
        else:
            done=find_clickable(done_str)
            if done:
                print("___GOOD-JOB___")
                click(done)
                #done.click()
                #session.execute_script("arguments[0].click();", done)
                nicely_quit()
        eflag = False
