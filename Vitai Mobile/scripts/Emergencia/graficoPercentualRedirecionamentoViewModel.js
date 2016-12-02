(function (global) {
    var graficoPercentualRedirecionamentoViewModel,
        app = global.app = global.app || {};
   
    
    
    graficoPercentualRedirecionamentoViewModel = kendo.data.ObservableObject.extend({
        dataAtualizacao: "",
        onInit:function(e)
        {
            app.currentViewModel = this;
           //this.graficoDs.read();
            
        },        
        onViewShow: function(e)
        {
            kendo.mobile.application.showLoading();
            this.graficoDs.read();
        },
        onUpdate: function(e){
            kendo.mobile.application.showLoading();
            this.graficoDs.read();
            
        },
        graficoDs: new kendo.data.DataSource({
            serverFiltering: true,
            error: function(e)
            {
                kendo.mobile.application.hideLoading();
                if (e.errorThrown != "" && e.errorThrown != "OK")
                	navigator.notification.alert("Não foi possivel obter os dados: " + e.errorThrown + "("+ e.status + ")");
             
            },
            transport: {
                    read: {
                        timeout:20000,
                        url: "http://177.153.18.165:8281/atendimento/1.0.0/r42",
                        headers: {"Authorization": "Bearer 5e38280bd56b9ca25bfbdcf8ac8d1d29"},
                        dataType: "json"
                    }
           }, group: {
                field: "SIGLA"
            },
            schema: {
                 model: {
                    fields: {
                        DATA: {
                            type: "date"
                        }
                    }
                },
              parse: function (response) {
                  kendo.mobile.application.hideLoading();
				  app.graficoPercentualRedirecionamentoViewService.viewModel.set("dataAtualizacao", kendo.toString(new Date(), "G")); 
                  console.log(JSON.stringify(response));
                  return response;

              }
            }    
        }),
        onChartDataBound:function(e){
            //console.log(e);
            //e.sender.options.series[0].color = e.sender.options.series[0].data[0].COLOR;
            for(i = 0; i< e.sender.options.series.length; i++){
                if (e.sender.options.series[i].data[0].COR)
                    e.sender.options.series[i].color = e.sender.options.series[i].data[0].COR;
                
               // console.log(e.sender.options.series[i].name, e.sender.options.series[i].color, e.sender.options.series[i].data[0].COR);
            }
            
                
            
        }
                
        
             
    });

    app.graficoPercentualRedirecionamentoViewService = {
        viewModel: new graficoPercentualRedirecionamentoViewModel()
    };
    
    
    
})(window);