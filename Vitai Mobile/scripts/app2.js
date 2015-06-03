(function (global) {
    var app = global.app = global.app || {};

    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };
    
       
    app.Logoff = function()
    {
        app.permissoes = null;
        app.usuarioSettings = [];
    }
    
    app.login = function(userSettings){
       app.usuarioSettings = userSettings;
       app.permissoes = userSettings.PERMISSOES;
       app.application.navigate('views/unidadesView.html'); 
    }
    
    kendo.culture("pt-BR");
    app.unidadeUrl = "http://177.124.207.146:8080/sits";
    app.usuarioSettings = [];
    app.permissoes = null;
    app.currentViewModel = null;
    app.unidadeCorrente = null;
    
    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();
        
            document.addEventListener("resume", function(){
                console.log('resume');
                if (app.currentViewModel)
                    app.currentViewModel.refresh();
            }, false);

        app.currentViewModel = null;
        
        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
            

        };
    
        app.application = new kendo.mobile.Application(document.body, { skin: 'flat', initial: 'views/Login.html' });
        
    }, false);
})(window);