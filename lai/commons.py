import re, csv, os
import time
from appium import webdriver
from selenium.common.exceptions import NoSuchElementException, WebDriverException

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

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = ANDROID_VERSION
desired_caps['automationName'] = 'uiautomator2'
desired_caps['deviceName'] = 'Android'
desired_caps['newCommandTimeout'] = '3600'
desired_caps['autoGrantPermissions'] = 'true'
desired_caps['androidInstallTimeout'] = '120000'
desired_caps['adbExecTimeout'] = '50000'


def init(fname):
    global session
    apk = fname[:-3]
    desired_caps['app'] = '/Users/hoangdang/Documents/BBucket/autodel2/data/' + apk
    package=os.popen('aapt dump badging ' + desired_caps['app'] +  ' | grep --color=never -Po "(?<=package:\ name=\').*?(?=\')" ').read().strip()
    desired_caps['appWaitPackage'] = package
    desired_caps['appWaitActivity'] = '*'
    # Create a session with appium server
    session = webdriver.Remote(APPIUM_ENDPOINT, desired_caps)
    session.implicitly_wait(3)
    time.sleep(2)

def init2(fname):
    global session
    desired_caps['app'] = fname
    package=os.popen('aapt dump badging ' + desired_caps['app'] +  ' | grep --color=never -Po "(?<=package:\ name=\').*?(?=\')" ').read().strip()
    desired_caps['appWaitPackage'] = package
    desired_caps['appWaitActivity'] = '*'
    # Create a session with appium server
    session = webdriver.Remote(APPIUM_ENDPOINT, desired_caps)
    session.implicitly_wait(3)
    time.sleep(2)

def init3(package_name):
    global session
    desired_caps['appPackage'] = package_name
    activities=os.popen(' adb shell pm dump ' + desired_caps['appPackage'] + ' | dos2unix | sed -n "/action.MAIN:/,/:/p" | grep --color=never -Po "(?<=/).*(?=$)" ').read().strip().split('\n')
    activities.sort()  # make sure .<activity> be first
    for a in activities:
        try:
            desired_caps['appActivity'] = a
            # Create a session with appium server
            session = webdriver.Remote(APPIUM_ENDPOINT, desired_caps)
        except WebDriverException:
            continue
        break
    session.implicitly_wait(3)
    time.sleep(2)


def uninstall(fname):
    global session
    data = _get_data()
    apk = fname[:-3]
    package = data[apk][0]
    session.remove_app(package)

def find(text):
    global session
    command0 = 'new UiSelector().clickable(true).textMatches("(?i)' + text + '")'
    command1 = 'new UiSelector().textMatches("(?i)' + text + '")'
    command2 = 'new UiSelector().descriptionMatches("(?i)' + text + '")'
    command3 = 'new UiSelector().resourceIdMatches("(?i)' + text + '")'
    try:
        widget = session.find_element_by_android_uiautomator(command0)
    except (NoSuchElementException, WebDriverException, AttributeError):
        try:
            widget = session.find_element_by_android_uiautomator(command1)
        except (NoSuchElementException, WebDriverException, AttributeError):
            try:
                widget = session.find_element_by_android_uiautomator(command2)
            except (NoSuchElementException, WebDriverException, AttributeError):
                try:
                    widget = session.find_element_by_android_uiautomator(command3)
                except (NoSuchElementException, WebDriverException, AttributeError):
                    widget = None
    return widget

def find_edits():
    global session
    try: 
        widgets  = session.find_elements_by_android_uiautomator('new UiSelector().className("android.widget.EditText")')
    except (NoSuchElementException, WebDriverException, AttributeError):
        widgets = None
    return widgets

def find_clickable_textviews():
    global session
    try: 
        widgets  = session.find_elements_by_android_uiautomator('new UiSelector().className("android.widget.TextView").clickable(true)')
    except (NoSuchElementException, WebDriverException, AttributeError):
        widgets = None
    return widgets

def scroll_to(text):
    global session
    command0 = 'new UiSelector().textMatches("(?i)' + text + '")'
    command1 = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(' + command0 + ')'
    try:
        widget = session.find_element_by_android_uiautomator(command1)
    except (NoSuchElementException, WebDriverException, AttributeError):
        widget = None
    return widget 

def getClickableWidgets(session):
    '''
        Return clickable widgets as a list
    '''
    return session.find_elements_by_android_uiautomator('new UiSelector().clickable(true)')

def filterClass(regextype, widgets=[]):
    '''
        Example of regextype is EditText|TextView|Button...
    '''
    return filter(lambda x: re.search(regextype, x.get_attribute('className')), widgets)

def filterKeyword(regexkw, widgets=[]):
    '''
        Example of regexkw is login|sign in|email...
    '''
    return filter(lambda x: re.search(regexkw, x.text, re.IGNORECASE) or re.search(regexkw, x.tag_name, re.IGNORECASE), widgets)

def checkWidgetCount(phase, widgets=[]):
    if len(widgets) == 0:
        raise Exception(phase + ": " + "can't find any widget")
    elif len(widgets) > 1:
        raise Exception(phase + ": " + "more than 1 widget found")

def Init(fname):
    os.system('python ' + fname + '.py')

def swipe_up():
    global session
    session.swipe(100, 1100, 100, 1000)

def swipe_left():
    global session
    session.swipe(500, 1000, 100, 1000)

def dump_text():
    global session
    print("[Activity] " + session.current_activity)
    widgets = session.find_elements_by_android_uiautomator('new UiSelector().textMatches(".*\S.*")')
    for w in widgets:
        print(w.get_attribute('text').encode('utf-8').strip())
    widgets = session.find_elements_by_android_uiautomator('new UiSelector().descriptionMatches(".*\S.*")')
    for w in widgets:
        print(w.get_attribute('content-desc').encode('utf-8').strip())
    widgets = session.find_elements_by_android_uiautomator('new UiSelector().resourceIdMatches(".*\S.*")')
    for w in widgets:
        print(w.get_attribute('resource-id').encode('utf-8').strip())
    print("-----------------------------------")
