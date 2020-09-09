app.controller('SliderController', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window,
  commonFactory, userFactory) {
  $rootScope.mainheader = true;
  $rootScope.ticketheader = false;
  jQuery('.collapse').collapse("hide");
  if ($sessionStorage.isAuthenticate == "Y") {
    $rootScope.login = true;
  } else {
    $rootScope.login = false;
  }
  $rootScope.fromlocid = "-1";
  $rootScope.tolocid = "-1";
  jQuery("#noofpass").val("1");
  var currendate = new Date();
  var month = '' + (currendate.getMonth() + 1);
  var day = '' + currendate.getDate();
  var year = currendate.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  var modifeddate = month + "/" + day + "/" + year;
  jQuery('#frdate').val(modifeddate);
  jQuery('#retdate').val('');
  //document.getElementById("frdate").value = 
  $sessionStorage.fromdate = undefined;
  $sessionStorage.todate = "N";
  jQuery('#headerid').css("display", "block");
  jQuery('#mainheader').css("display", "none");
  jQuery('#mainheader1').css("display", "none");
  var resdata = {
  }
  UserAuthFactory.generatecustomertoken().success(function(data) {
    //alert(data.token);
    $window.sessionStorage.token = data.token;
    AuthenticationFactory.isLogged = true;
    $window.sessionStorage.user = "Guest";
  commonFactory.fromlocation(resdata).success(function(data) {
    $rootScope.allfromloc = data;
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



  commonFactory.getallbusecompanyForUser(resdata).success(function(data) {
    $rootScope.allbuscompanies = data;
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


  var routedata = {
    fromlocation: "N",
    tolocation: "N",
    traveldate: "N",
    returndate: "N",
    pageno: "1",
    count: "N"
  }
  userFactory.getalldefaultdestinations(routedata).success(function(data) {
    $rootScope.allpopularroutes = data;
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
  $rootScope.onfromlocchange = function(vlocid) {
    //var locid = document.getElementById("travellocid").value;
    var resdata = {
      tolocation: vlocid
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
  $scope.getvehicles = function(top) {
    var fromdate = jQuery('#frdate').val();
    var returndate = jQuery('#retdate').val();
    var dd = new Date(fromdate);
    var n = dd.getDay();
    var daydesc = "N";
    var todesc = "N";
    if (fromdate.length > 0) {
      if (n == 1) {
        daydesc = "MONDAY";
      }
      if (n == 2) {
        daydesc = "TUESDAY";
      }
      if (n == 3) {
        daydesc = "WEDNESDAY";
      }
      if (n == 4) {
        daydesc = "THURSDAY";
      }
      if (n == 5) {
        daydesc = "FRIDAY";
      }
      if (n == 6) {
        daydesc = "SATURDAY";
      }
      if (n == 0) {
        daydesc = "SUNDAY";
      }
    }
    if (returndate.length > 0) {
      var dd1 = new Date(returndate);
      var n1 = dd1.getDay();
      var todesc = "";
      if (n1 == 1) {
        todesc = "MONDAY";
      }
      if (n1 == 2) {
        todesc = "TUESDAY";
      }
      if (n1 == 3) {
        todesc = "WEDNESDAY";
      }
      if (n1 == 4) {
        todesc = "THURSDAY";
      }
      if (n1 == 5) {
        todesc = "FRIDAY";
      }
      if (n1 == 6) {
        todesc = "SATURDAY";
      }
      if (n1 == 0) {
        todesc = "SUNDAY";
      }
    }
    $sessionStorage.locid = top.START_LOCATION;
    $sessionStorage.toid = top.END_LOCATION;
    $sessionStorage.fromdate = fromdate;
    $sessionStorage.daydesc = daydesc;
    $sessionStorage.travelfromlocdesc = top.STARTLOCNAME;
    $sessionStorage.traveltolocdesc = top.ENDLOCNAME;
    $sessionStorage.routeid =top.ROUTE_ID;
    $sessionStorage.noofseats = jQuery("#noofpass").val();
    if (returndate.length == 0) {
      $sessionStorage.todate = "N";
      $sessionStorage.todesc = "N";
    } else {
      $sessionStorage.todate = returndate;
      $sessionStorage.todesc = todesc;
    }
    $state.go("vehicles");
  }
  $rootScope.searchroutes = function() {
    var translateData = $sessionStorage.translateData;
    var locid = jQuery('#travellocid').val();
    var toid = jQuery('#travelltolocid').val();
    var fromdate = jQuery('#frdate').val();
    var returndate = jQuery('#retdate').val();
    var dd = new Date(fromdate);
    var n = dd.getDay();
    var daydesc = "N";
    var todesc = "N";
    if (locid == "-1" || locid == undefined) {
      swal(JSON.parse(translateData).loAlert, " ", "warning");
      //  swal("Please select from location", " ", "warning");
    } else if (toid == "-1" || toid == undefined) {
      swal(JSON.parse(translateData).laAlert, " ", "warning");
      // swal("Please select to location", " ", "warning");
    } else {
      if (fromdate.length > 0) {
        if (n == 1) {
          daydesc = "MONDAY";
        }
        if (n == 2) {
          daydesc = "TUESDAY";
        }
        if (n == 3) {
          daydesc = "WEDNESDAY";
        }
        if (n == 4) {
          daydesc = "THURSDAY";
        }
        if (n == 5) {
          daydesc = "FRIDAY";
        }
        if (n == 6) {
          daydesc = "SATURDAY";
        }
        if (n == 0) {
          daydesc = "SUNDAY";
        }
      } else {
        fromdate = "N";
      }
      if (returndate.length > 0) {
        var dd1 = new Date(returndate);
        var n1 = dd1.getDay();
        var todesc = "";
        if (n1 == 1) {
          todesc = "MONDAY";
        }
        if (n1 == 2) {
          todesc = "TUESDAY";
        }
        if (n1 == 3) {
          todesc = "WEDNESDAY";
        }
        if (n1 == 4) {
          todesc = "THURSDAY";
        }
        if (n1 == 5) {
          todesc = "FRIDAY";
        }
        if (n1 == 6) {
          todesc = "SATURDAY";
        }
        if (n1 == 0) {
          todesc = "SUNDAY";
        }
      }
      // var travelfromloc = document.getElementById("travellocid");
      var travelfromlocdesc = jQuery("#travellocid option:selected").text();
      //travelfromloc.options[travelfromloc.selectedIndex].text;
      //var traveltoloc = document.getElementById("travelltolocid");
      var traveltolocdesc = jQuery("#travelltolocid option:selected").text();
      $sessionStorage.locid = locid;
      $sessionStorage.toid = toid;
      $sessionStorage.fromdate = fromdate;
      $sessionStorage.daydesc = daydesc;
      $sessionStorage.travelfromlocdesc = travelfromlocdesc;
      $sessionStorage.traveltolocdesc = traveltolocdesc;
      $sessionStorage.routeid ="N";
      $sessionStorage.noofseats = jQuery("#noofpass").val();
      if (returndate.length == 0) {
        $sessionStorage.todate = "N";
        $sessionStorage.todesc = "N";
      } else {
        $sessionStorage.todate = returndate;
        $sessionStorage.todesc = todesc;
      }
      if (fromdate == "N" && $sessionStorage.todate == "N") {
        swal(JSON.parse(translateData).pdAlert, " ", "warning");
        //  swal("Please enter either travel from date or return date", " ", "warning");
        return false;
      } else {
        $state.go("vehicles");
      }
    }
  }
  $timeout(function() {
    jQuery('#mydiv').hide();
  }, 2000);
});