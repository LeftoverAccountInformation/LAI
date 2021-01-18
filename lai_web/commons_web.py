#from selenium.webdriver.support.ui import WebDriverWait
#from selenium.webdriver.support import expected_conditions as EC
#from selenium.webdriver.common.by import By
#DRIVER_WAIT_TIME=8
from selenium.common.exceptions import NoSuchElementException, TimeoutException, ElementNotInteractableException
from selenium import webdriver
import time
import html2text
import re
import sys
import pyautogui

_UNINSTALL_FLAG = "N"
ANDROID_VERSION = '6.0'
#ANDROID_VERSION = '8.1'
APPIUM_ENDPOINT = 'http://localhost:4723/wd/hub'
EMAIL = "softasis007@yahoo.com"
PASSWORD = "UnitTesting123!"    
USERNAME = EMAIL[:-10]
BIRTHDAY = "January 1, 1980"
FIRSTNAME = "app"
LASTNAME = "tester"
PHONENUMBER = "3168213456"
HEIGHT = "56"
WEIGHT = "170"
AGE = "50"
GENDER = "male"
LOCATION = "Wichita"
ZIPCODE = "67226"
SSN = "287428764"
DLN = "G37-26-1954"
CREDITCARD= "8945442237824010"

session = None

def init(url):
    global session
    session = webdriver.Chrome()
    session.implicitly_wait(3)
    session.get(url)

def dump_text():
    global session
    print('[[ ' + session.current_url.encode('utf-8') + ' ]]')
    print('[[ ' + session.title.encode('utf-8') + ' ]]')
    source=html2text.html2text(session.page_source)
    print(source.encode('utf-8'))
    print("-----------------------------------")

def dump_html():
    global session
    print('[[ ' + session.current_url.encode('utf-8') + ' ]]')
    print('[[ ' + session.title.encode('utf-8') + ' ]]')
    source=session.page_source
    print(source.encode('utf-8'))
    print("***********************************")

def find_clickable(pattern):
    global session
    for p in pattern.split('|'):
        for tag in ["a", "button"]:
            try:
                c = session.find_element_by_xpath("//" + tag + "[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + p + "']")
                #c = WebDriverWait(session, DRIVER_WAIT_TIME).until(EC.element_to_be_clickable((By.XPATH,"//" + tag + "[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + p + "']")))
            except (NoSuchElementException, TimeoutException) as e:
                continue
            if c:
                if c.is_enabled() and c.is_displayed():
                    return c
                else:
                    continue

def find_editables():
    global session
    try:
        i = session.find_elements_by_xpath("//input") 
        #i = WebDriverWait(session, DRIVER_WAIT_TIME).until(EC.element_to_be_clickable((By.XPATH,"//input" )))
    except (NoSuchElementException, TimeoutException) as e:
        i = None
    return i

def fill_edits(infodict):
    edits = find_editables()
    if edits:
        for e in edits:
            if e.is_enabled() and e.is_displayed():
                flag = False
                for k,v in infodict.iteritems():
                    try:
                        _name=e.get_attribute('name')
                    except:
                        _name=None
                    try:
                        _type=e.get_attribute('type')
                    except:
                        _type=None
                    try:
                        _id=e.get_attribute('id')
                    except:
                        _id=None
                    try:
                        _value=e.get_attribute('value')
                    except:
                        _value=None
                    try:
                        _class=e.get_attribute('class')
                    except:
                        _class=None

                    if ((_name and re.search(k, _name.encode('utf-8').strip(), re.IGNORECASE)) or
                        (_type and re.search(k, _type.encode('utf-8').strip(), re.IGNORECASE)) or
                        (_id and re.search(k, _id.encode('utf-8').strip(), re.IGNORECASE)) or
                        (_value and re.search(k, _value.encode('utf-8').strip(), re.IGNORECASE)) or
                        (_class and re.search(k, _class.encode('utf-8').strip(), re.IGNORECASE))):
                            try:
                                e.clear()
                                e.send_keys(v)    
                                break
                            except ElementNotInteractableException:
                                continue
    return edits

def nicely_quit():
    global session
    session.quit()    
    sys.exit(0)

def signal_handler(sig, frame):
    dump_text()
    print("___TERMINATED-BY-SIGNAL___")
    nicely_quit()

def click(web_element):
    global session
    session.execute_script("arguments[0].click();", web_element)

def shutdown():
    global session
    session.quit()
    import os
    os._exit(0)

def save_as(fn):
    pyautogui.hotkey('command', 's')
    time.sleep(1)
    pyautogui.typewrite(fn)
    #import ipdb; ipdb.set_trace(context=1)
    pyautogui.hotkey('enter')

def scroll_infinite():
    global session
    SCROLL_PAUSE_TIME = 1 # seconds
    # Get scroll height
    last_height = session.execute_script("return document.body.scrollHeight")
    while True:
        # Scroll down to bottom
        session.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)
        # Calculate new scroll height and compare with last scroll height
        new_height = session.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
