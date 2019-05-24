# How to contribute to the Veles webpage

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
