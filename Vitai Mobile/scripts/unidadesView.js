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
            app.unidadeCorrente = e.dataItem;
            app.unidadeUrl = e.dataItem.URL;
            app.application.navigate('views/situacao.html');
        }
             
    });

    app.unidadesService = {
        viewModel: new UnidadesViewModel()
    };

})(window);