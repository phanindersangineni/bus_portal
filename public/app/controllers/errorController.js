app.controller('errorController', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory) {
    $rootScope.ticketheader =true;
  $rootScope.mainheader =false;

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "none");
    jQuery('#mainheader1').css("display", "none");
    jQuery('.collapse').collapse("hide");

});