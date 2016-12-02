(function (global) {
    var ConsultorioViewModel,
        app = global.app = global.app || {};
   
    
    var url = "http://177.153.18.165:8081/cerbt/ws/relatorio?q=5&setorId=1&risco=AMARELO&pediatrico=N";
    ConsultorioViewModel = kendo.data.ObservableObject.extend({
        risco: "", // grupo do risco
        tipo: "", // C = Classifiacao , O = Consultorio
        consultorioPediatrico:"N",
        tempoMedio:"",
        riscoColor:"",
        query:5,
        colorIsVisible: false,
        descricaoUnidade: "",
        logo:"",
        idsecao:0,
        meta:"",
        onInit:function()
        {
            app.currentViewModel = this;
        },        
        onViewShow: function(e)
        {
            
           console.log( e.view.params);
            var that = this;
            that.set("colorIsVisible", false);
            this.set("logo",app.usuarioSettings.LOGO);
            that.set("risco", e.view.params.risco);
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            that.set("idsecao", e.view.params.idsecao);
             that.set("tipo", "O");
            
            if (e.view.params.risco == 'VERDE')
                this.set("meta", "Meta: 60 min");
            else if (e.view.params.risco == 'AMARELO')
                this.set("meta", "Meta: 30 min");
            else
                this.set("meta", "");

            if (e.view.params.ordem == 2 || e.view.params.risco.indexOf("PEDI") > -1)
                that.set("consultorioPediatrico", "S");
            else  
                that.set("consultorioPediatrico", "N");
            
            if (e.view.params.ordem == 2 || e.view.params.ordem == 1 || e.view.params.ordem == 8) 
                {
                    that.set("colorIsVisible", true);
                    that.set("query", 5);
                    
                    that.set("tipo", "O");
                }
                
            else if (e.view.params.ordem == 3)
                {
                    that.set("query", 8);
                    that.set("tipo", "C");    
                    
                }
                
            else
                that.set("tipo", "");

            this.dataSource.transport.options.read.url = app.unidadeUrl + "/ws/relatorio";
            that.dataSource.read()

        },
        dataSource: new kendo.data.DataSource({
                          transport: {
                                read:  {
                                  //url: app.unidadeUrl + "/ws/relatorio",
                                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                  data: function() {
                                      
                                            var param = {
                                                
                                                "q":app.consultorioViewService.viewModel.query,
                                                "setorId":1,
                                                "risco": app.consultorioViewService.viewModel.risco,
                                                "pediatrico": app.consultorioViewService.viewModel.consultorioPediatrico, 
                                                "tipo": app.consultorioViewService.viewModel.tipo,
                                                "secaoId": app.consultorioViewService.viewModel.idsecao
                                            };
                                                 
                                      if (app.consultorioViewService.viewModel.query == 8)
                                          param = {
                                                
                                                "q":app.consultorioViewService.viewModel.query,
                                                "setorId":1,
                                                "pediatrico": app.consultorioViewService.viewModel.consultorioPediatrico, 
                                                "tipo": app.consultorioViewService.viewModel.tipo,
                                                  "secaoId": app.consultorioViewService.viewModel.idsecao
                                            };
                                      console.log(param);
                                      return param;
                                        
                                    }
                                }
                           },            
                            schema: {
                                parse: function (response) {
                                    console.log(JSON.stringify(response));
                                    if (response)
                                    {
                                        
                                        if (response.length > 0)
                                            {
                                                app.consultorioViewService.viewModel.set("tempoMedio" , response[0].TEMPO_MEDIA_ESPERA);
                                                app.consultorioViewService.viewModel.set("riscoColor" , response[0].CLR_COR_BACKGROUND);
                                                
                                            }
                                            
                                        return response;
                                    }
                                    else
                                        return [];
                                //if (response.length > 0)
                                //    app.situacaoService.viewModel.set("DATAATUALIZACAO", response[0].DATAATUALIZACAO);
                                
                                
                            }
                          },
                           
                           sortable:true,
                          sort: { field: "TEMPO_ESPERA", dir: "desc" }
                    })
             
    });

    app.consultorioViewService = {
        viewModel: new ConsultorioViewModel()
    };
    
    
    
})(window);