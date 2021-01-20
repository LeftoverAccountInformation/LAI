#include "auth.h"

// Public API

int basic_auth(char *url)
{
    CURL *curl = curl_easy_init();
    
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_easy_setopt(curl, CURLOPT_URL, url);
    
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Postman-Token: f9f00290-8d20-48f5-a1ae-1be60f7a823e");
    headers = curl_slist_append(headers, "cache-control: no-cache");
    headers = curl_slist_append(headers, "Authorization: Basic c29mdGFzaXMwMDFAZ21haWwuY29tOlVuaXRUZXN0aW5nMTIzIQ==");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    
    CURLcode ret = curl_easy_perform(curl);

    return 0;
}

int basic_get(char *url, char *dest, char *username, char *password) {
    // Encode username and password in base64
    char sec[256];
    sprintf(sec, "%s:%s", username, password);
    char* base64EncodeOutput;
    Base64Encode(sec, strlen(sec), &base64EncodeOutput);
    char auheader[256];
    sprintf(auheader, "Authorization: Basic %s", base64EncodeOutput);

    // Construct GET request
    struct string s;
    _init_string(&s);
    CURL *curl = curl_easy_init();
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, _writefunc);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &s);
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Postman-Token: f9f00290-8d20-48f5-a1ae-1be60f7a823e");
    headers = curl_slist_append(headers, "cache-control: no-cache");
    headers = curl_slist_append(headers, auheader);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    
    // GET the url
    CURLcode ret = curl_easy_perform(curl);
    curl_easy_cleanup(curl);

    // Save into equivalent html file in dest
    char dpath[256];
    
    char *newdest = dest;
    newdest++; // strip off beginning "
    newdest[strlen(newdest)-1] = 0; // strip off ending "

    sprintf(dpath,"%s/%s.html", newdest, basename(url));
    _store_data(dpath, s.ptr);

    // Free resources
    free(s.ptr);

    return 0;
}


// Private Helper Methods

void _init_string(struct string *s) {
  s->len = 0;
  s->ptr = malloc(s->len+1);
  if (s->ptr == NULL) {
    fprintf(stderr, "malloc() failed\n");
    exit(EXIT_FAILURE);
  }
  s->ptr[0] = '\0';
}

size_t _writefunc(void *ptr, size_t size, size_t nmemb, struct string *s)
{
  size_t new_len = s->len + size*nmemb;
  s->ptr = realloc(s->ptr, new_len+1);
  if (s->ptr == NULL) {
    fprintf(stderr, "realloc() failed\n");
    exit(EXIT_FAILURE);
  }
  memcpy(s->ptr+s->len, ptr, size*nmemb);
  s->ptr[new_len] = '\0';
  s->len = new_len;

  return size*nmemb;
}

void _store_data(const char *filepath, const char *data)
{
    FILE *fp = fopen(filepath, "ab");
    if (fp != NULL)
    {
        fputs(data, fp);
        fclose(fp);
    }
}
