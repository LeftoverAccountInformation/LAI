import html2text
import sys
file=sys.argv[1]


#html = open("textFileWithHtml.txt").read()
print html2text.html2text(file)
#h.ignore_links = True

