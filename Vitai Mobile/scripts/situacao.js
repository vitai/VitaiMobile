(function (global) {
    var SituacaoViewModel,
        app = global.app = global.app || {};
    
    function handleError(e)
    {
        app.handleError(e);
    }
   
    SituacaoViewModel = kendo.data.ObservableObject.extend({
        logo:"",
        onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
            this.dataSourceCons.read();
            this.dataSourcePaciente.read();
            this.dataSourcePres.read();
            this.dataSourceClass.read();
            this.dataSourceLeito.read();               
            this.graficoDs.read();
        },
        descricaoUnidade: "",
        dataAtualizacao: "",  
        hasPacientes: false,
        observacoes: [],
         dataSourcePaciente: new kendo.data.DataSource({
            transport: { read:  { dataType: "json", timeout: 6000 } },
            sortable:true,
            schema: {
            parse: function (response) {
                
                    if (response.length > 0)
                    app.situacaoService.viewModel.set("dataAtualizacao", kendo.toString(new Date(), "G")); 
                    
                    return response;
                }
            },
            error: handleError  
        }),        
        dataSourceClass: new kendo.data.DataSource({
            transport: { read:  { dataType: "json", timeout: 6000  } },
            sortable:true,
            error: handleError
        }),    
          dataSourceLeito: new kendo.data.DataSource({
            transport: { read:  { dataType: "json", timeout: 6000  } },
            sortable:true,
            group: "GRUPO",
            error: handleError
        }),    
            dataSourcePres: new kendo.data.DataSource({
            transport: { read:  { dataType: "json", timeout:8000  } },
            sortable:true,
            error: handleError
        }),    
        dataSourceCons: new kendo.data.DataSource({
            transport: { read:  { dataType: "json", timeout: 6000  } },
            group: "GRUPO",
            sortable:true,
            sort: { field: "GRUPO", dir: "asc" },
            schema: {
            parse: function (response) {
                
                     console.log(response);
                    
                    return response;
                }
            },
            error: handleError
        }),
        graficoDs: new kendo.data.DataSource({
            transport: {
                    read: {
                        url: function(){return app.unidadeUrl + "/ws/relatorio?q=41&setorId=" + app.unidadeCorrente.CODIGO} ,
                        timeout:5000,
                        dataType: "json"
                    }
           
           },
            schema: {
              parse: function (response) {


               	console.log(response);
                  return response;

              }
            },
            error: handleError    
        }),

        onUpdate: function() 
        {

            this.refresh();
         
        },
            onListDataboud: function(e) {
            
            
            var dataView = e.sender.dataSource.view();
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
        onBeforeShowView: function(e)
        {            
            this.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            this.set("logo",app.usuarioSettings.LOGO);    
            this.dataSourcePaciente.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=15&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourceClass.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=18&setorId=" + app.unidadeCorrente.CODIGO;       
            this.dataSourceLeito.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=19&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourceCons.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=17&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourcePres.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=16&setorId=" + app.unidadeCorrente.CODIGO;
            this.refresh();
        }
    });

    app.situacaoService = {
        viewModel: new SituacaoViewModel()
    };
    
})(window);