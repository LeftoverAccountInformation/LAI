import sys

# Get the list of all packages (i.e., 'com.foo\norg.bar.app\nhey.splash.wow')
packages = sys.argv[1].split('\n')
packages = filter(None, packages) # remove all empty packages

# Start play store
from selenium.common.exceptions import NoSuchElementException
from commons import init3
init3('com.android.vending')
from commons import session


# Signal setup
import signal
def nicely_quit():
    global session
    session.close_app()
    session.quit()    
    sys.exit(0)

def signal_handler(sig, frame):
    print("___TERMINATED-BY-SIGNAL___")
    nicely_quit()

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGPIPE, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


# Set pause time between clicks
import time
PAUSE_TIME=0.5

# Search and install packages
search_bar = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/search_bar' + '")')
search_bar.click()
time.sleep(PAUSE_TIME)

count = 0
for p in packages:
    count += 1
    if count == 15:
        print('Taking a 5 minutes break for every 15 installations...')
        time.sleep(600*PAUSE_TIME)
        count = 0
    input_search_bar = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/search_bar_text_input' + '")')
    input_search_bar.send_keys(p)
    session.keyevent(66)
    time.sleep(PAUSE_TIME)

    # select the card which has no Ads
    cards = session.find_elements_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/play_card' + '")')
    for c in cards:
        if c.get_attribute('content-desc') == 'Ad':
            continue
        tvs = c.find_elements_by_class_name('android.widget.TextView')
        hasAd = False
        for m in tvs:
            if m.text == 'Ad':
                hasAd = True
                break
        if not hasAd:
            c.click()
            time.sleep(PAUSE_TIME)
            break
                
    install_button = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/right_button' + '")')
    if not install_button.text.startswith('$') and not install_button.text.startswith('Open'):
        install_button.click()
        try:
            accept_button = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/continue_button' + '")')
            accept_button.click()
            time.sleep(PAUSE_TIME)
        except NoSuchElementException:
            pass

        try:
            continue_button = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/footer_placeholder' + '")')
            continue_button.click()
            skip_button = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/secondary_button' + '")')
            skip_button.click()
        except NoSuchElementException:
            pass
    
    search_button = session.find_element_by_android_uiautomator('new UiSelector().resourceIdMatches("(?i)' + 'com.android.vending:id/toolbar_item_search' + '")')
    search_button.click()
    time.sleep(PAUSE_TIME)

session.quit()
#import ipdb; ipdb.set_trace(context=1)
