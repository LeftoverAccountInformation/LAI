#ifndef AUTHORIZATION_H
#define AUTHORIZATION_H
	#include <stdio.h>
	#include <curl/curl.h>
    #include <stdlib.h>
    #include <string.h>
    #include <libgen.h>

    // Public API
	int basic_auth(char *url);
    int basic_get(char *url, char *dest, char *username, char *password);

    // Private Helper Methods
    struct string {
      char *ptr;
      size_t len;
    };
    void _init_string(struct string *s); 
    size_t _writefunc(void *ptr, size_t size, size_t nmemb, struct string *s);
    void _store_data(const char *filepath, const char *data);
#endif
