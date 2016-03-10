(function (global) {
    var AppModel, app = global.app = global.app || {};

    AppModel = kendo.data.ObservableObject.extend({
        navDataSource: new kendo.data.DataSource({
          	transport: {
            	read: function(operation) {
                	var data = operation.data.data || [];
                	operation.success(data);
            	}
        	}
        })
    });
    
     app.appService = {
        viewModel: new AppModel()
    };
    
    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };
    
    app.addDays = function(date, days) {
    	var result = new Date(date);
    	result.setDate(date.getDate() + days);
    	return new Date(result);
	}   
    
    app.Logoff = function(){
        app.permissoes = null;
        app.usuarioSettings = [];
        app.unidadeUrl = null;
        
        if (localStorage) {
            localStorage.removeItem("accessTokenCacheKey");
        } else {
            app["accessTokenCacheKey"] = null;
        }
    }
    
    app.login = function(userSettings){
        app.unidadeUrl = null;
        app.usuarioSettings = userSettings;
        app.permissoes = userSettings.PERMISSOES;
       
       if (localStorage) {
            localStorage.setItem("accessTokenCacheKey", JSON.stringify(userSettings));
        } else {
            app["accessTokenCacheKey"] = userSettings;
        }
       
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
        
        kendo.bind($("#appDrawerMenu"), app.appService.viewModel);
        
        var cachedLogin = null;
        if (localStorage) {
            cachedLogin = JSON.parse(localStorage.getItem("accessTokenCacheKey"));
        } else {
            cachedLogin = app["accessTokenCacheKey"];
        }
        
        if(!cachedLogin){
            app.application = new kendo.mobile.Application(document.body, { skin: 'flat', initial: 'views/Login.html' });    
        } else {
            app.unidadeUrl = null;
            app.usuarioSettings = cachedLogin;
            app.permissoes = cachedLogin.PERMISSOES;
        
            app.application = new kendo.mobile.Application(document.body, { skin: 'flat', initial: 'views/unidadesView.html' }); 
        }
        
        
    }, false);
    
})(window);