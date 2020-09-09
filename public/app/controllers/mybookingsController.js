app.controller('mybookingsController', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory,userFactory) {
   
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
		
		var translateData = $sessionStorage.translateData;
		 if($sessionStorage.languageselect!="sp")
		  {
			 $rootScope.sellang ="English";
			 translateData = $sessionStorage.translateData;
		  }else{
			 $rootScope.sellang ="Spanish";
			 translateData = $sessionStorage.translateData;
		  }
		  
	  if(document.getElementById("viewPrintTicketLabel")!=null)
	  document.getElementById("viewPrintTicketLabel").innerHTML = ""+JSON.parse(translateData).viLabel;

  
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
      var res={

      }
    
    commonFactory.fromlocation(res).success(function(data) {

    $rootScope.allfromloc =data;
      $rootScope.frlocid =frlocid;

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

      $rootScope.onfromlocchange =function(locid)
    {
   
     $sessionStorage.locid =jQuery('#frolocid').val();
     $sessionStorage.travelfromlocdesc =jQuery("#frolocid option:selected").text();
   
    var resdata ={
    tolocation: jQuery('#frolocid').val()
    }

    commonFactory.tolocation(resdata).success(function(data) {
    $rootScope.alltoloc =data;

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
       
    
     $sessionStorage.pageno=1;
  
    

      $scope.listdata =[];
      jQuery('#mydiv').show(); 

     var resdata1 ={

        customerid :$sessionStorage.CUSTOMERID,
        pageno:$sessionStorage.pageno,
        count:"Y"

     } 

    userFactory.getcustomerbookingsCounts(resdata1).success(function(data) {

          $scope.maxSize = 5;
            $scope.bigTotalItems = data.count;
            $scope.bigCurrentPage = 1;


             var resdata ={

        customerid :$sessionStorage.CUSTOMERID,
        pageno:$sessionStorage.pageno,
        count:"N"

     }
  
     userFactory.getcustomerbookings(resdata).success(function(data) {

    $rootScope.allbookings =data;
    var counter =1;


    if($rootScope.allbookings.length==0)
    {
        jQuery('#mydiv').hide();  
    }

    for(var indx =0;indx <  $rootScope.allbookings.length;indx++)
    {

        var travdate =$rootScope.allbookings[indx].TRAVELDATE;
        var departure =$rootScope.allbookings[indx].DEPARTURE_TIME;
        var departuredate =$rootScope.allbookings[indx].DEPARTURE_DATE;
        var arrival =$rootScope.allbookings[indx].ARRIVAL_TIME;
        var arrivaldate =$rootScope.allbookings[indx].ARRIVAL_DATE;
        var ticketid =$rootScope.allbookings[indx].TICKET_ID;
        var bookingdate =$rootScope.allbookings[indx].BOOKINGDATE;


         var traveldate = new Date(travdate);
     var  month = (traveldate.getMonth() + 1);
     var  day = traveldate.getDay();
     var ddday  =traveldate.getDate();
     var  year = traveldate.getFullYear();
            var monthdesc ="";
            var descday ="";
       if(month==1){monthdesc ="JAN";}
                if(month==2){monthdesc ="FEB";}
                if(month==3){monthdesc ="MAR";}
                if(month==4){monthdesc ="APR";}
                if(month==5){monthdesc ="MAY";}
                if(month==6){monthdesc ="JUN";}
                if(month==7){monthdesc ="JUL";}
                if(month==8){monthdesc ="AUG";}
                if(month==9){monthdesc ="SEP";}
                if(month==10){monthdesc ="OCT";}
                if(month==11){monthdesc ="NOV";}
                if(month==12){monthdesc ="DEC";}

               if(day==1){descday ="MON";}
                if(day==2){descday ="TUE";}
                if(day==3){descday ="WED";}
                if(day==4){descday ="THU";}
                if(day==5){descday ="FRI";}
                if(day==6){descday ="SAT";}
                if(day==7){descday ="SUN";}     

          var datagrid ={
            departure:departure,
            departuredate:departuredate,
            arrival:arrival,
            arrivaldate:arrivaldate,
            ticketid:ticketid,
            bookingdate:bookingdate,
            month:monthdesc,
            day:ddday,
            descday:descday,
            bookingid :$rootScope.allbookings[indx].BOOKING_ID,
            fromcity:$rootScope.allbookings[indx].FROMCITY,
            tocity:$rootScope.allbookings[indx].TOCITY,

           }    
         $scope.listdata.push(datagrid);
         
        

         if(counter==$rootScope.allbookings.length)
         {
             jQuery('#mydiv').hide(); 
         }

         counter++;

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

    

    


    $scope.navigatetobookingdetails =function(top)
    {

       $sessionStorage.bookingId =top.bookingid;
        $sessionStorage.FromMyBookings ="Y";
      
      $state.go("confirmation");

    }

    $scope.pageChanged =function(number)
    {
      $sessionStorage.pageno =number;
     var resdata2 ={

        customerid :$sessionStorage.CUSTOMERID,
        pageno:$sessionStorage.pageno,
        count:"N"

     }
      jQuery('#mydiv').show();


       userFactory.getcustomerbookings(resdata2).success(function(data) {

    $rootScope.allbookings =data;
    var counter =1;

    if($rootScope.allbookings.length==0)
    {
        jQuery('#mydiv').hide();  
    }

    for(var indx =0;indx <  $rootScope.allbookings.length;indx++)
    {

        var travdate =$rootScope.allbookings[indx].TRAVELDATE;
        var departure =$rootScope.allbookings[indx].DEPARTURE_TIME;
        var departuredate =$rootScope.allbookings[indx].DEPARTURE_DATE;
        var arrival =$rootScope.allbookings[indx].ARRIVAL_TIME;
        var arrivaldate =$rootScope.allbookings[indx].ARRIVAL_DATE;
        var ticketid =$rootScope.allbookings[indx].TICKET_ID;
        var bookingdate =$rootScope.allbookings[indx].BOOKINGDATE;


         var traveldate = new Date(travdate);
     var  month = (traveldate.getMonth() + 1);
     var  day = traveldate.getDay();
     var ddday  =traveldate.getDate();
     var  year = traveldate.getFullYear();
            var monthdesc ="";
            var descday ="";
       if(month==1){monthdesc ="JAN";}
                if(month==2){monthdesc ="FEB";}
                if(month==3){monthdesc ="MAR";}
                if(month==4){monthdesc ="APR";}
                if(month==5){monthdesc ="MAY";}
                if(month==6){monthdesc ="JUN";}
                if(month==7){monthdesc ="JUL";}
                if(month==8){monthdesc ="AUG";}
                if(month==9){monthdesc ="SEP";}
                if(month==10){monthdesc ="OCT";}
                if(month==11){monthdesc ="NOV";}
                if(month==12){monthdesc ="DEC";}

               if(day==1){descday ="MON";}
                if(day==2){descday ="TUE";}
                if(day==3){descday ="WED";}
                if(day==4){descday ="THU";}
                if(day==5){descday ="FRI";}
                if(day==6){descday ="SAT";}
                if(day==7){descday ="SUN";}     

          var datagrid ={
            departure:departure,
            departuredate:departuredate,
            arrival:arrival,
            arrivaldate:arrivaldate,
            ticketid:ticketid,
            bookingdate:bookingdate,
            month:monthdesc,
            day:ddday,
            descday:descday,
            bookingid :$rootScope.allbookings[indx].BOOKING_ID,
            fromcity:$rootScope.allbookings[indx].FROMCITY,
            tocity:$rootScope.allbookings[indx].TOCITY,

           }    
         $scope.listdata.push(datagrid);
         
        

         if(counter==$rootScope.allbookings.length)
         {
             jQuery('#mydiv').hide(); 
         }

         counter++;

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