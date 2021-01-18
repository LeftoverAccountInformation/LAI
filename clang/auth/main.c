#include "auth.h"

int main(int argc, char **argv)
{

  //basic_auth(argv[1]);
  char url[] = "https://secure.splitwise.com/account/settings";
  char dest[] = "\"/Users/hoangdang/websites/hithere/\"";
  char username[] = "softasis001@gmail.com";
  char password[] = "UnitTesting123!";

  basic_get(url, dest, username, password);

  return 0;
}

