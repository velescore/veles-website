PYTHON_CMD = $(shell python3 --version | grep "Python 3" > /dev/null && echo "python3" || (command -v python > /dev/null && echo "python"))
PIP_CMD = $(shell pip3 --version | grep "python 3" > /dev/null && echo "pip3" || (command -v pip > /dev/null && echo "pip"))

LANG := en_US.UTF-8
LC_ALL := en_US.UTF-8

export LANG
export LC_ALL

build:
	@make assert_python_present > /dev/null
	@echo "Rebuilding from templates ..."
	@$(PYTHON_CMD) manage.py rebuild index

assert_python_present:
	@command -v $(PYTHON_CMD) > /dev/null || ( command -v apt-get > /dev/null && apt-get install -qy python3 || ("Error: Python3 is not installed" ; exit 1 ))

init:
	make assert_python_present
	@echo "Installing Python dependencies ..."
	$(PIP_CMD) install -r requirements.txt || $(PIP_CMD) install -r requirements.txt --user

pull_wiki:
	@rm -rf data/wiki ; mkdir data/wiki
	git clone https://git.veles.network/velesnetwork/veles-wiki.wiki.git data/wiki/en

build_wiki:
	@echo -n "Compiling Wiki pages [English] ... "
	@ls data/wiki/en | xargs -I {} md-to-html -i data/wiki/en/{} -o public/wiki/en/{}.html
	@echo -e "done\n"
	@ls public/wiki/en

vars:
	echo $(PIP_CMD)
	echo $(PYTHON_CMD)
test:
	@echo "Python binary: $(PYTHON_CMD)"
	@echo "Building HTML ..."
	@make build
	@echo "Validating HTML ..."
	$(PYTHON_CMD) tests/test_valid_html.py
