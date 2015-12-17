(function (global) {
    var UnidadesViewModel,
        app = global.app = global.app || {};
    
        UnidadesViewModel = kendo.data.ObservableObject.extend({
        logo:"",
        onInit: function(e){
            
        },
        onViewShow: function(e)
        { 
            this.set("logo",app.usuarioSettings.LOGO);
            this.dataSource.read({ data: app.usuarioSettings.UNIDADES});
            var that = this;
        },
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function(operation) {
                    var data = operation.data.data || [];
                    operation.success(data);
                }
            }            
        }),
        onListViewChanged: function(e)
        {
            ready = null;
            //window.setTimeout(isOnline(e.dataItem.URL), 3000);
            //isOnline(e.dataItem.URL);
            this.urlExists(e.dataItem.URL, this.handleUnidade, e);
   
        },
        displayLoading : function(target){
             var element = $(target);
             kendo.ui.progress(element, true);
             setTimeout(function(){kendo.ui.progress(element, false); 
             }, 3000);        
        },
        urlExists: function(url, callback, item) {

            if ( ! $.isFunction(callback)) {
               throw Error('Not a valid callback');
            }   
            console.log(url + '/ws/relatorio?q=1');
			try
                {
                    $.ajax({
                        dataType: "json",
                        url: url + '/ws/relatorio?q=1',
                        success: $.proxy(callback, this, true, item),
                        error: $.proxy(callback, this, false)      
                    });
                }
            catch (err)
                {
                console.log(err.message);
                }

        },
        handleUnidade: function (sucess, item)
    	{
                if (sucess == true)
                {
        		    app.unidadeCorrente = item.dataItem;
            		app.unidadeUrl = item.dataItem.URL;
                    console.log(item.dataItem.NAV_SETTINGS);
                    app.appService.viewModel.navDataSource.read({ data: item.dataItem.NAV_SETTINGS });
            		app.application.navigate('views/situacao.html');
                }
            	else
              	 navigator.notification.alert("A unidade está offline");
    	}
           
    });   
      
    app.unidadesService = {
        viewModel: new UnidadesViewModel()
    };

})(window);