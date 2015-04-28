(function (global) {
var LoginModel,
  app = global.app = global.app || {};
    
   var retornoRioSaude = [{STATUS:"OK", LOGO: "logo-riosaudedefasacivil", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://177.124.207.146:8080/sits", DESCRICAO:"CER-BARRA", CODIGO:1 },
                { UNIDADEID:2, URL:"http://177.153.18.165:8095/sits", DESCRICAO:"UPA-SENADOR CAMARA", CODIGO:1 }
            ] }];
   var retornoABBC = [{STATUS:"OK", LOGO: "logo-abbc", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://upasantarita.dyndns.info:8080/santarita", DESCRICAO:"UPA-SANTA RITA", CODIGO:1 },
                //{ UNIDADEID:2, URL:"http://upaguarabira.no-ip.org:8080/sits", DESCRICAO:"UPA-GUARABIRA", CODIGO:1 },
                { UNIDADEID:3, URL:"http://179.188.2.93:8080/sits", DESCRICAO:"UPA-BRANGANÇA", CODIGO:1 }
            ] }];    
    var retornoErro = [{STATUS:"ERRO"}];
    
    
LoginModel = kendo.data.ObservableObject.extend({
    username:"",
    password:"",
    dataSource: new kendo.data.DataSource({
        transport: {
            read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
            }
        },
        schema: {
                parse: function (response) {  
                    
                    if (response[0].STATUS == "OK"){
                        app.usuarioSettings = response[0];
                        app.permissoes = response[0].PERMISSOES;
                         app.application.navigate('views/unidadesView.html');
                        return response;
                       }                
                        else
                       {
                            navigator.notification.alert("Este usuário não existe.");

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
           
           //CODIGO TEMPORARIO ENQUANTO NÃO HA WEBSERVICE DE AUTENTICACAO
           var dataTemp = retornoErro;
           if (this.username == "riosaude" && this.password=="rs123")
           {
               dataTemp =  retornoRioSaude;
           }                
               
           else if (this.username == "ABBC" && this.password=="abbc123") 
               {
                   dataTemp = retornoABBC;
               }

           
           
           // FIM CODIGO TEMPORARIO
          
          this.dataSource.read({ data: dataTemp });
           
          
      },onBeforeShowView:function(e){
          
           this.set("username", "");
           this.set("password", "");
           app.Logoff();
          
      }
});
     app.LoginService = {
        viewModel: new LoginModel()
    };

    
})(window);