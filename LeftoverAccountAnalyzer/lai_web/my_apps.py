from selenium.common.exceptions import NoSuchElementException, TimeoutException, ElementNotInteractableException
from commons_web import init, _UNINSTALL_FLAG, EMAIL, PASSWORD, USERNAME, BIRTHDAY, FIRSTNAME, LASTNAME, PHONENUMBER, HEIGHT, WEIGHT, AGE, GENDER, LOCATION, ZIPCODE, SSN, DLN, CREDITCARD
from commons_web import dump_text, dump_html, find_clickable, find_editables, fill_edits, nicely_quit, signal_handler, click, shutdown, scroll_infinite
import time, re, sys, signal
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGPIPE, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

import atexit
atexit.register(shutdown)

STORE_URL='https://play.google.com/apps'
GMAIL='guyreseacher@gmail.com'
GPASSWORD='HelloWorld123!'

if len(sys.argv) == 3:
    GMAIL = sys.argv[1]
    GPASSWORD = sys.argv[2]

init(STORE_URL)
from commons_web import session
TIMELIMIT=2

email_input=session.find_element_by_xpath("//input[@type='email']") 
email_input.send_keys(GMAIL)
time.sleep(TIMELIMIT)
next_button = session.find_element_by_xpath("//span" + "[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + "next" + "']")
next_button.click()
time.sleep(TIMELIMIT)
password_input=session.find_element_by_xpath("//input[@type='password']") 
password_input.send_keys(GPASSWORD)
time.sleep(TIMELIMIT)
next_button = session.find_element_by_xpath("//span" + "[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + "next" + "']")
next_button.click()

# scroll to bottom of play store and click 'Show More'
while True:
    scroll_infinite()
    try:
        show_more_button = session.find_element_by_xpath("//span" + "[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + "show more" + "']")
    except NoSuchElementException:
        break
    show_more_button.click()
    time.sleep(TIMELIMIT)

# dump page source
dump_html()
