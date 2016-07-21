(function (global) {
    var painelCirurgiasViewModel,
        app = global.app = global.app || {};
   
    kendo.culture("pt-BR");
    
    //    app.unidadeUrl = "http://177.153.18.165:8070/centroCirurgico";
    
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
                    
                    if (event.pacienteNome == 'ISABELE CAROLINE SARMENTO ARAUJO'){
                        console.log(event);
                    }
		
			          eventElement = view.element.find("[data-uid=" + event.uid + "]");
		              if ((event.dataCirurgiaCancelada != "" && event.dataCirurgiaCancelada != null)  || (event.dataCancelamento != "" && event.dataCancelamento != null)) {
			              	if (event.STATUSMAPACIRURGICOITEM == "T") {
			            		eventElement.addClass("suspensaoTemporaria");
			    		        eventElement.css("color", "black");
			            	} else {
			            		if (event.STATUSMAPACIRURGICOITEM == "C") {
				            		if (event.DATACHECKINCC != "" && event.DATACHECKINCC != null) {
				            			eventElement.addClass("suspensaNoCC");
				            		} else {
		    			            	eventElement.addClass("suspensaForaCC");
				            		}				            		
			            		} else {
	    			            	eventElement.addClass("planejada");
	    			            }
	    			            eventElement.css("color", "black");
			            	} 
			          } else if (event.DATAOBITO != "" && event.DATAOBITO != null) {
			              	eventElement.addClass("suspensaNoCC");
			              	eventElement.css("color", "black");
			    	  } else if (event.DATACHECKOUTCC != "" && event.DATACHECKOUTCC != null && event.dataCirurgiaCheckin != "" && event.dataCirurgiaCheckin != null) {
			              	eventElement.addClass("saidaCC");
			              	eventElement.css("color", "black");
		              } else if (event.dataRPALiberacao != "" && event.dataRPALiberacao != null) {
			              	eventElement.addClass("rpaLiberacao");
			              	eventElement.css("color", "black");
		              } else if (event.dataRPACheckin != "" && event.dataRPACheckin != null) {
			              	eventElement.addClass("rpaCheckin");
			              	eventElement.css("color", "black");
		              } else if (event.dataCirurgiaSaidaSala != "" && event.dataCirurgiaSaidaSala != null && event.dataCirurgiaFim != "" && event.dataCirurgiaFim != null) {
			              	eventElement.addClass("saidaSala");
			              	eventElement.css("color", "white");
		              } else if (event.dataCirurgiaFim != "" && event.dataCirurgiaFim != null) {
			              	eventElement.addClass("fimCirurgia");
			              	eventElement.css("color", "black");
		              } else if (event.dataCirurgiaInicio != "" && event.dataCirurgiaInicio != null) {
			              	eventElement.addClass("inicioCirurgia");
			              	eventElement.css("color", "white");
		              } else if (event.dataCirurgiaCheckin != "" && event.dataCirurgiaCheckin != null) {
			              	eventElement.addClass("entradaSala");
			              	eventElement.css("color", "black");
		              } else if (event.STATUSMAPACIRURGICOITEM == "C") { 
			              	if (event.dataCheckinCC != "" && event.dataCheckinCC != null) {
		            			eventElement.addClass("suspensaNoCC");
		            		} else {
		            			eventElement.addClass("suspensaForaCC");
		            		}
			    		    eventElement.css("color", "black");
		              } else {
		              		
			              	if (event.dataCheckinCC != "" && event.dataCheckinCC != null) {
			              		
			              		data = event.dataCheckinCC;
			              		novaDataItem = new Date(event.dataCheckinCC.getFullYear(), event.dataCheckinCC.getMonth(), event.dataCheckinCC.getDate(), 0, 0, 0);
			              		console.log(data);
			              		console.log(novaDataItem);
			              		console.log(today);
								if (today.getTime() != novaDataItem.getTime()) {
		            				eventElement.addClass("planejada");
				              		eventElement.css("color", "black");
		            			} else {
				              		eventElement.addClass("checkInCC");
		            				eventElement.css("color", "white");
		            			}
		            		} else {
				              	eventElement.addClass("planejada");
				              	eventElement.css("color", "black");
			              	}
		              } 
		              if (event.pedidoCirurgiaEncaixe == 'S') {
		                	eventElement.css("color", "red");
		              }
	            }            
	        }        
        
    });
    
    app.painelCirurgiasViewService = {
        viewModel: new painelCirurgiasViewModel()
    };
    
    
    
})(window);    