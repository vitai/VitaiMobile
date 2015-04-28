(function (global) {
    var SituacaoViewModel,
        app = global.app = global.app || {};
   
    SituacaoViewModel = kendo.data.ObservableObject.extend({
        logo:"",
        onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
            //this.dataSource.read();
            this.dataSourceCons.read();
            this.dataSourcePaciente.read();
            this.dataSourcePres.read();
            this.dataSourceClass.read();
            this.dataSourceLeito.read();               
        },
        descricaoUnidade: "",
        hasPacientes: false,
        dataAtualizacao: "",
        observacoes: [],
         dataSourcePaciente: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } },
            sortable:true
        }),        
        dataSourceClass: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } },
            sortable:true,
            schema: {
            parse: function (response) {
                
                    if (response.length > 0)
                        app.situacaoService.viewModel.set("dataAtualizacao", response[0].DATAATUALIZACAO);
                    return response;
                }
            }            
        }),    
          dataSourceLeito: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } },
            sortable:true
        }),    
           
            dataSourcePres: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } },
            sortable:true
        }),    
        dataSourceCons: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } },
            group: "ORDEM",
            sortable:true,
            sort: { field: "ORDEM", dir: "asc" }
        }),
        onUpdate: function() 
        {
            var that = this;
            //that.dataSource.read();
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
        showHelp: function(e)
        {
            console.log(e);
        },
        onBeforeShowView: function(e)
        {
            this.set("logo",app.usuarioSettings.LOGO);
            this.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            
            //this.dataSource.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=3&setorId=" + app.unidadeCorrente.CODIGO;           
            this.dataSourcePaciente.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=15&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourceClass.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=18&setorId=" + app.unidadeCorrente.CODIGO;       
            this.dataSourceLeito.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=19&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourceCons.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=17&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourcePres.transport.options.read.url = app.unidadeUrl + "/ws/relatorio?q=16&setorId=" + app.unidadeCorrente.CODIGO;

            //this.dataSource.read();
            this.refresh();

        }
        
    });

    app.situacaoService = {
        viewModel: new SituacaoViewModel()
    };
    
    
    
})(window);
