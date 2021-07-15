#!/usr/bin/env python
import time
import re
import subprocess
import sys
start_time = time.time()
#filename = "Endomondo.apk"
subprocess.call(['apktool','d','./apkdir/com.fitbit.fitbitmobile.apk','-o','./outdir/com.fitbit.fitbitmobile.apk'])

patterns=".*account.*delete.*,.*delete.*account.*,.*close.*account.*,.*cancel.*account.*,.*account.*close.*"
pats = patterns.split(',')
#text="<string=name>We sent you an email to confirm your delete request. After confirmation, your account will be deactivated for 7 days, after which all your data will be permanently deleted<name>"
with open("./outdir/com.fitbit.fitbitmobile.apk/res/values/strings.xml", "r") as f:
    print "\n"
    print "                           >>>>>>>>>>>>>>>>>>>>>>>>>> Extracting retention period : com.fitbit.fitbitmobile.apk <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<           "
    print "\n"
    for p in pats:
        for line in f:

            if re.match(p, line, flags=re.IGNORECASE):
                line1 = re.findall('(?<=>)(.*)(?=<)', line)

                text = ' '.join(line1)
                filtered = filter(lambda x: not re.match(r'^\s*$', x), text)
                # out = check_output(['./sample.py', line, p])
                # out1=out.split(',')

                if not filtered.strip(): continue
                # q = Popen(['./sample.py', line, p], stdout=PIPE)
                # out, err = q.communicate()

                commandargs = ['./sample.py', filtered, p]
                q = subprocess.Popen(commandargs, stdout=subprocess.PIPE)
                command = 'grep TP'

                r = subprocess.Popen(command, shell=True, stdin=q.stdout, stdout=subprocess.PIPE)

                # stdout=q.communicate()q
                # stdOutValue, stdErrValue = stdout
                # out= stdOutValue.split(",")
                # out1=out[0].strip('(')

                print ""+text+""
                q.stdout.close()
                out, err = r.communicate()
                print out

print("--- Time taken : %s seconds ---" % (time.time() - start_time))

                #print ' '.join(line1)
                #print text