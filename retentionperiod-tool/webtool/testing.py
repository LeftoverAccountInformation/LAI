#!/usr/bin/env python
import subprocess
import re
import urllib
from bs4 import BeautifulSoup
import os
import sys
from PIL import Image
from pytesseract import image_to_string
#directory = sys.argv[1]

def conversion():
    for filename in os.listdir(path):

        if filename.endswith(('.png', '.jpg', '.jpeg')):
            img = Image.open(os.path.join(path, filename))
            text1 = image_to_string(img)
            text2 = (''.join(text1)).encode('utf-8')
            textimg = " ".join(text2.splitlines())
            outputdir(textimg, filename)
            # return textimg,filename

        elif filename.endswith(('.html', '.htm',)):
            #f = open(os.path.join(path, filename), 'r')

            html = urllib.urlopen(os.path.join(path, filename)).read()
            soup = BeautifulSoup(html, 'html.parser')

            # kill all script and style elements
            for script in soup(["script", "style"]):
                script.extract()  # rip it out

            # get text
            textt = soup.get_text()

            # break into lines and remove leading and trailing space on each
            lines = (line.strip() for line in textt.splitlines())
            #      break multi-headlines into a line each
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            # drop blank lines
            samptext = '\n'.join(chunk for chunk in chunks if chunk)
            textweb = samptext.encode('utf-8')
            # print text
            # print "PRINTING WEB"
            outputdir(textweb, filename)

            # return textweb,filename


def outputdir(Text, filename):
     textdir = os.path.join(path) + "/outdir"

     try:
        if not os.path.exists('textdir'):
            os.makedirs(textdir)

     except OSError as e:
        if e.errno != 17:
            print("Error:", e)

     basename = os.path.splitext(filename)[0]

     newfile = os.path.join(textdir, basename) + ".txt"
     with open(newfile, "w") as f:
          f.write(Text)
     file(newfile)


     #with open(os.path.join(os.path.join(path) + "/outdir", basename) + ".txt", "r") as file2:
          #for line in file2:
               #print line
def file(Newfile):
     with open(Newfile,'r') as file2:
          for p in pats:
               file2.seek(0,0)
               for line in file2:
                    if re.match(p,line):
                         commandargs = ['./sample.py', line, p]
                         q = subprocess.Popen(commandargs, stdout=subprocess.PIPE)

                         # q = subprocess.Popen(['./sample.py', line, p], stdout=PIPE)
                         command = 'grep TP'
                         # r = Popen(['grep TP && paragraph'], shell=True, stdin=q.stdout, stdout=subprocess.PIPE)
                         r = subprocess.Popen(command, shell=True, stdin=q.stdout, stdout=subprocess.PIPE)

                         # stdout=q.communicate()q
                         # stdOutValue, stdErrValue = stdout
                         # out= stdOutValue.split(",")
                         # out1=out[0].strip('(')
                         print line
                         q.stdout.close()
                         out, err = r.communicate()
                         print out

if __name__ == '__main__':
    patterns = ".*remove.*details.*,.*account.*delete.*,.*account.*close.*,.*delete.*account.*,.*close.*account.*,.*cancel.*account.*"
    pats = patterns.split(',')
    path = sys.argv[1]
    conversion()