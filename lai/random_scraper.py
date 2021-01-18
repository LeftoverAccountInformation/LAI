from commons import init2, dump_text
import sys

NUMEVENTS='100'
NUMITERATIONS=5

init2(sys.argv[1])
from commons import session

package = session.current_package
command = { 'command': 'monkey' , 'args' : '-p ' + package + '  -v ' + NUMEVENTS }

for i in range(NUMITERATIONS):
    dump_text()
    session.execute_script('mobile: shell', command)
