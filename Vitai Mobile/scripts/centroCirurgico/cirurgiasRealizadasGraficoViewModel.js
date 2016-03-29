(function (global) {
    var cirurgiasRealizadasViewModel,
        app = global.app = global.app || {};
   
    
    
    cirurgiasRealizadasViewModel = kendo.data.ObservableObject.extend({
        selectedDate: null,
        isGraficoVisible: false,
        qtdPlanejadas:0,
        qtdRealizada:0,
        percPlanejadaRealizada:0,
        urlListaCirurgia:null,
        
        onInit:function(e)
        {
            app.currentViewModel = this;
            this.dataUltimoMapaRealizadoDs.read();             
            
        },        
        onViewShow: function(e)
        {

        },
        onDateChange: function(e){
            kendo.mobile.application.showLoading();
             this.graficoDs.read();
        },
        onTodayClick: function(e){
            kendo.mobile.application.showLoading();
             this.set("selectedDate", new Date());
             this.graficoDs.read();
        },
        onPreviousDateClick: function(e){
            var data = kendo.parseDate(this.get("selectedDate"));
            data.setDate(data.getDate() - 1);
            this.set("selectedDate", data);
            this.graficoDs.read();
            
        },
        onNextDateClick: function(e){
            var data = kendo.parseDate(this.get("selectedDate"));
            data.setDate(data.getDate() + 1);
             this.set("selectedDate", data);
             this.graficoDs.read();
            
        },
        onPainelClick: function(e){
          app.application.navigate("views/centroCirurgico/PainelCirurgiaView.html");//?data="+this.get("selectedDate"));  
        },
        onListaClick: function(e){
            
           app.application.navigate("views/centroCirurgico/listaCirurgiasView.html?data="+this.get("selectedDate"));
            
        },
       dataUltimoMapaRealizadoDs: new kendo.data.DataSource({
              transport: {
                    read:  {
                      url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                      },
                      dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                      data: function() {
                          
                            var param = {
                                "q":10049
                            };
                            return param;
                        }
                    }
               },            
                schema: {
                    parse: function (response) {
                         
                        app.cirurgiasRealizadasViewService.viewModel.set("isGraficoVisible", false);
                        if (response && response.length > 0)
                        {
                            app.cirurgiasRealizadasViewService.viewModel.set("selectedDate", response[0].DATA);
                            app.cirurgiasRealizadasViewService.viewModel.graficoDs.read();
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        }),        
        graficoDs: new kendo.data.DataSource({
              transport: {
                    read:  {
                      url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                      },
                      dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                      data: function() {
                          
                            var param = {
                                "q":10048,
                                "data": kendo.toString(app.cirurgiasRealizadasViewService.viewModel.get("selectedDate"), "dd/MM/yyyy")
                            };
                              
                              
                              return param;
                            
                        }
                    }
               },            
                schema: {
                    parse: function (response) {
                        kendo.mobile.application.hideLoading();
                        app.cirurgiasRealizadasViewService.viewModel.set("isGraficoVisible", false);
                        if (response && response.length > 0)
                        {
                            app.cirurgiasRealizadasViewService.viewModel.set("isGraficoVisible", true);
                            app.cirurgiasRealizadasViewService.viewModel.set("qtdPlanejadas", response[0].QTD_PLANEJADA);
                            app.cirurgiasRealizadasViewService.viewModel.set("qtdRealizada", response[0].QTD_REALIZADA);
                            app.cirurgiasRealizadasViewService.viewModel.set("percPlanejadaRealizada", kendo.toString(response[0].QTD_REALIZADA / response[0].QTD_PLANEJADA, "p") );
                            
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        })
             
    });

    app.cirurgiasRealizadasViewService = {
        viewModel: new cirurgiasRealizadasViewModel()
    };
    
    
    
})(window);