#!/usr/bin/env python

import re
import subprocess
import sys

#filename = "Endomondo.apk"
subprocess.call(['apktool','d','./apkdir/com.vinted.apk','-o','./outdir/com.vinted.apk'])

patterns=".*account.*delete.*,.*delete.*account.*,.*close.*account.*,.*cancel.*account.*,.*account.*close.*"
pats = patterns.split(',')
#text="<string=name>We sent you an email to confirm your delete request. After confirmation, your account will be deactivated for 7 days, after which all your data will be permanently deleted<name>"
with open("./outdir/com.vinted.apk/res/values/strings.xml", "r") as f:
    print "\n"
    #print "Extracting patterns:"
    print "\n"
    for p in pats:
        for line in f:

            if re.match(p, line, flags=re.IGNORECASE):
                line1 = re.findall('(?<=>)(.*)(?=<)', line)

                text = ' '.join(line1)
                # out = check_output(['./sample.py', line, p])
                # out1=out.split(',')

                # q = Popen(['./sample.py', line, p], stdout=PIPE)
                # out, err = q.communicate()

                commandargs = ['./sample.py', text, p]
                q = subprocess.Popen(commandargs, stdout=subprocess.PIPE)
                command = 'grep TP'

                r = subprocess.Popen(command, shell=True, stdin=q.stdout, stdout=subprocess.PIPE)

                # stdout=q.communicate()q
                # stdOutValue, stdErrValue = stdout
                # out= stdOutValue.split(",")
                # out1=out[0].strip('(')

                print "---"+text+"---"
                q.stdout.close()
                out, err = r.communicate()
                print out

                #print ' '.join(line1)
                #print text