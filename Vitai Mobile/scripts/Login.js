(function (global) {

var LoginModel,
app = global.app = global.app || {};


var retornoRioSaude = [{STATUS:"OK", MOSTRA_INDICADORES:true, MOSTRA_CID:true, LOGO: "logo-riosaudedefasacivil", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
            { UNIDADEID:1, URL:"http://187.111.110.125:8080/sits", DESCRICAO:"CER-BARRA", CODIGO:1, PAGINA_INICIAL:"views/situacao.html",
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
            { UNIDADEID:4, URL:"http://187.111.110.146:8080/sits", DESCRICAO:"UPA-CIDADE DE DEUS", CODIGO:1,PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
            }
       ] 
    }];

var retornoABBC = [{STATUS:"OK", MOSTRA_INDICADORES:false, MOSTRA_CID:false, LOGO: "logo-abbc", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
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

var retornoCVB = [{STATUS:"OK", MOSTRA_INDICADORES:false,  MOSTRA_CID:false, LOGO: "logo-cvbrj", PERMISSOES:[{Permissao:"ADM"},{Permissao:"MEDICO"}], UNIDADES:[
                {
                    UNIDADEID: 1, URL: "http://177.75.71.198:8080/cvb", DESCRICAO: "HOSPITAL TRAUMA", CODIGO: 2, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                },
                 {
                     UNIDADEID: 2, URL: "http://upaed.dyndns.info:8080/sits", DESCRICAO: "UPAED", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                     NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                                { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                                { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                                { URL: "views/Login.html", TITULO: "SAIR" }
                     ]
                 },
                {
                    UNIDADEID: 3, URL: "http://upai.dyndns.info:8080/sits", DESCRICAO: "UPA-ITABORAI", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 4, URL: "http://upaspda.dyndns.info:8080/sits", DESCRICAO: "UPA-SPDA", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 5, URL: "http://177.84.33.147:8181/vitai", DESCRICAO: "HMAS", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                }
        ]
    }];

var retornoTRUMA = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 1, URL: "http://177.75.71.198:8080/cvb", DESCRICAO: "HOSPITAL TRAUMA", CODIGO: 2, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                                { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                                { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                                { URL: "views/Login.html", TITULO: "SAIR" }
                    ]

                }
    ]
}];


var retornoPCO = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                { UNIDADEID:1, URL:"http://187.111.110.139:8080/centroCirurgico", DESCRICAO:"HMLJ", CODIGO:1,PAGINA_INICIAL:"views/centroCirurgico/cirurgiasRealizadasGraficoView.html",
                    NAV_SETTINGS:[{URL: "views/centroCirurgico/cirurgiasRealizadasGraficoView.html", TITULO:"Cirurgias Realizadas"},
                                {URL: "views/centroCirurgico/PainelCirurgiaView.html", TITULO:"Painel de Cirurgias"},
                                {URL: "views/Login.html", TITULO:"Logoff"}
                                ]
                }
        ]
    }];

var retornoHMAS = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "logo-riosaudedefasacivil", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
            { UNIDADEID:1, URL:"http://177.84.33.147:8181/vitai", DESCRICAO:"HMAS", CODIGO:1, PAGINA_INICIAL:"views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ]
            }
        ]
    }]; 


var retornoHMSPA = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 1, URL: "http://hmspa.dyndns.info:8080/sits", DESCRICAO: "HMSPA", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                     NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                }
        ]
    }];
    
var retornoCVBRJ = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 1, URL: "http://upaed.dyndns.info:8080/sits", DESCRICAO: "UPAED", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                               {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                               {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                               {URL: "views/Login.html", TITULO:"SAIR"}
                    ] 
                },
                {
                    UNIDADEID: 2, URL: "http://upai.dyndns.info:8080/sits", DESCRICAO: "UPA-ITABORAI", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                               {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                               {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                               {URL: "views/Login.html", TITULO:"SAIR"}
                    ] 
                },
                {
                    UNIDADEID: 3, URL: "http://upaspda.dyndns.info:8080/sits", DESCRICAO: "UPA-SPDA", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                     NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                },
                {
                    UNIDADEID: 4, URL: "http://177.84.33.147:8181/vitai", DESCRICAO: "HMAS", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                     NAV_SETTINGS:[{URL: "views/unidadesView.html", TITULO:"Unidades"},
                                {URL: "views/ProducaoProfissionalView.html", TITULO:"Produção Profissional"},
                                {URL: "views/Emergencia/EmergenciaView.html", TITULO:"Emergencia"},
                                {URL: "views/Login.html", TITULO:"SAIR"}
                                ] 
                }
        
        ]
}];

