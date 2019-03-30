var velesDevConsole = {
    isInitialized: false,
    client: null,
    controller: null,
    animationDelay: 500,
    cmdDeferred: null,
    cmdResult: false,
    welcomeMessage: "Veles Core Websocket client version v0.17 \"Aged Amnesia\"\n"
        + " ____   ____     .__                _________  \n_\\___\\_/___/____ |  |   ____   _____\\_   ___ \\  ___________   ____  \n\\___________/__ \\|  | _/ __ \\ /  ___/    \\  \\/ /  _ \\_  __ \\_/ __ \\ \n   \\  Y  /\\  ___/|  |_\\  ___/ \\___ \\\\     \\___(  <_> )  | \\/\\  ___/ \n    \\___/  \\___  >____/\\___  >____  >\\______  /\\____/|__|    \\___  >\n               \\/          \\/     \\/        \\/                   \\/ \n"
        + "This feature is highly EXPERIMENTAL, please use at your own risk.\n"
        + "Type .help for more information about available commands.\n\n",

    init: function(websocketClient) {
        if (!this.isInitialized) {
            this.client = websocketClient;

            // Init dependencies first
            $.getScript( "js/jquery.console.js" ).done(function( script, textStatus ) {
                // Prepare Veles console
                console.log('VelesConsole: Loaded console library');
                var container = $('#dev-console');
                container.html('');
                velesDevConsole.controller = container.console({
                    promptLabel: 'VelesCore # ',
                    commandValidate: function(line){
                        //if (line == "") return false; // not needed - just like in unix console
                        return true;
                    },
                    commandHandle: velesDevConsole.handleCommand,
                    animateScroll: false,
                    promptHistory: true,
                    autofocus: true,
                    welcomeMessage: velesDevConsole.welcomeMessage
                });
                velesDevConsole.controller.promptText('.help');
            }); 
            // auto-focus when mouse over console
            $('#dev-console').mouseover(function() {
                if (velesDevConsole.isShown())
                    if (velesDevConsole.controller)
                        velesDevConsole.controller.focus();
            });

            this.isInitialized = true;
        }
    },

    handleCommand: function(line, report, prevResult = null) {
        if (line == "") 
            return true;

        if (line.trim()[0] == '.')
            velesDevConsole.handleInternalCommand(line, report, prevResult);
        else
            velesDevConsole.handleWalletCommand(line, report, prevResult);
    },

    handleInternalCommand: function(line, report, prevResult = null) {
        // Allow to chain multiple commands with pipe
        var args = line.split('|')[0].trim().split(' ');
        var cmd = args.shift().trim();

        if (cmd == '.clear') {
            report('');
            return velesDevConsole.controller.clearScreen();

        } else if (cmd == '.help') {
            return this.submitCommandResult(line, report, 
                "Internal console commands start with dot '.', all other commands are handled by the Veles Core daemon. \n"
                + "However, some commands might be disabled in the web console, such as commands directly related to wallet \n"
                + "manipulation or payment handling.\n\n"
                + "Redirect of output using pipes is also supported. You can connect two or more commands so that the output \n"
                + "of one command is used as the input of another command. The commands can be connected by a pipe (|) symbol. \n"
                + "For example: 'getbestblockhash | getblock' or 'masternode list | .grep ENABLED'.\n\n"
                + "== Internal console commands ==\n"
                + ".clear\n.grep\n.help\n\n"
                + "== Veles Core daemon commands ==\n"
                + "For list of Veles Core daemon commands please run: 'help'\n\n"
                );

        } else if (cmd == '.grep') {
            if (prevResult) {
                if (args.length < 1)
                    return report("Usage: COMMAND | .grep PATTERN");

                return this.submitCommandResult(line, report, $.grep(
                    prevResult.split("\n"), 
                    function(n, i) {
                        return n.indexOf(args[0]) != -1; 
                        }
                    ).join("\n"));
            } else {
                return report("Usage: COMMAND | .grep PATTERN");
            }

            return this.submitCommandResult(line, report, '');
        }

        return velesDevConsole.handleCommandNotFound(line, report);
    },

    handleWalletCommand: function(line, report, prevResult = null) {
        // Allow to chain multiple commands with pipe
        var cmdLine = line.split('|')[0].trim();

        if (prevResult)     // if previous result has multiple lines, use just the first one
            cmdLine += ' ' + prevResult.split("\n")[0].trim();

        this.client.get_cmd_result('node', cmdLine, {}, function(data) {
            if (data == null || data == false)  // depends on current API impl.
                return velesDevConsole.handleCommandNotFound(cmdLine, report);

            return velesDevConsole.submitCommandResult(line, report, (typeof data == 'object')
                ? JSON.stringify(data, null, 4)
                : data.toString()
                );
        });
    },

    handleCommandNotFound: function(line, report) {
        var cmdName = line.split(' ')[0];
        var cmdSuggestion = null;

        if (cmdName == 'clear')
            cmdSuggestion = "Command '.clear' from console internal commands";

        else if (cmdName == 'grep')
            cmdSuggestion = "Command '.grep' from console internal commands";

        report(((cmdSuggestion) ? "No command '" + cmdName + "' found, did you mean:\n " + cmdSuggestion + "\n"  : '')
            + cmdName + ': command not found');
    },

    submitCommandResult(line, report, result) {
        var pipeSeparated = line.split('|');
        pipeSeparated.shift();

        if (pipeSeparated.length)
            return this.handleCommand(pipeSeparated.join('|'), report, result);

        return report(result);
    },

    show: function() {
        $('.footer-overlay').addClass('footer-panel-expand');
        $('body').addClass('with-overlay')

        if (this.controller)
            this.controller.focus();
    },

    hide: function() {
        $('.footer-overlay').removeClass('footer-panel-expand');
        $('body').removeClass('with-overlay')
    },

    isShown: function() {
          return $('.footer-overlay').hasClass('footer-panel-expand');
    },

    bindToggle: function(selector, websocketClient) {
        $(selector).click(function() {
            window.setTimeout(function() {
                velesDevConsole.init(websocketClient);
            }, velesDevConsole.animationDelay);

            if (velesDevConsole.isShown())
                velesDevConsole.hide();
            else
                velesDevConsole.show();
        });
    },
}

velesDevConsole.bindToggle('#console-toggle', velesSocketClient);