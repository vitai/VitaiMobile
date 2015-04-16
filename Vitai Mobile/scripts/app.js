
(function () {
 
    
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;
    
    var val = 1;
    var dado= $.parseJSON('{"painelSituacaoBean":[{"id":"3180","dataAtualizacao":"11/03/2015 15:28:20","descricao":"REGISTRADOS EM 24H","grupo":"PACIENTES","media":"156","ordem":"1","valor":"'+ val +'"},{"id":"3181","dataAtualizacao":"11/03/2015 15:28:20","descricao":"SEM ALTA EM 24H","grupo":"PACIENTES","ordem":"1","valor":"0"},{"id":"3182","dataAtualizacao":"11/03/2015 15:28:20","descricao":"SALA AMARELA","grupo":"LEITOS","ordem":"5","valor":"1/21 leitos ocupados"},{"id":"3183","dataAtualizacao":"11/03/2015 15:28:20","descricao":"SALA VERMELHA","grupo":"LEITOS","ordem":"5","valor":"3/14 leitos ocupados"}]}');
    var pullTime, dataSource, image, counter = 0;
    var ds =  new kendo.data.DataSource({
                        //offlineStorage:"offlineDataSource",
                        data: dado,
                           /*transport: {
                                read:  {
                                  url: "http://177.153.18.165:8081/cerbt/ws/painelSituacao",
                                  dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                }
                           },*/
                            schema: {
                            parse: function (response) {
                                //dados = response.painelSituacaoBean;    
                                return response.painelSituacaoBean;
                            }
                          },
                          change:function(e) {
                            alert(1);
                          }
                    });
       // create an object to store the models for each view
    window.APP = {
      models: {
         home: {
             onAtualizarClick: function()
             {
                 console.log(val);
                 //updateDataSource(this.dataAtualizacao);
                 val = val+1;
                 this.dsPaciente.fetch(function(){});
                 console.log(this.dataAtualizacao);
             },
             dataAtualizacao: window.localStorage.getItem("dataAtualizacao"),
              title: 'Situação',
              /*dsPaciente: new kendo.data.DataSource({
                    data: window.localStorage.getItem("offlineDataSource"),
                    schema: {
                    parse: function (response) {
                        return $.parseJSON(response);
                    }
                  },
                  filter:{field:"grupo", operator:"equals", value:"PACIENTES"}
            }),*/
            dsPaciente: ds,             
              dsLeito: new kendo.data.DataSource({
                    data: window.localStorage.getItem("offlineDataSource"),
                    schema: {
                    parse: function (response) {
                        return $.parseJSON(response);
                    }
                  },
                  filter:{field:"grupo", operator:"equals", value:"LEITOS"}                  
                    
            }),
              dsPrescricao: new kendo.data.DataSource({
                    data: window.localStorage.getItem("offlineDataSource"),
                    schema: {
                    parse: function (response) {
                        return $.parseJSON(response);
                    }
                  },
                  filter:{field:"grupo", operator:"equals", value:"PRESCRICAO"}
            }),
              initPullToRefreshScroller: function(e) {
               alert(1);
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "http://api.flickr.com/services/feeds/photos_public.gne",
                            dataType: "jsonp",
                            jsonpCallback: "jsonFlickrFeed",
                            data: {
                                tags: "cat,face",
                                format: "json"
                            }
                        }
                    },
                    schema: {
                        data: "items"
                    }
                });

                dataSource.fetch(updateClock);

                var scroller = e.view.scroller;

                scroller.setOptions({
                    pullToRefresh: true,
                    pull: function() {
                        updateClock();
                        setTimeout(function() { scroller.pullHandled(); }, 400);
                    }
                })
            }
             
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
        
        
        if (window.localStorage.getItem("offlineDataSource") == null)
            {
                updateDataSource();
            }
        else
            {
                
                if (window.localStorage.getItem("dataAtualizacao") != null)
                    {
                        $("#divAtualizacao").html(window.localStorage.getItem("dataAtualizacao"));
                    }
                    
                else
                    $("#divAtualizacao").html("Não foi possível obter a data de atualizacao");
            }
        
        document.addEventListener("online", function() {
        
        //$("[data-role='app-status']").html('online');
        
        });
    document.addEventListener("offline", function() {
        
        //$("[data-role='app-status']").html('offline');
    });        
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
     // navigator.splashscreen.hide();

      app = new kendo.mobile.Application(document.body, {
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        skin: 'flat',

        // the application needs to know which view to load first
        initial: 'views/home2.html'

      });

    }, false);
    
    function updateDataSource(data)
    {
        val = val+1;
        var dataSource = new kendo.data.DataSource({
                        offlineStorage:"offlineDataSource",
                        data: dado,
                           /*transport: {
                                read:  {
                                  url: "http://177.153.18.165:8081/cerbt/ws/painelSituacao",
                                  dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                }
                           },*/
                            schema: {
                            parse: function (response) {
                                //dados = response.painelSituacaoBean;    
                                return response.painelSituacaoBean;
                            }
                          },
                          change:function(e) {
                            
                          }
                    });
                
                
                dataSource.fetch(function() {
                // go in offline mode
                    
                   //dataSource.online(false);
                    
                });
    }
    
     
    
     
    
      function updateClock() {
            alert(1);
        if (!dataSource.at(counter+1))
            counter = 0;

        $("#pull-cat").css("background-image", "url('" + dataSource.at(counter++).media.m.replace(/_m\.jpg/i, ".jpg") + "')");
        pullTime = kendo.toString(new Date(), "hh:mm:ss tt" );
        $("#pull-to-refresh-clock").html("Last update at " + pullTime + ". <br /> Pull to refresh.");
    }


}());