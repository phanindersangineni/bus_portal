app.controller('printticketController', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory,userFactory) {
   
  $rootScope.ticketheader =true;
  $rootScope.mainheader =false;

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "none");
    jQuery('#mainheader1').css("display", "none");
    jQuery('.collapse').collapse("hide");

      if($sessionStorage.isAuthenticate =="Y")
      {
         $rootScope.login =true;
        }else{
             $rootScope.login =false;
        }

       var resdata ={
    	bookingid :$sessionStorage.bookingId,
     	customerid: $sessionStorage.CUSTOMERID
     }




     jQuery('#mydiv').show(); 


         userFactory.getbookingdetails(resdata).success(function(data) {
      
         $scope.bookingdetails =data;
 
     userFactory.getticketdetails(resdata).success(function(data) {
             $scope.ticketdetails =data;
            
         userFactory.gettaxdetails(resdata).success(function(data) {
               $scope.taxdetails =data;

               userFactory.getpaymentdetails(resdata).success(function(data) {
                    $scope.paymentdetails =data;

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


         $scope.printticket =function()
         {
           
         	 $window.print();
         }
 
 
 
	});