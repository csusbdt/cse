## Testing

To test local changes, run the following:

    jekyll -w serve

## Proxy Setup

The proxy is complicated because the site is under /cse/ on github
and under / on web.cse.csusb.edu.

Some of the URLs in the stylesheets need to be absolute to work correctly,
so all absolute URLs start with /cse/.  Consequently, when a request url starts
with /cse, we just proxy it directly to github.  But if the request url
does not start with /cse/, then we need to prepend this to the url.

Locally served content needs to be excluded from the proxy.

The following Apache configuration code will accomplish these requirements.

~~~
<VirtualHost *:80>
    ServerName cse.csusb.edu
    RewriteEngine on

    RewriteRule ^/cse$  / [R]
    RewriteRule ^/cse/$ / [R]

    # Requests matching /cse/* come from absolute urls;
    # they can be proxied to github without prepending /cse/.
    RewriteRule ^/cse/(.*)$ http://csusbdt.github.io/cse/$1 [P]

    # Prepend /cse to all other requests.
    # Do not proxy select folders.
    RewriteCond $1 !concep.*
    RewriteCond $1 !turner.*
    RewriteRule ^/(.*)$ http://csusbdt.github.io/cse/$1 [P]

    # I don't understand the purpose of the following but I think we should use it.
    ProxyPassReverse / http://csusbdt.github.io/cse/
</VirtualHost>
~~~

