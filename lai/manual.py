import sys
import signal 
from commons import init2, dump_text, session
import signal

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

init2(sys.argv[1])
import ipdb; ipdb.set_trace(context=1)
