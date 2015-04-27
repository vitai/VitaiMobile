(function (global) {
    var UnidadesViewModel,
        app = global.app = global.app || {};
   

    UnidadesViewModel = kendo.data.ObservableObject.extend({
        logo:app.usuarioSettings.LOGO,
        onViewShow: function(e)
        {
            this.dataSource.read({ data: app.usuarioSettings.UNIDADES});
            var that = this;
            
        },
        dataSource: new kendo.data.DataSource({
            /*data: [
                { UNIDADEID:1, URL:"http://177.124.207.146:8080/sits", DESCRICAO:"CER-BARRA", CODIGO:1 },
                { UNIDADEID:2, URL:"http://177.153.18.165:8095/sits", DESCRICAO:"UPA-SENADOR CAMARA", CODIGO:1 }
            ]*/
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
            //console.log(app.unidadeUrl);
            app.application.navigate('views/situacao.html');
        }
             
    });

    app.unidadesService = {
        viewModel: new UnidadesViewModel()
    };

})(window);