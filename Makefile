PYTHON_CMD = $(shell python3 --version | grep "Python 3" > /dev/null && echo "python3" || (command -v python > /dev/null && echo "python"))
PIP_CMD = $(shell pip3 --version | grep "python 3" > /dev/null && echo "pip3" || (command -v pip > /dev/null && echo "pip"))

LANG := en_US.UTF-8
LC_ALL := en_US.UTF-8

export LANG
export LC_ALL

build:
	@make assert_python_present > /dev/null
	@echo "Rebuilding from templates ..."
	@$(PYTHON_CMD) manage.py build-index
	@make pull_wiki
	@$(PYTHON_CMD) manage.py build-wiki
	@echo "[ Success ]"

assert_python_present:
	@command -v $(PYTHON_CMD) > /dev/null || ( command -v apt-get > /dev/null && apt-get install -qy python3 || ("Error: Python3 is not installed" ; exit 1 ))

init:
	make assert_python_present
	@echo "Installing Python dependencies ..."
	$(PIP_CMD) install -r requirements.txt || $(PIP_CMD) install -r requirements.txt --user

pull_wiki:
	@ls public/wiki/.git > /dev/null || ( rm -rf public/wiki ; git clone https://github.com/velescore/veles-wiki.git public/wiki )
	@cd public/wiki && git pull origin master || ( git reset --hard 4e44f68be4445443062f994d2b4f5b88605f4859 && git pull origin master )

vars:
	echo $(PIP_CMD)
	echo $(PYTHON_CMD)
test:
	@echo "Python binary: $(PYTHON_CMD)"
	@echo "Building HTML ..."
	@make build
	@echo "Validating HTML ..."
	$(PYTHON_CMD) tests/test_valid_html.py
