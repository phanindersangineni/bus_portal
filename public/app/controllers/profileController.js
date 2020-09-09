app.controller('profileController', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory,userFactory) {
   
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
 
 
 var translateData =  localStorage.getItem('englishTranslate');

 if($sessionStorage.languageselect!="sp")
  {
	 $rootScope.sellang ="English";
	   translateData =  $sessionStorage.translateData;
	
  }else{
     $rootScope.sellang ="Spanish";
	    translateData =  $sessionStorage.translateData;
	
  }

  
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


     var resdata={

      }
 
    commonFactory.getalllanguage(resdata).success(function(data) {
    
          $scope.alllanguages=data;       
      
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
       
      commonFactory.getallCountriesForUser(resdata).success(function(data) {
          $scope.allCountries =data;
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

         commonFactory.getallCityForUser(resdata).success(function(data) {
          $scope.allCities =data;
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

      $scope.getcitiesbycountry = function(countryid) {
      $scope.citiesbycountry = [];
      for (var indx = 0; indx < $scope.allcities.length; indx++) {
        if ($scope.allcities[indx].COUNTRY_ID == countryid) {
          $scope.citiesbycountry.push({
            ID: $scope.allcities[indx].ID,
            NAME: $scope.allcities[indx].NAME
          })
        }
      }
    }
     
                  
            var resdata =
                  {
              customerid :$sessionStorage.CUSTOMERID
                  }
                //alert(customerid); 
         userFactory.getCustomerID(resdata).success(function(data) {
                  
                 $scope.firstname = data[0].FIRST_NAME;
                 $scope.lastname = data[0].LAST_NAME;
                 $scope.address = data[0].ADDRESS;
                 $scope.email = data[0].EMAIL;
                 
                 if(data[0].COUNTRY_ID==0)
                 {
                  $scope.countryid ="-1";
                 }else{
                 $scope.countryid = data[0].COUNTRY_ID;
               }
               if(data[0].LANGUAGE_ID==0)
                 {
                  $scope.languageid ="-1";
                 }else{
                 $scope.languageid = data[0].LANGUAGE_ID;
               }

               if(data[0].COMPANY==0)
               {
                $scope.company = "";
               }else{
                $scope.company = data[0].COMPANY;
               }

                
              
               if(data[0].CITY_ID==0)
                 {
                  $scope.cityid ="-1";
                 }else{
                 $scope.cityid = data[0].CITY_ID;
               }


                 
                 $scope.telephone =data[0].TELEPHONE;
                 $scope.customerid =$sessionStorage.CUSTOMERID;
                 $scope.cityname = data[0].CITYNAME;
                 $scope.countryname = data[0].CNNAME;
                 $scope.languagename = data[0].LNGNAME;
                
             
                                         
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



   $scope.updatebutton = function() {
          
  //  alert("button");
    
    
    var requestData = {

      firstname:$scope.firstname,
      lastname: $scope.lastname,
      email:$scope.email,
      telephone:$scope.telephone,
      languageid:$scope.languageid,
      cityid:$scope.cityid,
      countryid: $scope.countryid,
      address:$scope.address,
      company :$scope.company,
      active: 1,
      userid:$scope.userid,
      customerid :$sessionStorage.CUSTOMERID

      };

    $scope.flag = 1;
	
		var translateData = $sessionStorage.translateData;
		
	 if($scope.firstname==undefined || $scope.firstname==''){
		
	
		             $scope.firstnameErrorMsg = JSON.parse(translateData).firstNameValid;
                                   jQuery("#firstnameErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#firstnameErrorDiv").hide();
                                    },4000);	
              $scope.flag = 0;
		 }
		 
	 if($scope.lastname==undefined || $scope.lastname==''){	
	 $scope.lastnameErrorMsg = JSON.parse(translateData).lastNameValid;
		              //$scope.lastnameErrorMsg = "Last name is mandatory!";
                                   jQuery("#lastnameErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#lastnameErrorDiv").hide();
                                    },4000);	
              $scope.flag = 0;
		 }
		 
	
	  var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  
		 if($scope.email==undefined || $scope.email==''){	
$scope.emailErrorMsg = JSON.parse(translateData).emailValid;		 
		              //$scope.emailErrorMsg = "Email is mandatory!";
                                   jQuery("#emailErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#emailErrorDiv").hide();
                                    },4000);	
              $scope.flag = 0;
		 }
         else if(!emailRegExp.test($scope.email)){
			  $scope.emailErrorMsg = JSON.parse(translateData).email1Valid;
				    //$scope.emailErrorMsg = "Please enter valid email id!";
                                   jQuery("#emailErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#emailErrorDiv").hide();
                                    },4000);	
				$scope.flag = 0;
			 }	 
		

        var phoneRegExp = /^\d*$/;
		 if($scope.telephone==undefined || $scope.telephone==''){		
 $scope.telephoneErrorMsg = JSON.parse(translateData).phoneValid;		 
		             // $scope.telephoneErrorMsg = "Telephone number is mandatory!";
                                   jQuery("#telephoneErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#telephoneErrorDiv").hide();
                                    },4000);	
             $scope.flag = 0;
		 }      
         else  if(!phoneRegExp.test($scope.telephone)){
			   $scope.telephoneErrorMsg = JSON.parse(translateData).phone1Valid;
			//$scope.telephoneErrorMsg = "Telephone number should be digts only!";
                                   jQuery("#telephoneErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#telephoneErrorDiv").hide();
                                    },4000);
				$scope.flag = 0;
		   }  

		  
          if($scope.address==undefined || $scope.address==''){	
 $scope.addressErrorMsg = JSON.parse(translateData).addressValid;		  
		              //$scope.addressErrorMsg = "Address is mandatory!";
                                   jQuery("#addressErrorDiv").show();
                                   $timeout(function(){
                                   jQuery("#addressErrorDiv").hide();
                                    },4000);	
             $scope.flag = 0;
		 }      		  
			 
			 
      if($scope.flag == 1) {
		  var translateData = $sessionStorage.translateData;
		commonFactory.addorupdatecustomer(requestData).success(function(data) {

  //  alert(JSON.stringify(data));
    
      $timeout(function(){

                if (data.success == 'SUCCESS') {
                  swal(JSON.parse(translateData).prfswlAlert, " ", "success");
                //  swal("Profile updated successfully", " ", "success");
               
  
                } else {
                    swal(JSON.parse(translateData).failedswlAlert, " ", "warning");
                //    swal("Failed to update profile", " ", "warning");
                }
                $scope.actors = data;

          $state.go('profile');
                  },1000);

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
	  }//if
  
 }            
  
 
 
	});