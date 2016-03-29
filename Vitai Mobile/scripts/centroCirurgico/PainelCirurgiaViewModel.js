(function (global) {
    var painelCirurgiasViewModel,
        app = global.app = global.app || {};
   
    
        app.unidadeUrl = "http://177.153.18.165:8070/centroCirurgico";
    
    painelCirurgiasViewModel = kendo.data.ObservableObject.extend({
        selectedDate: new Date(),
        onInit:function(e)
        {   
            
            var data =  new Date();
            if (e.view.params.data && e.view.params.data != "")
            {
                data = kendo.parseDate(e.view.params.data)
            }
             
            this.set("selectedDate", data );
            
            //$("#scheduler").data("kendoScheduler").date(data);
            
            
            app.currentViewModel = this;
            
        },        
        onViewShow: function(e)
        {
            console.log(e.view.params.data);
            var data =  new Date();
            if (e.view.params.data && e.view.params.data != "")
            {
                data = kendo.parseDate(e.view.params.data)
            }
            
            this.set("selectedDate", data );
            
            //$("#scheduler").data("kendoScheduler").date(data);
            
            this.dataSource.read(); 
    		$("#scheduler").kendoTooltip({
    	        filter: ".k-event",
    	        position: "top",
    	        width: 350,
    	        showOn: "click",
    	        content: kendo.template($('#tooltip-template').html())
        	});            
        },
        navigate:function(e)
        {
            kendo.mobile.application.showLoading();
            this.set("selectedDate",  e.date);
            this.dataSource.read(); 
        },
        dataSource:new kendo.data.SchedulerDataSource({
            transport: {
            	read: {
		            url: function(){
                          return app.unidadeUrl + "/ws/relatorio";  
                    },
		            contentType: 'application/json',
		            datatype: "json"
                    },
	                parameterMap: function(options, operation) {
                        if (operation === "read") {
                            var result = {
                                "q": 10050,
                                "dataInicial":  kendo.toString(app.painelCirurgiasViewService.viewModel.get("selectedDate"), 'dd/MM/yyyy'),
                                "dataFinal": kendo.toString(app.painelCirurgiasViewService.viewModel.get("selectedDate"), 'dd/MM/yyyy')
                            }
                                
                            return result;
                        }

                        return kendo.stringify(options);
	                }                      
            	
        	},
	        schema: {
		        parse: function (response) {
		        	
		        	kendo.mobile.application.hideLoading(); 
		            return response;
		            	
		        },
		         model: {
		         	id: "pedidoCirurgiaId",
		         	fields:{
		         		taskId:{from:"ID", type:"number"},
		         		start:{from:"MAPACIRURGICOITEMINICIO", type:"date"},
		         		end:{from:"MAPACIRURGICOITEMTERMINO", type:"date"}, 
		         		title:{from:"ESPECIALIDADENOME"},
		         		secaoId: {from:"SECAOID"},
		         		pacienteNome: {from:"PACIENTENOME"},
		         		procedimentoNome: {from:"PROCEDIMENTONOME"},
		         		equipeNome: {from:"EQUIPENOME"},
		         		pacienteSexo: {from:"PACIENTESEXO"},
		         		dataCirurgiaFim: {from:"DATACIRURGIAFIM"},
		         		dataCirurgiaInicio: {from:"DATACIRURGIAINICIO"},
		         		dataCirurgiaCancelada: {from:"DATACIRURGIACANCELADA"},
		         		dataCirurgiaCheckin: {from:"DATACIRURGIACHECKIN"},
		         		dataCirurgiaSaidaSala: {from:"DATACIRURGIASAIDASALA"},
		         		pedidoCirurgiaEncaixe: {from:"PEDIDOCIRURGIAENCAIXE"} 
		         	}
		         	
		         }
	      	}
        }),
        dataSourceResource: new kendo.data.DataSource({
    		transport: {
				read: {
		            url: function(){
                          return app.unidadeUrl + "/ws/relatorio?q=10051";  
                    },
					contentType: 'application/json',
					datatype: "json"
				}
    		},
			schema: {
				parse: function (response) {
                    console.log(response);
					return response;
				},
				model: {
					id: "IDSECAO",
					fields:{
						text:{from:"NMSECAO"},
						value:{from:"IDSECAO", type:"number"}
					}	
				}
			}
    	}),
        dataBound: function (e) {
                
	            var view = e.sender._selectedView;
	            var events = e.sender.dataSource.view();
	            var eventElement;
	            var event;
	
	            for (var idx = 0, length = events.length; idx < length; idx++) {
		              event = events[idx];
		
		              eventElement = view.element.find("[data-uid=" + event.uid + "]");
		              if (event.dataCirurgiaCancelada != "" && event.dataCirurgiaCancelada != null) {
		              	eventElement.css("background-color", "rgb(255, 165, 0)"); //laranja
		              	eventElement.css("color", "black");
		              } else if (event.dataCirurgiaSaidaSala != "" && event.dataCirurgiaSaidaSala != null) {
		              	eventElement.css("background-color", "rgb(0, 128, 0)"); //verde escuro
		              	eventElement.css("color", "white");
		              } else if (event.dataCirurgiaFim != "" && event.dataCirurgiaFim != null) {
		              	eventElement.css("background-color", "rgb(191, 255, 205)"); // verde claro
		              	eventElement.css("color", "black");
		              } else if (event.dataCirurgiaInicio != "" && event.dataCirurgiaInicio != null) {
		              	eventElement.css("background-color", "rgb(0, 88, 176)"); // azul escuro
		              	eventElement.css("color", "white");
		              } else if (event.dataCirurgiaCheckin != "" && event.dataCirurgiaCheckin != null) {
		              	eventElement.css("background-color", "rgb(98, 176, 255)"); // azul claro
		              	eventElement.css("color", "black");
		              } else if (event.pedidoCirurgiaEncaixe == 'S') {
		              	eventElement.css("background-color", "rgb(250, 252, 191)"); // amarelo
		                eventElement.css("color", "black");
		              } else {
		              	eventElement.css("background-color", "rgb(200, 200, 200)"); //cinza claro
		              	eventElement.css("color", "black");
		              } 
	            }            
	        }        
        
    });
    
    app.painelCirurgiasViewService = {
        viewModel: new painelCirurgiasViewModel()
    };
    
    
    
})(window);    