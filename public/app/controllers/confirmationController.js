app.controller('confirmationController', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory,
  $window, commonFactory, userFactory) {
  $rootScope.mainheader = false;
  jQuery('#headerid').css("display", "none");
  jQuery('#mainheader').css("display", "block");
  jQuery('#mainheader1').css("display", "block");
  jQuery('.collapse').collapse("hide");
  if ($sessionStorage.isAuthenticate == "Y") {
    $rootScope.login = true;
  } else {
    $rootScope.login = false;
  }
  var frlocid = $sessionStorage.locid;
  var tolocid = $sessionStorage.toid;
  var fromdate = $sessionStorage.fromdate;
  var daydesc = $sessionStorage.daydesc;
  var todate = $sessionStorage.todate;
  var todesc = $sessionStorage.todesc;
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
  if (fromdate != "N") {
    jQuery('#trdate').val(fromdate);
  }
  if (todate != "N") {
    jQuery('#rtdate').val(todate);
  }
  // document.getElementById("trdate").value = fromdate;
  commonFactory.fromlocation(resdata).success(function(data) {
    $rootScope.allfromloc = data;
    $rootScope.frlocid = frlocid;
  }).error(function(data, status, headers, config) {
    if (status == 429) {
      swal($rootScope.ManyRequestErrorLabel, " ", "warning");
      jQuery('#mydiv').hide();
      $state.go("error");
    } else {
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
      if (status == 429) {
        swal($rootScope.ManyRequestErrorLabel, " ", "warning");
        jQuery('#mydiv').hide();
        $state.go("error");
      } else {
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
  $scope.canshow = true;
  if ($sessionStorage.FromMyBookings != undefined) {
    $scope.canshow = false;
  }
  var resdata = {
    bookingid: $sessionStorage.bookingId,
    customerid: $sessionStorage.CUSTOMERID
  }
  getalldetails();
  $scope.sendmail =false;
  
  function getalldetails () {
    jQuery('#mydiv').show();
  userFactory.getbookingdetails(resdata).success(function(data) {
    $scope.bookingdetails = data;
    userFactory.getticketdetails(resdata).success(function(data) {
      $scope.ticketdetails = data;
      userFactory.gettaxdetails(resdata).success(function(data) {
        $scope.taxdetails = data;
        userFactory.getpaymentdetails(resdata).success(function(data) {
          $scope.paymentdetails = data;
           

            if($sessionStorage.sendmail =="Y"){
          var maildata ={

           bookingdetails :$scope.bookingdetails,
           ticketdetails: $scope.ticketdetails,
           taxdetails:$scope.taxdetails,
           paymentdetails:$scope.paymentdetails,
           mailid :"N"

          }
          //alert("Send mail during booking");
       userFactory.sendbookingmail(maildata).success(function(data) {
        
              $sessionStorage.sendmail ="N";
       });
     }



          jQuery('#mydiv').hide();
        }).error(function(data, status, headers, config) {
          if (status == 429) {
            swal($rootScope.ManyRequestErrorLabel, " ", "warning");
            jQuery('#mydiv').hide();
            $state.go("error");
          } else {
            swal($rootScope.OtherErrorLabel, " ", "warning");
            jQuery('#mydiv').hide();
            $state.go("error");
          }
        });
      }).error(function(data, status, headers, config) {
        if (status == 429) {
          swal($rootScope.ManyRequestErrorLabel, " ", "warning");
          jQuery('#mydiv').hide();
          $state.go("error");
        } else {
          swal($rootScope.OtherErrorLabel, " ", "warning");
          jQuery('#mydiv').hide();
          $state.go("error");
        }
      });
    }).error(function(data, status, headers, config) {
      if (status == 429) {
        swal($rootScope.ManyRequestErrorLabel, " ", "warning");
        jQuery('#mydiv').hide();
        $state.go("error");
      } else {
        swal($rootScope.OtherErrorLabel, " ", "warning");
        jQuery('#mydiv').hide();
        $state.go("error");
      }
    });
  }).error(function(data, status, headers, config) {
    if (status == 429) {
      swal($rootScope.ManyRequestErrorLabel, " ", "warning");
      jQuery('#mydiv').hide();
      $state.go("error");
    } else {
      swal($rootScope.OtherErrorLabel, " ", "warning");
      jQuery('#mydiv').hide();
      $state.go("error");
    }
  });

}

$scope.sendmail =function()
{
  var emailid =$scope.maildata;
  if (emailid.length == 0 || emailid == undefined) {
       swal($rootScope.invalidemailid, " ", "warning");
               
    }else{

    var maildata ={

           bookingdetails :$scope.bookingdetails,
           ticketdetails: $scope.ticketdetails,
           paymentdetails:$scope.paymentdetails,
           mailid:emailid

          }
       
       userFactory.sendbookingmail(maildata).success(function(data) {
        
        swal($rootScope.MailSentLabel, " ", "success");
        jQuery('#soap-popupbox').css('display', 'none');

       });
     }

}

  $scope.tagref =function()
  {

    var mobileno = $scope.guestnumber;
    var refid = $scope.refid;
    
     if($scope.refid==undefined)
     {
      swal($rootScope.invalidRefId, " ", "warning");
     }
     else if($scope.guestnumber==undefined)
     {
      swal($rootScope.invalidmobileValid, " ", "warning");
     }else{
        
         var res={
          bookingid:$sessionStorage.bookingId,
          referenceid:$scope.refid,
          mobileno:mobileno
        }

      userFactory.updaterefrenenceid(res).success(function(data) {

        if(data.success =="-1")
        {
          //failure
          swal($rootScope.refmessg1, " ", "warning");
        }
        else if(data.success=="-2")
        {
          //invalid refid
          swal($rootScope.refmessg2, " ", "warning");
        }else if(data.success =="-3")
        {
          //reference id already used
          swal($rootScope.refmessg3, " ", "warning");

        }else{
         //tagged successfully
         swal($rootScope.refmessg4, " ", "success");
         getalldetails();
         jQuery('#soap-popupbox').css('display', 'none');
        }
       
    }).error(function(data, status, headers, config) {
        jQuery('#soap-popupbox').css('display', 'none');
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

});