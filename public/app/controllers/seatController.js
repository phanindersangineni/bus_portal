app.controller('seatController', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, $interval, UserAuthFactory, AuthenticationFactory, $window, userFactory, commonFactory) {
    $rootScope.mainheader = false;

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "block");
    jQuery('#mainheader1').css("display", "block");
    jQuery('.collapse').collapse("hide");

	var translateData = $sessionStorage.translateData;
    $scope.guestlogin ="N";
    $sessionStorage.guestLogin ="N";
    $scope.getcheckoutid ="N";
    $sessionStorage.selectedseatarray =[];
    $sessionStorage.selectedseatarrayreturn=[];
	
	if(document.getElementById("homeLabel")!=null)
   document.getElementById("homeLabel").innerHTML = ""+JSON.parse(translateData).homeLabel; 

	 if(document.getElementById("ssLabel")!=null)
   document.getElementById("ssLabel").innerHTML = ""+JSON.parse(translateData).ssLabel; 
       if(document.getElementById("frontLabel")!=null)
   document.getElementById("frontLabel").innerHTML = ""+JSON.parse(translateData).frontLabel; 
         if(document.getElementById("ssotLabel")!=null)
   document.getElementById("ssotLabel").innerHTML = ""+JSON.parse(translateData).ssotLabel; 
   if(document.getElementById("ssrtLabel")!=null)
   document.getElementById("ssrtLabel").innerHTML = ""+JSON.parse(translateData).ssrtLabel; 
    if(document.getElementById("contButtonLabel")!=null)
   document.getElementById("contButtonLabel").innerHTML = ""+JSON.parse(translateData).contButtonLabel;

    var frlocid = $sessionStorage.locid;
    var tolocid = $sessionStorage.toid;
    var fromdate = $sessionStorage.fromdate;
    var daydesc = $sessionStorage.daydesc;
    var todate = $sessionStorage.todate;
    var todesc = $sessionStorage.todesc;


    if ($sessionStorage.isAuthenticate == "Y") {
        $rootScope.login = true;
    } else {
        $rootScope.login = false;
    }
    $scope.recordlists = $sessionStorage.records;

    jQuery('#noofpassenger').val($sessionStorage.noofseats);

    if ($scope.recordlists.length == 2) {
        $scope.roundtripe = true;


    } else {
        $scope.roundtripe = false;

    }
     $scope.onwardmap =false;
     $scope.returnmap =false;
    for (var indx = 0; indx < $scope.recordlists.length; indx++) {

        if (indx == 0) {
            $scope.vehid1 = $scope.recordlists[indx].vehid;
            $scope.vehtypeid1 = $scope.recordlists[indx].vehtypeid;
            if ($scope.recordlists[indx].seatmap != "-1") {
                 $scope.onwardmap =true;
            getseatmap();
            
            
        }

        } else {
            $scope.vehid2 = $scope.recordlists[indx].vehid;
            $scope.vehtypeid2 = $scope.recordlists[indx].vehtypeid;
            if ($scope.recordlists[indx].seatmap != "-1") {
                 $scope.returnmap =true;
            getreturnseatmap();

        }
        }


    }


	
	
   

    if ($sessionStorage.travelfromlocdesc != undefined) {
        $rootScope.travelfromlocdesc = $sessionStorage.travelfromlocdesc;
    } else {
        $rootScope.travelfromlocdesc = "From Location"
    }
    if ($sessionStorage.traveltolocdesc != undefined) {
        $rootScope.traveltolocdesc = $sessionStorage.traveltolocdesc;
    } else {
        $rootScope.traveltolocdesc = "To Location"
    }
    if ($sessionStorage.noofseats == undefined) {
        $sessionStorage.noofseats = 1;
        $rootScope.seatsdesc = "1"
    } else {
        $rootScope.seatsdesc = $sessionStorage.noofseats
    }


    if (fromdate == undefined) {
        var currendate = new Date();
        var month = '' + (currendate.getMonth() + 1);
        var day = '' + currendate.getDate();
        var year = currendate.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        fromdate = month + "/" + day + "/" + year;

        $sessionStorage.fromdate = fromdate;

    }

     if(fromdate!="N"){
       jQuery('#trdate').val(fromdate); 
     }
     if (todate != "N") {

        jQuery('#rtdate').val(todate);
      }
    // document.getElementById("trdate").value = fromdate;
    var resdata = {

    }

    commonFactory.fromlocation(resdata).success(function(data) {

        $rootScope.allfromloc = data;
        $rootScope.frlocid = frlocid;

    }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    $rootScope.onfromlocchange = function(locid) {

        $sessionStorage.locid = jQuery('#frolocid').val();
        $sessionStorage.travelfromlocdesc = jQuery("#frolocid option:selected").text();

        var resdata = {
            tolocation: jQuery('#frolocid').val()
        }

        commonFactory.tolocation(resdata).success(function(data) {
            $rootScope.alltoloc = data;

        }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    };

    $rootScope.toLocchange = function() {
        $sessionStorage.toid = jQuery('#torlocid').val();
        $sessionStorage.traveltolocdesc = jQuery("#torlocid option:selected").text();

    }

    $rootScope.fromdatechange = function() {


        $sessionStorage.fromdate = jQuery('#trdate').val();
    }

    $rootScope.returndatechange = function() {

        $sessionStorage.todate = jQuery('#rtdate').val();
    }
    $rootScope.seatschanged = function() {
        $sessionStorage.noofseats = jQuery('#noofpassenger').val();
    }




    jQuery('#mydiv').show();

    /* var resdata ={
      customerid:$sessionStorage.CUSTOMERID
     }

    userFactory.getvehiclecount(resdata).success(function(data) {
     
        $scope.vehcount =data.count;

     
     
    })*/


    var maparray = [];
    $scope.selectedseatarray = [];
    $scope.seatsselected = "0";
    $scope.seatpositions = "0";
    $scope.topselectedseatarray = [];
    $scope.topseatsselected = "0";
    $scope.topseatpositions ="0";

    $scope.selectedseatarrayreturn = [];
    $scope.seatsselectedreturn = "0";
    $scope.seatpositionsreturn = "0";
    $scope.topseatselection=false;
    $scope.seatseperator =0;

    $scope.topselectedseatarrayreturn = [];
    $scope.topseatsselectedreturn = "0";
    $scope.topseatpositionsreturn = "0";
    $scope.seatseperatorreturn =0;
    $scope.topseatselectionreturn=false;
    $scope.rowcolumn =0;
    $scope.toprowcolumn =0;
    $scope.rowcolumnreturn=0;
     $scope.toprowcolumnreturn=0;


    function getseatmap() {
        var prams = {
            vehid: $scope.vehtypeid1

        }
        $scope.topseatselectiondata ="";

        var params ={
          vehtypeid :$scope.vehtypeid1
        }

        commonFactory.getallvehicletypeById(params).success(function(data) {
                   $scope.seatseperator =data[0].TOP_ROW_START;
                   $scope.rowcolumn =data[0].SEAT_COLUMNS;
                   $scope.toprowcolumn =data[0].TOP_SEAT_COLUMNS;
        }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

         
         userFactory.getvehicletopseatlayout(prams).success(function(data) {
          if(data.length >0)
          {
            $scope.topseatselection =true;
            $scope.arraydata =data;
          }

        userFactory.getvehicleseatlayout(prams).success(function(data) {

            maparray = [];
            var counter = 0;
            var markers = [];
            for (var indx = 0; indx < data.length; indx++) {

                var leftseat = data[indx].LEFT_SEAT;
                var rightseat = data[indx].RIGHT_SEAT;
                var sepeator = data[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var mapper;
                if (sepeator == "S") {
                    if(leftval==undefined || leftval==0)
                    {
                        mapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        mapper = leftval + "_";
                    }
                    else{
                         mapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        mapper = "__" + rightval;

                    }else if(rightval==undefined ||rightval==0)
                    {
                        mapper = leftval + "__";
                    }else{
                         mapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {
                    if(leftval==undefined || leftval==0)
                    {
                         mapper =  "___" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                      mapper = leftval + "___";
                    }else{
                         mapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {
                    mapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.rowcolumn; i++) {

                        if (i == 0) {
                            mapper = "_";
                        } else {
                            mapper = mapper + "_";
                        }
                    }

                }


                markers[indx] = mapper;

                maparray.push(markers[indx]);
                //maparray.push(mapper2);


            }

           


            var firstSeatLabel = 1;
            var cart = jQuery('#selected-seats'),
                counter = jQuery('#counter'),
                total = jQuery('#total'),
                sc = jQuery('#seat-map').seatCharts({
                    map: maparray,
                   naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                   
                    click: function() {

                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items

                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item-' + this.settings.id)
                                .data('seatId', this.settings.id)
                                .appendTo(jQuery('#selected-seats'));

                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.selectedseatarray.push(seatinfo);
                            $scope.seatsselected = "0"



                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter").val(sc.find('selected').length - 1);
                            var newarraylist = [];
                            for (var k = 0; k < $scope.selectedseatarray.length; k++) {

                                if (this.settings.id != $scope.selectedseatarray[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.selectedseatarray[k].seats,
                                        seatid: $scope.selectedseatarray[k].seatid
                                    }
                                    newarraylist.push(seatinfo);
                                }

                            }
                            $scope.selectedseatarray = newarraylist;
                            //remove the item from our cart
                            jQuery('#cart-item-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });



            //this will handle "[cancel]" link clicks
            jQuery('#selected-seats').on('click', '.cancel-cart-item', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc.get(jQuery(this).parents('li:first').data('seatId')).click();
            });

             if($scope.topseatselection ==true)
            {
              
              var topmaparray = [];
            var counter = 0;
            var topmarkers = [];
            for (var indx = 0; indx < $scope.arraydata.length; indx++) {

                var leftseat = $scope.arraydata[indx].LEFT_SEAT;
                var rightseat = $scope.arraydata[indx].RIGHT_SEAT;
                var sepeator = $scope.arraydata[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var topmapper;
                if (sepeator == "S") {
                    if(leftval==undefined || leftval==0)
                    {
                        topmapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        topmapper = leftval + "_";
                    }
                    else{
                         topmapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        topmapper = "__" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        topmapper = leftval + "__";
                    }else{
                         topmapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {

                    if(leftval==undefined || leftval==0)
                    {
                         topmapper =  "___" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                      topmapper = leftval + "___";
                    }else{
                         topmapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {

                    topmapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.toprowcolumn; i++) {

                        if (i == 0) {
                            topmapper = "_";
                        } else {
                            topmapper = topmapper + "_";
                        }
                    }

                }


                topmarkers[indx] = topmapper;

                topmaparray.push(topmarkers[indx]);
                //maparray.push(mapper2);


            }

               var firstSeatLabel = $scope.seatseperator+1;
            var cart = jQuery('#selected-seats2'),
                counter = jQuery('#counter2'),
                total = jQuery('#total2'),
                sc1 = jQuery('#seat-map2').seatCharts({
                    map: topmaparray,
                    naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                 
                    click: function() {
                        
                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items
                             
                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item2-' + this.settings.id)
                                .data('seatId2', this.settings.id)
                                .appendTo(jQuery('#selected-seats2'));

                              
                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.topselectedseatarray.push(seatinfo);
                            $scope.topseatsselected = "0"



                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter2").val(sc.find('selected').length - 1);
                            var newarraylist = [];
                            for (var k = 0; k < $scope.topselectedseatarray.length; k++) {

                                if (this.settings.id != $scope.topselectedseatarray[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.topselectedseatarray[k].seats,
                                        seatid: $scope.topselectedseatarray[k].seatid
                                    }
                                    newarraylist.push(seatinfo);
                                }

                            }
                            $scope.topselectedseatarray = newarraylist;
                            //remove the item from our cart
                            jQuery('#cart-item2-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });



            }


            //this will handle "[cancel]" link clicks
            jQuery('#selected-seats2').on('click', '.cancel-cart-item2', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc.get(jQuery(this).parents('li:first').data('seatId2')).click();
            });


           
            //let's pretend some seats have already been booked
             // sc.get(['1_2']).status('unavailable');
              //sc1.get(['1_2']).status('unavailable');
                 var travelfromdate ="N";
                 if($sessionStorage.fromdate !="N"){
                var traveldate = new Date($sessionStorage.fromdate);
                var month = (traveldate.getMonth() + 1);
                var day = traveldate.getDate();
                var year = traveldate.getFullYear();

                var travelfromdate = year + "-" + month + "-" + day;
               }

               if ($sessionStorage.todate != "N") {
                var travelto = new Date($sessionStorage.todate);
                var month1 = (travelto.getMonth() + 1);
                var day1 = travelto.getDate();
                var year1 = travelto.getFullYear();
                traveltodate = year1 + "-" + month1 + "-" + day1;

            }
             if($sessionStorage.fromdate =="N" && $sessionStorage.todate != "N")
                {
                    travelfromdate =traveltodate;
                    traveltodate ="N";

                }
               

            var params = {
                vehid: $scope.vehid1,
                fromloc: $sessionStorage.locid,
                toloc: $sessionStorage.toid,
                traveldate :travelfromdate
            }
            userFactory.getvehicleseatmapbookings(params).success(function(data) {
                 
                 var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                 var topdataarray =data.toparraypostion.toString();
                 var topdataarrypos =[];
                 var topmark =[];
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                   var toppermissions =topdataarray.split(",");
                     for( var sk =0;sk< toppermissions.length;sk++)
                     {
                        
                        topmark[sk] =toppermissions[sk];
                       topdataarrypos.push(topmark[sk]);
                   
                     }   
                  


                sc.get(dataarrypos).status('unavailable');
                sc1.get(topdataarrypos).status('unavailable');

            }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

           /* $interval(function() {

                userFactory.getvehicleseatmapbookings(params).success(function(data) {

                     var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                  


                sc.get(dataarrypos).status('unavailable');

                });

            }, 10000);*/

            jQuery('#mydiv').hide();

        }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });
        }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    

    }


   function getreturnseatmap() {
        var prams = {
            vehid: $scope.vehtypeid2

        }

         var params ={
          vehtypeid :$scope.vehtypeid2
        }

        commonFactory.getallvehicletypeById(params).success(function(data) {
                   $scope.seatseperatorreturn =data[0].TOP_ROW_START;
                    $scope.rowcolumnreturn =data[0].SEAT_COLUMNS;
                   $scope.toprowcolumnreturn =data[0].TOP_SEAT_COLUMNS;
        }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });
        
        userFactory.getvehicletopseatlayout(prams).success(function(data) {
          if(data.length >0)
          {
            $scope.topseatselectionreturn =true;
            $scope.arraydatareturn =data;
          }
        userFactory.getvehicleseatlayout(prams).success(function(data) {


            maparray = [];
            var counter = 0;
            var markers = [];
            for (var indx = 0; indx < data.length; indx++) {

                var leftseat = data[indx].LEFT_SEAT;
                var rightseat = data[indx].RIGHT_SEAT;
                var sepeator = data[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var mapper;
                if (sepeator == "S") {
                    if(leftval==undefined ||leftval==0)
                    {
                        mapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        mapper = leftval + "_";
                    }
                    else{
                         mapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        mapper = "__" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        mapper = leftval + "__";
                    }else{
                         mapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {
                    if(leftval==undefined || leftval==0)
                    {
                         mapper =  "___" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                      mapper = leftval + "___";
                    }else{
                         mapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {
                    mapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.rowcolumnreturn; i++) {

                        if (i == 0) {
                            mapper = "_";
                        } else {
                            mapper = mapper + "_";
                        }
                    }

                }


                markers[indx] = mapper;

                maparray.push(markers[indx]);
                //maparray.push(mapper2);


            }
            console.log(JSON.stringify(maparray));
          
            var firstSeatLabel = 1;
            var cart = jQuery('#selected-seats1'),
                counter = jQuery('#counter'),
                total = jQuery('#total'),
                sc = jQuery('#seat-map1').seatCharts({
                    map: maparray,
                    seats: {
                        f: {
                            price: 100,
                            classes: 'first-class', //your custom CSS class
                            category: 'First Class'
                        },
                        e: {
                            price: 40,
                            classes: 'economy-class', //your custom CSS class
                            category: 'Economy Class'
                        }

                    },
                    naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                    legend: {
                        node: jQuery('#legend'),
                        items: [
                            ['f', 'available', 'First Class'],
                            ['e', 'available', 'Economy Class'],
                            ['f', 'unavailable', 'Already Booked']
                        ]
                    },
                    click: function() {

                         
                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items
                                
                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item1-' + this.settings.id)
                                .data('seatId', this.settings.id)
                                .appendTo(jQuery('#selected-seats1'));

                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.selectedseatarrayreturn.push(seatinfo);
                            
                          

                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter").val(sc.find('selected').length - 1);
                            var newarraylistreturn = [];
                            for (var k = 0; k < $scope.selectedseatarrayreturn.length; k++) {

                                if (this.settings.id != $scope.selectedseatarrayreturn[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.selectedseatarrayreturn[k].seats,
                                        seatid: $scope.selectedseatarrayreturn[k].seatid
                                    }
                                    newarraylistreturn.push(seatinfo);
                                }

                            }
                            $scope.selectedseatarrayreturn = newarraylistreturn;
                            //remove the item from our cart
                            jQuery('#cart-item1-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });

            //this will handle "[cancel]" link clicks
            jQuery('#selected-seats1').on('click', '.cancel-cart-item', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc.get(jQuery(this).parents('li:first').data('seatId')).click();
            });


            if($scope.topseatselectionreturn ==true)
            {


              var topmaparray = [];
            var counter = 0;
            var topmarkers = [];
            for (var indx = 0; indx < $scope.arraydatareturn.length; indx++) {

                var leftseat = $scope.arraydatareturn[indx].LEFT_SEAT;
                var rightseat = $scope.arraydatareturn[indx].RIGHT_SEAT;
                var sepeator = $scope.arraydatareturn[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var topmapper;
                if (sepeator == "S") {
                    if(leftval==undefined ||leftval==0)
                    {
                        topmapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        topmapper = leftval + "_";
                    }
                    else{
                         topmapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        topmapper = "__" + rightval;

                    }else if(rightval==undefined ||rightval==0)
                    {
                        topmapper = leftval + "__";
                    }else{
                         topmapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {
                    if(leftval==undefined || leftval==0)
                    {
                         topmapper =  "___" + rightval;

                    }else if(rightval==undefined ||rightval==0)
                    {
                      topmapper = leftval + "___";
                    }else{
                         topmapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {

                    topmapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.toprowcolumnreturn; i++) {

                        if (i == 0) {
                            topmapper = "_";
                        } else {
                            topmapper = topmapper + "_";
                        }
                    }

                }


                topmarkers[indx] = topmapper;

                topmaparray.push(topmarkers[indx]);
                //maparray.push(mapper2);


            }
             
               var firstSeatLabel = $scope.seatseperatorreturn+1;
            var cart = jQuery('#selected-seats3'),
                counter = jQuery('#counter3'),
                total = jQuery('#total3'),
                sc3 = jQuery('#seat-map3').seatCharts({
                    map: topmaparray,
                    naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                 
                    click: function() {
                        
                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items
                             
                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item3-' + this.settings.id)
                                .data('seatId3', this.settings.id)
                                .appendTo(jQuery('#selected-seats3'));

                               
                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.topselectedseatarrayreturn.push(seatinfo);
                            $scope.topseatsselectedreturn = "0"



                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter3").val(sc.find('selected').length - 1);
                            var newarraylist = [];
                            for (var k = 0; k < $scope.topselectedseatarrayreturn.length; k++) {

                                if (this.settings.id != $scope.topselectedseatarrayreturn[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.topselectedseatarrayreturn[k].seats,
                                        seatid: $scope.topselectedseatarrayreturn[k].seatid
                                    }
                                    newarraylist.push(seatinfo);
                                }

                            }
                            $scope.topselectedseatarrayreturn = newarraylist;
                            //remove the item from our cart
                            jQuery('#cart-item3-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });

                   jQuery('#selected-seats3').on('click', '.cancel-cart-item3', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc3.get(jQuery(this).parents('li:first').data('seatId3')).click();
            });


            }

            //let's pretend some seats have already been booked
             var traveltodate = "N";

                if ($sessionStorage.todate != "N") {
                    var travelto = new Date($sessionStorage.todate);
                    var month1 = (travelto.getMonth() + 1);
                    var day1 = travelto.getDate();
                    var year1 = travelto.getFullYear();
                    traveltodate = year1 + "-" + month1 + "-" + day1;

                }
           
            var params = {
                vehid: $scope.vehid2,
                fromloc: $sessionStorage.toid,
                toloc: $sessionStorage.locid,
                traveldate:traveltodate
            }
            userFactory.getvehicleseatmapbookingreturn(params).success(function(data) {
                  
                var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                 var topdataarray =data.toparraypostion.toString();
                 var topdataarrypos =[];
                 var topmark =[];
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                   var toppermissions =topdataarray.split(",");
                     for( var sk =0;sk< toppermissions.length;sk++)
                     {
                        
                        topmark[sk] =toppermissions[sk];
                       topdataarrypos.push(topmark[sk]);
                   
                     }   
                      
                  


                sc.get(dataarrypos).status('unavailable');
                sc3.get(topdataarrypos).status('unavailable');

            }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

           /* $interval(function() {

                userFactory.getvehicleseatmapbookingreturn(params).success(function(data) {

                     var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                  


                sc.get(dataarrypos).status('unavailable');

                });

            }, 10000);*/

            jQuery('#mydiv').hide();

        }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });     

    }

   $scope.continueguestcheckout =function()
    {

      
      var resdata ={
       mobilenumber:$scope.guestnumber

      }

        userFactory.insertguestcheckout(resdata).success(function(data) {
       if(data.success =="-1")
       {
        swal($rootScope.guestwarning1, " ", "warning");

       }
      else if(data.success =="-2")
       {

         swal($rootScope.guestwarning2, " ", "warning");
       }
       else{
        $scope.getcheckoutid =data.gcid;
        swal($rootScope.guestsuccess1, " ", "warning");
        $scope.guestlogin =$scope.guestnumber;
       $sessionStorage.guestcheckoutid =$scope.getcheckoutid ;
       jQuery('#soap-popupbox').css('display', 'none');


       }

        
    }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    }
    
    $scope.finalbookingscreen = function() {

var translateData = $sessionStorage.translateData;
        if ($scope.selectedseatarray.length == 0 && $scope.topselectedseatarray.length == 0 && $scope.onwardmap ==true) {
            swal(JSON.parse(translateData).bookingscreenAlert, " ", "warning");
           //  swal("Please select the seats to continue booking", " ", "warning");

        }
      else if ($scope.selectedseatarrayreturn.length == 0 && $scope.topselectedseatarrayreturn.length == 0 && $scope.returnmap ==true) {
            swal(JSON.parse(translateData).bookingscreenreturnAlert, " ", "warning");
              //  swal("Please select the return trip seats to continue booking", " ", "warning");
        }
         else {
            
            if ($sessionStorage.CUSTOMERID == undefined && $scope.getcheckoutid=="N") {

               /* swal(JSON.parse(translateData).bookingConAlert, " ", "warning");
             //   swal("Please login to book tickets", " ", "warning");
                return false;*/
            
                        swal({
                        title:"",
                        text: JSON.parse(translateData).bookingConAlert,
                        type: "input",
                        showCancelButton: true,
                        cancelButtonText: $rootScope.guestButton1,
                        closeOnConfirm: false,
                        confirmButtonText:$rootScope.guestButton2,
                        inputPlaceholder: $rootScope.gustLabel
                        }, function (inputValue) {
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                        swal.showInputError($rootScope.gustAlertLabel);
                        return false
                        }else{
                            var resdata ={
                            emailid:inputValue

                            }

    userFactory.insertguestcheckout(resdata).success(function(data) {
       if(data.success =="-1")
       {
        swal($rootScope.guestwarning1, " ", "warning");

       }
      else if(data.success =="-2")
       {

         swal($rootScope.guestwarning2, " ", "warning");
       }
       else{
        $scope.getcheckoutid =data.gcid;
        $scope.guestlogin =$scope.inputValue;
        $sessionStorage.guestcheckoutid =$scope.getcheckoutid ;
       continuebooking();

       }

        
    }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });    


                        }
                        
                        });

            } else {
                 

                 continuebooking();
 
            }
        }
    }


    function continuebooking()
    {
     $sessionStorage.selectedseatarray =[];
     $sessionStorage.selectedseatarrayreturn=[];
    

        $scope.seatsselected = "0";
                  $scope.seatsselectedreturn = "0";
                  $scope.topseatsselected="0";
                  $scope.topseatsselectedreturn="0"
                for (var k = 0; k < $scope.selectedseatarray.length; k++) {

                    if ($scope.seatsselected == "0") {
                        $scope.seatsselected = $scope.selectedseatarray[k].seats;
                        $scope.seatpositions = $scope.selectedseatarray[k].seatid;

                    } else {
                        $scope.seatsselected = $scope.seatsselected + "," + $scope.selectedseatarray[k].seats;
                        $scope.seatpositions = $scope.seatpositions + "," + $scope.selectedseatarray[k].seatid;

                    }




                }

                for (var k = 0; k < $scope.topselectedseatarray.length; k++) {

                    if ($scope.topseatsselected == "0") {
                        $scope.topseatsselected = $scope.topselectedseatarray[k].seats;
                        $scope.topseatpositions = $scope.topselectedseatarray[k].seatid;

                    } else {
                        $scope.topseatsselected = $scope.topseatsselected + "," + $scope.topselectedseatarray[k].seats;
                        $scope.topseatpositions = $scope.topseatpositions + "," + $scope.topselectedseatarray[k].seatid;

                    }




                }

                 for (var k = 0; k < $scope.selectedseatarrayreturn.length; k++) {

                    if ($scope.seatsselectedreturn == "0") {
                        $scope.seatsselectedreturn = $scope.selectedseatarrayreturn[k].seats;
                        $scope.seatpositionsreturn = $scope.selectedseatarrayreturn[k].seatid;

                    } else {
                        $scope.seatsselectedreturn = $scope.seatsselectedreturn + "," + $scope.selectedseatarrayreturn[k].seats;
                        $scope.seatpositionsreturn = $scope.seatpositionsreturn + "," + $scope.selectedseatarrayreturn[k].seatid;

                    }




                }

                  for (var k = 0; k < $scope.topselectedseatarrayreturn.length; k++) {

                    if ($scope.topseatsselectedreturn == "0") {
                        $scope.topseatsselectedreturn = $scope.topselectedseatarrayreturn[k].seats;
                        $scope.topseatpositionsreturn = $scope.topselectedseatarrayreturn[k].seatid;

                    } else {
                        $scope.topseatsselectedreturn = $scope.topseatsselectedreturn + "," + $scope.topselectedseatarrayreturn[k].seats;
                        $scope.topseatpositionsreturn = $scope.topseatpositionsreturn + "," + $scope.topselectedseatarrayreturn[k].seatid;

                    }




                }
                var travelfromdate ="N";
                if($sessionStorage.fromdate !="N") {
                var traveldate = new Date($sessionStorage.fromdate);
                var month = (traveldate.getMonth() + 1);
                var day = traveldate.getDate();
                var year = traveldate.getFullYear();

                 travelfromdate = year + "-" + month + "-" + day;
                }
                var traveltodate = "N";

                if ($sessionStorage.todate != "N") {
                    var travelto = new Date($sessionStorage.todate);
                    var month1 = (travelto.getMonth() + 1);
                    var day1 = travelto.getDate();
                    var year1 = travelto.getFullYear();
                    traveltodate = year1 + "-" + month1 + "-" + day1;

                }

                if($sessionStorage.fromdate =="N" && $sessionStorage.todate != "N")
                {
                    travelfromdate =traveltodate;
                    traveltodate ="N";

                }

                var vehid1 = $scope.vehid1;
                var vehid2 = $scope.vehid2;
                var fromloc = $sessionStorage.locid;
                var toloc = $sessionStorage.toid;
                var seats = parseInt($scope.selectedseatarray.length)+parseInt($scope.topselectedseatarray.length);
                var seats1 = parseInt($scope.selectedseatarrayreturn.length)+parseInt($scope.topselectedseatarrayreturn.length);
                // $scope.totalpassengers1;
                $sessionStorage.selectedseatarray = $scope.selectedseatarray;
                $sessionStorage.selectedseatarrayreturn = $scope.selectedseatarrayreturn;
                $sessionStorage.forwardseats = $scope.seatsselected;
                $sessionStorage.forwardpositions = $scope.seatpositions;
                $sessionStorage.backwardseats = $scope.seatsselectedreturn;
                $sessionStorage.backwardpositions = $scope.seatpositionsreturn;
                $sessionStorage.topselectedseatarray = $scope.topselectedseatarray;
                $sessionStorage.topforwardseats = $scope.topseatsselected;
                $sessionStorage.topforwardpositions = $scope.topseatpositions;
                $sessionStorage.topselectedseatarrayreturn = $scope.topselectedseatarrayreturn;
                $sessionStorage.topbackwardseats = $scope.topseatsselectedreturn;
                $sessionStorage.topbackwardpositions = $scope.topseatpositionsreturn;
              

                var custid =0;
                if($sessionStorage.CUSTOMERID !=undefined)
                {
                    custid =$sessionStorage.CUSTOMERID;

                }else{
                   custid = $scope.getcheckoutid;
                }

                

                var reqparams = {

                    vehid: vehid1,
                    fromloc: fromloc,
                    toloc: toloc,
                    seats: seats,
                    traveldate: travelfromdate,
                    traveltodate: traveltodate,
                    vehid1: vehid2,
                    seats1: seats1,
                    customerid: custid,
                    seatmap: "Y",
                    forwardseats: $scope.seatsselected,
                    forwardpositions: $scope.seatpositions,
                    backwardseats: $scope.seatsselectedreturn,
                    backwardpositions: $scope.seatpositionsreturn,
                    topforwardseats: $scope.topseatsselected,
                    topforwardpositions: $scope.topseatpositions,
                    topbackwardseats: $scope.topseatsselectedreturn,
                    topbackwardpositions: $scope.topseatpositionsreturn,





                }
var translateData = $sessionStorage.translateData;
                userFactory.blockseats(reqparams).success(function(data) {

                    if (data.success == 4) {
                        swal(JSON.parse(translateData).blockseatsAlert, " ", "success");
                     //   swal("Seats blocked successfully", " ", "success");

                        $scope.confirmbooking = true;
                        var mytimeout = $timeout($scope.onTimeout, 1000);
                        $state.go("booking");

                    } else if (data.success == -1) {
                        swal(JSON.parse(translateData).blockseatsfailAlert, " ", "warning");
                     //   swal("Failed to block the seats", " ", "warning");


                    } else if (data.success == -2 || data.success==-5) {
                       swal(JSON.parse(translateData).blockseatavalAlert, " ", "warning");
                      //    swal("Seats not available", " ", "warning");

                    } else if (data.success == -3) {
                        swal(JSON.parse(translateData).blockseatmoreavalAlert, " ", "warning");
                      //   swal("Selected seats is more than the available seats", " ", "warning");

                    }

                }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    }



});