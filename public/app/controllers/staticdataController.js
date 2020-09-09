app.controller('staticdataController', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory) {
    $rootScope.mainheader =false;
jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "block");
    jQuery('#mainheader1').css("display", "block");
    jQuery('.collapse').collapse("hide");

      if($sessionStorage.isAuthenticate =="Y")
      {
         $rootScope.login =true;
        }else{
           $rootScope.login =false;
        }

    jQuery('#noofpassenger').val($sessionStorage.noofseats);

     var frlocid =$sessionStorage.locid;
     var tolocid =$sessionStorage.toid;
     var fromdate =$sessionStorage.fromdate;
     var daydesc = $sessionStorage.daydesc ;
     var todate =$sessionStorage.todate;
     var todesc =$sessionStorage.todesc;

     if($sessionStorage.travelfromlocdesc !=undefined){
      $rootScope.travelfromlocdesc=$sessionStorage.travelfromlocdesc;
    }else{
      $rootScope.travelfromlocdesc ="From Location"
    }
     if($sessionStorage.traveltolocdesc !=undefined){
      $rootScope.traveltolocdesc=$sessionStorage.traveltolocdesc;
    }else{
      $rootScope.traveltolocdesc="To Location" 
    }
    if($sessionStorage.noofseats==undefined)
    { 
      $sessionStorage.noofseats =1;
         $rootScope.seatsdesc="1" 
    }else{
      $rootScope.seatsdesc=$sessionStorage.noofseats
    }
     
 
     if(fromdate==undefined)
     {
     var currendate = new Date();
     var  month = '' + (currendate.getMonth() + 1);
     var  day = ''+currendate.getDate();
     var  year = currendate.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

      fromdate =month+"/"+day+"/"+year;

      $sessionStorage.fromdate =fromdate;

     }
   
        if(fromdate!="N"){
       jQuery('#trdate').val(fromdate); 
     }
     if (todate != "N") {

        jQuery('#rtdate').val(todate);
      }
     // document.getElementById("trdate").value = fromdate;
      
    
    commonFactory.fromlocation(resdata).success(function(data) {

    $rootScope.allfromloc =data;
      $rootScope.frlocid =frlocid;

    });

      $rootScope.onfromlocchange =function(locid)
    {
   
     $sessionStorage.locid =jQuery('#frolocid').val();
     $sessionStorage.travelfromlocdesc =jQuery("#frolocid option:selected").text();
   
    var resdata ={
    tolocation: jQuery('#frolocid').val()
    }

    commonFactory.tolocation(resdata).success(function(data) {
    $rootScope.alltoloc =data;

    });

    };

    $rootScope.toLocchange =function()
    {
      $sessionStorage.toid =jQuery('#torlocid').val();
        $sessionStorage.traveltolocdesc =jQuery("#torlocid option:selected").text();
  
    }

    $rootScope.fromdatechange =function()
    {
    
       
       $sessionStorage.fromdate =jQuery('#trdate').val();
    }

    $rootScope.returndatechange =function()
    {

       $sessionStorage.todate =jQuery('#rtdate').val();
    }
    $rootScope.seatschanged =function()
    {
      $sessionStorage.noofseats =jQuery('#noofpassenger').val();
    }
    
 
 
	});