var retornoUPAI = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 2, URL: "http://upai.dyndns.info:8080/sits", DESCRICAO: "UPA-ITABORAI", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                }

    ]
}];

var retornoUPAED = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 1, URL: "http://upaed.dyndns.info:8080/sits", DESCRICAO: "UPAED", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                }

    ]
}];

var retornoUPASPDA = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 3, URL: "http://upaspda.dyndns.info:8080/sits", DESCRICAO: "UPA-SPDA", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                }

    ]
}];

var retornoCEP28 = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 1, URL: "http://upaitaperuna.dyndns.info:8881/vitai", DESCRICAO: "UPA-ITAPERUNA", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                }

    ]
}];

var retornoF71 = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "logo-f71", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
                {
                    UNIDADEID: 1, URL: "http://upara.dyndns.info:8080/vitai", DESCRICAO: "UPA-RICARDO ALBUQUERQUE", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 2, URL: "http://187.62.225.158:8080/vitai", DESCRICAO: "UPA-SANTA LUZIA", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 3, URL: "http://200.218.255.113:8080/vitai", DESCRICAO: "UPA-BANGU", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 4, URL: "http://200.218.255.73:8080/vitai", DESCRICAO: "UPA-REALENGO", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 5, URL: "http://177.93.152.99:8080/vitai", DESCRICAO: "UPA-CAMPOS", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 6, URL: "http://upacolubande.dyndns.info:8080/vitai", DESCRICAO: "UPA-COLUBANDE", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                },
                {
                    UNIDADEID: 7, URL: "http://177.200.80.6:8080/vitai", DESCRICAO: "UPA-EUSEBIO", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
                    NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
                               { URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
                               { URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
                               { URL: "views/Login.html", TITULO: "SAIR" }
                    ]
                }

    ]
}];

var retornoITGM = [{
    STATUS: "OK", MOSTRA_INDICADORES: false, MOSTRA_CID: false, LOGO: "logo-f71", PERMISSOES: [{ Permissao: "ADM" }, { Permissao: "MEDICO" }], UNIDADES: [
		{
			UNIDADEID: 7, URL: "http://177.200.80.6:8080/vitai", DESCRICAO: "UPA-EUSEBIO", CODIGO: 1, PAGINA_INICIAL: "views/situacao.html",
			NAV_SETTINGS: [{ URL: "views/unidadesView.html", TITULO: "Unidades" },
						{ URL: "views/ProducaoProfissionalView.html", TITULO: "Produção Profissional" },
						{ URL: "views/Emergencia/EmergenciaView.html", TITULO: "Emergencia" },
						{ URL: "views/Login.html", TITULO: "SAIR" }
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
        
        if(this.username == "cvbrj" && this.password == "cvbrj123")
        {
            dataTemp = retornoCVBRJ;    
        }

        if(this.username == "hmas" && this.password == "hmas123")
        {
            dataTemp = retornoHMAS;    
        }

        if (this.username == "upai" && this.password == "upai123") {
            dataTemp = retornoUPAI;
        }

        if (this.username == "upaspda" && this.password == "upaspda123") {
            dataTemp = retornoUPASPDA;
        }

        if (this.username == "upaed" && this.password == "hmas123") {
            dataTemp = retornoUPAED;
        }

        if (this.username == "trauma" && this.password == "trauma123") {
            dataTemp = retornoTRUMA;
        }

        if (this.username == "cep28" && this.password == "cep28123") {
            dataTemp = retornoCEP28;
        }

        if (this.username == "f71" && this.password == "f71123") {
            dataTemp = retornoF71;
        }

        if (this.username == "itgm" && this.password == "itgm123") {
            dataTemp = retornoITGM;
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