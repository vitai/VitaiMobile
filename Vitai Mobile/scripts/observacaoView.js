(function (global) {
    var ObservacaoViewModel,
        app = global.app = global.app || {};
   
    
    var url = "http://177.153.18.165:8081/cerbt/ws/relatorio?q=5&setorId=1&risco=AMARELO&pediatrico=N";
    ObservacaoViewModel = kendo.data.ObservableObject.extend({
        secao: "", // grupo do risco
        titulo: "",
        descricaoUnidade: "",
        logo:"",
        media: "",
        mostracid: "hidden",
        onInit:function()
        {
            app.currentViewModel = this;
        },
         
        onViewShow: function(e)
        {
           
            var that = this;
            
            that.set("secao", e.view.params.secao);
            that.set("titulo", e.view.params.nmsecao);
            this.dataSource.transport.options.read.url = app.unidadeUrl + "/ws/relatorio";
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
           // that.set("mostracid", app.usuarioSettings.MOSTRA_CID);
            
            this.set("logo",app.usuarioSettings.LOGO);
            that.dataSource.read();
            
            
        },
        dataSource: new kendo.data.DataSource({
                          transport: {
                                read:  {
                                  //url: app.unidadeUrl + "/ws/relatorio",
                                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                  data: function() {
                                        var param = {

                                            "q":7,
                                            "setorId": app.unidadeCorrente.CODIGO,
                                            "idSecao": app.observacaoViewService.viewModel.secao
                                        };
									  console.log(param);
                                      return param;
                                    }
                                }
                           },            
                            schema: {
                                parse: function (response) {
                                    if (response)
                                    {
                                        if (response.length > 0)
                                        	app.observacaoViewService.viewModel.set("media", response[0].MEDIA);
                                        return response;
                                    }
                                    else
                                        return [];
                                
                            }
                          },
                           
                           sortable:true,
                          sort: { field: "DATEDIFF", dir: "desc" }
                    })
            
    });

    app.observacaoViewService = {
        viewModel: new ObservacaoViewModel()
    };
    
    
    
})(window);