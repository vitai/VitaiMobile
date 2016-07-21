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
            this.refresh();
        },
        refresh:function(e){
             kendo.mobile.application.showLoading();
            this.graficoCirurgiaPlanejadaDs.read();
            this.graficoCirurgiaEncaixadasDs.read();
            this.quantidadeCirurgiaDs.read();
            
        },
        onDateChange: function(e){
            this.refresh();
            
        },
        onTodayClick: function(e){
           
             this.set("selectedDate", new Date());
             this.refresh();
        },
        onPreviousDateClick: function(e){
            var data = kendo.parseDate(this.get("selectedDate"));
            data.setDate(data.getDate() - 1);
            this.set("selectedDate", data);
             this.refresh();
            
        },
        onNextDateClick: function(e){
            var data = kendo.parseDate(this.get("selectedDate"));
            data.setDate(data.getDate() + 1);
             this.set("selectedDate", data);
              this.refresh();
            
        },
        onPainelClick: function(e){
          app.application.navigate("views/centroCirurgico/PainelCirurgiaView.html");//?data="+this.get("selectedDate"));  
        },
        onListaClick: function(e){
            
           app.application.navigate("views/centroCirurgico/listaCirurgiasView.html?data="+this.get("selectedDate"));
            
        },
        handleError:function(e){
             alert(e);  
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
                            app.cirurgiasRealizadasViewService.viewModel.set("isGraficoVisible", true);
                            app.cirurgiasRealizadasViewService.viewModel.refresh();
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        }),        
        quantidadeCirurgiaDs: new kendo.data.DataSource({
              transport: {
                    read:  {
                      url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                      },
                      dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                      data: function() {
                          
                            var param = {
                                "q":10070,
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
                            console.log(response);
                            app.cirurgiasRealizadasViewService.viewModel.set("isGraficoVisible", true);
                            //app.cirurgiasRealizadasViewService.viewModel.set("qtdPlanejadas", response[0].QTD_PLANEJADA);
                            //app.cirurgiasRealizadasViewService.viewModel.set("qtdRealizada", response[0].QTD_REALIZADA);
                            //app.cirurgiasRealizadasViewService.viewModel.set("percPlanejadaRealizada", kendo.toString(response[0].QTD_REALIZADA / response[0].QTD_PLANEJADA, "p") );
                            
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        }),        
        graficoCirurgiaEncaixadasDs: new kendo.data.DataSource({
              transport: {
                    read:  {
                      url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                      },
                      dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                      data: function() {
                          
                            var param = {
                                "q":10064,
                                "data": kendo.toString(app.cirurgiasRealizadasViewService.viewModel.get("selectedDate"), "dd/MM/yyyy"),
                                "tipo": "ENCAIXADO"
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
                             console.log('graficoCirurgiaEncaixadasDs');
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        }),
        graficoCirurgiaPlanejadaDs: new kendo.data.DataSource({
              transport: {
                    read:  {
                      url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                      },
                      dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                      data: function() {
                          
                            var param = {
                                "q":10064,
                                "data": kendo.toString(app.cirurgiasRealizadasViewService.viewModel.get("selectedDate"), "dd/MM/yyyy"),
                                "tipo": "PLANEJADO"
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
                            console.log('graficoCirurgiaPlanejadaDs'); 
                            return response;
                        }
                        else
                            return [];
                    
                }
              }
        }),
        chartPlanejadaDataBound:function(e){
            var view = e.sender.dataSource.view();
              $("#noDataPlanejadas").toggle(false);
            
        },
        chartEncaixadasDataBound:function(e){
            var view = e.sender.dataSource.view();
              $("#noDataEncaixadas").toggle(false);
           
          
        }
             
    });

    app.cirurgiasRealizadasViewService = {
        viewModel: new cirurgiasRealizadasViewModel()
    };
    
    
    
})(window);