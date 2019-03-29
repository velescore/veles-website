var velesDevConsole = {
    isInitialized: false,
    client: null,
    controller: null,
    animationDelay: 500,
    cmdDeferred: null,
    cmdResult: false,

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
                        if (line == "") return false;
                        else return true;
                    },
                    commandHandle: function(line, report){
                        velesDevConsole.handleWalletCommand(line, report);
                    },
                    animateScroll: false,
                    promptHistory: true,
                    autofocus: true,
                    welcomeMessage: "Welcome to Veles Code web node console. This feature is highly EXPERIMENTAL, "
                        + "please use at your own risk."
                });
            }); 
            this.isInitialized = true;
        }
    },

    handleInternalCommand: function(line, report) {
        return '[internal]';
    },

    handleWalletCommand: function(line, report) {
        this.client.get_cmd_result('node', line, {}, function(data) {
            if (typeof data == 'object')
                report(JSON.stringify(data, null, 4));
            else
                report(data.toString());
        });
    },

    show: function() {
        $('.footer-overlay').addClass('footer-panel-expand');
        //this.controller.focus()
    },

    hide: function() {
        $('.footer-overlay').removeClass('footer-panel-expand');
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