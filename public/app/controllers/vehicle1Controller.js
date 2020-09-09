app.controller('vehicle1Controller', function($scope,$filter, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window, commonFactory, userFactory) {

    $rootScope.mainheader = false;

    if ($sessionStorage.isAuthenticate == "Y") {
        $rootScope.login = true;
    } else {
        $rootScope.login = false;
    }
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.q = '';

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "block");
    jQuery('#mainheader1').css("display", "block");
    jQuery('.collapse').collapse("hide");

    var resdata = {


    }
    $sessionStorage.isVehicleControllerPage = "PRIMARY";

    jQuery('#noofpassenger').val($sessionStorage.noofseats);

    var frlocid = $sessionStorage.locid;
    var tolocid = $sessionStorage.toid;
    var fromdate = $sessionStorage.fromdate;
    var daydesc = $sessionStorage.daydesc;
    var todate = $sessionStorage.todate;
    var todesc = $sessionStorage.todesc;
    var noofseats = $sessionStorage.noofseats;
    var routeid =$sessionStorage.routeid;
   
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
        $rootScope.seatsdesc = $sessionStorage.noofseats;
    }

   //alert("fromdate"+fromdate);
   if(fromdate!="N")
    {
    jQuery('#trdate').val(fromdate);
    
    }
    // document.getElementById("trdate").value = fromdate;

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

    jQuery('#mydiv').show();
     $scope.frDate ="N";
    if(fromdate !="N"){
      $scope.frDate ="Y";

    var traveldate = new Date(fromdate);
    var month = (traveldate.getMonth() + 1);
    var day = traveldate.getDay();
    var ddday = traveldate.getDate();
    var year = traveldate.getFullYear();
    var monthdesc = "";
    var descday = "";

    var fdate = year + "-" + month + "-" + ddday;
    

    if (month == 1) {
        monthdesc = "January";
    }
    if (month == 2) {
        monthdesc = "Feburary";
    }
    if (month == 3) {
        monthdesc = "March";
    }
    if (month == 4) {
        monthdesc = "April";
    }
    if (month == 5) {
        monthdesc = "May";
    }
    if (month == 6) {
        monthdesc = "June";
    }
    if (month == 7) {
        monthdesc = "July";
    }
    if (month == 8) {
        monthdesc = "August";
    }
    if (month == 9) {
        monthdesc = "September";
    }
    if (month == 10) {
        monthdesc = "October";
    }
    if (month == 11) {
        monthdesc = "November";
    }
    if (month == 12) {
        monthdesc = "December";
    }

    if (day == 1) {
        descday = "MONDAY";
    }
    if (day == 2) {
        descday = "TUESDAY";
    }
    if (day == 3) {
        descday = "WEDNESDAY";
    }
    if (day == 4) {
        descday = "THURSDAY";
    }
    if (day == 5) {
        descday = "FRIDAY";
    }
    if (day == 6) {
        descday = "SATURDAY";
    }
    if (day == 0) {
        descday = "SUNDAY";
    }

    $scope.displaydate = descday + "," + monthdesc + "," + ddday + "," + year;

    }
    $sessionStorage.pageno = 1;


    var tdate = "N";
    $scope.retDate = "N";
   

    if (todate != "N") {

        jQuery('#rtdate').val(todate);
        $scope.retDate = "Y";
       
        var returndate = new Date(todate);
        var rmonth = '' + (returndate.getMonth() + 1);
        var rday = '' + returndate.getDate();
        var ryear = returndate.getFullYear();
        tdate = ryear + "-" + rmonth + "-" + rday;

          

        if (rmonth == 1) {
        monthdesc = "January";
    }
    if (rmonth == 2) {
        monthdesc = "Feburary";
    }
    if (rmonth == 3) {
        monthdesc = "March";
    }
    if (rmonth == 4) {
        monthdesc = "April";
    }
    if (rmonth == 5) {
        monthdesc = "May";
    }
    if (rmonth == 6) {
        monthdesc = "June";
    }
    if (rmonth == 7) {
        monthdesc = "July";
    }
    if (rmonth == 8) {
        monthdesc = "August";
    }
    if (rmonth == 9) {
        monthdesc = "September";
    }
    if (month == 10) {
        monthdesc = "October";
    }
    if (rmonth == 11) {
        monthdesc = "November";
    }
    if (rmonth == 12) {
        monthdesc = "December";
    }

    if (rday == 1) {
        descday = "MONDAY";
    }
    if (rday == 2) {
        descday = "TUESDAY";
    }
    if (rday == 3) {
        descday = "WEDNESDAY";
    }
    if (rday == 4) {
        descday = "THURSDAY";
    }
    if (rday == 5) {
        descday = "FRIDAY";
    }
    if (rday == 6) {
        descday = "SATURDAY";
    }
    if (rday == 0) {
        descday = "SUNDAY";
    }

    $scope.displaydate = descday + "," + monthdesc + "," + rday + "," + ryear;


    }
 
       var resdata1 ={};
    var resdata ={};



  if((fromdate !="N" && todate !="N")|| (fromdate !="N" && todate=="N")){
    
     resdata1 = {
        tolocation: tolocid,
        fromlocation: frlocid,
        fromdate: fdate,
        todate: tdate,
        fromdesc: daydesc,
        todesc: todesc,
        pageno: $sessionStorage.pageno,
        noofseats: noofseats,
        count: "Y",
        routeid:routeid

    }

      resdata = {
            tolocation: tolocid,
            fromlocation: frlocid,
            fromdate: fdate,
            todate: tdate,
            fromdesc: daydesc,
            todesc: todesc,
            pageno: $sessionStorage.pageno,
            noofseats: noofseats,
            count: "N",
            routeid:routeid

        }
    }else{
     
     resdata1 = {
        tolocation: frlocid,
        fromlocation: tolocid,
        fromdate: fdate,
        todate: tdate,
        fromdesc: daydesc,
        todesc: todesc,
        pageno: $sessionStorage.pageno,
        noofseats: noofseats,
        count: "Y",
        routeid:routeid

    }

      resdata = {
            tolocation: frlocid,
            fromlocation: tolocid,
            fromdate: fdate,
            todate: tdate,
            fromdesc: daydesc,
            todesc: todesc,
            pageno: $sessionStorage.pageno,
            noofseats: noofseats,
            count: "N",
            routeid:routeid

        }


    }
  

    if(fromdate !="N") {

   

        userFactory.getallvehiclesForSearch(resdata).success(function(data) {

            $scope.allvechicles = data;
            $scope.data =data;
            if ($scope.allvechicles.length == 0) {
                if (todate != "N") {
                    userFactory.getreturntriponlycounts(resdata1).success(function(data) {

                        $scope.bigTotalItems = data.count;
                        userFactory.getreturntriponly(resdata).success(function(data) {

                            $rootScope.allvechicles = data;
                            $scope.data =data;
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

                }else{
                   jQuery('#mydiv').hide(); 
                }

            } else {

                jQuery('#mydiv').hide();
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



   

}else{

     if (todate != "N") {
                    

                       
                        userFactory.getreturntriponly(resdata).success(function(data) {

                            $scope.allvechicles = data;
                            $scope.data =data;
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


                  

                }



}


   $scope.getData = function () {
      return $filter('filter')($scope.data, $scope.q)
    }

    $scope.numberOfPages=function(){
      
        return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    $scope.$watch('q', function(newValue,oldValue){ 

     if(oldValue!=newValue){
        $scope.currentPage = 0;
      }
    },true);


    



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


    $scope.recordslist = [];
    $scope.ismapped=false;
    $scope.selectvehicles = function(top, index) {
        
        var translateData = $sessionStorage.translateData;
         if(top.tripetype=="R" && $scope.recordslist.length==0)
         {
            swal(JSON.parse(translateData).plAlert, " ", "warning");
         // swal("Please select the Forward trip first before selecting the return trip", " ", "warning");
         }
        
        else{
         

            
        
        $sessionStorage.vehid = top.vehid;
        $sessionStorage.companyid = top.companyid;
        $sessionStorage.routeid = top.routeid;
        $sessionStorage.departure = top.departure;
        $sessionStorage.arrival = top.arrival;
        $sessionStorage.companyname = top.companyname;
        $sessionStorage.duration = top.duration;

        var fromlocid = $sessionStorage.locid;
        var tolocid = $sessionStorage.toid;
 
        if($scope.recordslist.length==1)
          {
           
            for(var idx =0 ;idx <$scope.recordslist.length ;idx++)
            {
            var type =$scope.recordslist[idx].triptype;
            
            if(type ==top.tripetype)
            {
              swal("You have already selected the forward trip please select the return trip", " ", "warning");
             return false;    

            }
            

            }
          }
           $scope.isShow = index;
         
        var bookindata = {
            vehid: top.vehid,
            companyid: top.companyid,
            routeid: top.routeid,
            departure: top.departure,
            arrival: top.arrival,
            companyname: top.companyname,
            availableseats: top.availableseats,
            depdate: top.departuredate,
            arrdate: top.arrdate,
            imageurl: top.imageurl,
            seatmap: top.seatmap,
            vehtypeid: top.vehtypeid,
            triptype:top.tripetype

        }
        if(top.seatmap !="-1")
        {
          $scope.ismapped=true;
        }

        $scope.recordslist.push(bookindata);
        $sessionStorage.guestcheckoutid ="N";
        $sessionStorage.forwardseats ="0";
        $sessionStorage.backwardseats ="0";
        $sessionStorage.topforwardseats="0";
        $sessionStorage.topbackwardseats ="0";
            

        if ($scope.recordslist.length == 2) {

            $sessionStorage.selectedseatarray =[];
            $sessionStorage.selectedseatarrayreturn=[];
            $sessionStorage.topselectedseatarray=[];
            $sessionStorage.topselectedseatarrayreturn = [];
            if($scope.ismapped==true){
                 $sessionStorage.seatselect =1;
                 $state.go("seats");
            }else{
            $state.go("booking");
        }
        }
        $sessionStorage.records = $scope.recordslist;
    }

    }



    $scope.booknow = function(top) {

        var bookindata = {
            vehid: top.vehid,
            companyid: top.companyid,
            routeid: top.routeid,
            departure: top.departure,
            arrival: top.arrival,
            companyname: top.companyname,
            availableseats: top.availableseats,
            depdate: top.departuredate,
            arrdate: top.arrdate,
            imageurl: top.imageurl,
            seatmap: top.seatmap,
            vehtypeid: top.vehtypeid

        }

        $scope.recordslist.push(bookindata);
        $sessionStorage.guestcheckoutid ="N";
        $sessionStorage.forwardseats ="0";
$sessionStorage.backwardseats ="0";
$sessionStorage.topforwardseats="0";
$sessionStorage.topbackwardseats ="0";

        $sessionStorage.records = $scope.recordslist;

        if (top.seatmap == "-1") {
            $sessionStorage.selectedseatarray =[];
            $sessionStorage.selectedseatarrayreturn=[];
            $sessionStorage.topselectedseatarray=[];
            $sessionStorage.topselectedseatarrayreturn = [];
             $sessionStorage.seatselect =0;
            $state.go("booking");
            // $state.go("seats"); 
        } else {
           $sessionStorage.seatselect =1;
            $state.go("seats");

        }


    };



});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});