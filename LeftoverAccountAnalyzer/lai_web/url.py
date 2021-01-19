import sys
from urlparse import urlparse

try: 
    from googlesearch import search 
except ImportError:  
    print("No module named 'google' found") 
    sys.exit(1) 
  
pairs=""
with open(sys.argv[1]) as fp:
    for apkfile in fp:
        apkfile = apkfile.strip()
        query = apkfile.replace('.apk','')
        query = query.replace('com.','')
        query = query.replace('.com','')
        query = query.split('.')
        query = " ".join(query)
        print("----------------------------------")
        print("Searching url for apk: " + apkfile + " ( search terms : " + query + " ) " )
        results = []
        count = 0
        for j in search(query, tld="com", num=10, start=0, stop=10, pause=2): 
            results.append(j)
            print("[" + str(count) + "] " + j)
            count += 1
        if len(sys.argv) == 3 and sys.argv[2] == "auto":
            choice = 0
        else:
            choice = int(raw_input("select your choice (-1 == empty): "))
        if choice >= 0:
            parsed_uri = urlparse(results[choice])
            short_url = '{uri.scheme}://{uri.netloc}/'.format(uri=parsed_uri)
        else:
            short_url = ''
        pairs = pairs + apkfile + "," + short_url + "\n"


import os 
base=os.path.splitext(sys.argv[1])[0]
with open(base+"_mapping_list.csv",'w') as fw:
    fw.write(pairs)

print("........................................................")
print(pairs)
print("........................................................")
print("Results have been saved to " + base + "_mapping_list.csv")
