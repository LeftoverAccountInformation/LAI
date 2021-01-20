CC=gcc
HTTTRACKPATH=/Users/hoangdang/Downloads/httrack
AUTHPATH=/Users/hoangdang/Downloads/auth
PREFIX=$(HOME)/usr
CFLAGS='-g -O2 -I$(AUTHPATH)'
LDFLAGS='-L/usr/lib -L$(AUTHPATH)'
LIBS='-lz -lauth'

########### auth library rules #############
test:
	$(CC) auth.c main.c Base64Decode.c Base64Encode.c -lcrypto -lm -w -lcurl -o test

dylib:
	$(CC) -dynamiclib -dy auth.c main.c Base64Decode.c Base64Encode.c -lcrypto -lm -w -lcurl -o libauth.dylib 


########## httrack rules ###########
h-all: h-configure h-build

h-superall: dylib h-all

h-build: h-make h-install

h-superclean: h-uninstall h-clean h-distclean

h-configure:
	cd $(HTTTRACKPATH); ./configure --prefix=$(PREFIX)

h-make:
	cd $(HTTTRACKPATH); make CFLAGS=$(CFLAGS) LDFLAGS=$(LDFLAGS)  LIBS=$(LIBS) -j8

h-install:
	cd $(HTTTRACKPATH); make install

h-uninstall:
	cd $(HTTTRACKPATH); make uninstall

h-clean:
	cd $(HTTTRACKPATH); make clean

h-distclean:
	cd $(HTTTRACKPATH); make distclean

h-run:
	cd $(PREFIX)/bin; DYLD_LIBRARY_PATH=$(AUTHPATH) ./httrack

.PHONY: test clean

clean:
	rm test libauth.dylib
