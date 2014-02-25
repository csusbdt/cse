## Hack to Run Locally

Github pages overrides a number of variables in _config.yml.
In particular, it overrides the following.

    safe: true

Because safe mode is disabled by default, we can detect whether 
the site is being generated inside of Github with the following.

    {% if safe %}

We use this trick to preppend _/cse_ to absolute urls when running
in Github pages.

   href='{% if safe %}/cse{% endif %}/assets/css/main.css' 


## Proxy Setup

Requests sent to cse.csusb.edu will be proxied to github pages.
The following Apache configuration code will accomplish this.

~~~
<VirtualHost *:80>
    ServerName cse.csusb.edu
    RewriteEngine on

    RewriteRule ^/cse$  / [R]
    RewriteRule ^/cse/$ / [R]

    # Requests matching /cse/* come from absolute urls;
    # their /cse prefix should be kept.
    RewriteRule ^/cse/(.*)$ http://csusbdt.github.io/cse/$1 [P]

    # Prepend /cse to all other requests.
    # Do not proxy select folders.
    RewriteCond $1 !turner.*
    RewriteRule ^/(.*)$ http://csusbdt.github.io/cse/$1 [P]

    # I don't understand the purpose of the following.
    ProxyPassReverse / http://csusbdt.github.io/cse/
</VirtualHost>
~~~

