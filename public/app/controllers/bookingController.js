app.controller('bookingController', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window, commonFactory, userFactory) {
   jQuery('#mydiv').show();
    $rootScope.mainheader = false;
     $scope.taxdata =[];
    $scope.adultseatprice =0;
    $scope.adultseats =0;
    $scope.childseatprice =0;
    $scope.childseats =0;
    $scope.retiredseatprice =0;
    $scope.retiredseats =0;
    $scope.forwardseats=0;
    $scope.returnseats=0;

    $scope.adultseatpricereturn =0;
    $scope.adultseatsreturn =0;
    $scope.childseatpricereturn =0;
    $scope.childseatsreturn =0;
    $scope.retiredseatpricereturn =0;
    $scope.retiredseatsreturn =0;

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "block");
    jQuery('#mainheader1').css("display", "block");
    jQuery('.collapse').collapse("hide");
    if ($sessionStorage.isAuthenticate == "Y") {
        $rootScope.login = true;
    } else {
        $rootScope.login = false;
    }
    
    $scope.paymenttype ="-1";
    $scope.guestlogin =false;
    $scope.getcheckoutid  ="N";
    if($sessionStorage.guestcheckoutid!=undefined)
    {
      $scope.getcheckoutid  =$sessionStorage.guestcheckoutid;
      $scope.guestlogin =true;
    }else{
         $scope.guestlogin ="N";
    }
   var fwtotalseats =parseInt($sessionStorage.selectedseatarray.length)+parseInt($sessionStorage.topselectedseatarray.length);
 var bktotalseats =parseInt($sessionStorage.selectedseatarrayreturn.length)+parseInt($sessionStorage.topselectedseatarrayreturn.length);
 


	//var translateData =  localStorage.getItem('englishTranslate');
	// var spanishTranslate =  localStorage.getItem('spanishTranslate');
	var translateData = $sessionStorage.translateData;
	
  if($sessionStorage.languageselect!="sp")
  {
	 $rootScope.sellang ="English";
	 //  translateData =  localStorage.getItem('englishTranslate');
	 translateData = $sessionStorage.translateData;
  }else{
     $rootScope.sellang ="Spanish";
	  //  translateData =  localStorage.getItem('spanishTranslate');
	 translateData = $sessionStorage.translateData;
  }
	
	   $rootScope.howboletoLabel = JSON.parse(translateData).howboletoLabel;
	   $rootScope.ExploreDestinationslabel = JSON.parse(translateData).ExploreDestinationslabel;
	   $rootScope.checkavailabilitylabel = JSON.parse(translateData).checkavailabilitylabel;
	   $rootScope.Bookonlinelabel = JSON.parse(translateData).Bookonlinelabel;
	   $rootScope.getreadyLabel = JSON.parse(translateData).getreadyLabel;
	   $rootScope.printticketlabel = JSON.parse(translateData).printticketlabel;
	   $rootScope.safeLabel = JSON.parse(translateData).safeLabel;
	   $rootScope.searchLabel = JSON.parse(translateData).searchLabel;
	   $rootScope.availablevehLabel = JSON.parse(translateData).availablevehLabel;
       $rootScope.homeLabel = JSON.parse(translateData).homeLabel;
       $rootScope.searchresultsLabel = JSON.parse(translateData).searchresultsLabel;
       $rootScope.departlabel = JSON.parse(translateData).departlabel;
	   
	   
	   
       $rootScope.userdetailsLabel = JSON.parse(translateData).userdetailsLabel;
	   $rootScope.firstnameLabel = JSON.parse(translateData).firstnameLabel;
	   $rootScope.lastnameLabel = JSON.parse(translateData).lastnameLabel;
	   $rootScope.emailLabel = JSON.parse(translateData).emailLabel;
	   $rootScope.telLabel = JSON.parse(translateData).telLabel;
	   $rootScope.languageLabel = JSON.parse(translateData).languageLabel;
	   $rootScope.cityLabel = JSON.parse(translateData).cityLabel;
	   $rootScope.countryLabel = JSON.parse(translateData).countryLabel;
	     $rootScope.selectlanguagelabel = JSON.parse(translateData).selectlanguagelabel;
	   $rootScope.selectcitylabel = JSON.parse(translateData).selectcitylabel;
	   $rootScope.selectcountrylabel = JSON.parse(translateData).selectcountrylabel;
	   
	   $rootScope.addressLabel = JSON.parse(translateData).addressLabel;
	   $rootScope.companyLabel = JSON.parse(translateData).companyLabel;
	   $rootScope.editprofileButton = JSON.parse(translateData).editprofileButton;
	   $rootScope.personaldetailslabel = JSON.parse(translateData).personaldetailslabel;
	   $rootScope.firstnameplaceholder = JSON.parse(translateData).firstnameplaceholder;
	   $rootScope.lastnameplaceholder = JSON.parse(translateData).lastnameplaceholder;
	   $rootScope.emailplaceholder = JSON.parse(translateData).emailplaceholder;
	   $rootScope.telplaceholder = JSON.parse(translateData).telplaceholder;
	   $rootScope.contactdetailsLabel = JSON.parse(translateData).contactdetailsLabel;
	   $rootScope.updateprofileButton = JSON.parse(translateData).updateprofileButton;
	   $rootScope.dashboardLabel = JSON.parse(translateData).dashboardLabel;
	   $rootScope.ApplyLabel = JSON.parse(translateData).ApplyLabel;
	   $rootScope.ApplyLabel2 = JSON.parse(translateData).ApplyLabel;
		  
		  var promoPlaceHolder = document.getElementById("promoPlaceHolder");
	   if(promoPlaceHolder!=null)
	  promoPlaceHolder.placeholder = JSON.parse(translateData).promoPlaceHolder;
    var dateofbirthPlaceHolder = document.getElementById("dateofbirthPlaceHolder");
	   if(dateofbirthPlaceHolder!=null)
	  dateofbirthPlaceHolder.placeholder = JSON.parse(translateData).dateofbirthPlaceHolder;
  
	  
	    if(document.getElementById("bsLabel")!=null)
	  document.getElementById("bsLabel").innerHTML = ""+JSON.parse(translateData).bsLabel;
  if(document.getElementById("needLabel")!=null)
	  document.getElementById("needLabel").innerHTML = ""+JSON.parse(translateData).needLabel;
	  if(document.getElementById("adultLabel")!=null)
	  document.getElementById("adultLabel").innerHTML = ""+JSON.parse(translateData).adultLabel;
  if(document.getElementById("totalLabel")!=null)
	  document.getElementById("totalLabel").innerHTML = ""+JSON.parse(translateData).totalLabel;
  if(document.getElementById("subLabel")!=null)
	  document.getElementById("subLabel").innerHTML = ""+JSON.parse(translateData).subLabel;
   if(document.getElementById("chargeLabel")!=null)
	  document.getElementById("chargeLabel").innerHTML = ""+JSON.parse(translateData).chargeLabel;
     if(document.getElementById("priceLabel")!=null)
	  document.getElementById("priceLabel").innerHTML = ""+JSON.parse(translateData).priceLabel;
   if(document.getElementById("taxLabel")!=null)
	  document.getElementById("taxLabel").innerHTML = ""+JSON.parse(translateData).taxLabel;
   if(document.getElementById("taxesLabel")!=null)
	  document.getElementById("taxesLabel").innerHTML = ""+JSON.parse(translateData).taxesLabel;
     if(document.getElementById("weLabel")!=null)
	  document.getElementById("weLabel").innerHTML = ""+JSON.parse(translateData).weLabel;
     if(document.getElementById("ticketbookingLabel")!=null)
	  document.getElementById("ticketbookingLabel").innerHTML = ""+JSON.parse(translateData).ticketbookingLabel;
    if(document.getElementById("vehiclesLabel")!=null)
	  document.getElementById("vehiclesLabel").innerHTML = ""+JSON.parse(translateData).vehiclesLabel;
   if(document.getElementById("personalinfolabel")!=null)
	  document.getElementById("personalinfolabel").innerHTML = ""+JSON.parse(translateData).personalinfolabel;
    if(document.getElementById("DOBLabel")!=null)
	  document.getElementById("DOBLabel").innerHTML = ""+JSON.parse(translateData).DOBLabel;
      if(document.getElementById("emailaddressLabel")!=null)
	  document.getElementById("emailaddressLabel").innerHTML = ""+JSON.parse(translateData).emailaddressLabel;
      if(document.getElementById("verifyemailLabel")!=null)
	  document.getElementById("verifyemailLabel").innerHTML = ""+JSON.parse(translateData).verifyemailLabel;
      if(document.getElementById("genderLabel")!=null)
	  document.getElementById("genderLabel").innerHTML = ""+JSON.parse(translateData).genderLabel;
      if(document.getElementById("gendermaleLabel")!=null)
	  document.getElementById("gendermaleLabel").innerHTML = ""+JSON.parse(translateData).gendermaleLabel;
      if(document.getElementById("genderfemaleLabel")!=null)
	  document.getElementById("genderfemaleLabel").innerHTML = ""+JSON.parse(translateData).genderfemaleLabel;
      if(document.getElementById("countrycodeLabel")!=null)
	  document.getElementById("countrycodeLabel").innerHTML = ""+JSON.parse(translateData).countrycodeLabel;
      if(document.getElementById("phnumLabel")!=null)
	  document.getElementById("phnumLabel").innerHTML = ""+JSON.parse(translateData).phnumLabel;
      if(document.getElementById("typeofdocLabel")!=null)
	  document.getElementById("typeofdocLabel").innerHTML = ""+JSON.parse(translateData).typeofdocLabel;
      if(document.getElementById("selectdoctypeLabel")!=null)
	  document.getElementById("selectdoctypeLabel").innerHTML = ""+JSON.parse(translateData).selectdoctypeLabel;
      if(document.getElementById("passportLabel")!=null)
	  document.getElementById("passportLabel").innerHTML = ""+JSON.parse(translateData).passportLabel;
      if(document.getElementById("docnumLabel")!=null)
	  document.getElementById("docnumLabel").innerHTML = ""+JSON.parse(translateData).docnumLabel;
      if(document.getElementById("firstnameLabel")!=null)
	  document.getElementById("firstnameLabel").innerHTML = ""+JSON.parse(translateData).firstnameLabel;
     if(document.getElementById("firstnameLabel")!=null)
	  document.getElementById("firstnameLabel").innerHTML = ""+JSON.parse(translateData).firstnameLabel;
     if(document.getElementById("lastnameLabel")!=null)
	  document.getElementById("lastnameLabel").innerHTML = ""+JSON.parse(translateData).lastnameLabel;
	  if(document.getElementById("addressLabel")!=null)
	  document.getElementById("addressLabel").innerHTML = ""+JSON.parse(translateData).addressLabel;
    if(document.getElementById("tripinfoLabel")!=null)
	  document.getElementById("tripinfoLabel").innerHTML = ""+JSON.parse(translateData).tripinfoLabel;
   if(document.getElementById("deptLabel")!=null)
	  document.getElementById("deptLabel").innerHTML = ""+JSON.parse(translateData).deptLabel;
   if(document.getElementById("arrvlLabel")!=null)
	  document.getElementById("arrvlLabel").innerHTML = ""+JSON.parse(translateData).arrvlLabel;
     if(document.getElementById("adultLabel")!=null)
	  document.getElementById("adultLabel").innerHTML = ""+JSON.parse(translateData).adultLabel;
     if(document.getElementById("childrenLabel")!=null)
	  document.getElementById("childrenLabel").innerHTML = ""+JSON.parse(translateData).childrenLabel;
     if(document.getElementById("retiredLabel")!=null)
	  document.getElementById("retiredLabel").innerHTML = ""+JSON.parse(translateData).retiredLabel;
   if(document.getElementById("rturntripinfoLabel")!=null)
	  document.getElementById("rturntripinfoLabel").innerHTML = ""+JSON.parse(translateData).rturntripinfoLabel;
   if(document.getElementById("checkboxinfoLabel")!=null)
	  document.getElementById("checkboxinfoLabel").innerHTML = ""+JSON.parse(translateData).checkboxinfoLabel;
   if(document.getElementById("checkboxLabel")!=null)
	  document.getElementById("checkboxLabel").innerHTML = ""+JSON.parse(translateData).checkboxLabel;
   if(document.getElementById("checboxoneLabel")!=null)
	  document.getElementById("checboxoneLabel").innerHTML = ""+JSON.parse(translateData).checboxoneLabel;
  if(document.getElementById("bluechcbxLabel")!=null)
	  document.getElementById("bluechcbxLabel").innerHTML = ""+JSON.parse(translateData).bluechcbxLabel;
    if(document.getElementById("checboxtwoLabel")!=null)
	  document.getElementById("checboxtwoLabel").innerHTML = ""+JSON.parse(translateData).checboxtwoLabel;
  if(document.getElementById("checboxparaLabel")!=null)
	  document.getElementById("checboxparaLabel").innerHTML = ""+JSON.parse(translateData).checboxparaLabel;
  
 
  if(document.getElementById("blockSeatsButtonLabel")!=null)
	  document.getElementById("blockSeatsButtonLabel").innerHTML = ""+JSON.parse(translateData).blockSeatsButtonLabel;
  $rootScope.blockSeatsButtonLabel =  JSON.parse(translateData).blockSeatsButtonLabel;
  if(document.getElementById("confirmBookingButtonLabel")!=null)
	  document.getElementById("confirmBookingButtonLabel").innerHTML = ""+JSON.parse(translateData).confirmBookingButtonLabel;
  $rootScope.confirmBookingButtonLabel =  JSON.parse(translateData).confirmBookingButtonLabel;
   // alert(JSON.parse(translateData).blockSeatsButtonLabel);
  
  /* $rootScope.blockSeatsButtonLabel = JSON.parse(translateData).blockSeatsButtonLabel;
    $rootScope.confirmBookingButtonLabel = JSON.parse(translateData).confirmBookingButtonLabel;*/
  
  if(document.getElementById("onlLabel")!=null)
	  document.getElementById("onlLabel").innerHTML = ""+JSON.parse(translateData).onlLabel;
	    if(document.getElementById("ticketbookingLabel2")!=null)
	  document.getElementById("ticketbookingLabel2").innerHTML = ""+JSON.parse(translateData).ticketbookingLabel;
	    if(document.getElementById("adultLabel2")!=null)
	  document.getElementById("adultLabel2").innerHTML = ""+JSON.parse(translateData).adultLabel;
   if(document.getElementById("adultLabel2")!=null)
	  document.getElementById("adultLabel2").innerHTML = ""+JSON.parse(translateData).adultLabel;
   if(document.getElementById("subLabel2")!=null)
	  document.getElementById("subLabel2").innerHTML = ""+JSON.parse(translateData).subLabel;
  
  
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

  if(document.getElementById("homeLabel")!=null)
   document.getElementById("homeLabel").innerHTML = ""+JSON.parse(translateData).homeLabel;
    if(document.getElementById("selectGenderLabel")!=null)
	  document.getElementById("selectGenderLabel").innerHTML = ""+JSON.parse(translateData).selectGenderLabel;

  
 
 
	  
	  
    var resdata = {


    }

    var frlocid = $sessionStorage.locid;
    var tolocid = $sessionStorage.toid;
    var fromdate = $sessionStorage.fromdate;
    var daydesc = $sessionStorage.daydesc;
    var todate = $sessionStorage.todate;
    var todesc = $sessionStorage.todesc;
    var  check =false;
    var retcheck =false;

    if($sessionStorage.forwardseats !=0 && $sessionStorage.topforwardseats !=0)
    {
     $scope.forwardseats = $sessionStorage.forwardseats +","+$sessionStorage.topforwardseats;
     check =true;
    }
   else if($sessionStorage.forwardseats !=0 && !check)
    {
     $scope.forwardseats = $sessionStorage.forwardseats;
   
    }
    if( $sessionStorage.topforwardseats !=0 && !check)
    {
     $scope.forwardseats =$sessionStorage.topforwardseats;
   
    }

    if($sessionStorage.backwardseats !=0 && $sessionStorage.topbackwardseats !=0)
    {

    $scope.returnseats = $sessionStorage.backwardseats+","+$sessionStorage.topbackwardseats;
     retcheck =true;
    }
     if($sessionStorage.backwardseats !=0 && !retcheck)
    {

    $scope.returnseats = $sessionStorage.backwardseats;
    }
    if($sessionStorage.topbackwardseats !=0 && !retcheck)
    {

    $scope.returnseats =$sessionStorage.topbackwardseats;
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
      
   
     if(fromdate!="N")
    {
    jQuery('#trdate').val(fromdate);
    
    }
    // document.getElementById("trdate").value = fromdate;


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


    $scope.recordlists = $sessionStorage.records;

    $scope.roundtripe = false;

    $scope.departure1 = "";
    $scope.arrival1 = "";
    $scope.companyname1 = "";
    $scope.companyurl1 = "";
    $scope.vehid1 = "";
    $scope.availableseats1 = "";
    $scope.depdate1 = "";
    $scope.arrdate1 = "";
    $scope.confirmbooking = false;


    $scope.departure2 = "";
    $scope.arrival2 = "";
    $scope.companyname2 = "";
    $scope.companyurl2 = "";
    $scope.vehid2 = "";
    $scope.availableseats2 = "";
    $scope.depdate2 = "";
    $scope.arrdate2 = "";

    $scope.child = "0";
    $scope.retired = "0";
    $scope.totalticketprice = 0;
    $scope.totalpassengers = 0;
    $scope.adultticketprice = 0;
    $scope.totaladult = 0;
    $scope.childticketprice = 0;
    $scope.totalchild = 0;
    $scope.retiredticketprice = 0;
    $scope.totalretired = 0;


    $scope.totalcharges = 0;
    $scope.totalprice = 0;
    $scope.totalseats = 0;
    $scope.totaltaxes = 0;
    $scope.charges1 = 0;
    $scope.charges2 = 0;
    $scope.tax1 = 0
    $scope.tax2 = 0;

    $scope.taxarray = [];

    $scope.totalamount = 0;




    $scope.child1 = "0";
    $scope.retired1 = "0";
    $scope.totalticketprice1 = 0;
    $scope.totalpassengers1 = 0;
    $scope.adultticketprice1 = 0;
    $scope.totaladult1 = 0;
    $scope.childticketprice1 = 0;
    $scope.totalchild1 = 0;
    $scope.retiredticketprice1 = 0;
    $scope.totalretired1 = 0;

    $scope.promoamount1 = 0;
    $scope.promoamount2 = 0;
    $scope.promoapplied1 = false;
    $scope.promoapplied2 = false;

    $scope.totaldiscount = 0;

   
    jQuery('#child').val("0");

    jQuery('#noofpassenger').val($sessionStorage.noofseats);

    var taxdata = {

    }

    userFactory.gettaxes(taxdata).success(function(data) {
        $scope.taxdata = data;

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
  });;


    if ($scope.recordlists.length == 2) {
        $scope.roundtripe = true;


    } else {
        $scope.roundtripe = false;
    }

    for (var indx = 0; indx < $scope.recordlists.length; indx++) {

        if (indx == 0) {
            $scope.departure1 = $scope.recordlists[indx].departure;
            $scope.arrival1 = $scope.recordlists[indx].arrival;
            $scope.companyname1 = $scope.recordlists[indx].companyname;
            $scope.companyid1 = $scope.recordlists[indx].companyid;
            $scope.vehid1 = $scope.recordlists[indx].vehid;
            $scope.availableseats1 = $scope.recordlists[indx].availableseats;
            $scope.depdate1 = $scope.recordlists[indx].depdate;
            $scope.arrdate1 = $scope.recordlists[indx].arrdate;
            $scope.companyurl1 = $scope.recordlists[indx].imageurl;
            $scope.pickup1 ="-1";
            $scope.drop1 ="-1";

        var res={
          vehid:$scope.vehid1
        }

      userFactory.getvehiclepickups(res).success(function(data) {
         $rootScope.pickupforward = data;
       
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

      userFactory.getvehiclepdrops(res).success(function(data) {
         $rootScope.dropforward = data;
       
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

            if ($scope.recordlists[indx].seatmap == "-1") {
                $scope.showseats = false;
            } else {
                $scope.showseats = true;
                $scope.confirmbooking = true;
            }
            getticketpriceforward($scope.vehid1, $scope.companyid1);


        } else {
            $scope.departure2 = $scope.recordlists[indx].departure;
            $scope.arrival2 = $scope.recordlists[indx].arrival;
            $scope.companyname2 = $scope.recordlists[indx].companyname;
            $scope.companyid2 = $scope.recordlists[indx].companyid;
            $scope.vehid2 = $scope.recordlists[indx].vehid;
            $scope.availableseats2 = $scope.recordlists[indx].availableseats;
            $scope.depdate2 = $scope.recordlists[indx].depdate;
            $scope.arrdate2 = $scope.recordlists[indx].arrdate;
            $scope.companyurl2 = $scope.recordlists[indx].imageurl;
            $scope.pickup2 ="-1";
            $scope.drop2="-1";


            var res={
            vehid:$scope.vehid2
            }

            userFactory.getvehiclepickups(res).success(function(data) {
            $rootScope.pickupReturn = data;

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

            userFactory.getvehiclepdrops(res).success(function(data) {
            $rootScope.dropReturn = data;

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

            if ($scope.recordlists[indx].seatmap == "-1") {
                $scope.showseats2 = false;
            } else {
                $scope.showseats2 = true;
                $scope.confirmbooking = true;
            }
            returnticketprice($scope.vehid2, $scope.companyid2);


        }

        $timeout(function() {
                          jQuery('#mydiv').hide();
                          
                        }, 1000);


    }



    $scope.gender = "-1";
    $scope.typeofdoc = "-1";
    var frlocid = $sessionStorage.locid;
    var tolocid = $sessionStorage.toid;
    var fromdate = $sessionStorage.fromdate;
    var daydesc = $sessionStorage.daydesc;
    var todate = $sessionStorage.todate;
    var todesc = $sessionStorage.todesc;
    $rootScope.trdate = sessionStorage.fromdate;
    $rootScope.travelfromlocdesc = $sessionStorage.travelfromlocdesc;
    $rootScope.traveltolocdesc = $sessionStorage.traveltolocdesc;
    $rootScope.fromdate = sessionStorage.fromdate;
    $scope.fromlocdesc = $sessionStorage.travelfromlocdesc;

    
    $scope.departure = $sessionStorage.departure;
    $scope.arrival = $sessionStorage.arrival;
    $scope.companyname = $sessionStorage.companyname;
    $scope.duration = $sessionStorage.duration;

    if (todate != "N") {

        jQuery('#rtdate').val(todate);

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

     if(fromdate !="N"){
    var traveldate = new Date(fromdate);
    var month = (traveldate.getMonth() + 1);
    var day = traveldate.getDay();
    var year = traveldate.getFullYear();
    var monthdesc = "";
    var descday = "";
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
    if (day == 7) {
        descday = "SUNDAY";
    }

    var res = monthdesc.substring(0, 3);
    var ddday = traveldate.getDate();

    $scope.displaydate = descday + "," + monthdesc + "," + ddday + "," + year;
   }

    $scope.onlymonthanddate = res + "," + ddday + "," + year;

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


        var resdata = {
            tolocation: locid
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



    function getticketpriceforward(vehid, companyid) {


        var resdata = {
            fromloc: $sessionStorage.locid,
            toloc: $sessionStorage.toid,
            vehid: vehid

        }
         
         if(fwtotalseats!=0)
                        {
                          
                         $scope.totaladult = fwtotalseats;

                        }else{
                          
                          $scope.totaladult = +$sessionStorage.noofseats;

                        }

        userFactory.getticketprice(resdata).success(function(data) {
            $rootScope.ticketpricefroward = data;

            var resdata = {
                companyid: companyid
            }

            userFactory.getfees(resdata).success(function(data) {
                $rootScope.companyfees = data;


                for (var indx = 0; indx < $rootScope.ticketpricefroward.length; indx++) {

                    if ($rootScope.ticketpricefroward[indx].TICKET_TYPE == "ADULT") {
                        adultfare = $rootScope.ticketpricefroward[indx].TICKET_PRICE;
                        discount = $rootScope.ticketpricefroward[indx].DISCOUNT;

                        if ($scope.recordlists.length == 2 && discount.length > 0) {

                            var discountoncharges = ((discount / 100).toFixed(2));
                            adultfare = Math.round(adultfare - discountoncharges);

                        }

                        $scope.adultticketprice = +adultfare;
                         $scope.adultseat = $scope.totaladult;
                       
                        
                        $scope.adultseats =$scope.totaladult;
                        
                        $scope.adultseatprice =adultfare * $scope.totaladult;
                        $scope.totalticketprice =$scope.adultseatprice;
                        $scope.totalpassengers = $scope.adultseats;
                       
                        if ($rootScope.companyfees.length > 0) {

                            for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

                            {

                                var feesamount = $rootScope.companyfees[indx].COMISSION_FEES;

                                var carchge = ((feesamount / 100).toFixed(2));


                                //alert(carchge);

                                //$scope.charges1 = +(Math.round(carchge * $scope.totalticketprice));

                               var amt =((carchge * $scope.totalticketprice).toFixed(2));
                              $scope.charges1 = ((parseFloat($scope.charges1)+parseFloat(amt)).toFixed(2));


                            }
                        }


                        $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                        $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                        $scope.totalprice = Math.round($scope.totalprice);
                        $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;


                        for (var inx = 0; inx < $scope.taxdata.length; inx++) {

                            var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                            var tax = ((taxpercentage / 100).toFixed(2));


                            //alert(carchge);

                            //$scope.tax1 = +(Math.round(tax * $scope.totalticketprice));


                            var taxamt =((tax * $scope.totalticketprice).toFixed(2));
                            $scope.tax1 = ((parseFloat($scope.tax1)+parseFloat(taxamt)).toFixed(2));
       

                        }
                        $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                        $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                        $scope.totalamount = Math.round($scope.totalamount);

                    }

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

    }




    function returnticketprice(vehid, companyid) {

        var resdata = {
            fromloc: $sessionStorage.toid,
            toloc: $sessionStorage.locid,
            vehid: vehid

        }
         /*if( $sessionStorage.seatselect==1)
                        {
                          $sessionStorage.noofseats =bktotalseats;
                        }*/

        userFactory.getticketprice(resdata).success(function(data) {
            $rootScope.ticketpricereturn = data;

            var resdata = {
                companyid: companyid
            }

            userFactory.getfees(resdata).success(function(data) {
                $rootScope.companyfees1 = data;

                var adultfare = "";
                var discount = "";
                for (var indx = 0; indx < $rootScope.ticketpricereturn.length; indx++) {
                    if ($rootScope.ticketpricereturn[indx].TICKET_TYPE == "ADULT") {
                        adultfare = $rootScope.ticketpricereturn[indx].TICKET_PRICE;
                        discount = $rootScope.ticketpricereturn[indx].DISCOUNT;

                        if ($scope.recordlists.length == 2 && discount.length > 0) {

                            var discountoncharges = ((discount / 100).toFixed(2));
                            adultfare = Math.round(adultfare - discountoncharges);

                        }
                         
                         if(bktotalseats!=0)
                        {
                         $scope.totaladult1 = bktotalseats;

                        }else{
                          $scope.totaladult1 = +$sessionStorage.noofseats;

                        }
                      
                        $scope.adultticketprice1 = +adultfare;
                        $scope.adultseat1 = $scope.totaladult1;
                        $scope.adultseatsreturn =$scope.totaladult1;
                        $scope.adultseatpricereturn =adultfare * $scope.totaladult1;
                        $scope.totalticketprice1 =$scope.adultseatpricereturn;
                        $scope.totalpassengers1 = $scope.totaladult1;  


                        if ($rootScope.companyfees1.length > 0) {

                            for (var indx = 0; indx < $rootScope.companyfees1.length; indx++)

                            {

                                var feesamount = $rootScope.companyfees1[indx].COMISSION_FEES;

                                var carchge = ((feesamount / 100).toFixed(2));


                               // $scope.charges2 = +(Math.round(carchge * $scope.totalticketprice1));

                              var amt =((carchge * $scope.totalticketprice1).toFixed(2));
                              $scope.charges2 = ((parseFloat($scope.charges2)+parseFloat(amt)).toFixed(2));
  

                            }
                        }


                        $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                        $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                        $scope.totalprice = Math.round($scope.totalprice);
                        $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                        for (var inx = 0; inx < $scope.taxdata.length; inx++) {

                            var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                            var tax = ((taxpercentage / 100).toFixed(2));


                           // $scope.tax2 = +(Math.round(tax * $scope.totalticketprice1));

                            var taxamt =((tax * $scope.totalticketprice1).toFixed(2));
                            $scope.tax2 = ((parseFloat($scope.tax2)+parseFloat(taxamt)).toFixed(2));
        

                        }
                        $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                        $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                        $scope.totalamount = Math.round($scope.totalamount);

                    }

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

    }

    $scope.getadultfareforward = function(adultseats) {
        
      

        var adultfare = "";
        var discount = "";

        for (var indx = 0; indx < $rootScope.ticketpricefroward.length; indx++) {

            if ($rootScope.ticketpricefroward[indx].TICKET_TYPE == "ADULT") {
                adultfare = $rootScope.ticketpricefroward[indx].TICKET_PRICE;
                discount = $rootScope.ticketpricefroward[indx].DISCOUNT;

                if ($scope.recordlists.length == 2 && discount.length > 0) {

                    var discountoncharges = ((discount / 100).toFixed(2));
                    adultfare = Math.round(adultfare - discountoncharges);

                }


               $scope.adultticketprice = +adultfare;
                    $scope.adultseats= adultseats;
                    $scope.adultseats =parseInt($scope.adultseats);
                    $scope.adultseatprice =adultfare * adultseats;
                    $scope.totaladult =adultseats;
                    $scope.totalticketprice = parseInt($scope.adultseatprice)+parseInt($scope.childseatprice)+parseInt($scope.retiredseatprice);
                    $scope.totalpassengers = parseInt($scope.adultseats)+parseInt($scope.childseats)+parseInt($scope.retiredseats);
                

                if ($rootScope.companyfees.length > 0) {

                    for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees[indx].COMISSION_FEES;

                        var carchge = ((feesamount / 100).toFixed(2));


                       // $scope.charges1 = +(Math.round(carchge * $scope.totalticketprice));
                    var amt =((carchge * $scope.totalticketprice).toFixed(2));
                              $scope.charges1 = ((parseFloat($scope.charges1)+parseFloat(amt)).toFixed(2));
  



                    }
                }
                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2)
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                $scope.totalprice = Math.round($scope.totalprice);
                $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                    //$scope.tax1 = +(Math.round(tax * $scope.totalticketprice));
                
                var taxamt =((tax * $scope.totalticketprice).toFixed(2));
                            $scope.tax1 = ((parseFloat($scope.tax1)+parseFloat(taxamt)).toFixed(2));
       
                   

                }
                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                $scope.totalamount = Math.round($scope.totalamount);

            }

        }

        if($scope.promoapplied1 ==true)
        {
         $scope.validatepromocode();
        }
        if($scope.promoapplied2 ==true)
        {
         $scope.validatepromocodeReturn();
        }


    }

    $scope.getadultfarereturn = function(adultseats) {
        
        var adultfare = "";
        var discount = "";

        for (var indx = 0; indx < $rootScope.ticketpricereturn.length; indx++) {

            if ($rootScope.ticketpricereturn[indx].TICKET_TYPE == "ADULT") {
                adultfare = $rootScope.ticketpricereturn[indx].TICKET_PRICE;
                discount = $rootScope.ticketpricereturn[indx].DISCOUNT;

                if ($scope.recordlists.length == 2 && discount.length > 0) {

                    var discountoncharges = ((discount / 100).toFixed(2));
                    adultfare = Math.round(adultfare - discountoncharges);

                }


               $scope.adultticketprice1 = +adultfare;
                    $scope.adultseatsreturn= adultseats;
                    $scope.adultseatsreturn =parseInt($scope.adultseatsreturn);
                    $scope.adultseatpricereturn =adultfare * adultseats;
                    
                    $scope.totaladult1 =adultseats;
                    $scope.totalticketprice1 = parseInt($scope.adultseatpricereturn)+parseInt($scope.childseatpricereturn)+parseInt($scope.retiredseatpricereturn);
                    $scope.totalpassengers1 = parseInt($scope.adultseatsreturn)+parseInt($scope.childseatsreturn)+parseInt($scope.retiredseatsreturn);
                 

                if ($rootScope.companyfees1.length > 0) {

                    for (var indx = 0; indx < $rootScope.companyfees1.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees1[indx].COMISSION_FEES;

                        var carchge = ((feesamount / 100).toFixed(2));


                       // $scope.charges2 = +(Math.round(carchge * $scope.totalticketprice1));
                    var amt =((carchge * $scope.totalticketprice1).toFixed(2));
                              $scope.charges2 = ((parseFloat($scope.charges2)+parseFloat(amt)).toFixed(2));
   



                    }
                }
                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                $scope.totalprice = Math.round($scope.totalprice);
                $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                    //$scope.tax2 = +(Math.round(tax * $scope.totalticketprice1));

                   var taxamt =((tax * $scope.totalticketprice1).toFixed(2));
                            $scope.tax2 = ((parseFloat($scope.tax2)+parseFloat(taxamt)).toFixed(2));
       

                }

                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                $scope.totalamount = Math.round($scope.totalamount);

            }

        }

        if($scope.promoapplied1 ==true)
        {
         $scope.validatepromocode();
        }
        if($scope.promoapplied2 ==true)
        {
         $scope.validatepromocodeReturn();
        }



    }


    $scope.getchildfareforward = function(childseats) {

        var childfare = "";
        var discount = "";

        for (var indx = 0; indx < $rootScope.ticketpricefroward.length; indx++) {

            if ($rootScope.ticketpricefroward[indx].TICKET_TYPE == "CHILD") {
                childfare = $rootScope.ticketpricefroward[indx].TICKET_PRICE;
                discount = $rootScope.ticketpricefroward[indx].DISCOUNT;

                if ($scope.recordlists.length == 2 && discount.length > 0) {

                    var discountoncharges = ((discount / 100).toFixed(2));
                    childfare = Math.round(childfare - discountoncharges);

                }


                 $scope.childticketprice = +childfare;
                    $scope.childseats= childseats;
                    $scope.childseats =parseInt($scope.childseats);
                    $scope.childseatprice =childfare * childseats;
                    $scope.totalchild  =childseats;
                    $scope.totalticketprice = parseInt($scope.adultseatprice)+parseInt($scope.childseatprice)+parseInt($scope.retiredseatprice);
                    $scope.totalpassengers = parseInt($scope.adultseats)+parseInt($scope.childseats)+parseInt($scope.retiredseats);
                 

                if ($rootScope.companyfees.length > 0) {

                    for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees[inx].COMISSION_FEES;

                        var carchge = ((feesamount / 100).toFixed(2));


                       // $scope.charges1 = +(Math.round(carchge * $scope.totalticketprice));

                   var amt =((carchge * $scope.totalticketprice).toFixed(2));
                              $scope.charges1 = ((parseFloat($scope.charges1)+parseFloat(amt)).toFixed(2));
  

                    }
                }
                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                $scope.totalprice = Math.round($scope.totalprice);
                $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                    //$scope.totaltaxes = +(Math.round(tax * $scope.totalticketprice));

                   var taxamt =((tax * $scope.totalticketprice).toFixed(2));
                            $scope.tax1 = ((parseFloat($scope.tax1)+parseFloat(taxamt)).toFixed(2));
       

                }

                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                $scope.totalamount = Math.round($scope.totalamount);
            }

        }

        if($scope.promoapplied1 ==true)
        {
         $scope.validatepromocode();
        }
        if($scope.promoapplied2 ==true)
        {
         $scope.validatepromocodeReturn();
        }


    }

    $scope.getchildfarereturn = function(childseats) {


        var childfare = "";
        var discount = "";

        for (var indx = 0; indx < $rootScope.ticketpricereturn.length; indx++) {

            if ($rootScope.ticketpricereturn[indx].TICKET_TYPE == "CHILD") {
                childfare = $rootScope.ticketpricereturn[indx].TICKET_PRICE;
                discount = $rootScope.ticketpricereturn[indx].DISCOUNT;

                if ($scope.recordlists.length == 2 && discount.length > 0) {

                    var discountoncharges = ((discount / 100).toFixed(2));
                    childfare = Math.round(childfare - discountoncharges);

                }


               $scope.childticketprice1 = +childfare;
                    $scope.childseatsreturn= childseats;
                    $scope.childseatsreturn =parseInt($scope.childseatsreturn);
                    $scope.childseatpricereturn =childfare * childseats;
                    $scope.totalchild1 =childseats;
                    $scope.totalticketprice1 = parseInt($scope.adultseatpricereturn)+parseInt($scope.childseatpricereturn)+parseInt($scope.retiredseatpricereturn);
                    $scope.totalpassengers1 = parseInt($scope.adultseatsreturn)+parseInt($scope.childseatsreturn)+parseInt($scope.retiredseatsreturn);
                  

                if ($rootScope.companyfees1.length > 0) {

                    for (var indx = 0; indx < $rootScope.companyfees1.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees1[inx].COMISSION_FEES;

                        var carchge = ((feesamount / 100).toFixed(2));

                         var amt =((carchge * $scope.totalticketprice1).toFixed(2));
                              $scope.charges2 = ((parseFloat($scope.charges2)+parseFloat(amt)).toFixed(2));
  
                       // $scope.charges2 = +(Math.round(carchge * $scope.totalticketprice1));




                    }
                }
                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                $scope.totalprice = $scope.totalprice.toFixed(2);
                $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                    $scope.tax2 = +(Math.round(tax * $scope.totalticketprice1));

                   var taxamt =((tax * $scope.totalticketprice1).toFixed(2));
                            $scope.tax2 = ((parseFloat($scope.tax2)+parseFloat(taxamt)).toFixed(2));
        

                }

                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                $scope.totalamount = Math.round($scope.totalamount);
            }

        }

        if($scope.promoapplied1 ==true)
        {
         $scope.validatepromocode();
        }
        if($scope.promoapplied2 ==true)
        {
         $scope.validatepromocodeReturn();
        }


    }


    $scope.getretiredfareforward = function(retiredseats) {

        var retiredfare = "";
        var discount = "";

        for (var indx = 0; indx < $rootScope.ticketpricefroward.length; indx++) {

            if ($rootScope.ticketpricefroward[indx].TICKET_TYPE == "RETIRED") {
                retiredfare = $rootScope.ticketpricefroward[indx].TICKET_PRICE;
                discount = $rootScope.ticketpricefroward[indx].DISCOUNT;

                if ($scope.recordlists.length == 2 && discount.length > 0) {

                    var discountoncharges = ((discount / 100).toFixed(2));
                    retiredfare = Math.round(retiredfare - discountoncharges);

                }


                 $scope.retiredticketprice = +retiredfare;
                    $scope.retiredseats= retiredseats;
                    $scope.retiredseats =parseInt($scope.retiredseats);
                    $scope.retiredseatprice =retiredfare * retiredseats;
                    $scope.totalretired  =retiredseats;
                    $scope.totalticketprice = parseInt($scope.adultseatprice)+parseInt($scope.childseatprice)+parseInt($scope.retiredseatprice);
                    $scope.totalpassengers = parseInt($scope.adultseats)+parseInt($scope.childseats)+parseInt($scope.retiredseats);
                

                if ($rootScope.companyfees.length > 0) {
                    for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees[indx].COMISSION_FEES;

                        var carchge = ((feesamount / 100).toFixed(2));

                        //$scope.charges1 = +(Math.round(carchge * $scope.totalticketprice));

                      var amt =((carchge * $scope.totalticketprice).toFixed(2));
                              $scope.charges1 = ((parseFloat($scope.charges1)+parseFloat(amt)).toFixed(2));
  


                    }
                }

                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                $scope.totalprice = Math.round($scope.totalprice);
                $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                    //$scope.totaltaxes = +(Math.round(tax * $scope.totalticketprice));

                    var taxamt =((tax * $scope.totalticketprice).toFixed(2));
                            $scope.tax1 = ((parseFloat($scope.tax1)+parseFloat(taxamt)).toFixed(2));
       

                }

                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                $scope.totalamount = Math.round($scope.totalamount);
            }

        }

        if($scope.promoapplied1 ==true)
        {
         $scope.validatepromocode();
        }
        if($scope.promoapplied2 ==true)
        {
         $scope.validatepromocodeReturn();
        }


    }


    $scope.getretiredfarereturn = function(retiredseats) {

        var retiredfare = "";
        var discount = "";

        for (var indx = 0; indx < $rootScope.ticketpricereturn.length; indx++) {

            if ($rootScope.ticketpricereturn[indx].TICKET_TYPE == "RETIRED") {
                retiredfare = $rootScope.ticketpricereturn[indx].TICKET_PRICE;
                discount = $rootScope.ticketpricereturn[indx].DISCOUNT;

                if ($scope.recordlists.length == 2 && discount.length > 0) {

                    var discountoncharges = ((discount / 100).toFixed(2));
                    retiredfare = Math.round(retiredfare - discountoncharges);

                }


                  $scope.retiredticketprice1 = +retiredfare;
                    $scope.retiredseatsreturn= retiredseats;
                    $scope.retiredseatsreturn =parseInt($scope.retiredseatsreturn);
                    $scope.retiredseatpricereturn =retiredfare * retiredseats;
                    $scope.totalretired1 =retiredseats;

                    $scope.totalticketprice1 = parseInt($scope.adultseatpricereturn)+parseInt($scope.childseatpricereturn)+parseInt($scope.retiredseatpricereturn);
                    $scope.totalpassengers1 = parseInt($scope.adultseatsreturn)+parseInt($scope.childseatsreturn)+parseInt($scope.retiredseatsreturn);
                  

                for (var ix = 0; ix < $rootScope.companyfees1.length; ix++)

                {

                    var feesamount = $rootScope.companyfees1[ix].COMISSION_FEES;

                    var carchge = ((feesamount / 100).toFixed(2));


                   // $scope.charges2 = +(Math.round(carchge * $scope.totalticketprice1));
                
                var amt =((carchge * $scope.totalticketprice1).toFixed(2));
                              $scope.charges2 = ((parseFloat($scope.charges2)+parseFloat(amt)).toFixed(2));
  

                }

                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                $scope.totalprice = Math.round($scope.totalprice);
                $scope.totalseats = $scope.totalpassengers + $scope.totalpassengers1;

                for (var inx = 0; inx < $scope.taxdata.length; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                   // $scope.tax2 = +(Math.round(tax * $scope.totalticketprice1));
                    var taxamt =((tax * $scope.totalticketprice1).toFixed(2));
                            $scope.tax2 = ((parseFloat($scope.tax2)+parseFloat(taxamt)).toFixed(2));
        
                   

                }

                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                $scope.totalamount = Math.round($scope.totalamount);

            }

        }

        if($scope.promoapplied1 ==true)
        {
         $scope.validatepromocode();
        }
        if($scope.promoapplied2 ==true)
        {
         $scope.validatepromocodeReturn();
        }


    }

    $scope.comfirmpayment =function()
    {
      
      $scope.paymenttype='MARKETCASH';
      jQuery('#soap-popupbox').css('display', 'none');
    }
    $scope.cancelpaymentype =function()
    {
      $scope.paymenttype='-1';
      jQuery('#soap-popupbox').css('display', 'none');
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

    $scope.displaycheckoutoption =function()
    {

     var paymenttype = $scope.paymenttype;
     if(paymenttype=="ONLINE")
     {
      jQuery('#pageofacilcheckout').css("display", "block");
      jQuery('#pageofacilcheckout1').css("display", "block");
      jQuery('#pageofacilcheckout2').css("display", "block");
      jQuery('#supermarketcheckout').css("display", "none");

     }else if(paymenttype =="MARKETCASH")
     {
       $scope.cardholdername ="";
       $scope.cardholderlastname="";
       $scope.cardholderemail="";
       $scope.cardholderaddress="";
       $scope.cardholderhone="";
       $scope.expirymonth="";
       $scope.expiryyear="";
       $scope.cvv="";
       $scope.cardnumber ="";

      jQuery('#pageofacilcheckout').css("display", "none");
      jQuery('#pageofacilcheckout1').css("display", "none");
      jQuery('#pageofacilcheckout2').css("display", "none");
      jQuery('#supermarketcheckout').css("display", "block");

     }else{
       $scope.cardholdername ="";
       $scope.cardholderlastname="";
       $scope.cardholderemail="";
       $scope.cardholderaddress="";
       $scope.cardholderhone="";
       $scope.expirymonth="";
       $scope.expiryyear="";
       $scope.cvv="";
       $scope.cardnumber ="";
      jQuery('#pageofacilcheckout').css("display", "none");
      jQuery('#pageofacilcheckout1').css("display", "none");
      jQuery('#pageofacilcheckout2').css("display", "none");
      jQuery('#supermarketcheckout').css("display", "none");


     }

    }

    $scope.bookingConfrimed = function() {
var translateData = $sessionStorage.translateData;
var seatselect =$sessionStorage.seatselect;
//alert(jQuery("#chks").prop("checked"));
//alert($scope.paymenttype);
    
        if ($sessionStorage.CUSTOMERID == undefined && $scope.getcheckoutid=="N") {

              swal(JSON.parse(translateData).bookingConAlert, " ", "warning");
           // swal("Please login to book tickets", " ", "warning");
            return false;
        } else if ( $scope.totalpassengers != fwtotalseats && fwtotalseats!=0) {
              swal(JSON.parse(translateData).bookingConseatAlert, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers", " ", "warning");
            return false;

        } 
       else if ($scope.totalpassengers1 != bktotalseats && bktotalseats!=0) {
              swal(JSON.parse(translateData).bookingConreturnAlert, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers for return trip", " ", "warning");
            return false;

        } 
        else if ($scope.paymenttype =="-1")
        {
          swal(JSON.parse(translateData).PaymenttypeAlert, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers for return trip", " ", "warning");
            return false;

        }
         else if ($scope.paymenttype =="MARKETCASH" && jQuery("#chks").prop("checked")==false)
        {
          swal($rootScope.MarketChkLabel, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers for return trip", " ", "warning");
            return false;

        }
       
       
         if($scope.paymenttype =="ONLINE" && ($scope.cardholdername ==undefined || $scope.cardholdername.length==0))
         {
          swal($rootScope.cardholderAlert, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers for return trip", " ", "warning");
            return false;
         }
         else if($scope.paymenttype =="ONLINE" && ($scope.cardholderlastname ==undefined || $scope.cardholderlastname.length==0))
         {
          swal($rootScope.cardholderlastAlert, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers for return trip", " ", "warning");
            return false;
         }
          else if($scope.paymenttype =="ONLINE" && ($scope.cardholderemail ==undefined || $scope.cardholderemail.length==0))
         {
          swal($rootScope.cardholderemailAlert, " ", "warning");
           // swal("Seat selected is not equal to the no.of passengers for return trip", " ", "warning");
            return false;
         }
         else if($scope.paymenttype =="ONLINE" && ($scope.cardholderaddress ==undefined || $scope.cardholderaddress.length==0))
         {
          swal($rootScope.cardholderaddAlert, " ", "warning");
		 // swal("Please enter card holder address", " ", "warning");
            return false;
         }
          else if($scope.paymenttype =="ONLINE" && ($scope.cardholderhone ==undefined || $scope.cardholderhone.length==0))
         {
          swal($rootScope.cardholderphoneAlert, " ", "warning");
		  //swal("Please enter card holder phone", " ", "warning");
            return false;
         }
          else if($scope.paymenttype =="ONLINE" && ($scope.expirymonth ==undefined || $scope.expirymonth.length==0))
         {
          swal($rootScope.cardexpmntAlert, " ", "warning");
		  //swal("Please enter expiry month", " ", "warning");
            return false;
         }
         else if($scope.paymenttype =="ONLINE" && ($scope.expiryyear ==undefined || $scope.expiryyear.length==0))
         {
          swal($rootScope.cardexpyrAlert, " ", "warning");
		  //swal("Please enter expiry year", " ", "warning");
      
            return false;
         }
         else if($scope.paymenttype =="ONLINE" && ($scope.cvv ==undefined || $scope.cvv.length==0))
         {
          swal($rootScope.cvvAlert, " ", "warning");
		  //swal("Please enter  cvv number ", " ", "warning");
          
            return false;
         }
         else if($scope.paymenttype =="ONLINE" && ($scope.cardnumber ==undefined || $scope.cardnumber.length==0))
         {
          swal($rootScope.creditcardAlert, " ", "warning");
		 // swal("Please enter  credit card number ", " ", "warning");
          
            return false;
         }
         

        else {
              

            var fname = $scope.fistname;
            var lname = $scope.lastname;
            var address = $scope.address;
            var dob = $scope.dob;
            var emailid = $scope.emailid;
            var verifyemailid = $scope.verifyemailid;
            var gender = $scope.gender;
            var code = $scope.ccode;
            var phone = $scope.phone;
            var typeofdoc = $scope.typeofdoc;
            var docnumber = $scope.docnumber;
            var cardholdername =$scope.cardholdername;
            var cardholderlastname=$scope.cardholderlastname;
            var cardholderemail =$scope.cardholderemail;
            var cardholderaddress =$scope.cardholderaddress;
            var cardholderhone =$scope.cardholderhone;
            var expirymonth =$scope.expirymonth;
            var expiryyear =$scope.expiryyear;
            var cardnumber =$scope.cardnumber;
            var cvv =$scope.cvv;

            if($scope.paymenttype =="MARKETCASH")
            {
              cardholdername ="";
              cardholderlastname="";
              cardholderemail="";
              cardholderaddress="";
              cardholderhone="";
              expirymonth="";
              expiryyear="";
              cvv="";
              cardnumber ="";

            }

    $scope.flag = 1;
    
      var translateData = $sessionStorage.translateData;
		 if($scope.fistname==undefined || $scope.fistname==''){	  
				   swal($scope.firstNameAlert, " ", "warning");

        		     return false;							
		 } 
		 if($scope.lastname==undefined || $scope.lastname==''){	
		     	swal($scope.lastNameAlert, " ", "warning");	
     return false;
		 } 
		 if($scope.address==undefined || $scope.address==''){	
              swal($scope.addressAlert, " ", "warning");	
                 return false;
		 } 
		 if($scope.dob==undefined || $scope.dob==''){	
             swal($scope.dobAlert, " ", "warning");	
                  return false;
		 } 
		 
		  var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  
		 if($scope.emailid==undefined || $scope.emailid==''){	
		    swal($scope.emailAlert, " ", "warning");		
                  return false;
		 }
         else if(!emailRegExp.test($scope.emailid)){
			 swal($scope.emailvalidAlert, " ", "warning");
		     return false;
			 }		 
			 
		 if($scope.verifyemailid==undefined || $scope.verifyemailid==''){
			  swal($scope.verifyemailAlert, " ", "warning");	
                return false;
		 } 		
         else if(!emailRegExp.test($scope.verifyemailid)){
			   swal($scope.verifyvalidemailAlert, " ", "warning");		
			     return false;				
			 }	
	     else if($scope.emailid!=$scope.verifyemailid){
			 swal($scope.validemailAlert, " ", "warning");	
			     return false;	
		 }
		 if($scope.gender==undefined || $scope.gender=='' || $scope.gender==-1){
			  swal($scope.genderAlert, " ", "warning");	
                 return false;
		 } 
		 if($scope.ccode==undefined || $scope.ccode==''){
			 swal($scope.countryAlert, " ", "warning");	
                return false;
		 }
		
		  var phoneRegExp = /^\d*$/;
		 if($scope.phone==undefined || $scope.phone==''){
             swal($scope.phoneAlert, " ", "warning");				 	
                return false;
		 }      
         else  if(!phoneRegExp.test($scope.phone)){
			 swal($scope.phonevalidAlert, " ", "warning");	
		     return false;
		   }   
		  
	   

     if(seatselect==0)
                {
                   $scope.forwardseats =null; 
                   $scope.returnseats=null;
                }
		 
		 if($scope.flag == 1)
		 {
			
		

            var ticketarray = [];

            var ticketdata = {

                departuretime: $scope.departure1,
                arrivaltime: $scope.arrival1,
                companyid: $scope.companyid1,
                depdate: $scope.depdate1,
                arrdate: $scope.arrdate1,
                vehid: $scope.vehid1,
                adult: $scope.totaladult,
                child: $scope.totalchild,
                retired: $scope.totalretired,
                adultticketprice: $scope.adultticketprice,
                childticketprice: $scope.childticketprice,
                retiredticketprice: $scope.retiredticketprice,
                promocode: $scope.promocode1,
                promoamount: $scope.promoamount1,
                charges: $scope.charges1,
                taxes: $scope.taxes1,
                seats: $scope.forwardseats,
                pickup :$scope.pickup1,
                drop:$scope.drop1

            }
            ticketarray.push(ticketdata);
            if ($scope.vehid2 != "") {
                var ticketdata1 = {

                    departuretime: $scope.departure2,
                    arrivaltime: $scope.arrival2,
                    companyid: $scope.companyid2,
                    depdate: $scope.depdate2,
                    arrdate: $scope.arrdate2,
                    vehid: $scope.vehid2,
                    adult: $scope.totaladult1,
                    child: $scope.totalchild1,
                    retired: $scope.totalretired1,
                    adultticketprice: $scope.adultticketprice1,
                    childticketprice: $scope.childticketprice1,
                    retiredticketprice: $scope.retiredticketprice1,
                    promocode: $scope.promocode2,
                    promoamount: $scope.promoamount2,
                    charges: $scope.charges1,
                    taxes: $scope.taxes1,
                    seats: $scope.returnseats,
                    pickup :$scope.pickup2,
                    drop:$scope.drop2

                }

                ticketarray.push(ticketdata1);
            }
            var travelfromdate ="N";
            if($sessionStorage.fromdate !="N"){
            var traveldate = new Date($sessionStorage.fromdate);
            var month = (traveldate.getMonth() + 1);
            var day = traveldate.getDate();
            var year = traveldate.getFullYear();

            var travelfromdate = year + "-" + month + "-" + day;
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
                 var custid =0;
                if($sessionStorage.CUSTOMERID !=undefined)
                {
                    custid =$sessionStorage.CUSTOMERID;

                }




            var insertdata = {
                fname: fname,
                lname: lname,
                address: address,
                dob: dob,
                emailid: emailid,
                gender: gender,
                code: code,
                phone: phone,
                typeofdoc: typeofdoc,
                docnumber: docnumber,
                fromcityid: $sessionStorage.locid,
                tocityid: $sessionStorage.toid,
                ticket: ticketarray,
                totalamount: $scope.totalamount,
                taxarray: $scope.taxarray,
                totalcharges: $scope.totalcharges,
                totalprice: $scope.totalprice,
                totalseats: $scope.totalseats,
                transactionamount: $scope.transactionamount,
                transactionsatus: $scope.transstatus,
                transdate: $scope.transdate,
                transtime: $scope.transtime,
                transnumber: $scope.transnumber,
                transname: $scope.transname,
                transemail: $scope.transemail,
                customerid: custid,
                travelfromdate: travelfromdate,
                traveltodate: traveltodate,
                totaldiscount: $scope.totaldiscount,
                totaltaxes: $scope.totaltaxes,
                paymenttype :$scope.paymenttype,
                getcheckoutid:$scope.getcheckoutid,
                cardholdername:cardholdername,
                cardholderlastname:cardholderlastname,
                cardholderemail:cardholderemail,
                cardholderaddress:cardholderaddress,
                cardholderhone:cardholderhone,
                expirymonth:expirymonth,
                expiryyear:expiryyear,
                cvv:cvv,
                cardnumber:cardnumber


            }
            console.log("JSON" + JSON.stringify(insertdata));
            jQuery('#mydiv').show();
            userFactory.createbooking(insertdata).success(function(data) {

                if (data.success == "SUCCESS") {
                    $scope.recordslist =[];
                    jQuery('#mydiv').hide();
                    $sessionStorage.bookingId = data.bookingid;
                    $sessionStorage.sendmail ="Y";
                     $scope.guestlogin =false;
                     $scope.getcheckoutid  ="N";
                    $sessionStorage.guestcheckoutid =undefined;
                    $state.go("confirmation");


                } else {
                    if(data.reason=="-2")
                    {
                        if($sessionStorage.selectedseatarray.length==0 && $sessionStorage.selectedseatarrayreturn.length==0 )
                        {
							        swal(JSON.parse(translateData).confbookAlert, " ", "warning");
                       // swal("Your booking has expired.Please block your seats again to confirm booking", " ", "warning");
                         
                        $scope.confirmbooking = true;
                       }else{
                         
                        swal(JSON.parse(translateData).confbookAlert, " ", "warning");
                       // swal("Your booking has expired.Please block your seats again to confirm booking", " ", "warning");
               
                        $state.go("seats");
                       }

                    }else{
                         
                        swal(JSON.parse(translateData).failbookAlert, " ", "warning");
                  // swal("Failed to book your seats .Please call our cutomer care for quick booking or try after some time.", " ", "warning");
                    }
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
            

        }

        }
    }

    $scope.timercounter = 180;

    $scope.onTimeout = function() {
        if ($scope.timercounter == 0) {
            $timeout.cancel(mytimeout);
        } else {
            $scope.timercounter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
    }
    $scope.blockseats = function() {
var translateData = $sessionStorage.translateData;
       
        if ($sessionStorage.CUSTOMERID == undefined && $scope.getcheckoutid=="N") {

           
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
                        }
						
						
						  var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					
				        if(!emailRegExp.test(inputValue)) {
                        swal.showInputError($rootScope.emailvalidAlert);
                        return false
                        }
						
						
						else{
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
       continuebook();

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

          continuebook();

        }


    }

    function continuebook()
    {

         var travelfromdate ="N";
             if($sessionStorage.fromdate !="N"){
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
            var seats = $scope.totalpassengers;
            var seats1 = $scope.totalpassengers1;

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
                customerid:custid,
                forwardseats: "",
                forwardpositions: "",
                backwardseats: "",
                backwardpositions: "",
                topforwardseats: "",
                topforwardpositions: "",
                topbackwardseats: "",
                topbackwardpositions: ""

            }

            userFactory.blockseats(reqparams).success(function(data) {

                if (data.success == 4) {
                   //  swal("Seats blocked successfully", " ", "success");
                   swal(JSON.parse(translateData).reqparamsAlert, " ", "success");

                    $scope.confirmbooking = true;
                    var mytimeout = $timeout($scope.onTimeout, 1000);

                } else if (data.success == -1) {
                     //  swal("Failed to block the seats", " ", "warning");
                     swal(JSON.parse(translateData).reqparamsfailAlert, " ", "warning");

                } else if (data.success == -2 || data.success == -5) {
                    //  swal("Seats not available", " ", "warning");
                       swal(JSON.parse(translateData).reqparamsavlAlert, " ", "warning");

                } else if (data.success == -3) {
                    // swal("Selected seats is more than the available seats", " ", "warning");
                   swal(JSON.parse(translateData).reqparamsmoreavlAlert, " ", "warning");
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


    $scope.validatepromocode = function() {

        var company = $scope.companyid1
        var promocode = $scope.promocode1;
        if ($sessionStorage.CUSTOMERID == undefined) {

              swal(JSON.parse(translateData).bookingConAlert, " ", "warning");
           // swal("Please login to book tickets", " ", "warning");
            return false;
        }else{

          if(promocode==undefined || promocode.length==0)
          {
             swal("Please enter promocode", " ", "warning");
            return false;

          }
          if(promocode.length>0 && promocode ==$scope.promocode2)
          {
            swal("Promocode already applied", " ", "warning");
            $scope.promocode1 ="";
            return false;

          }

        var reqparams = {
            promocode: promocode,
            companyid: company,
            customerid:$sessionStorage.CUSTOMERID

        }
        $scope.promoamount1 = 5;

        $scope.oldtotalprice = $scope.totalticketprice;


        userFactory.validatepromocode(reqparams).success(function(data) {
              
            if (data.length>0) {

                var discounttype = data[0].DISCOUNT_TYPE;

                if (discounttype == "Flat") {
                    $scope.promoamount1 = data[0].DISCOUNT_AMOUNT;

                    $scope.totalticketprice = Math.round($scope.totalticketprice - $scope.promoamount1);
                     //$scope.totalticketprice =$scope.totalticketprice.toFixed(2);
                    $scope.totaldiscount = Math.round($scope.totaldiscount + $scope.promoamount1);
                   // $scope.totaldiscount = $scope.totaldiscount.toFixed(2);
                    $scope.promoapplied1 = true;

                } else {
                    var per = ((data[0].DISCOUNT_AMOUNT / 100).toFixed(2));

                    
                    $scope.promoamount1 = (per * $scope.totalticketprice).toFixed(2);

                     $scope.totalticketprice = parseFloat($scope.totalticketprice) - parseFloat($scope.promoamount1);
                     $scope.totalticketprice =Math.round($scope.totalticketprice);
                  
                    $scope.totaldiscount = parseFloat($scope.totaldiscount) + parseFloat($scope.promoamount1);
                    $scope.totaldiscount = Math.round($scope.totaldiscount);
                    $scope.promoapplied1 = true;

                }

                if ($scope.companyfees.length > 0) {

                    for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees[indx].COMISSION_FEES;

                        var carchge = ((feesamount / 100).toFixed(2));


                        
                        $scope.charges1 = +(Math.round(carchge * $scope.totalticketprice));


                    }
                }
                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                        $scope.totalprice = Math.round($scope.totalprice);

                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                    $scope.tax1 = +(Math.round(tax * $scope.totalticketprice));


                    var indtaxes = {
                        tax: $scope.taxdata[inx].TAX_NAME,
                        taxpercentage: taxpercentage,
                        taxmount: $scope.totaltaxes

                    }

                    $scope.taxarray.push(indtaxes);

                }

                $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);

               $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                        $scope.totalamount = Math.round($scope.totalamount);



            } else {

               swal(JSON.parse(translateData).promAlert, " ", "warning");
               // swal("Invalid promotional offer code.", " ", "warning");
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


    }

    $scope.validatepromocodeReturn = function() {

        var company = $scope.companyid2;
        $scope.promocode2 =jQuery('#promocode2').val();
        var promocode = $scope.promocode2;
        if ($sessionStorage.CUSTOMERID == undefined) {

              swal(JSON.parse(translateData).bookingConAlert, " ", "warning");
           // swal("Please login to book tickets", " ", "warning");
            return false;
        }else{
          
            if(promocode ==undefined || promocode.length==0)
          {
             swal("Please enter promocode", " ", "warning");
            return false;

          }
          if(promocode.length>0 && promocode ==$scope.promocode1)
          {
            swal("Promocode already applied", " ", "warning");
            jQuery('#promocode2').val('');
            return false;

          }



        var reqparams = {
            promocode: promocode,
            companyid: company,
            customerid:$sessionStorage.CUSTOMERID

        }


        userFactory.validatepromocode(reqparams).success(function(data) {

            if (data.length>0) {

                var discounttype = data[0].DISCOUNT_TYPE;
                $scope.oldtotalprice1 = $scope.totalticketprice1;

                if (discounttype == "Flat") {



                    $scope.promoamount2 = data[0].DISCOUNT_AMOUNT;

                    $scope.totalticketprice1 = parseFloat($scope.totalticketprice1) - parseFloat($scope.promoamount2);
                   $scope.totalticketprice1 =Math.round($scope.totalticketprice1);
                   $scope.totaldiscount = parseFloat($scope.totaldiscount) + parseFloat($scope.promoamount2);
                    $scope.totaldiscount = Math.round($scope.totaldiscount);
                    $scope.promoapplied2 = true;

                } else {
                    var per = ((data[0].DISCOUNT_AMOUNT / 100).toFixed(2));

                    $scope.promoamount2 = Math.round(per * $scope.totalticketprice1);

                    $scope.totalticketprice1 = $scope.totalticketprice1 - $scope.promoamount2;
                    $scope.totaldiscount = parseFloat($scope.totaldiscount) + parseFloat($scope.promoamount2);
                    $scope.totaldiscount = Math.round($scope.totaldiscount);
                    $scope.promoapplied2 = true;

                }

                if ($scope.companyfees.length > 0) {

                    for (var indx = 0; indx < $rootScope.companyfees1.length; indx++)

                    {

                        var feesamount = $rootScope.companyfees1[indx].COMISSION_FEES;

                        var carchge =((feesamount / 100).toFixed(2));

                          $scope.charges2 = +(Math.round(carchge * $scope.totalticketprice1));

                          

                    }
                }
                $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                        $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                        $scope.totalprice = Math.round($scope.totalprice);
               
                for (var inx = 0; inx < $scope.taxdata; inx++) {

                    var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

                    var tax = ((taxpercentage / 100).toFixed(2));


                    //alert(carchge);

                   $scope.tax2 = +(Math.round(tax * $scope.totalticketprice1));

                    var indtaxes = {
                        tax: $scope.taxdata[inx].TAX_NAME,
                        taxpercentage: taxpercentage,
                        taxmount: $scope.totaltaxes

                    }

                    $scope.taxarray.push(indtaxes);

                }

             $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                        $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                        $scope.totalamount = Math.round($scope.totalamount);


            } else {

               // alert("Invalid promotional offer code. ");
                 swal(JSON.parse(translateData).promAlert, " ", "warning");
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

    }

    $scope.resetpromocode = function() {
        $scope.promoamount1 = 0;
        $scope.promocode1 = "";
        $scope.totaldiscount =0;  
        $scope.totalticketprice = $scope.oldtotalprice;

        $scope.totaldiscount = $scope.totaldiscount + $scope.promoamount1;
        $scope.promoapplied1 = false;
        if ($scope.companyfees.length > 0) {

            for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

            {

                var feesamount = $rootScope.companyfees[indx].COMISSION_FEES;

                var carchge = ((feesamount / 100).toFixed(2));


                $scope.charges1 = +(Math.round(carchge * $scope.totalticketprice));



            }
        }
       $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                        $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                        $scope.totalprice = Math.round($scope.totalprice);

        for (var inx = 0; inx < $scope.taxdata; inx++) {

            var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

            var tax = ((taxpercentage / 100).toFixed(2));


            //alert(carchge);

            $scope.tax1 = +(Math.round(tax * $scope.totalticketprice));

            var indtaxes = {
                tax: $scope.taxdata[inx].TAX_NAME,
                taxpercentage: taxpercentage,
                taxmount: $scope.totaltaxes

            }

            $scope.taxarray.push(indtaxes);

        }

       $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                        $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                        $scope.totalamount = Math.round($scope.totalamount);



    }

    $scope.resetpromocodeReturn = function() {
        $scope.promoamount2 = 0;
        $scope.promocode2 = "";
         $scope.totaldiscount =0;
        $scope.totalticketprice1 = $scope.oldtotalprice1;
        $scope.totaldiscount = $scope.totaldiscount + $scope.promoamount2;
        $scope.promoapplied2 = false;
        if ($scope.companyfees.length > 0) {

            for (var indx = 0; indx < $rootScope.companyfees.length; indx++)

            {

                var feesamount = $rootScope.companyfees[indx].COMISSION_FEES;

                 var carchge = ((feesamount / 100).toFixed(2));


                $scope.charges2 = +(Math.round(carchge * $scope.totalticketprice1));




            }
        }
       
       $scope.totalcharges = parseFloat($scope.charges1) + parseFloat($scope.charges2);
                        $scope.totalprice = parseFloat($scope.totalticketprice) + parseFloat($scope.totalticketprice1);
                        $scope.totalprice = Math.round($scope.totalprice);

        for (var inx = 0; inx < $scope.taxdata; inx++) {

            var taxpercentage = $scope.taxdata[inx].TAX_PERCENTAGE;

            var tax = ((taxpercentage / 100).toFixed(2));


            //alert(carchge);

           $scope.tax2 = +(Math.round(tax * $scope.totalticketprice1));

            var indtaxes = {
                tax: $scope.taxdata[inx].TAX_NAME,
                taxpercentage: taxpercentage,
                taxmount: $scope.totaltaxes

            }

            $scope.taxarray.push(indtaxes);

        }

        $scope.totaltaxes = parseFloat($scope.tax1) + parseFloat($scope.tax2);
                        $scope.totalamount = parseFloat($scope.totalprice) + parseFloat($scope.totalcharges) + parseFloat($scope.totaltaxes);
                        $scope.totalamount = Math.round($scope.totalamount);


    }



});