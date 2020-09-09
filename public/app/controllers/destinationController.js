app.controller('destinationController', function($scope,$filter, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window,
  commonFactory, userFactory) {
  $rootScope.mainheader = false;
  if ($sessionStorage.isAuthenticate == "Y") {
    $rootScope.login = true;
  } else {
    $rootScope.login = false;
  }


  $scope.currentPage = 0;
  $scope.pageSize = 8;
    $scope.data = [];
    $scope.q = '';



  jQuery('#headerid').css("display", "none");
  jQuery('#mainheader').css("display", "block");
  jQuery('#mainheader1').css("display", "block");
  jQuery('.collapse').collapse("hide");
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
  var resdatas = {
  }
  commonFactory.fromlocation(resdatas).success(function(data) {
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
  $sessionStorage.pageno = 1;
  var routedata1 = {
    fromlocation: "N",
    tolocation: "N",
    traveldate: "N",
    returndate: "N",
    pageno: $sessionStorage.pageno,
    count: "Y"
  }
  jQuery('#mydiv').show();
   
    $scope.bigCurrentPage = 1;
    var routedata = {
      fromlocation: "N",
      tolocation: "N",
      traveldate: "N",
      returndate: "N",
      pageno: $sessionStorage.pageno,
      count: "Y"
    }
    userFactory.getalldefaultdestinations(routedata).success(function(data) {
      $rootScope.allpopularroutes = data;
      $scope.data =data;
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

  
  $scope.getvehiclesforsearch = function(top) {
    $sessionStorage.locid = top.START_LOCATION;
    $sessionStorage.toid = top.END_LOCATION;
    $sessionStorage.travelfromlocdesc = top.STARTLOCNAME;
    $sessionStorage.traveltolocdesc = top.ENDLOCNAME;
    $sessionStorage.routeid =top.ROUTE_ID;
    if ($sessionStorage.todate == undefined) {
      $sessionStorage.todate = "N";
    }
    if ($sessionStorage.daydesc == undefined) {
      var dd = new Date(fromdate);
      var n = dd.getDay();
      if (n == 1) {
        $sessionStorage.daydesc = "MONDAY";
      }
      if (n == 2) {
        $sessionStorage.daydesc = "TUESDAY";
      }
      if (n == 3) {
        $sessionStorage.daydesc = "WEDNESDAY";
      }
      if (n == 4) {
        $sessionStorage.daydesc = "THURSDAY";
      }
      if (n == 5) {
        $sessionStorage.daydesc = "FRIDAY";
      }
      if (n == 6) {
        $sessionStorage.daydesc = "SATURDAY";
      }
      if (n == 0) {
        $sessionStorage.daydesc = "SUNDAY";
      }
    }
    $state.go("vehicles");
  }
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});