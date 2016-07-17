(function (global) {

var LoginModel,
app = global.app = global.app || {};


var retornoRioSaude = [{STATUS:"OK", MOSTRA_INDICADORES:true, LOGO: "logo-riosaudedefasacivil", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
            { UNIDADEID:1, URL:"http://187.111.110.131:8080/sits", DESCRICAO:"CER-BARRA", CODIGO:1, PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
            },{ UNIDADEID:2, URL:"http://187.111.110.117:8080/sits", DESCRICAO:"UPA-SENADOR CAMARA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
            },{ UNIDADEID:3, URL:"http://187.111.110.114:8081/sits", DESCRICAO:"UPA-ROCHA MIRANDA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
                        },
            { UNIDADEID:4, URL:"http://upacdd.is-gone.com:8080/sits", DESCRICAO:"UPA-CIDADE DE DEUS", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
            }
       ] 
    }];

var retornoABBC = [{STATUS:"OK", MOSTRA_INDICADORES:false, LOGO: "logo-abbc", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
            { UNIDADEID:1, URL:"http://upasantarita.dyndns.info:8080/santarita", DESCRICAO:"UPA-SANTA RITA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
            },
            { UNIDADEID:2, URL:"http://upaguarabira.no-ip.org:8080/sits", DESCRICAO:"UPA-GUARABIRA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
            },
            { UNIDADEID:3, URL:"http://179.188.2.93:8080/sits", DESCRICAO:"UPA-BRANGANÇA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
            }
        ]    
    }];  

var retornoCVB = [{STATUS:"OK", MOSTRA_INDICADORES:false, LOGO: "logo-cvbrj", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://upaengdedentro.dyndns.org:8080/sits", DESCRICAO:"UPA-ENGENHO DE DENTRO", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
                },
                { UNIDADEID:2, URL:"http://187.115.163.251:8080/cvb", DESCRICAO:"HOSPITAL TRAUMA", CODIGO:2,
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                }
        ]
    }];

var retornoPCO = [{STATUS:"OK", MOSTRA_INDICADORES:false, LOGO: "", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://177.153.18.165:8070/centroCirurgico", DESCRICAO:"HMLJ", CODIGO:1,PAGINA_INICIAL:"views/centroCirurgico/cirurgiasRealizadasGraficoView.html",
                    NAV_SETTINGS:[{URL: "views/centroCirurgico/cirurgiasRealizadasGraficoView.html", TITULO:"Cirurgias Realizadas"},
                                {URL: "views/centroCirurgico/PainelCirurgiaView.html", TITULO:"Painel de Cirurgias"},
                                {URL: "views/Login.html", TITULO:"Logoff"}
                                ]
                }
        ]
    }];

var retornoHMSPA = [{STATUS:"OK", MOSTRA_INDICADORES:false, LOGO: "", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://hmspa.is-gone.com:8080/sits", DESCRICAO:"HMSPA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                     NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                }
        ]
    }];
    
var retornoUPASPDA = [{STATUS:"OK", MOSTRA_INDICADORES:false, LOGO: "", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                { UNIDADEID:1, URL:"http://upaspda.is-gone.com:8080/sits", DESCRICAO:"UPA-SPDA", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                     NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                }
        ]
    }];    
    

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
                
                if (response[0].STATUS == "OK") {
                    app.login(response[0]);
                    return response;
                } else {
                    navigator.notification.alert("Este usuário não existe.");
                    return response;
                }
            }
        }
    }),
        
    onSubmit: function() { 
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
        if (this.username == "cvb" && this.password == "cvb123")
        {
            dataTemp = retornoCVB;
        }

        if(this.username == "riosaude" && this.password == "rs123")
        {
            dataTemp = retornoRioSaude;
        }

        if(this.username == "abbc" && this.password == "abbc123")
        {
            dataTemp = retornoABBC;    
        }
        
        if(this.username == "pco" && this.password == "pco123")
        {
            dataTemp = retornoPCO;    
        }

        if(this.username == "hmspa" && this.password == "hmspa123")
        {
            dataTemp = retornoHMSPA;    
        }
        
        if(this.username == "upaspda" && this.password == "upaspda123")
        {
            dataTemp = retornoUPASPDA;    
        }

        // FIM CODIGO TEMPORARIO
        
        this.dataSource.read({ data: dataTemp });
    },
      
    onBeforeShowView:function(e){
        
        this.set("username", "");
        this.set("password", "");
        app.Logoff();
    }
});

app.LoginService = {
    viewModel: new LoginModel()
};


})(window);