(function (global) {
    var listaCirurgiasViewModel,
        app = global.app = global.app || {};
   
    
    //    app.unidadeUrl = "http://177.153.18.165:8070/centroCirurgico";
    
    listaCirurgiasViewModel = kendo.data.ObservableObject.extend({
        selectedDate: null,
        qtdPlanejadas:0,
        qtdRealizada:0,
        percPlanejadaRealizada:0,
        onInit:function(e)
        {   
            this.set("selectedDate",  e.view.params.data);
            app.currentViewModel = this;
        },        
        onViewShow: function(e)
        {
            
            this.cirurgiasDs.read(); 
        },        
        cirurgiasDs: new kendo.data.DataSource({
              group: "NMESPECIALIDADE",
              transport: {
                    read:  {
                      url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                      },
                      dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                      data: function() {
                          
                            var param = {
                                "q":10046,
                                "setorId":1,
                                "dataInicial": kendo.toString(app.cirurgiasRealizadasViewService.viewModel.get("selectedDate"), "dd/MM/yyyy"),
                                "dataFinal": kendo.toString(app.cirurgiasRealizadasViewService.viewModel.get("selectedDate"), "dd/MM/yyyy")
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
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        })
             
    });

    app.listaCirurgiasViewService = {
        viewModel: new listaCirurgiasViewModel()
    };
    
    
    
})(window);