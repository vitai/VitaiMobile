(function (global) {
    var KanbanViewModel,
        app = global.app = global.app || {};
   
    var dadosFake = [{DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                     {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"},
                    {DESCRICAO: "ACICLOVIR", PRESCRITO: "10", DISPENSADO:"15", PERCENTUAL:"67"}];
    
    var url = "http://177.153.18.165:8081/cerbt/ws/relatorio?q=5&setorId=1&risco=AMARELO&pediatrico=N";
    

    /*function resizeGrid()
    {
                    var grid = $("#grid").data("kendoGrid");
            var height = $(".km-content").height() - $("#tableLogo").height();
            //height = (height * 80) / 100;
            
              grid.element.height(height);
                grid.element.closest(".km-pane-wrapper").height(height);

                grid.resize(true);            

    }*/



    KanbanViewModel = kendo.data.ObservableObject.extend({
        descricaoUnidade: "",
        logo:"",
        resizing:"",
       /* deviceOrientationListener:function(event) {
        	resizeGrid();
            this.set("descricaoUnidade", event.alpha);
		},*/
        onInit:function()
        {
            app.currentViewModel = this;  
            //resizeGrid();
            
			/*if (window.DeviceOrientationEvent) {
  				// Listen for the event and handle DeviceOrientationEvent object            
  				window.addEventListener('deviceorientation', this.deviceOrientationListener, false);
        	}*/
            
        },
         
        onViewShow: function(e)
        {
           
            var that = this;
            
            //this.dataSource.transport.options.read.url = app.unidadeUrl + "/ws/relatorio";
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            this.set("logo",app.usuarioSettings.LOGO);
            //that.dataSource.read();
            
        },
        dataSource: new kendo.data.DataSource({
            	data: dadosFake,
            
            schema: {
                total: function () { return 12; }
            },
                          /*transport: {
                                read:  {
                                  url: app.unidadeUrl + "/ws/relatorio",
                                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                  data: function() {
                                        var param = {

                                            "q":7,
                                            "setorId":1,
                                            "idSecao": app.observacaoViewService.viewModel.secao
                                        };
                                      return param;
                                    }
                                }
                           },           
                            schema: {
                                parse: function (response) {
                                    if (response)
                                    {
                                       return response;
                                    }
                                    else
                                        return [];
                                
                            }
                          },*/ 
                        serverPaging: true,
            			serverSorting: true,
                           pageSize:5,
                           
                          sort: { field: "PRESCRITO", dir: "desc" }
                    })
            
    });

    app.kanbanViewService = {
        viewModel: new KanbanViewModel()
    };
    
    
    
})(window);