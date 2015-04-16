(function (global) {
    var app = global.app = global.app || {};

    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };
    
    app.unidadeUrl = "http://177.124.207.146:8080/sits";

    
    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();
            document.addEventListener("resume", function(){
                if (app.currentViewModel)
                    app.currentViewModel.refresh();
            }, false);

        

        app.unidadeCorrente = null;
        app.currentViewModel=null;
        
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
           
        //if (app.unidadeCorrente)
        //    app.application = new kendo.mobile.Application(document.body, { skin: 'flat', initial: 'views/situacao.html' });
        //else
            app.application = new kendo.mobile.Application(document.body, { skin: 'flat', initial: 'views/unidadesView.html' });
        
    }, false);
})(window);