[![Followers](https://img.shields.io/twitter/follow/velescore.svg?style=social&label=Follow)](https://twitter.com/velescore)

# Velescore Website
This repository hosts source code for the official Veles Core website, everybody is welcome to contribute, see Contrubuting section below.

## The architectire
The Javascript frontend of Veles Core website in the client's browser keeps persistent connection to the 
Python backend server [Veles Core Websocket API](https://github.com/velescore/veles-webapi) to extecute 
various queries about blockchain state and metrics as well as to receive near real-time updates on the 
events such as state-changes of the Veles Core blockchain to update related UI values accordingly.

In this architecture it would be meaningless generating the web application and the website content "on the fly" 
during each request instead of serving static files which are cache and proxy friendly, improving performance.
These files are built on the web server regularly on each update from Python Jinja2 templates using automated
build system.

## Building
For local testing and development you can clone this repository to your webroot and compile the page
by running following command from within the projects's directory:
```make```

Now you can point your browser to file `public/index.html` (URL depends on the settings of your webserver) 
to access your development version of the website. 

*Note: To apply any changes in Jinja templates it is neccessary to rebuild specific page(s) using `make`. For debugging and more info see `./manage.py --help`.*

### Requirements
- Webserver - Apache / Lighttpd / Nginx, etc. (setting up a webserver is a issue outside of the scope of this
file.)
- Python 3.6+ (`apt-get install python3 pip3`)
- Jinja2 - (`pip install -r requirements.txt` or `pip3 install -r requirements.txt`)

## Contributing
### Fork your branch
Ensure you have a Github account. Then:

**1. Fork the website**
* On https://github.com/velescore/veles-website , click Fork.
* Once forking completes, click Settings and enable Github pages.
* Verify that it works by visiting https://YOUR_GITHUB_USERNAME.github.io/site/ i.e. if your github name is velesman then replace YOUR_GITHUB_USERNAME with velesman.

**2. Edit your fork**
* The lazy/easy option: just open files in your fork and click Edit, then reload the page from your github.io page as above.
* Or clone your fork locally using git, edit, then push your changes back to your fork in Github:<br>
 `git clone https://github.com/YOUR_GITHUB_USERNAME/site`<br>
 `git remote add upstream https://github.com/velescore/veles-website`<br>
 `git fetch --all`<br>
 `git checkout -b my-task-branch upstream/master` <br>
(add some files, maybe with git add learn.md images/illustrative.png)
 `git commit -m "added illustration to learn.md"`<br>
 `git push --set-upstream origin my-task-branch`<br>
(then find the link that is displayed, and browse there to easily create a PR)
In case you push your work in a branch other than master you will not be able to see your changes live in https://YOUR_GITHUB_USERNAME.github.io/site/. You can either merge your changes in your master branch or deploy the website locally on your host and visit http://127.0.0.1:4000.

**3. Upstream your changes**
* Open a pull request with your changes.
