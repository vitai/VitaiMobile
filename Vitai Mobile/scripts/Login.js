(function (global) {
var LoginModel,
  app = global.app = global.app || {};
    
   var retornoRioSaude = [{STATUS:"OK", LOGO: "logo-riosaudedefasacivil", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://177.124.207.146:8080/sits", DESCRICAO:"CER-BARRA", CODIGO:1,
                      NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                   {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                   {URL: "views/situacao.html", TITULO:"Situação"},
                                    {URL: "views/Login.html", TITULO:"SAIR"}
                                   ]
              },
                { UNIDADEID:2, URL:"http://177.153.18.165:8095/sits", DESCRICAO:"UPA-SENADOR CAMARA", CODIGO:1,
                      NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                   {URL: "views/unidadesView.html", TITULO:"Unidades"},
                                   {URL: "views/unidadesView.html", TITULO:"Unidades"}
                                   ]
              },
                { UNIDADEID:3, URL:"http://177.153.18.165:8096/sits", DESCRICAO:"UPA-ROCHA MIRANDA", CODIGO:1,
                      NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                   {URL: "views/unidadesView.html", TITULO:"Unidades"},
                                   {URL: "views/unidadesView.html", TITULO:"Unidades"}
                                   ]
              }
       
            ] }];
    
   var retornoABBC = [{STATUS:"OK", LOGO: "logo-abbc", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://upasantarita.dyndns.info:8080/santarita", DESCRICAO:"UPA-SANTA RITA", CODIGO:1 },
                { UNIDADEID:2, URL:"http://upaguarabira.no-ip.org:8080/sits", DESCRICAO:"UPA-GUARABIRA", CODIGO:1 },
                { UNIDADEID:3, URL:"http://179.188.2.93:8080/sits", DESCRICAO:"UPA-BRANGANÇA", CODIGO:1 }
            ]    }];  
    
   var retornoCVB = [{STATUS:"OK", LOGO: "", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://127.0.0.1", DESCRICAO:"UPA-ENGENHO DE DENTRO", CODIGO:1 }
            ]}];   
    
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
                       app.login(response[0]);
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
           
                 
       if (this.username == "CVBRJ"  && this.password == "cvbrj123")
           {
               dataTemp =  retornoCVB;
           }
           
      if(this.username == "riosaude" && this.password == "rs123"){
                           
               dataTemp =  retornoRioSaude;
            }
           
       if(this.username == ("ABBC")  && this.password == "abbc123")
           {
                           
               dataTemp =  retornoABBC;    
               
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