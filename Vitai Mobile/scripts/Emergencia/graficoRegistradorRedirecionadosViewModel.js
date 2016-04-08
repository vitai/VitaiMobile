(function (global) {
    var graficoRegistradorRedirecionadosViewModel,
        app = global.app = global.app || {};
   
    
    
    graficoRegistradorRedirecionadosViewModel = kendo.data.ObservableObject.extend({
        onInit:function(e)
        {
            app.currentViewModel = this;
           this.graficoDs.read();
            
        },        
        onViewShow: function(e)
        {
            this.graficoDs.read();
        },
        graficoDs: new kendo.data.DataSource({
             data:[{"NAO_CLASSIFICADO":66,"PERCENTUAL_REDIRECIONAMENTO":7.100,"AMARELO":62,"VERDE":392,"TOTAL":560,"AZUL":40,"VERMELHO":0,"SIGLA":"UPASC"},
                  {"NAO_CLASSIFICADO":66,"PERCENTUAL_REDIRECIONAMENTO":7.100,"AMARELO":62,"VERDE":392,"TOTAL":560,"AZUL":40,"VERMELHO":0,"SIGLA":"UPASC"},
                  {"NAO_CLASSIFICADO":66,"PERCENTUAL_REDIRECIONAMENTO":7.100,"AMARELO":62,"VERDE":392,"TOTAL":560,"AZUL":40,"VERMELHO":0,"SIGLA":"UPASC"},
                  {"NAO_CLASSIFICADO":66,"PERCENTUAL_REDIRECIONAMENTO":7.100,"AMARELO":62,"VERDE":392,"TOTAL":560,"AZUL":40,"VERMELHO":0,"SIGLA":"UPASC"}],
            //transport: {
            //        read: {
            //            url: "http://187.111.110.117:8080/sits/ws/relatorio?q=41&setorId=1",
            //            dataType: "json"
            //        }
           
           //},
            schema: {
              parse: function (response) {


               	console.log(response);
                  return response;

              }
            }    
        })
                
        
             
    });

    app.graficoRegistradorRedirecionadosViewService = {
        viewModel: new graficoRegistradorRedirecionadosViewModel()
    };
    
    
    
})(window);