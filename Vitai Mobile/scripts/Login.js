(function (global) {
var LoginModel,
  app = global.app = global.app || {};
    
   var retornoOK = [{STATUS:"OK",PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}]}];
    var retornoErro = [{STATUS:"ERRO"}];
    
    
LoginModel = kendo.data.ObservableObject.extend({
        dataSource: new kendo.data.DataSource({
                    data: retornoOK,
                    schema: {
                            parse: function (response) {   
                                console.log(response[0].STATUS);
                                if (response[0].STATUS == "OK"){
                                    app.permissoes = response[0].PERMISSOES;
                                    console.log(app.permissoes);                                  
                                      app.LoginService.viewModel.set("isVisible",true);  
                                     app.application.navigate('views/unidadesView.html');
                                    return response;
                                   }                
                                    else
                                   {
                                        navigator.notification.alert("Este usuário não existe.");
                                        console.log(response);
                                        return response;   
                                
                                    }
                         
                            }
                        }
        }),
       submit: function() { 
          if (!this.username) {
              navigator.notification.alert("Usuário é necessário.");
              return;
          }    
          if (!this.password) {
              navigator.notification.alert("Senha é necessário.");
              return;
          }
          this.dataSource.read();
          
      }  
});
     app.LoginService = {
        viewModel: new LoginModel()
    };

    
})(window);