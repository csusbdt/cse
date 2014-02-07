Github pages overrides a number of variables in _config.yml.
In particular, it overrides the following.

    safe: true

Because safe mode is disabled by default, we can detect whether 
the site is being generated inside of Github with the following.

    {% if safe %}

We use this trick to preppend _/cse_ to absolute urls when running
in Github pages.

   href='{% if safe %}/cse{% endif %}/assets/css/main.css' 

