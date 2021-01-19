from commons_web import init, _UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME, PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD
from commons_web import dump_text, dump_html, find_clickable, find_editables, fill_edits, nicely_quit, signal_handler, click, shutdown
import time, re, sys, signal

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGPIPE, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGQUIT, signal_handler)

import atexit
atexit.register(shutdown)

init(sys.argv[1])
from commons_web import session

import ipdb; ipdb.set_trace()
