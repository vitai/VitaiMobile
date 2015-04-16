(function (global) {
    var TesteViewModel,
        app = global.app = global.app || {};
   
    TesteViewModel = kendo.data.ObservableObject.extend({
        dataSource: new kendo.data.DataSource({
            data: '[{"DEP_ID_PRESCRICAO":364,"BAIRRO":"BARRA DA TIJUCA","FONEAREA":"","NUMERO":"55","DTCADASTRO":null,"CDRESPONSAVEL":null,"CDSECRETARIA":6,"FAXAREA":"","SITE":null,"COMPLEMENTO":"","CNESSETOR":"6716938","EMAIL":"","SET_ID":null,"ENDERECO":"AV. LUIZ CARLOS PRESTES","OBS":"","FAX":"","IE":null,"NMSETOR":"COORDENACAO DE EMERGENCIA REGIONAL","IDSEGMENTO":null,"IDSETOR":1,"UF":"RJ","SIGLA":"CER  .","CEP":22775055,"TIM_TIMESTAMP":1344546856287,"FONE":"","CIDADE":"RIO DE JANEIRO","CNPJ":"29468055000102"},{"DEP_ID_PRESCRICAO":364,"BAIRRO":"BARRA DA TIJUCA","FONEAREA":"","NUMERO":"55","DTCADASTRO":null,"CDRESPONSAVEL":null,"CDSECRETARIA":6,"FAXAREA":"","SITE":null,"COMPLEMENTO":"","CNESSETOR":"6716938","EMAIL":"IMPLANTACAO@TI-MED.NET.BR","SET_ID":null,"ENDERECO":"AV. LUIZ CARLOS PRESTES","OBS":"","FAX":"","IE":null,"NMSETOR":"COORDENACAO DE EMERGENCIA REGIONAL","IDSEGMENTO":null,"IDSETOR":2,"UF":"RJ","SIGLA":"CER  .","CEP":22775055,"TIM_TIMESTAMP":1344547354185,"FONE":"","CIDADE":"RIO DE JANEIRO","CNPJ":"29468055000102"},{"DEP_ID_PRESCRICAO":364,"BAIRRO":"BARRA DA TIJUCA","FONEAREA":"","NUMERO":"55","DTCADASTRO":null,"CDRESPONSAVEL":null,"CDSECRETARIA":6,"FAXAREA":"","SITE":null,"COMPLEMENTO":"","CNESSETOR":"676938","EMAIL":"","SET_ID":null,"ENDERECO":"AV. LUIZ CARLOS PRESTES","OBS":"","FAX":"","IE":null,"NMSETOR":"CENTRO DE EMERGENCIA REGIONAL","IDSEGMENTO":null,"IDSETOR":3,"UF":"RJ","SIGLA":"CER  .","CEP":0,"TIM_TIMESTAMP":1344547720604,"FONE":"","CIDADE":"RIO DE JANEIRO","CNPJ":"29468055000102"},{"DEP_ID_PRESCRICAO":364,"BAIRRO":"","FONEAREA":"","NUMERO":"S/N","DTCADASTRO":null,"CDRESPONSAVEL":-1,"CDSECRETARIA":6,"FAXAREA":"","SITE":"","COMPLEMENTO":"","CNESSETOR":null,"EMAIL":"","SET_ID":null,"ENDERECO":"","OBS":"","FAX":"","IE":null,"NMSETOR":"ADMINISTRATIVO","IDSEGMENTO":null,"IDSETOR":4,"UF":"","SIGLA":null,"CEP":-1,"TIM_TIMESTAMP":1344547864265,"FONE":"","CIDADE":"","CNPJ":null},{"DEP_ID_PRESCRICAO":364,"BAIRRO":"","FONEAREA":"","NUMERO":"55","DTCADASTRO":null,"CDRESPONSAVEL":1,"CDSECRETARIA":6,"FAXAREA":"","SITE":"","COMPLEMENTO":"","CNESSETOR":null,"EMAIL":"","SET_ID":null,"ENDERECO":"AV LUIZ CARLOS PRESTES","OBS":"","FAX":"","IE":null,"NMSETOR":"COORDENCAO DE EMERGENCIA REGIONAL","IDSEGMENTO":null,"IDSETOR":5,"UF":"","SIGLA":null,"CEP":22775055,"TIM_TIMESTAMP":1344557938052,"FONE":"","CIDADE":"","CNPJ":null}]',
                                        schema: {
                            parse: function (response) {                                
                                return $.parseJSON(response);
                            }
                          },

                    })
    });

    app.testeService = {
        viewModel: new TesteViewModel()
    };
    
    
    
})(window);