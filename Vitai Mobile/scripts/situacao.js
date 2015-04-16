(function (global) {
    var SituacaoViewModel,
        app = global.app = global.app || {};
   
    SituacaoViewModel = kendo.data.ObservableObject.extend({
        onInit:function()
        {
            app.currentViewModel = this;
            
        },
        refresh: function()
        {
            this.dataSource.read();
        },
        descricaoUnidade: "",
        hasPacientes: false,
        dataAtualizacao: "",
        observacoes: [],
        dataSource: new kendo.data.DataSource({
                        offlineStorage:"offlineDataSource",
                          transport: {
                                read:  {
                                  //url: app.unidadeUrl + "/ws/relatorio?q=3&setorId=1",
                                  dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                }
                           },
                            schema: {
                            parse: function (response) {
                                
                                if (response.length > 0)
                                    app.situacaoService.viewModel.set("dataAtualizacao", response[0].DATAATUALIZACAO);
                                
                                return response;
                            }
                          },
                           group: "ORDEM",
                           sortable:true,
                          sort: { field: "ORDEM", dir: "asc" }
                    }),
        onUpdate: function() 
        {
            var that = this;
            that.dataSource.read();
        },
        onListDataboud: function(e) {
            
            var dataView = this.dataSource.view();
            var groups = $(".listHeader");
            for (var i = 0; i < groups.length; i++) {

                var grupo = dataView[i].items[0].GRUPO;
                $(groups[i]).html(grupo);
                var obs = dataView[i].items[0].OBSERVACAO;
                this.observacoes[i] = obs.trim();
                var iconHelp = $('[data-id='+dataView[i].items[0].ORDEM+']')
                if (obs && obs.trim()!='')
                    {
                        iconHelp.show();
                        
                    }
                else
                    {
                        
                        iconHelp.html('');
                    }
                
            }
        },
        showHelp: function(e)
        {
            console.log(e);
        },
        onBeforeShowView: function(e)
        {
            var s = app.unidadeUrl + "/ws/relatorio?q=3&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSource.transport.options.read.url = s;
            this.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            this.dataSource.read()
        }
    });

    app.situacaoService = {
        viewModel: new SituacaoViewModel()
    };
    
    
    
})(window);
