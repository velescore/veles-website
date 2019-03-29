var velesDevConsole = {
    isInitialized: false,
    client: null,
    controller: null,
    animationDelay: 500,
    cmdDeferred: null,
    cmdResult: false,
    welcomeMessage: "Veles Core Websocket client version v0.17 \"Aged Amnesia\"\n"
        + " ____   ____     .__                _________  \n_\\___\\_/___/____ |  |   ____   _____\\_   ___ \\  ___________   ____  \n\\___________/__ \\|  | _/ __ \\ /  ___/    \\  \\/ /  _ \\_  __ \\_/ __ \\ \n   \\  Y  /\\  ___/|  |_\\  ___/ \\___ \\\\     \\___(  <_> )  | \\/\\  ___/ \n    \\___/  \\___  >____/\\___  >____  >\\______  /\\____/|__|    \\___  >\n               \\/          \\/     \\/        \\/                   \\/ \n"
        + "This feature is highly EXPERIMENTAL, please use at your own risk.\n",

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
                    commandHandle: function(line, report){
                        if (line == "") 
                            return true;

                        velesDevConsole.handleWalletCommand(line, report);
                    },
                    animateScroll: false,
                    promptHistory: true,
                    autofocus: true,
                    welcomeMessage: velesDevConsole.welcomeMessage
                });
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

    handleInternalCommand: function(line, report) {
        return '[internal]';
    },

    handleWalletCommand: function(line, report) {
        this.client.get_cmd_result('node', line, {}, function(data) {
            parts = line.split(' ');

            if (data == null || data == false)  // depends on current API impl.
                return report(parts[0] + ': command not found');

            if (typeof data == 'object')
                report(JSON.stringify(data, null, 4));
            else
                report(data.toString());
        });
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