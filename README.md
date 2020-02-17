[![Followers](https://img.shields.io/twitter/follow/velescore.svg?style=social&label=Follow)](https://twitter.com/velescore)

# Velescore website
This repository holds the frontend application for Veles Core website and wiki.
Static pages and parts of the application are pre-compiled using Python's Jinja2 
templates or extended Markdown templates (wiki articles from from 
[Veles Core Wiki repository]).

## Development
Anybody is welcome to contribute, just fork the repository, do your changes on your
branch, and send a Pull Request. For local testing and development you can clone
this repository to your webroot and compile the page by running the following command 
from within the projects's directory:
```make```

Now you can point your browser to file `index.en.html` in ./public directory to access 
the development version of the website.(URL depends on the settings of your webserver). 

Check (the Development Documentation)[/docs/Development.md] for more information on 
the development and contribution and 
(the Template Desing Documentation)[/docs/Template-Design.md] for the designers.