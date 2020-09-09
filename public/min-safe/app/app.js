var app = angular.module('CDSApp', ['ui.router', 'angularUtils.directives.dirPagination', 'chart.js', 'CDSApp.services', 'ngStorage', 'ui.bootstrap', 'ngRoute',
	'angularjs-dropdown-multiselect', '720kb.datepicker', 'ngPrint'
]);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
	$httpProvider.interceptors.push('TokenInterceptor');
	$stateProvider.state('slider', {
		controller: 'SliderController',
		url: '/slider',
		templateUrl: 'app/views/slider.ejs'
	}).
	state('vehicles', {
		controller: 'vehicleController',
		url: '/vehicles',
		templateUrl: 'app/views/vehicles.ejs'
	}).
	state('vehicles1', {
		controller: 'vehicle1Controller',
		url: '/vehicles1',
		templateUrl: 'app/views/vehicles1.ejs'
	}).
	state('booking', {
		controller: 'bookingController',
		url: '/booking',
		templateUrl: 'app/views/booking.ejs'
	}).
	state('confirmation', {
		controller: 'confirmationController',
		url: '/confirmation',
		templateUrl: 'app/views/confirmation.ejs'
	}).
	state('printticket', {
		controller: 'printticketController',
		url: '/printticket',
		templateUrl: 'app/views/printticket.ejs'
	}).
	state('destinations', {
		controller: 'destinationController',
		url: '/destinations',
		templateUrl: 'app/views/destinations.ejs'
	}).
	state('dashboard', {
		controller: 'dashboardController',
		url: '/dashboard',
		templateUrl: 'app/views/dashboard.ejs'
	}).
	state('profile', {
		controller: 'profileController',
		url: '/profile',
		templateUrl: 'app/views/profile.ejs'
	}).
	state('mybooking', {
		controller: 'mybookingsController',
		url: '/mybooking',
		templateUrl: 'app/views/mybookings.ejs'
	}).
	state('settings', {
		controller: 'settingsController',
		url: '/settings',
		templateUrl: 'app/views/settings.ejs'
	}).
	state('about', {
		controller: 'staticdataController',
		url: '/about',
		templateUrl: 'app/views/about.ejs'
	}).
	state('termsconditions', {
		controller: 'staticdataController',
		url: '/termsconditions',
		templateUrl: 'app/views/termsconditions.ejs'
	}).
	state('travelcondition', {
		controller: 'staticdataController',
		url: '/travelcondition',
		templateUrl: 'app/views/travelcondition.ejs'
	}).
	state('privacypolicy', {
		controller: 'staticdataController',
		url: '/privacypolicy',
		templateUrl: 'app/views/privacypolicy.ejs'
	}).
	state('frequentquestions', {
		controller: 'staticdataController',
		url: '/frequentquestions',
		templateUrl: 'app/views/frequentquestions.ejs'
	}).
	state('editprofile', {
		controller: 'profileController',
		url: '/editprofile',
		templateUrl: 'app/views/editprofile.ejs'
	}).
	state('seats', {
		controller: 'seatController',
		url: '/seats',
		templateUrl: 'app/views/seats.ejs'
	}).
	state('error', {
		controller: 'errorController',
		url: '/error',
		templateUrl: 'app/views/error.ejs'
	})
	$urlRouterProvider
		.when('/c?id', '/myaccess?id','/mobile-menu-01')
		.otherwise('/slider');
}]);
app.run(['$rootScope', '$state', '$sessionStorage', '$window', '$location', 'AuthenticationFactory', 'UserAuthFactory', 'commonFactory', '$templateCache', function($rootScope, $state, $sessionStorage, $window, $location, AuthenticationFactory, UserAuthFactory, commonFactory, $templateCache) {
	//translate
	$rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
	var translateData = localStorage.getItem('englishTranslate');
	// var spanishTranslate =  localStorage.getItem('spanishTranslate');
	if ($sessionStorage.languageselect != "sp") {
		$rootScope.sellang = "English";
		translateData = localStorage.getItem('englishTranslate');
		$sessionStorage.translateData = localStorage.getItem('englishTranslate');
	} else {
		$rootScope.sellang = "Spanish";
		translateData = localStorage.getItem('spanishTranslate');
		$sessionStorage.translateData = localStorage.getItem('spanishTranslate');
	}
	$rootScope.languageTranslation = function() {
		$rootScope.ManyRequestErrorLabel = JSON.parse(translateData).ManyRequestErrorLabel;
		$rootScope.OtherErrorLabel = JSON.parse(translateData).OtherErrorLabel;
        $rootScope.errorMessageLabel = JSON.parse(translateData).errorMessageLabel;
		$rootScope.errorLabel = JSON.parse(translateData).errorLabel;
		$rootScope.errorheaderLabel = JSON.parse(translateData).errorheaderLabel;
		$rootScope.bsLabel1 = JSON.parse(translateData).bsLabel1;
		
		
		$rootScope.pickupdropLabel = JSON.parse(translateData).pickupdropLabel;
		$rootScope.pickupLabel = JSON.parse(translateData).pickupLabel;
		$rootScope.dropLabel = JSON.parse(translateData).dropLabel;
		$rootScope.supLabel = JSON.parse(translateData).supLabel;
		$rootScope.bookingrefLabel = JSON.parse(translateData).bookingrefLabel;
		$rootScope.PaymenttypeAlert =JSON.parse(translateData).PaymenttypeAlert;
		$rootScope.guestboxLabel=JSON.parse(translateData).guestboxLabel;
		$rootScope.guestboxLabel1=JSON.parse(translateData).guestboxLabel1;

		$rootScope.gustLabel=JSON.parse(translateData).gustLabel;
		$rootScope.gustAlertLabel=JSON.parse(translateData).gustAlertLabel;
		$rootScope.guestButton1=JSON.parse(translateData).guestButton1;
		$rootScope.guestButton2=JSON.parse(translateData).guestButton2;
		$rootScope.passengersLabel=JSON.parse(translateData).passengersLabel;

		$rootScope.forwardLabel = JSON.parse(translateData).forwardLabel; 
	   $rootScope.returnLabel = JSON.parse(translateData).returnLabel;
	   $rootScope.MailSentLabel = JSON.parse(translateData).MailSentLabel;
	   $rootScope.MarketChkLabel = JSON.parse(translateData).MarketChkLabel;
		
        
        $rootScope.guestwarning1=JSON.parse(translateData).guestwarning1;
        $rootScope.guestwarning2=JSON.parse(translateData).guestwarning2;
        $rootScope.guestsuccess1=JSON.parse(translateData).guestsuccess1;
        $rootScope.confrefLabel=JSON.parse(translateData).confrefLabel;
        $rootScope.refmobileno=JSON.parse(translateData).refmobileno;

		$rootScope.ManyRequestErrorLabel=JSON.parse(translateData).ManyRequestErrorLabel;
		$rootScope.OtherErrorLabel=JSON.parse(translateData).OtherErrorLabel;
		$rootScope.errorMessageLabel=JSON.parse(translateData).errorMessageLabel;
		$rootScope.errorLabel=JSON.parse(translateData).errorLabel;
		$rootScope.invalidRefId =JSON.parse(translateData).invalidRefId;

		$rootScope.refmessg1 =JSON.parse(translateData).refmessg1;
		$rootScope.refmessg2 =JSON.parse(translateData).refmessg2;
		$rootScope.refmessg3 =JSON.parse(translateData).refmessg3;
		$rootScope.refmessg4 =JSON.parse(translateData).refmessg4;
        

		$rootScope.myAccountLabel = JSON.parse(translateData).myAccountLabel;
		$rootScope.myDashboardLabel = JSON.parse(translateData).myDashboardLabel;
		$rootScope.allDestinationsLabel = JSON.parse(translateData).allDestinationsLabel;
		$rootScope.LogoutLabel = JSON.parse(translateData).LogoutLabel;
		$rootScope.loginLabel = JSON.parse(translateData).loginLabel;
		$rootScope.signupLabel = JSON.parse(translateData).signupLabel;
		$rootScope.pageTitleLabel = JSON.parse(translateData).pageTitleLabel;
		$rootScope.pageSubTitleLabel = JSON.parse(translateData).pageSubTitleLabel;
		$rootScope.fromLocationLabel = JSON.parse(translateData).fromLocationLabel;
		$rootScope.toLocationLabel = JSON.parse(translateData).toLocationLabel;
		$rootScope.fromDateplaceholder = JSON.parse(translateData).fromDateplaceholder;
		$rootScope.toDateplaceholder = JSON.parse(translateData).toDateplaceholder;
		$rootScope.noOfPassengersLabel = JSON.parse(translateData).noOfPassengersLabel;
		$rootScope.searchnowLabel = JSON.parse(translateData).searchnowLabel;
		$rootScope.popularRoutesLabel = JSON.parse(translateData).popularRoutesLabel;
		$rootScope.ourPartnersLabel = JSON.parse(translateData).ourPartnersLabel;
		$rootScope.whyBoletobusLabel = JSON.parse(translateData).whyBoletobusLabel;
		$rootScope.discoverlabel = JSON.parse(translateData).discoverlabel;
		$rootScope.noofroutesLabel = JSON.parse(translateData).noofroutesLabel;
		$rootScope.routesparagraphLabel = JSON.parse(translateData).routesparagraphLabel;
		$rootScope.lowrateLabel = JSON.parse(translateData).lowrateLabel;
		$rootScope.realtravellersLabel = JSON.parse(translateData).realtravellersLabel;
		$rootScope.speaklangLabel = JSON.parse(translateData).speaklangLabel;
		$rootScope.AboutLabel = JSON.parse(translateData).AboutLabel;
		$rootScope.TravelConditionsLabel = JSON.parse(translateData).TravelConditionsLabel;
		$rootScope.PrivacyPolicyLabel = JSON.parse(translateData).PrivacyPolicyLabel;
		$rootScope.FrequentQuestionsLabel = JSON.parse(translateData).FrequentQuestionsLabel;
		$rootScope.TermsConditionsLabel = JSON.parse(translateData).TermsConditionsLabel;
		$rootScope.ContactUsLabel = JSON.parse(translateData).ContactUsLabel;
		$rootScope.AddressLabel = JSON.parse(translateData).AddressLabel;
		$rootScope.AddressparagraphLabel = JSON.parse(translateData).AddressparagraphLabel;
		$rootScope.MailingListLabel = JSON.parse(translateData).MailingListLabel;
		$rootScope.MailingListparagraphLabel = JSON.parse(translateData).MailingListparagraphLabel;
		$rootScope.youremailplaceholder = JSON.parse(translateData).youremailplaceholder;
		$rootScope.privacyLabel = JSON.parse(translateData).privacyLabel;
		$rootScope.AboutBoletobusLabel = JSON.parse(translateData).AboutBoletobusLabel;
		$rootScope.AboutBoletobusparagraphLabel = JSON.parse(translateData).AboutBoletobusparagraphLabel;
		$rootScope.noOfPassengers1Label = JSON.parse(translateData).noOfPassengers1Label;
		$rootScope.noOfPassengers2Label = JSON.parse(translateData).noOfPassengers2Label;
		$rootScope.noOfPassengers3Label = JSON.parse(translateData).noOfPassengers3Label;
		$rootScope.noOfPassengers4Label = JSON.parse(translateData).noOfPassengers4Label;
		$rootScope.noOfPassengers5Label = JSON.parse(translateData).noOfPassengers5Label;
		$rootScope.noOfPassengers6Label = JSON.parse(translateData).noOfPassengers6Label;
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
		$rootScope.departureLabel = JSON.parse(translateData).departureLabel;
		$rootScope.arrivalLabel = JSON.parse(translateData).arrivalLabel;
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
		$rootScope.servicesLabel = JSON.parse(translateData).servicesLabel;
		$rootScope.seatsLabel = JSON.parse(translateData).seatsLabel;
		$rootScope.availableLabel = JSON.parse(translateData).availableLabel;
		$rootScope.perpersonLabel = JSON.parse(translateData).perpersonLabel;
		$rootScope.selectLabel = JSON.parse(translateData).selectLabel;
		$rootScope.SELECTEDLabel = JSON.parse(translateData).SELECTEDLabel;
		$rootScope.vehiclesLabel = JSON.parse(translateData).vehiclesLabel;
		$rootScope.personalinfo = JSON.parse(translateData).personalinfo;
		$rootScope.dobLabel = JSON.parse(translateData).dobLabel;
		$rootScope.genderLabel = JSON.parse(translateData).genderLabel;
		$rootScope.selectgenderLabel = JSON.parse(translateData).selectgenderLabel;
		$rootScope.countrycodeLabel = JSON.parse(translateData).countrycodeLabel;
		$rootScope.maleLabel = JSON.parse(translateData).maleLabel;
		$rootScope.femaleLabel = JSON.parse(translateData).femaleLabel;
		$rootScope.phonenumberLabel = JSON.parse(translateData).phonenumberLabel;
		$rootScope.typeofDocLabel = JSON.parse(translateData).typeofDocLabel;
		$rootScope.selectdoctypeLabel = JSON.parse(translateData).selectdoctypeLabel;
		$rootScope.passportLabel = JSON.parse(translateData).passportLabel;
		$rootScope.docnumberLabel = JSON.parse(translateData).docnumberLabel;
		$rootScope.emailaddressLabel = JSON.parse(translateData).emailaddressLabel;
		$rootScope.verifyemailaddressLabel = JSON.parse(translateData).verifyemailaddressLabel;
		$rootScope.ticketbookingLabel = JSON.parse(translateData).ticketbookingLabel;
		$rootScope.forwardtriplabel = JSON.parse(translateData).forwardtriplabel;
		$rootScope.seatnumberLabel = JSON.parse(translateData).seatnumberLabel;
		$rootScope.returntriplabel = JSON.parse(translateData).returntriplabel;
		$rootScope.wantlabel = JSON.parse(translateData).wantlabel;
		$rootScope.promotionallabel = JSON.parse(translateData).promotionallabel;
		$rootScope.onlinepaylabel = JSON.parse(translateData).onlinepaylabel;
		//venu
		$rootScope.eticketLabel = JSON.parse(translateData).eticketLabel;
		$rootScope.hometLabel = JSON.parse(translateData).hometLabel;
		$rootScope.printLabel = JSON.parse(translateData).printLabel;
		$rootScope.travelinfoLabel = JSON.parse(translateData).travelinfoLabel;
		$rootScope.bkngnumLabel = JSON.parse(translateData).bkngnumLabel;
		$rootScope.bkngstatusLabel = JSON.parse(translateData).bkngstatusLabel;
		$rootScope.bkngdateLabel = JSON.parse(translateData).bkngdateLabel;
		$rootScope.usernameLabel = JSON.parse(translateData).usernameLabel;
		$rootScope.emailLabel = JSON.parse(translateData).emailLabel;
		$rootScope.streetLabel = JSON.parse(translateData).streetLabel;
		$rootScope.documentLabel = JSON.parse(translateData).documentLabel;
		$rootScope.documentnoLabel = JSON.parse(translateData).documentnoLabel;
		$rootScope.phoneLabel = JSON.parse(translateData).phoneLabel;
		$rootScope.tktinfoLabel = JSON.parse(translateData).tktinfoLabel;
		$rootScope.routeLabel = JSON.parse(translateData).routeLabel;
		$rootScope.routesLabel = JSON.parse(translateData).routesLabel;
		$rootScope.dprtfromLabel = JSON.parse(translateData).dprtfromLabel;
		$rootScope.tktnoLabel = JSON.parse(translateData).tktnoLabel;
		$rootScope.depttimeLabel = JSON.parse(translateData).depttimeLabel;
		$rootScope.arvltimeLabel = JSON.parse(translateData).arvltimeLabel;
		$rootScope.cnfrmseatsLabel = JSON.parse(translateData).cnfrmseatsLabel;
		$rootScope.traveldateLabel = JSON.parse(translateData).traveldateLabel;
		$rootScope.addinfoLabel = JSON.parse(translateData).addinfoLabel;
		$rootScope.needLabel = JSON.parse(translateData).needLabel;
		$rootScope.weLabel = JSON.parse(translateData).weLabel;
		$rootScope.whybookLabel = JSON.parse(translateData).whybookLabel;
		$rootScope.lowrateLabel = JSON.parse(translateData).lowrateLabel;
		$rootScope.suportLabel = JSON.parse(translateData).suportLabel;
		$rootScope.thanksLabel = JSON.parse(translateData).thanksLabel;
		$rootScope.helloLabel = JSON.parse(translateData).helloLabel;
		$rootScope.onewayLabel = JSON.parse(translateData).onewayLabel;
		$rootScope.tktLabel = JSON.parse(translateData).tktLabel;
		$rootScope.bkngcnfrmLabel = JSON.parse(translateData).bkngcnfrmLabel;
		$rootScope.prntLabel = JSON.parse(translateData).prntLabel;
		$rootScope.passengerLabel = JSON.parse(translateData).passengerLabel;
		$rootScope.adultLabel = JSON.parse(translateData).adultLabel;
		$rootScope.childrenLabel = JSON.parse(translateData).childrenLabel;
		$rootScope.retiredLabel = JSON.parse(translateData).retiredLabel;
		$rootScope.taxLabel = JSON.parse(translateData).taxLabel;
		$rootScope.totalLabel = JSON.parse(translateData).totalLabel;
		$rootScope.subLabel = JSON.parse(translateData).subLabel;
		$rootScope.chargeLabel = JSON.parse(translateData).chargeLabel;
		$rootScope.taxesLabel = JSON.parse(translateData).taxesLabel;
		$rootScope.priceLabel = JSON.parse(translateData).priceLabel;
		$rootScope.cnfmmmLabel = JSON.parse(translateData).cnfmmmLabel;
		$rootScope.adrsLabel = JSON.parse(translateData).adrsLabel;
		$rootScope.homeLabel = JSON.parse(translateData).homeLabel;
		$rootScope.dashboardLabel = JSON.parse(translateData).dashboardLabel;
		$rootScope.dashboardTittleLabel = JSON.parse(translateData).dashboardTittleLabel;
		$rootScope.dashtittleLabel = JSON.parse(translateData).dashtittleLabel;
		$rootScope.dashSubtittleLabel = JSON.parse(translateData).dashSubtittleLabel;
		$rootScope.box_dataLabel = JSON.parse(translateData).box_dataLabel;
		$rootScope.box1_dataLabel = JSON.parse(translateData).box1_dataLabel;
		$rootScope.box2_dataLabel = JSON.parse(translateData).box2_dataLabel;
		$rootScope.box3_dataLabel = JSON.parse(translateData).box3_dataLabel;
		$rootScope.parabox_contentLabel = JSON.parse(translateData).parabox_contentLabel;
		$rootScope.blueboxLabel = JSON.parse(translateData).blueboxLabel;
		$rootScope.bluebox1Label = JSON.parse(translateData).bluebox1Label;
		$rootScope.blueboxcontentlabel = JSON.parse(translateData).blueboxcontentlabel;
		$rootScope.blueboxcontent1Label = JSON.parse(translateData).blueboxcontent1Label;
		$rootScope.profileLabel = JSON.parse(translateData).profileLabel;
		$rootScope.mybookingLabel = JSON.parse(translateData).mybookingLabel;
		$rootScope.settingsLabel = JSON.parse(translateData).settingsLabel;
		$rootScope.destinationTitleLabel = JSON.parse(translateData).destinationTitleLabel;
		$rootScope.destinationLabel = JSON.parse(translateData).destinationLabel;
		$rootScope.bookingsTitleLable = JSON.parse(translateData).bookingsTitleLable;
		$rootScope.payLabel = JSON.parse(translateData).payLabel;
		$rootScope.viLabel = JSON.parse(translateData).viLabel;
		$rootScope.vehLabel = JSON.parse(translateData).vehLabel;
		$rootScope.forLabel = JSON.parse(translateData).forLabel;
		$rootScope.doLabel = JSON.parse(translateData).doLabel;
		$rootScope.sgLabel = JSON.parse(translateData).sgLabel;
		$rootScope.bLabel = JSON.parse(translateData).bLabel;
		$rootScope.aLabel = JSON.parse(translateData).aLabel;
		$rootScope.aLabel = JSON.parse(translateData).aLabel;
		$rootScope.aLabel = JSON.parse(translateData).aLabel;
		$rootScope.bysLabel = JSON.parse(translateData).bysLabel;
		$rootScope.paydetailLabel = JSON.parse(translateData).paydetailLabel;
		$rootScope.selectpaydetailLabel = JSON.parse(translateData).selectpaydetailLabel;
		$rootScope.cardinfoLabel = JSON.parse(translateData).cardinfoLabel;
		$rootScope.cardholdnameLabel = JSON.parse(translateData).cardholdnameLabel;
		$rootScope.cardholdlastnameLabel = JSON.parse(translateData).cardholdlastnameLabel;
		$rootScope.cardholdemailLabel = JSON.parse(translateData).cardholdemailLabel;
		$rootScope.cardholdaddLabel = JSON.parse(translateData).cardholdaddLabel;
		$rootScope.cardholdphoneLabel = JSON.parse(translateData).cardholdphoneLabel;
		$rootScope.cardnumLabel = JSON.parse(translateData).cardnumLabel;
		$rootScope.cardexpmonLabel = JSON.parse(translateData).cardexpmonLabel;
		$rootScope.cardexpyearLabel = JSON.parse(translateData).cardexpyearLabel;
		$rootScope.cvvLabel = JSON.parse(translateData).cvvLabel;
		$rootScope.suprmarhtchckoutLabel = JSON.parse(translateData).suprmarhtchckoutLabel;
		$rootScope.firstNameAlert = JSON.parse(translateData).firstNameAlert;
		$rootScope.lastNameAlert = JSON.parse(translateData).lastNameAlert;
		$rootScope.addressAlert = JSON.parse(translateData).addressAlert;
		$rootScope.dobAlert = JSON.parse(translateData).dobAlert;
		$rootScope.emailAlert = JSON.parse(translateData).emailAlert;
		$rootScope.emailvalidAlert = JSON.parse(translateData).emailvalidAlert;
		$rootScope.verifyemailAlert = JSON.parse(translateData).verifyemailAlert;
		$rootScope.verifyvalidemailAlert = JSON.parse(translateData).verifyvalidemailAlert;
		$rootScope.validemailAlert = JSON.parse(translateData).validemailAlert;
		$rootScope.genderAlert = JSON.parse(translateData).genderAlert;
		$rootScope.countryAlert = JSON.parse(translateData).countryAlert;
		$rootScope.phoneAlert = JSON.parse(translateData).phoneAlert;
		$rootScope.phonevalidAlert = JSON.parse(translateData).phonevalidAlert;
		$rootScope.cardholderAlert = JSON.parse(translateData).cardholderAlert;
		$rootScope.cardholderlastAlert = JSON.parse(translateData).cardholderlastAlert;
		$rootScope.cardholderemailAlert = JSON.parse(translateData).cardholderemailAlert;
		$rootScope.cardholderaddAlert = JSON.parse(translateData).cardholderaddAlert;
		$rootScope.cardholderphoneAlert = JSON.parse(translateData).cardholderphoneAlert;
		$rootScope.cardexpmntAlert = JSON.parse(translateData).cardexpmntAlert;
		$rootScope.cardexpyrAlert = JSON.parse(translateData).cardexpyrAlert;
		$rootScope.cvvAlert = JSON.parse(translateData).cvvAlert;
		$rootScope.creditcardAlert = JSON.parse(translateData).creditcardAlert;
 $rootScope.sentmailLabel = JSON.parse(translateData).sentmailLabel;
		
		
		
		//about
		
		
		if (document.getElementById("freLabel") != null)
			document.getElementById("freLabel").innerHTML = "" + JSON.parse(translateData).freLabel;
				
				if (document.getElementById("iLabel") != null)
			document.getElementById("iLabel").innerHTML = "" + JSON.parse(translateData).iLabel;
		
		
		if (document.getElementById("nlLabel") != null)
			document.getElementById("nlLabel").innerHTML = "" + JSON.parse(translateData).nlLabel;
				
				if (document.getElementById("bsLabel") != null)
			document.getElementById("bsLabel").innerHTML = "" + JSON.parse(translateData).bsLabel;
		if (document.getElementById("youLabel") != null)
			document.getElementById("youLabel").innerHTML = "" + JSON.parse(translateData).youLabel;
				
				if (document.getElementById("hoLabel") != null)
			document.getElementById("hoLabel").innerHTML = "" + JSON.parse(translateData).hoLabel;
		if (document.getElementById("yo1Label") != null)
			document.getElementById("yo1Label").innerHTML = "" + JSON.parse(translateData).yo1Label;
				
				if (document.getElementById("cnLabel") != null)
			document.getElementById("cnLabel").innerHTML = "" + JSON.parse(translateData).cnLabel;
		if (document.getElementById("yuLabel") != null)
			document.getElementById("yuLabel").innerHTML = "" + JSON.parse(translateData).yuLabel;
				
				if (document.getElementById("whtLabel") != null)
			document.getElementById("whtLabel").innerHTML = "" + JSON.parse(translateData).whtLabel;
		if (document.getElementById("yshLabel") != null)
			document.getElementById("yshLabel").innerHTML = "" + JSON.parse(translateData).yshLabel;
		
		
		if (document.getElementById("ujLabel") != null)
			document.getElementById("ujLabel").innerHTML = "" + JSON.parse(translateData).ujLabel;
		if (document.getElementById("yuLabel") != null)
			document.getElementById("yuLabel").innerHTML = "" + JSON.parse(translateData).yuLabel;
				
				if (document.getElementById("yhgLabel") != null)
			document.getElementById("yhgLabel").innerHTML = "" + JSON.parse(translateData).yhgLabel;
		if (document.getElementById("canLabel") != null)
			document.getElementById("canLabel").innerHTML = "" + JSON.parse(translateData).canLabel;
		
		if (document.getElementById("klLabel") != null)
			document.getElementById("klLabel").innerHTML = "" + JSON.parse(translateData).klLabel;
		if (document.getElementById("canjLabel") != null)
			document.getElementById("canjLabel").innerHTML = "" + JSON.parse(translateData).canjLabel;
				
				if (document.getElementById("kjLabel") != null)
			document.getElementById("kjLabel").innerHTML = "" + JSON.parse(translateData).kjLabel;
		if (document.getElementById("iklLabel") != null)
			document.getElementById("iklLabel").innerHTML = "" + JSON.parse(translateData).iklLabel;
		
		
		
				
        if (document.getElementById("kmlLabel") != null)
			document.getElementById("kmlLabel").innerHTML = "" + JSON.parse(translateData).kmlLabel;
		if (document.getElementById("whdLabel") != null)
			document.getElementById("whdLabel").innerHTML = "" + JSON.parse(translateData).whdLabel;
				
				
				
		if (document.getElementById("onlLabel") != null)
			document.getElementById("onlLabel").innerHTML = "" + JSON.parse(translateData).onlLabel;
			if (document.getElementById("homeLabel") != null)
			document.getElementById("homeLabel").innerHTML = "" + JSON.parse(translateData).homeLabel;
		if (document.getElementById("othrLabel") != null)
			document.getElementById("othrLabel").innerHTML = "" + JSON.parse(translateData).othrLabel;
		
		
		if (document.getElementById("moLabel") != null)
			document.getElementById("moLabel").innerHTML = "" + JSON.parse(translateData).moLabel;
		
		
		if (document.getElementById("AbusLabel") != null)
			document.getElementById("AbusLabel").innerHTML = "" + JSON.parse(translateData).AbusLabel;
		
		
		if (document.getElementById("AboutbukateparagraphLabel") != null)
			document.getElementById("AboutbukateparagraphLabel").innerHTML = "" + JSON.parse(translateData).AboutbukateparagraphLabel;
		
		
		
		
		
		
		
		
		
		
		
		
		
		if (document.getElementById("ticketbookingLabel2") != null)
			document.getElementById("ticketbookingLabel2").innerHTML = "" + JSON.parse(translateData).ticketbookingLabel;
		if (document.getElementById("adultLabel2") != null)
			document.getElementById("adultLabel2").innerHTML = "" + JSON.parse(translateData).adultLabel;
		if (document.getElementById("adultLabel2") != null)
			document.getElementById("adultLabel2").innerHTML = "" + JSON.parse(translateData).adultLabel;
		if (document.getElementById("subLabel2") != null)
			document.getElementById("subLabel2").innerHTML = "" + JSON.parse(translateData).subLabel;
		var promoPlaceHolder = document.getElementById("promoPlaceHolder");
		if (promoPlaceHolder != null)
			promoPlaceHolder.placeholder = JSON.parse(translateData).promoPlaceHolder;
		var dateofbirthPlaceHolder = document.getElementById("dateofbirthPlaceHolder");
		if (dateofbirthPlaceHolder != null)
			dateofbirthPlaceHolder.placeholder = JSON.parse(translateData).dateofbirthPlaceHolder;
		if (document.getElementById("homeLabel") != null)
			document.getElementById("homeLabel").innerHTML = "" + JSON.parse(translateData).homeLabel;
		if (document.getElementById("dashboardLabel") != null)
			document.getElementById("dashboardLabel").innerHTML = "" + JSON.parse(translateData).dashboardLabel;
		if (document.getElementById("dashboardTittleLabel") != null)
			document.getElementById("dashboardTittleLabel").innerHTML = "" + JSON.parse(translateData).dashboardTittleLabel;
		if (document.getElementById("dashboardLabelTab") != null)
			document.getElementById("dashboardLabelTab").innerHTML = "" + JSON.parse(translateData).dashboardLabelTab;
		if (document.getElementById("profileLabel") != null)
			document.getElementById("profileLabel").innerHTML = "" + JSON.parse(translateData).profileLabel;
		if (document.getElementById("mybookingLabel") != null)
			document.getElementById("mybookingLabel").innerHTML = "" + JSON.parse(translateData).mybookingLabel;
		if (document.getElementById("settingsLabel") != null)
			document.getElementById("settingsLabel").innerHTML = "" + JSON.parse(translateData).settingsLabel;
		if (document.getElementById("accountsettingsLabel") != null)
			document.getElementById("accountsettingsLabel").innerHTML = "" + JSON.parse(translateData).accountsettingsLabel;
		if (document.getElementById("Change_Your_PasswordLabel") != null)
			document.getElementById("Change_Your_PasswordLabel").innerHTML = "" + JSON.parse(translateData).Change_Your_PasswordLabel;
		if (document.getElementById("Old_PasswordLabel") != null)
			document.getElementById("Old_PasswordLabel").innerHTML = "" + JSON.parse(translateData).Old_PasswordLabel;
		if (document.getElementById("Enter_New_PasswordLabel") != null)
			document.getElementById("Enter_New_PasswordLabel").innerHTML = "" + JSON.parse(translateData).Enter_New_PasswordLabel;
		if (document.getElementById("Confirm_New_passwordLabel") != null)
			document.getElementById("Confirm_New_passwordLabel").innerHTML = "" + JSON.parse(translateData).Confirm_New_passwordLabel;
		if (document.getElementById("updatebutton") != null)
			document.getElementById("updatebutton").innerHTML = "" + JSON.parse(translateData).updatebutton;
		if (document.getElementById("Change_Your_EmailLabel") != null)
			document.getElementById("Change_Your_EmailLabel").innerHTML = "" + JSON.parse(translateData).Change_Your_EmailLabel;
		if (document.getElementById("Old_emailLabel") != null)
			document.getElementById("Old_emailLabel").innerHTML = "" + JSON.parse(translateData).Old_emailLabel;
		if (document.getElementById("Enter_New_EmailLabel") != null)
			document.getElementById("Enter_New_EmailLabel").innerHTML = "" + JSON.parse(translateData).Enter_New_EmailLabel;
		if (document.getElementById("Confirm_New_EmailLabel") != null)
			document.getElementById("Confirm_New_EmailLabel").innerHTML = "" + JSON.parse(translateData).Confirm_New_EmailLabel;
		if (document.getElementById("updateemailbutton") != null)
			document.getElementById("updateemailbutton").innerHTML = "" + JSON.parse(translateData).updateemailbutton;
		if (document.getElementById("Send_Me_Emails_WhenLabel") != null)
			document.getElementById("Send_Me_Emails_WhenLabel").innerHTML = "" + JSON.parse(translateData).Send_Me_Emails_WhenLabel;
		if (document.getElementById("Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel") != null)
			document.getElementById("Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel").innerHTML =
			"" + JSON.parse(translateData).Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel;
		if (document.getElementById("Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel") != null)
			document.getElementById("Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel").innerHTML =
			"" + JSON.parse(translateData).Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel;
		if (document.getElementById("I_have_an_upcoming_reservationLabel") != null)
			document.getElementById("I_have_an_upcoming_reservationLabel").innerHTML = "" + JSON.parse(translateData).I_have_an_upcoming_reservationLabel;
		if (document.getElementById("Update_All_SettingsButon") != null)
			document.getElementById("Update_All_SettingsButon").innerHTML = "" + JSON.parse(translateData).Update_All_SettingsButon;
		if (document.getElementById("bsLabel") != null)
			document.getElementById("bsLabel").innerHTML = "" + JSON.parse(translateData).bsLabel;
		if (document.getElementById("needLabel") != null)
			document.getElementById("needLabel").innerHTML = "" + JSON.parse(translateData).needLabel;
		if (document.getElementById("adultLabel") != null)
			document.getElementById("adultLabel").innerHTML = "" + JSON.parse(translateData).adultLabel;
		if (document.getElementById("totalLabel") != null)
			document.getElementById("totalLabel").innerHTML = "" + JSON.parse(translateData).totalLabel;
		if (document.getElementById("subLabel") != null)
			document.getElementById("subLabel").innerHTML = "" + JSON.parse(translateData).subLabel;
		if (document.getElementById("chargeLabel") != null)
			document.getElementById("chargeLabel").innerHTML = "" + JSON.parse(translateData).chargeLabel;
		if (document.getElementById("priceLabel") != null)
			document.getElementById("priceLabel").innerHTML = "" + JSON.parse(translateData).priceLabel;
		if (document.getElementById("taxLabel") != null)
			document.getElementById("taxLabel").innerHTML = "" + JSON.parse(translateData).taxLabel;
		if (document.getElementById("taxesLabel") != null)
			document.getElementById("taxesLabel").innerHTML = "" + JSON.parse(translateData).taxesLabel;
		if (document.getElementById("weLabel") != null)
			document.getElementById("weLabel").innerHTML = "" + JSON.parse(translateData).weLabel;
		if (document.getElementById("ticketbookingLabel") != null)
			document.getElementById("ticketbookingLabel").innerHTML = "" + JSON.parse(translateData).ticketbookingLabel;
		if (document.getElementById("vehiclesLabel") != null)
			document.getElementById("vehiclesLabel").innerHTML = "" + JSON.parse(translateData).vehiclesLabel;
		if (document.getElementById("personalinfolabel") != null)
			document.getElementById("personalinfolabel").innerHTML = "" + JSON.parse(translateData).personalinfolabel;
		if (document.getElementById("DOBLabel") != null)
			document.getElementById("DOBLabel").innerHTML = "" + JSON.parse(translateData).DOBLabel;
		if (document.getElementById("emailaddressLabel") != null)
			document.getElementById("emailaddressLabel").innerHTML = "" + JSON.parse(translateData).emailaddressLabel;
		if (document.getElementById("verifyemailLabel") != null)
			document.getElementById("verifyemailLabel").innerHTML = "" + JSON.parse(translateData).verifyemailLabel;
		if (document.getElementById("genderLabel") != null)
			document.getElementById("genderLabel").innerHTML = "" + JSON.parse(translateData).genderLabel;
		if (document.getElementById("gendermaleLabel") != null)
			document.getElementById("gendermaleLabel").innerHTML = "" + JSON.parse(translateData).gendermaleLabel;
		if (document.getElementById("genderfemaleLabel") != null)
			document.getElementById("genderfemaleLabel").innerHTML = "" + JSON.parse(translateData).genderfemaleLabel;
		if (document.getElementById("countrycodeLabel") != null)
			document.getElementById("countrycodeLabel").innerHTML = "" + JSON.parse(translateData).countrycodeLabel;
		if (document.getElementById("phnumLabel") != null)
			document.getElementById("phnumLabel").innerHTML = "" + JSON.parse(translateData).phnumLabel;
		if (document.getElementById("typeofdocLabel") != null)
			document.getElementById("typeofdocLabel").innerHTML = "" + JSON.parse(translateData).typeofdocLabel;
		if (document.getElementById("selectdoctypeLabel") != null)
			document.getElementById("selectdoctypeLabel").innerHTML = "" + JSON.parse(translateData).selectdoctypeLabel;
		if (document.getElementById("passportLabel") != null)
			document.getElementById("passportLabel").innerHTML = "" + JSON.parse(translateData).passportLabel;
		if (document.getElementById("docnumLabel") != null)
			document.getElementById("docnumLabel").innerHTML = "" + JSON.parse(translateData).docnumLabel;
		if (document.getElementById("firstnameLabel") != null)
			document.getElementById("firstnameLabel").innerHTML = "" + JSON.parse(translateData).firstnameLabel;
		if (document.getElementById("firstnameLabel") != null)
			document.getElementById("firstnameLabel").innerHTML = "" + JSON.parse(translateData).firstnameLabel;
		if (document.getElementById("lastnameLabel") != null)
			document.getElementById("lastnameLabel").innerHTML = "" + JSON.parse(translateData).lastnameLabel;
		if (document.getElementById("addressLabel") != null)
			document.getElementById("addressLabel").innerHTML = "" + JSON.parse(translateData).addressLabel;
		if (document.getElementById("tripinfoLabel") != null)
			document.getElementById("tripinfoLabel").innerHTML = "" + JSON.parse(translateData).tripinfoLabel;
		if (document.getElementById("deptLabel") != null)
			document.getElementById("deptLabel").innerHTML = "" + JSON.parse(translateData).deptLabel;
		if (document.getElementById("arrvlLabel") != null)
			document.getElementById("arrvlLabel").innerHTML = "" + JSON.parse(translateData).arrvlLabel;
		if (document.getElementById("adultLabel") != null)
			document.getElementById("adultLabel").innerHTML = "" + JSON.parse(translateData).adultLabel;
		if (document.getElementById("childrenLabel") != null)
			document.getElementById("childrenLabel").innerHTML = "" + JSON.parse(translateData).childrenLabel;
		if (document.getElementById("retiredLabel") != null)
			document.getElementById("retiredLabel").innerHTML = "" + JSON.parse(translateData).retiredLabel;
		if (document.getElementById("rturntripinfoLabel") != null)
			document.getElementById("rturntripinfoLabel").innerHTML = "" + JSON.parse(translateData).rturntripinfoLabel;
		if (document.getElementById("checkboxinfoLabel") != null)
			document.getElementById("checkboxinfoLabel").innerHTML = "" + JSON.parse(translateData).checkboxinfoLabel;
		if (document.getElementById("checkboxLabel") != null)
			document.getElementById("checkboxLabel").innerHTML = "" + JSON.parse(translateData).checkboxLabel;
		if (document.getElementById("checboxoneLabel") != null)
			document.getElementById("checboxoneLabel").innerHTML = "" + JSON.parse(translateData).checboxoneLabel;
		if (document.getElementById("bluechcbxLabel") != null)
			document.getElementById("bluechcbxLabel").innerHTML = "" + JSON.parse(translateData).bluechcbxLabel;
		if (document.getElementById("checboxtwoLabel") != null)
			document.getElementById("checboxtwoLabel").innerHTML = "" + JSON.parse(translateData).checboxtwoLabel;
		if (document.getElementById("checboxparaLabel") != null)
			document.getElementById("checboxparaLabel").innerHTML = "" + JSON.parse(translateData).checboxparaLabel;
		if (document.getElementById("ssLabel") != null)
			document.getElementById("ssLabel").innerHTML = "" + JSON.parse(translateData).ssLabel;
		if (document.getElementById("frontLabel") != null)
			document.getElementById("frontLabel").innerHTML = "" + JSON.parse(translateData).frontLabel;
		if (document.getElementById("ssotLabel") != null)
			document.getElementById("ssotLabel").innerHTML = "" + JSON.parse(translateData).ssotLabel;
		if (document.getElementById("ssrtLabel") != null)
			document.getElementById("ssrtLabel").innerHTML = "" + JSON.parse(translateData).ssrtLabel;
		if (document.getElementById("contButtonLabel") != null)
			document.getElementById("contButtonLabel").innerHTML = "" + JSON.parse(translateData).contButtonLabel;
		$rootScope.loginPopupLabel = JSON.parse(translateData).loginPopupLabel;
		var password = document.getElementById("password1");
		if (password != null)
			password.placeholder = JSON.parse(translateData).password;
		var confirmpassword = document.getElementById("confirmpassword");
		if (confirmpassword != null)
			confirmpassword.placeholder = JSON.parse(translateData).confirmpassword;
		var loginemail = document.getElementById("loginemail");
		if (loginemail)
			loginemail.placeholder = JSON.parse(translateData).loginemail;
		$rootScope.signupPopupLabel = JSON.parse(translateData).signupPopupLabel;
		var firstname = document.getElementById("firstname");
		if (firstname != null)
			firstname.placeholder = JSON.parse(translateData).firstname;
		var lastname = document.getElementById("lastname");
		if (lastname != null)
			lastname.placeholder = JSON.parse(translateData).lastname;
		var emailid = document.getElementById("emailid");
		if (emailid != null)
			emailid.placeholder = JSON.parse(translateData).emailid;
		var mobileno = document.getElementById("mobileno");
		if (mobileno != null)
			mobileno.placeholder = JSON.parse(translateData).mobileno;
		var password = document.getElementById("password");
		if (password != null)
			password.placeholder = JSON.parse(translateData).password;
		if (document.getElementById("blockSeatsButtonLabel") != null)
			document.getElementById("blockSeatsButtonLabel").innerHTML = "" + JSON.parse(translateData).blockSeatsButtonLabel;
		if (document.getElementById("confirmBookingButtonLabel") != null)
			document.getElementById("confirmBookingButtonLabel").innerHTML = "" + JSON.parse(translateData).confirmBookingButtonLabel;
		$rootScope.Continuelabel = JSON.parse(translateData).Continuelabel;
		$rootScope.bookingIDplaceholder = JSON.parse(translateData).bookingIDplaceholder;
		$rootScope.firstnameplaceholder = JSON.parse(translateData).firstnameplaceholder;
		$rootScope.BooknowLabel = JSON.parse(translateData).BooknowLabel;
		$rootScope.avgpersonLabel = JSON.parse(translateData).avgpersonLabel;
		$rootScope.toLabel = JSON.parse(translateData).toLabel;
		$rootScope.ApplyLabel = JSON.parse(translateData).ApplyLabel;
		$rootScope.ApplyLabel2 = JSON.parse(translateData).ApplyLabel;
		$rootScope.bookingIdValidError = JSON.parse(translateData).bookingIdValidError;
		$rootScope.toLabel = JSON.parse(translateData).toLabel;
		if (document.getElementById("viewPrintTicketLabel") != null)
			document.getElementById("viewPrintTicketLabel").innerHTML = "" + JSON.parse(translateData).viLabel;
		if (document.getElementById("selectGenderLabel") != null)
			document.getElementById("selectGenderLabel").innerHTML = "" + JSON.parse(translateData).selectGenderLabel;
		$rootScope.passengersLabel = JSON.parse(translateData).passengersLabel;

	} //languageTranslation	 
	$rootScope.selectedLanguage = '-1';
	if ($rootScope.selectedLanguage == '-1') {
		$rootScope.languageTranslation();
	}
	$rootScope.languageChanged = function(selectedLanguage) {
		if (selectedLanguage == 'sp') {
			$sessionStorage.languageselect = "sp";
			$rootScope.sellang = "Spanish";
			translateData = localStorage.getItem('spanishTranslate');
			$sessionStorage.translateData = localStorage.getItem('spanishTranslate');
		} else {
			$sessionStorage.languageselect = "en";
			translateData = localStorage.getItem('englishTranslate');
			$rootScope.sellang = "English"
			$sessionStorage.translateData = localStorage.getItem('englishTranslate');
		}
		$rootScope.languageTranslation();
	}
	/*UserAuthFactory.generatecustomertoken().success(function(data) {
		$window.sessionStorage.token = data.token;
		AuthenticationFactory.isLogged = true;
		$window.sessionStorage.user = "Guest";
	});*/
	$rootScope.logout = function() {
		$rootScope.isLogin = false;
		$rootScope.userID = null;
		$sessionStorage.$reset();
		UserAuthFactory.logout();
		window.location.href = '#/slider';
		window.location.reload();
	}
	$rootScope.otherlogout = function() {
		$rootScope.isLogin = false;
		$rootScope.userID = null;
		$sessionStorage.$reset();
		UserAuthFactory.otherlogout();
	}
	$rootScope.nagivatehome =function()
	{
		
		$sessionStorage.$reset();
        window.location.href = '#/slider';
		window.location.reload();

	}
	$rootScope.printticket = function() {
		$rootScope.invalidbookingid = false;
		var bookingid = document.getElementById("bookingid").value;
		if (bookingid.length == 0 || bookingid == undefined) {
			$rootScope.invalidbookingid = true;
		} else {
			$sessionStorage.bookingId = bookingid;
			$sessionStorage.FromMyBookings = "Y";
			jQuery('#soap-popupbox').css('display', 'none');
			$state.go("confirmation");
		}
	}
	$rootScope.sendmail = function() {
		$rootScope.invalidbookingid = false;
		//alert(jQuery("#semailid").val());
		//alert(document.getElementById("semailid").value);
		var emailid = jQuery("#semailid").val();
		if (emailid.length == 0 || emailid == undefined) {
			$rootScope.invalidemailid = true;
		} else {
			
			jQuery('#soap-popupbox').css('display', 'none');
			var resdata ={
				emailid:emailid
			}

			commonFactory.forgotpassword(resdata).success(function(data) {
				if (data.success == '1') {
                 swal("password sent to your registered email id", " ", "success");
                
               
            }else if (data.success == '-1') {
                swal("Failed to send password. Please try after some time ", " ", "warning");
                
                
            }
           else if (data.success == '-2') {
                swal("Email id is not registered. ", " ", "warning");
                
                
            }
			});
			
		}
	}
	$rootScope.userlogin = function() {
		var translateData = $sessionStorage.translateData;
		//  alert('userlogin::'+JSON.parse(translateData).emailValidError);
		var translateData = $sessionStorage.translateData;
		$rootScope.logininvalidemail = false;
		$rootScope.logininvalidpassword = false;
		var filter1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var emailRegExp =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var loginemail = document.getElementById("loginemail").value;
		// var password = document.getElementById("lpassword").value;
		var password = document.getElementById("password1").value;
		if (loginemail.length == 0 || loginemail == undefined) {
			$rootScope.emailValidError = JSON.parse(translateData).emailValidError2;
			$rootScope.logininvalidemail = true;
		}
		/*	 else if(!emailRegExp.test(loginemail)){
			
				 $rootScope.emailValidError = JSON.parse(translateData).email1Valid;
				 $rootScope.logininvalidemail =true;
				 	
			 }	 */
		else if (password.length == 0 || password == undefined) {
			$rootScope.pwdValidError = JSON.parse(translateData).pwdValidError;
			$rootScope.logininvalidpassword = true;
		}
		/* else if (!filter1.test(loginemail)) {
		$rootScope.logininvalidemail =true;

		}*/
		else {
			UserAuthFactory.login(loginemail, password).success(function(data) {
				if (data.status == 401) {
					swal(JSON.parse(translateData).loginemailAlert, " ", "warning");
					//  swal("Authentication failed with the give username and password", " ", "warning");
				} else {
					jQuery('#soap-popupbox').css('display', 'none');
					AuthenticationFactory.isLogged = true;
					AuthenticationFactory.user = data.user.USERID;
					$window.sessionStorage.token = data.token;
					$window.sessionStorage.user = data.user.USERID;
					$sessionStorage.CUSTOMERID = data.user.CUSTOMERID;
					$sessionStorage.isAuthenticate = "Y";
					$rootScope.login = true;
					$sessionStorage.EMAILID = data.user.EMAIL;
				}
			});
		}
	}
	$rootScope.routessearch = function() {
		var locid = $sessionStorage.locid;
		var toid = $sessionStorage.toid;
		var fromdate = $sessionStorage.fromdate;
		var returndate = $sessionStorage.todate;
		var travelfromlocdesc = $sessionStorage.travelfromlocdesc;
		var traveltolocdesc = $sessionStorage.traveltolocdesc;
		var noofseats = $sessionStorage.noofseats;
		var dd = new Date(fromdate);
		var n = dd.getDay();
		var daydesc = "N";
		var todesc = "N";
		var translateData = $sessionStorage.translateData;
		if (locid == "-1" || locid == undefined) {
			swal(JSON.parse(translateData).locidAlert, " ", "warning");
			//  swal("Please select from location", " ", "warning");
		} else if (toid == "-1" || toid == undefined) {
			swal(JSON.parse(translateData).toidAlert, " ", "warning");
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
				if (n == 7) {
					daydesc = "SUNDAY";
				}
			} else {
				fromdate = "N";
			}
			if (returndate != undefined) {
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
				if (n1 == 7) {
					todesc = "SUNDAY";
				}
			}
			$sessionStorage.locid = locid;
			$sessionStorage.toid = toid;
			$sessionStorage.fromdate = fromdate;
			$sessionStorage.daydesc = daydesc;
			$sessionStorage.travelfromlocdesc = travelfromlocdesc;
			$sessionStorage.traveltolocdesc = traveltolocdesc;
			$sessionStorage.noofseats = noofseats;
			$sessionStorage.routeid ="N";

			var translateData = $sessionStorage.translateData;
			if (returndate == undefined || returndate.length == 0) {
				$sessionStorage.todate = "N";
				$sessionStorage.todesc = "N";
			} else {
				$sessionStorage.todate = returndate;
				$sessionStorage.todesc = todesc;
			}
			if (fromdate == "N" && $sessionStorage.todate == "N") {
				swal(JSON.parse(translateData).returndateAlert, " ", "warning");
				//  swal("Please enter either travel from date or return date", " ", "warning");
				return false;
			} else {
				if ($sessionStorage.isVehicleControllerPage == "PRIMARY") {
					// go to secondary page
					$state.go("vehicles");
				} else if ($sessionStorage.isVehicleControllerPage == "SECONDARY") {
					//go to primary
					$state.go("vehicles1");
				} else {
					$state.go("vehicles");
				}
			}
		}
	}
	$rootScope.signup = function() {
		$rootScope.invalidfname = false;
		$rootScope.invalidlname = false;
		$rootScope.invalidemail = false;
		$rootScope.invalidmobile = false;
		$rootScope.invalidpassword = false;
		$rootScope.invalidconfirm = false;
		var translateData = $sessionStorage.translateData;
		var firstname = document.getElementById("firstname").value;
		var lastname = document.getElementById("lastname").value;
		var emailid = document.getElementById("emailid").value;
		var mobileno = document.getElementById("mobileno").value;
		var password = document.getElementById("password").value;
		var confirmpassword = document.getElementById("confirmpassword").value;
		var filter1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var emailRegExp =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var phoneRegExp = /^\d*$/;
		if (firstname.length == 0 || firstname == undefined) {
			$rootScope.invalidfnameValid = JSON.parse(translateData).invalidfnameValid;
			$rootScope.invalidfname = true;
		} else if (lastname.length == 0 || lastname == undefined) {
			$rootScope.invalidlnameValid = JSON.parse(translateData).invalidlnameValid;
			$rootScope.invalidlname = true;
		} else if (emailid.length == 0 || emailid == undefined) {
			$rootScope.invalidemailValid = JSON.parse(translateData).invalidemailValid;
			$rootScope.invalidemail = true;
		}
		// else if (!filter1.test(emailid)) {
		else if (!emailRegExp.test(emailid)) {
			$rootScope.invalidemailValid = JSON.parse(translateData).invalidemailValid;
			$rootScope.invalidemail = true;
		} else if (mobileno.length == 0 || mobileno == undefined) {
			$rootScope.invalidmobileValid = JSON.parse(translateData).invalidmobileValid;
			$rootScope.invalidmobile = true;
		} else if (!phoneRegExp.test(mobileno)) {
			$rootScope.invalidmobileValid = JSON.parse(translateData).phone1Valid;
			$rootScope.invalidmobile = true;
		} else if (password.length == 0 || password == undefined) {
			$rootScope.invalidpasswordValid = JSON.parse(translateData).invalidpasswordValid;
			$rootScope.invalidpassword = true;
		} else if (password != confirmpassword) {
			$rootScope.invalidconfirmValid = JSON.parse(translateData).invalidconfirmValid;
			$rootScope.invalidconfirm = true;
			//$scope.errormessage = "Entered password and confirm password is not same";
		} else {
			var requestData = {
				countryid: 0,
				firstname: firstname,
				lastname: lastname,
				active: 1,
				userid: -1,
				address: "",
				email: emailid,
				cityid: 0,
				languageid: 0,
				telephone: mobileno,
				company: 0,
				customerid: 0,
				password: password
			};
			var translateData = $sessionStorage.translateData;
			commonFactory.addorupdatecustomer(requestData).success(function(data) {
				if (data.success == 'SUCCESS') {
					document.getElementById("firstname").value ='';
		             document.getElementById("lastname").value='';
		            document.getElementById("emailid").value='';
		            document.getElementById("mobileno").value='';
		            document.getElementById("password").value='';
		            document.getElementById("confirmpassword").value ='';

					jQuery('#soap-popupbox').css('display', 'none');
					swal(JSON.parse(translateData).regsuccAlert, " ", "success");
					//  swal("User registration successful.Please login to book the tickets", " ", "warning");
				} else {
					swal(JSON.parse(translateData).regfailAlert, " ", "warning");
					//  swal("Failed to register the user.Please check if email id already exists", " ", "warning");
				}
			});
		}
	}
	AuthenticationFactory.check();
	$rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
		if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
			$location.path("/login");
		} else {
			// check if user object exists else fetch it. This is incase of a page refresh
			if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
			if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
		}
	});
	$rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
		$rootScope.showMenu = AuthenticationFactory.isLogged;
		$rootScope.role = AuthenticationFactory.userRole;
		// if the user is already logged in, take him to the home page
		if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
			$location.path('/');
		}
	});
}]);
app.directive('validNumber', function() {
	return {
		require: '?ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				var clean = val.replace(/[^-0-9\.]/g, '');
				var negativeCheck = clean.split('-');
				var decimalCheck = clean.split('.');
				if (!angular.isUndefined(negativeCheck[1])) {
					negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
					clean = negativeCheck[0] + '-' + negativeCheck[1];
					if (negativeCheck[0].length > 0) {
						clean = negativeCheck[0];
					}
				}
				if (!angular.isUndefined(decimalCheck[1])) {
					decimalCheck[1] = decimalCheck[1].slice(0, 2);
					clean = decimalCheck[0] + '.' + decimalCheck[1];
				}
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function(event) {
				if (event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
});
app.directive('onlyNumber', function() {
	return {
		require: '?ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				var clean = val.replace(/[^0-9]+/g, '');
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});
			element.bind('keypress', function(event) {
				if (event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
});
app.directive('validEmail', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if (!ctrl) {
				return false;
			}

			function isValidEmail(value) {
				if (!value) {
					return false;
				}
				// Email Regex used by ASP.Net MVC
				var regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
				return regex.exec(value) != null;
			}
			scope.$watch(ctrl, function() {
				ctrl.$validate();
			});
			ctrl.$validators.email = function(modelValue, viewValue) {
				return isValidEmail(viewValue);
			};
		}
	};
});
app.directive('onlyAlphabets', function() {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				if (inputValue == null)
					return ''
				cleanInputValue = inputValue.replace(/[0-9]/, '');
				if (cleanInputValue != inputValue) {
					modelCtrl.$setViewValue(cleanInputValue);
					modelCtrl.$render();
				}
				return cleanInputValue;
			});
		}
	}
});
app.directive('uppercase', function() {
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(scope, element, attrs, ngModel) {
			//This part of the code manipulates the model
			ngModel.$parsers.push(function(input) {
				return input ? input.toUpperCase() : "";
			});
			//This part of the code manipulates the viewvalue of the element
			element.css("text-transform", "uppercase");
		}
	};
});
app.controller('bookingController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window, commonFactory, userFactory) {
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



}]);
app.controller('confirmationController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory,
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

}]);
app.controller('dashboardController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'userFactory', 'commonFactory', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window,
  userFactory, commonFactory) {
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
  jQuery('#noofpassenger').val($sessionStorage.noofseats);
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
  jQuery('#mydiv').show();
  var resdata = {
    customerid: $sessionStorage.CUSTOMERID
  }
  userFactory.getvehiclecount(resdata).success(function(data) {
    $scope.vehcount = data.count;
    userFactory.getcompanycount(resdata).success(function(data) {
      $scope.companycount = data.count;
      userFactory.getroutescount(resdata).success(function(data) {
        $scope.routescount = data.count;
        //alert($scope.routescount);
        userFactory.getbookingscount(resdata).success(function(data) {
          $scope.bookingcount = data.count;
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
  })
}]);
app.controller('destinationController', ['$scope', '$filter', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope,$filter, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window,
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
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
app.controller('errorController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory) {
    $rootScope.ticketheader =true;
  $rootScope.mainheader =false;

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "none");
    jQuery('#mainheader1').css("display", "none");
    jQuery('.collapse').collapse("hide");

}]);
app.controller('mybookingsController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory,userFactory) {
   
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
 
 
	}]);
app.controller('printticketController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory,userFactory) {
   
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
 
 
 
	}]);
app.controller('profileController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory,userFactory) {
   
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
  
 
 
	}]);
app.controller('seatController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', '$interval', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'userFactory', 'commonFactory', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, $interval, UserAuthFactory, AuthenticationFactory, $window, userFactory, commonFactory) {
    $rootScope.mainheader = false;

    jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "block");
    jQuery('#mainheader1').css("display", "block");
    jQuery('.collapse').collapse("hide");

	var translateData = $sessionStorage.translateData;
    $scope.guestlogin ="N";
    $sessionStorage.guestLogin ="N";
    $scope.getcheckoutid ="N";
    $sessionStorage.selectedseatarray =[];
    $sessionStorage.selectedseatarrayreturn=[];
	
	if(document.getElementById("homeLabel")!=null)
   document.getElementById("homeLabel").innerHTML = ""+JSON.parse(translateData).homeLabel; 

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

    var frlocid = $sessionStorage.locid;
    var tolocid = $sessionStorage.toid;
    var fromdate = $sessionStorage.fromdate;
    var daydesc = $sessionStorage.daydesc;
    var todate = $sessionStorage.todate;
    var todesc = $sessionStorage.todesc;


    if ($sessionStorage.isAuthenticate == "Y") {
        $rootScope.login = true;
    } else {
        $rootScope.login = false;
    }
    $scope.recordlists = $sessionStorage.records;

    jQuery('#noofpassenger').val($sessionStorage.noofseats);

    if ($scope.recordlists.length == 2) {
        $scope.roundtripe = true;


    } else {
        $scope.roundtripe = false;

    }
     $scope.onwardmap =false;
     $scope.returnmap =false;
    for (var indx = 0; indx < $scope.recordlists.length; indx++) {

        if (indx == 0) {
            $scope.vehid1 = $scope.recordlists[indx].vehid;
            $scope.vehtypeid1 = $scope.recordlists[indx].vehtypeid;
            if ($scope.recordlists[indx].seatmap != "-1") {
                 $scope.onwardmap =true;
            getseatmap();
            
            
        }

        } else {
            $scope.vehid2 = $scope.recordlists[indx].vehid;
            $scope.vehtypeid2 = $scope.recordlists[indx].vehtypeid;
            if ($scope.recordlists[indx].seatmap != "-1") {
                 $scope.returnmap =true;
            getreturnseatmap();

        }
        }


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

     if(fromdate!="N"){
       jQuery('#trdate').val(fromdate); 
     }
     if (todate != "N") {

        jQuery('#rtdate').val(todate);
      }
    // document.getElementById("trdate").value = fromdate;
    var resdata = {

    }

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




    jQuery('#mydiv').show();

    /* var resdata ={
      customerid:$sessionStorage.CUSTOMERID
     }

    userFactory.getvehiclecount(resdata).success(function(data) {
     
        $scope.vehcount =data.count;

     
     
    })*/


    var maparray = [];
    $scope.selectedseatarray = [];
    $scope.seatsselected = "0";
    $scope.seatpositions = "0";
    $scope.topselectedseatarray = [];
    $scope.topseatsselected = "0";
    $scope.topseatpositions ="0";

    $scope.selectedseatarrayreturn = [];
    $scope.seatsselectedreturn = "0";
    $scope.seatpositionsreturn = "0";
    $scope.topseatselection=false;
    $scope.seatseperator =0;

    $scope.topselectedseatarrayreturn = [];
    $scope.topseatsselectedreturn = "0";
    $scope.topseatpositionsreturn = "0";
    $scope.seatseperatorreturn =0;
    $scope.topseatselectionreturn=false;
    $scope.rowcolumn =0;
    $scope.toprowcolumn =0;
    $scope.rowcolumnreturn=0;
     $scope.toprowcolumnreturn=0;


    function getseatmap() {
        var prams = {
            vehid: $scope.vehtypeid1

        }
        $scope.topseatselectiondata ="";

        var params ={
          vehtypeid :$scope.vehtypeid1
        }

        commonFactory.getallvehicletypeById(params).success(function(data) {
                   $scope.seatseperator =data[0].TOP_ROW_START;
                   $scope.rowcolumn =data[0].SEAT_COLUMNS;
                   $scope.toprowcolumn =data[0].TOP_SEAT_COLUMNS;
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

         
         userFactory.getvehicletopseatlayout(prams).success(function(data) {
          if(data.length >0)
          {
            $scope.topseatselection =true;
            $scope.arraydata =data;
          }

        userFactory.getvehicleseatlayout(prams).success(function(data) {

            maparray = [];
            var counter = 0;
            var markers = [];
            for (var indx = 0; indx < data.length; indx++) {

                var leftseat = data[indx].LEFT_SEAT;
                var rightseat = data[indx].RIGHT_SEAT;
                var sepeator = data[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var mapper;
                if (sepeator == "S") {
                    if(leftval==undefined || leftval==0)
                    {
                        mapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        mapper = leftval + "_";
                    }
                    else{
                         mapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        mapper = "__" + rightval;

                    }else if(rightval==undefined ||rightval==0)
                    {
                        mapper = leftval + "__";
                    }else{
                         mapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {
                    if(leftval==undefined || leftval==0)
                    {
                         mapper =  "___" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                      mapper = leftval + "___";
                    }else{
                         mapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {
                    mapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.rowcolumn; i++) {

                        if (i == 0) {
                            mapper = "_";
                        } else {
                            mapper = mapper + "_";
                        }
                    }

                }


                markers[indx] = mapper;

                maparray.push(markers[indx]);
                //maparray.push(mapper2);


            }

           


            var firstSeatLabel = 1;
            var cart = jQuery('#selected-seats'),
                counter = jQuery('#counter'),
                total = jQuery('#total'),
                sc = jQuery('#seat-map').seatCharts({
                    map: maparray,
                   naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                   
                    click: function() {

                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items

                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item-' + this.settings.id)
                                .data('seatId', this.settings.id)
                                .appendTo(jQuery('#selected-seats'));

                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.selectedseatarray.push(seatinfo);
                            $scope.seatsselected = "0"



                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter").val(sc.find('selected').length - 1);
                            var newarraylist = [];
                            for (var k = 0; k < $scope.selectedseatarray.length; k++) {

                                if (this.settings.id != $scope.selectedseatarray[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.selectedseatarray[k].seats,
                                        seatid: $scope.selectedseatarray[k].seatid
                                    }
                                    newarraylist.push(seatinfo);
                                }

                            }
                            $scope.selectedseatarray = newarraylist;
                            //remove the item from our cart
                            jQuery('#cart-item-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });



            //this will handle "[cancel]" link clicks
            jQuery('#selected-seats').on('click', '.cancel-cart-item', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc.get(jQuery(this).parents('li:first').data('seatId')).click();
            });

             if($scope.topseatselection ==true)
            {
              
              var topmaparray = [];
            var counter = 0;
            var topmarkers = [];
            for (var indx = 0; indx < $scope.arraydata.length; indx++) {

                var leftseat = $scope.arraydata[indx].LEFT_SEAT;
                var rightseat = $scope.arraydata[indx].RIGHT_SEAT;
                var sepeator = $scope.arraydata[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var topmapper;
                if (sepeator == "S") {
                    if(leftval==undefined || leftval==0)
                    {
                        topmapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        topmapper = leftval + "_";
                    }
                    else{
                         topmapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        topmapper = "__" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        topmapper = leftval + "__";
                    }else{
                         topmapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {

                    if(leftval==undefined || leftval==0)
                    {
                         topmapper =  "___" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                      topmapper = leftval + "___";
                    }else{
                         topmapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {

                    topmapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.toprowcolumn; i++) {

                        if (i == 0) {
                            topmapper = "_";
                        } else {
                            topmapper = topmapper + "_";
                        }
                    }

                }


                topmarkers[indx] = topmapper;

                topmaparray.push(topmarkers[indx]);
                //maparray.push(mapper2);


            }

               var firstSeatLabel = $scope.seatseperator+1;
            var cart = jQuery('#selected-seats2'),
                counter = jQuery('#counter2'),
                total = jQuery('#total2'),
                sc1 = jQuery('#seat-map2').seatCharts({
                    map: topmaparray,
                    naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                 
                    click: function() {
                        
                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items
                             
                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item2-' + this.settings.id)
                                .data('seatId2', this.settings.id)
                                .appendTo(jQuery('#selected-seats2'));

                              
                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.topselectedseatarray.push(seatinfo);
                            $scope.topseatsselected = "0"



                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter2").val(sc.find('selected').length - 1);
                            var newarraylist = [];
                            for (var k = 0; k < $scope.topselectedseatarray.length; k++) {

                                if (this.settings.id != $scope.topselectedseatarray[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.topselectedseatarray[k].seats,
                                        seatid: $scope.topselectedseatarray[k].seatid
                                    }
                                    newarraylist.push(seatinfo);
                                }

                            }
                            $scope.topselectedseatarray = newarraylist;
                            //remove the item from our cart
                            jQuery('#cart-item2-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });



            }


            //this will handle "[cancel]" link clicks
            jQuery('#selected-seats2').on('click', '.cancel-cart-item2', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc.get(jQuery(this).parents('li:first').data('seatId2')).click();
            });


           
            //let's pretend some seats have already been booked
             // sc.get(['1_2']).status('unavailable');
              //sc1.get(['1_2']).status('unavailable');
                 var travelfromdate ="N";
                 if($sessionStorage.fromdate !="N"){
                var traveldate = new Date($sessionStorage.fromdate);
                var month = (traveldate.getMonth() + 1);
                var day = traveldate.getDate();
                var year = traveldate.getFullYear();

                var travelfromdate = year + "-" + month + "-" + day;
               }

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
               

            var params = {
                vehid: $scope.vehid1,
                fromloc: $sessionStorage.locid,
                toloc: $sessionStorage.toid,
                traveldate :travelfromdate
            }
            userFactory.getvehicleseatmapbookings(params).success(function(data) {
                 
                 var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                 var topdataarray =data.toparraypostion.toString();
                 var topdataarrypos =[];
                 var topmark =[];
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                   var toppermissions =topdataarray.split(",");
                     for( var sk =0;sk< toppermissions.length;sk++)
                     {
                        
                        topmark[sk] =toppermissions[sk];
                       topdataarrypos.push(topmark[sk]);
                   
                     }   
                  


                sc.get(dataarrypos).status('unavailable');
                sc1.get(topdataarrypos).status('unavailable');

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

           /* $interval(function() {

                userFactory.getvehicleseatmapbookings(params).success(function(data) {

                     var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                  


                sc.get(dataarrypos).status('unavailable');

                });

            }, 10000);*/

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

    

    }


   function getreturnseatmap() {
        var prams = {
            vehid: $scope.vehtypeid2

        }

         var params ={
          vehtypeid :$scope.vehtypeid2
        }

        commonFactory.getallvehicletypeById(params).success(function(data) {
                   $scope.seatseperatorreturn =data[0].TOP_ROW_START;
                    $scope.rowcolumnreturn =data[0].SEAT_COLUMNS;
                   $scope.toprowcolumnreturn =data[0].TOP_SEAT_COLUMNS;
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
        
        userFactory.getvehicletopseatlayout(prams).success(function(data) {
          if(data.length >0)
          {
            $scope.topseatselectionreturn =true;
            $scope.arraydatareturn =data;
          }
        userFactory.getvehicleseatlayout(prams).success(function(data) {


            maparray = [];
            var counter = 0;
            var markers = [];
            for (var indx = 0; indx < data.length; indx++) {

                var leftseat = data[indx].LEFT_SEAT;
                var rightseat = data[indx].RIGHT_SEAT;
                var sepeator = data[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var mapper;
                if (sepeator == "S") {
                    if(leftval==undefined ||leftval==0)
                    {
                        mapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        mapper = leftval + "_";
                    }
                    else{
                         mapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        mapper = "__" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        mapper = leftval + "__";
                    }else{
                         mapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {
                    if(leftval==undefined || leftval==0)
                    {
                         mapper =  "___" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                      mapper = leftval + "___";
                    }else{
                         mapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {
                    mapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.rowcolumnreturn; i++) {

                        if (i == 0) {
                            mapper = "_";
                        } else {
                            mapper = mapper + "_";
                        }
                    }

                }


                markers[indx] = mapper;

                maparray.push(markers[indx]);
                //maparray.push(mapper2);


            }
            console.log(JSON.stringify(maparray));
          
            var firstSeatLabel = 1;
            var cart = jQuery('#selected-seats1'),
                counter = jQuery('#counter'),
                total = jQuery('#total'),
                sc = jQuery('#seat-map1').seatCharts({
                    map: maparray,
                    seats: {
                        f: {
                            price: 100,
                            classes: 'first-class', //your custom CSS class
                            category: 'First Class'
                        },
                        e: {
                            price: 40,
                            classes: 'economy-class', //your custom CSS class
                            category: 'Economy Class'
                        }

                    },
                    naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                    legend: {
                        node: jQuery('#legend'),
                        items: [
                            ['f', 'available', 'First Class'],
                            ['e', 'available', 'Economy Class'],
                            ['f', 'unavailable', 'Already Booked']
                        ]
                    },
                    click: function() {

                         
                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items
                                
                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item1-' + this.settings.id)
                                .data('seatId', this.settings.id)
                                .appendTo(jQuery('#selected-seats1'));

                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.selectedseatarrayreturn.push(seatinfo);
                            
                          

                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter").val(sc.find('selected').length - 1);
                            var newarraylistreturn = [];
                            for (var k = 0; k < $scope.selectedseatarrayreturn.length; k++) {

                                if (this.settings.id != $scope.selectedseatarrayreturn[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.selectedseatarrayreturn[k].seats,
                                        seatid: $scope.selectedseatarrayreturn[k].seatid
                                    }
                                    newarraylistreturn.push(seatinfo);
                                }

                            }
                            $scope.selectedseatarrayreturn = newarraylistreturn;
                            //remove the item from our cart
                            jQuery('#cart-item1-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });

            //this will handle "[cancel]" link clicks
            jQuery('#selected-seats1').on('click', '.cancel-cart-item', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc.get(jQuery(this).parents('li:first').data('seatId')).click();
            });


            if($scope.topseatselectionreturn ==true)
            {


              var topmaparray = [];
            var counter = 0;
            var topmarkers = [];
            for (var indx = 0; indx < $scope.arraydatareturn.length; indx++) {

                var leftseat = $scope.arraydatareturn[indx].LEFT_SEAT;
                var rightseat = $scope.arraydatareturn[indx].RIGHT_SEAT;
                var sepeator = $scope.arraydatareturn[indx].SEPERATOR;
                var leftval=0, rightval=0;
                for (var i = 0; i < leftseat; i++) {
                    if (i == 0) {

                        leftval = "a";
                    } else {
                        leftval = leftval + "a";
                    }
                }
                for (var i = 0; i < rightseat; i++) {
                    if (i == 0) {

                        rightval = "a";
                    } else {
                        rightval = rightval + "a";
                    }
                }
                var topmapper;
                if (sepeator == "S") {
                    if(leftval==undefined ||leftval==0)
                    {
                        topmapper = "_" + rightval;

                    }else if(rightval==undefined || rightval==0)
                    {
                        topmapper = leftval + "_";
                    }
                    else{
                         topmapper = leftval +"_" + rightval;
                    }
                    
                }
                if (sepeator == "D") {

                      if(leftval==undefined || leftval==0)
                    {
                        topmapper = "__" + rightval;

                    }else if(rightval==undefined ||rightval==0)
                    {
                        topmapper = leftval + "__";
                    }else{
                         topmapper = leftval +"__" + rightval;
                    }

                    
                }
                if (sepeator == "T") {
                    if(leftval==undefined || leftval==0)
                    {
                         topmapper =  "___" + rightval;

                    }else if(rightval==undefined ||rightval==0)
                    {
                      topmapper = leftval + "___";
                    }else{
                         topmapper = leftval +"___" + rightval;
                    }
                   
                }
                if (sepeator == "N") {

                    topmapper = leftval + rightval;
                }
                if (sepeator == "I") {
                    for (var i = 0; i < $scope.toprowcolumnreturn; i++) {

                        if (i == 0) {
                            topmapper = "_";
                        } else {
                            topmapper = topmapper + "_";
                        }
                    }

                }


                topmarkers[indx] = topmapper;

                topmaparray.push(topmarkers[indx]);
                //maparray.push(mapper2);


            }
             
               var firstSeatLabel = $scope.seatseperatorreturn+1;
            var cart = jQuery('#selected-seats3'),
                counter = jQuery('#counter3'),
                total = jQuery('#total3'),
                sc3 = jQuery('#seat-map3').seatCharts({
                    map: topmaparray,
                    naming: {
                        top: false,
                        getLabel: function(character, row, column) {
                            return firstSeatLabel++;
                        },
                    },
                 
                    click: function() {
                        
                        if (this.status() == 'available') {
                            //let's create a new <li> which we'll add to the cart items
                             
                            jQuery('<li> Seats selected # ' + this.settings.label + ':</li>')
                                .attr('id', 'cart-item3-' + this.settings.id)
                                .data('seatId3', this.settings.id)
                                .appendTo(jQuery('#selected-seats3'));

                               
                            var seatinfo = {
                                seats: this.settings.label,
                                seatid: this.settings.id
                            }
                            $scope.topselectedseatarrayreturn.push(seatinfo);
                            $scope.topseatsselectedreturn = "0"



                            /*
                             * Lets update the counter and total
                             *
                             * .find function will not find the current seat, because it will change its stauts only after return
                             * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                             */

                            return 'selected';
                        } else if (this.status() == 'selected') {

                            jQuery("counter3").val(sc.find('selected').length - 1);
                            var newarraylist = [];
                            for (var k = 0; k < $scope.topselectedseatarrayreturn.length; k++) {

                                if (this.settings.id != $scope.topselectedseatarrayreturn[k].seatid) {

                                    var seatinfo = {
                                        seats: $scope.topselectedseatarrayreturn[k].seats,
                                        seatid: $scope.topselectedseatarrayreturn[k].seatid
                                    }
                                    newarraylist.push(seatinfo);
                                }

                            }
                            $scope.topselectedseatarrayreturn = newarraylist;
                            //remove the item from our cart
                            jQuery('#cart-item3-' + this.settings.id).remove();

                            //seat has been vacated
                            return 'available';
                        } else if (this.status() == 'unavailable') {
                            //seat has been already booked
                            return 'unavailable';
                        } else {
                            return this.style();
                        }
                    }
                });

                   jQuery('#selected-seats3').on('click', '.cancel-cart-item3', function() {
                //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
                sc3.get(jQuery(this).parents('li:first').data('seatId3')).click();
            });


            }

            //let's pretend some seats have already been booked
             var traveltodate = "N";

                if ($sessionStorage.todate != "N") {
                    var travelto = new Date($sessionStorage.todate);
                    var month1 = (travelto.getMonth() + 1);
                    var day1 = travelto.getDate();
                    var year1 = travelto.getFullYear();
                    traveltodate = year1 + "-" + month1 + "-" + day1;

                }
           
            var params = {
                vehid: $scope.vehid2,
                fromloc: $sessionStorage.toid,
                toloc: $sessionStorage.locid,
                traveldate:traveltodate
            }
            userFactory.getvehicleseatmapbookingreturn(params).success(function(data) {
                  
                var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                 var topdataarray =data.toparraypostion.toString();
                 var topdataarrypos =[];
                 var topmark =[];
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                   var toppermissions =topdataarray.split(",");
                     for( var sk =0;sk< toppermissions.length;sk++)
                     {
                        
                        topmark[sk] =toppermissions[sk];
                       topdataarrypos.push(topmark[sk]);
                   
                     }   
                      
                  


                sc.get(dataarrypos).status('unavailable');
                sc3.get(topdataarrypos).status('unavailable');

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

           /* $interval(function() {

                userFactory.getvehicleseatmapbookingreturn(params).success(function(data) {

                     var dataarrypos =[];
                  var mark =[]; 
                 
                 var dataarray =data.arraypostion.toString();
                  
                     var permissions =dataarray.split(",");
                     for( var kk =0;kk< permissions.length;kk++)
                     {
                        
                        mark[kk] =permissions[kk];
                       dataarrypos.push(mark[kk]);
                   
                     }
                      
                  


                sc.get(dataarrypos).status('unavailable');

                });

            }, 10000);*/

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
    
    $scope.finalbookingscreen = function() {

var translateData = $sessionStorage.translateData;
        if ($scope.selectedseatarray.length == 0 && $scope.topselectedseatarray.length == 0 && $scope.onwardmap ==true) {
            swal(JSON.parse(translateData).bookingscreenAlert, " ", "warning");
           //  swal("Please select the seats to continue booking", " ", "warning");

        }
      else if ($scope.selectedseatarrayreturn.length == 0 && $scope.topselectedseatarrayreturn.length == 0 && $scope.returnmap ==true) {
            swal(JSON.parse(translateData).bookingscreenreturnAlert, " ", "warning");
              //  swal("Please select the return trip seats to continue booking", " ", "warning");
        }
         else {
            
            if ($sessionStorage.CUSTOMERID == undefined && $scope.getcheckoutid=="N") {

               /* swal(JSON.parse(translateData).bookingConAlert, " ", "warning");
             //   swal("Please login to book tickets", " ", "warning");
                return false;*/
            
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
                        }else{
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
       continuebooking();

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
                 

                 continuebooking();
 
            }
        }
    }


    function continuebooking()
    {
     $sessionStorage.selectedseatarray =[];
     $sessionStorage.selectedseatarrayreturn=[];
    

        $scope.seatsselected = "0";
                  $scope.seatsselectedreturn = "0";
                  $scope.topseatsselected="0";
                  $scope.topseatsselectedreturn="0"
                for (var k = 0; k < $scope.selectedseatarray.length; k++) {

                    if ($scope.seatsselected == "0") {
                        $scope.seatsselected = $scope.selectedseatarray[k].seats;
                        $scope.seatpositions = $scope.selectedseatarray[k].seatid;

                    } else {
                        $scope.seatsselected = $scope.seatsselected + "," + $scope.selectedseatarray[k].seats;
                        $scope.seatpositions = $scope.seatpositions + "," + $scope.selectedseatarray[k].seatid;

                    }




                }

                for (var k = 0; k < $scope.topselectedseatarray.length; k++) {

                    if ($scope.topseatsselected == "0") {
                        $scope.topseatsselected = $scope.topselectedseatarray[k].seats;
                        $scope.topseatpositions = $scope.topselectedseatarray[k].seatid;

                    } else {
                        $scope.topseatsselected = $scope.topseatsselected + "," + $scope.topselectedseatarray[k].seats;
                        $scope.topseatpositions = $scope.topseatpositions + "," + $scope.topselectedseatarray[k].seatid;

                    }




                }

                 for (var k = 0; k < $scope.selectedseatarrayreturn.length; k++) {

                    if ($scope.seatsselectedreturn == "0") {
                        $scope.seatsselectedreturn = $scope.selectedseatarrayreturn[k].seats;
                        $scope.seatpositionsreturn = $scope.selectedseatarrayreturn[k].seatid;

                    } else {
                        $scope.seatsselectedreturn = $scope.seatsselectedreturn + "," + $scope.selectedseatarrayreturn[k].seats;
                        $scope.seatpositionsreturn = $scope.seatpositionsreturn + "," + $scope.selectedseatarrayreturn[k].seatid;

                    }




                }

                  for (var k = 0; k < $scope.topselectedseatarrayreturn.length; k++) {

                    if ($scope.topseatsselectedreturn == "0") {
                        $scope.topseatsselectedreturn = $scope.topselectedseatarrayreturn[k].seats;
                        $scope.topseatpositionsreturn = $scope.topselectedseatarrayreturn[k].seatid;

                    } else {
                        $scope.topseatsselectedreturn = $scope.topseatsselectedreturn + "," + $scope.topselectedseatarrayreturn[k].seats;
                        $scope.topseatpositionsreturn = $scope.topseatpositionsreturn + "," + $scope.topselectedseatarrayreturn[k].seatid;

                    }




                }
                var travelfromdate ="N";
                if($sessionStorage.fromdate !="N") {
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
                var seats = parseInt($scope.selectedseatarray.length)+parseInt($scope.topselectedseatarray.length);
                var seats1 = parseInt($scope.selectedseatarrayreturn.length)+parseInt($scope.topselectedseatarrayreturn.length);
                // $scope.totalpassengers1;
                $sessionStorage.selectedseatarray = $scope.selectedseatarray;
                $sessionStorage.selectedseatarrayreturn = $scope.selectedseatarrayreturn;
                $sessionStorage.forwardseats = $scope.seatsselected;
                $sessionStorage.forwardpositions = $scope.seatpositions;
                $sessionStorage.backwardseats = $scope.seatsselectedreturn;
                $sessionStorage.backwardpositions = $scope.seatpositionsreturn;
                $sessionStorage.topselectedseatarray = $scope.topselectedseatarray;
                $sessionStorage.topforwardseats = $scope.topseatsselected;
                $sessionStorage.topforwardpositions = $scope.topseatpositions;
                $sessionStorage.topselectedseatarrayreturn = $scope.topselectedseatarrayreturn;
                $sessionStorage.topbackwardseats = $scope.topseatsselectedreturn;
                $sessionStorage.topbackwardpositions = $scope.topseatpositionsreturn;
              

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
                    customerid: custid,
                    seatmap: "Y",
                    forwardseats: $scope.seatsselected,
                    forwardpositions: $scope.seatpositions,
                    backwardseats: $scope.seatsselectedreturn,
                    backwardpositions: $scope.seatpositionsreturn,
                    topforwardseats: $scope.topseatsselected,
                    topforwardpositions: $scope.topseatpositions,
                    topbackwardseats: $scope.topseatsselectedreturn,
                    topbackwardpositions: $scope.topseatpositionsreturn,





                }
var translateData = $sessionStorage.translateData;
                userFactory.blockseats(reqparams).success(function(data) {

                    if (data.success == 4) {
                        swal(JSON.parse(translateData).blockseatsAlert, " ", "success");
                     //   swal("Seats blocked successfully", " ", "success");

                        $scope.confirmbooking = true;
                        var mytimeout = $timeout($scope.onTimeout, 1000);
                        $state.go("booking");

                    } else if (data.success == -1) {
                        swal(JSON.parse(translateData).blockseatsfailAlert, " ", "warning");
                     //   swal("Failed to block the seats", " ", "warning");


                    } else if (data.success == -2 || data.success==-5) {
                       swal(JSON.parse(translateData).blockseatavalAlert, " ", "warning");
                      //    swal("Seats not available", " ", "warning");

                    } else if (data.success == -3) {
                        swal(JSON.parse(translateData).blockseatmoreavalAlert, " ", "warning");
                      //   swal("Selected seats is more than the available seats", " ", "warning");

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



}]);
app.controller('settingsController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory) {
   
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
	// var spanishTranslate =  localStorage.getItem('spanishTranslate');
  if($sessionStorage.languageselect!="sp")
  {
	 $rootScope.sellang ="English";
	   translateData =  localStorage.getItem('englishTranslate');
	
  }else{
     $rootScope.sellang ="Spanish";
	    translateData =  localStorage.getItem('spanishTranslate');
	
  }

   
  
 if(document.getElementById("homeLabel")!=null)
	  document.getElementById("homeLabel").innerHTML = ""+JSON.parse(translateData).homeLabel;
   if(document.getElementById("dashboardLabel")!=null)
	  document.getElementById("dashboardLabel").innerHTML = ""+JSON.parse(translateData).dashboardLabel;
   if(document.getElementById("dashboardTittleLabel")!=null)
	  document.getElementById("dashboardTittleLabel").innerHTML = ""+JSON.parse(translateData).dashboardTittleLabel;
   if(document.getElementById("dashboardLabelTab")!=null)
	  document.getElementById("dashboardLabelTab").innerHTML = ""+JSON.parse(translateData).dashboardLabelTab;
   if(document.getElementById("profileLabel")!=null)
	  document.getElementById("profileLabel").innerHTML = ""+JSON.parse(translateData).profileLabel;
   if(document.getElementById("mybookingLabel")!=null)
	  document.getElementById("mybookingLabel").innerHTML = ""+JSON.parse(translateData).mybookingLabel;
   if(document.getElementById("settingsLabel")!=null)
	  document.getElementById("settingsLabel").innerHTML = ""+JSON.parse(translateData).settingsLabel;

  
		   if(document.getElementById("accountsettingsLabel")!=null)
	  document.getElementById("accountsettingsLabel").innerHTML = ""+JSON.parse(translateData).accountsettingsLabel;
	  if(document.getElementById("Change_Your_PasswordLabel")!=null)
	  document.getElementById("Change_Your_PasswordLabel").innerHTML = ""+JSON.parse(translateData).Change_Your_PasswordLabel;
   if(document.getElementById("Old_PasswordLabel")!=null)
	  document.getElementById("Old_PasswordLabel").innerHTML = ""+JSON.parse(translateData).Old_PasswordLabel;
   if(document.getElementById("Enter_New_PasswordLabel")!=null)
	  document.getElementById("Enter_New_PasswordLabel").innerHTML = ""+JSON.parse(translateData).Enter_New_PasswordLabel;
   if(document.getElementById("Confirm_New_passwordLabel")!=null)
	  document.getElementById("Confirm_New_passwordLabel").innerHTML = ""+JSON.parse(translateData).Confirm_New_passwordLabel;
   if(document.getElementById("updatebutton")!=null)
	  document.getElementById("updatebutton").innerHTML = ""+JSON.parse(translateData).updatebutton;
   if(document.getElementById("Change_Your_EmailLabel")!=null)
	  document.getElementById("Change_Your_EmailLabel").innerHTML = ""+JSON.parse(translateData).Change_Your_EmailLabel;
	   if(document.getElementById("Old_emailLabel")!=null)
	  document.getElementById("Old_emailLabel").innerHTML = ""+JSON.parse(translateData).Old_emailLabel;
   if(document.getElementById("Enter_New_EmailLabel")!=null)
	  document.getElementById("Enter_New_EmailLabel").innerHTML = ""+JSON.parse(translateData).Enter_New_EmailLabel;
   if(document.getElementById("Confirm_New_EmailLabel")!=null)
	  document.getElementById("Confirm_New_EmailLabel").innerHTML = ""+JSON.parse(translateData).Confirm_New_EmailLabel;
   if(document.getElementById("updateemailbutton")!=null)
	  document.getElementById("updateemailbutton").innerHTML = ""+JSON.parse(translateData).updateemailbutton;
   if(document.getElementById("Send_Me_Emails_WhenLabel")!=null)
	  document.getElementById("Send_Me_Emails_WhenLabel").innerHTML = ""+JSON.parse(translateData).Send_Me_Emails_WhenLabel;
   if(document.getElementById("Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel")!=null)
	  document.getElementById("Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel").innerHTML =
                             ""+JSON.parse(translateData).Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel;
   if(document.getElementById("Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel")!=null)
	  document.getElementById("Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel").innerHTML = 
       ""+JSON.parse(translateData).Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel;
	   
	   if(document.getElementById("I_have_an_upcoming_reservationLabel")!=null)
	  document.getElementById("I_have_an_upcoming_reservationLabel").innerHTML =  ""+JSON.parse(translateData).I_have_an_upcoming_reservationLabel;
                            
   if(document.getElementById("Update_All_SettingsButon")!=null)
	  document.getElementById("Update_All_SettingsButon").innerHTML = ""+JSON.parse(translateData).Update_All_SettingsButon;
  if(document.getElementById("Send_Me_Emails_WhenLabel")!=null)
	  document.getElementById("Send_Me_Emails_WhenLabel").innerHTML = ""+JSON.parse(translateData).Send_Me_Emails_WhenLabel;
  
  
  
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
      
    var resdata={
      
    }
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
  
 
  //update password 
  
	  jQuery("#updatebutton").click(function(){		 
		
		   var translateData = $sessionStorage.translateData;
		//   alert(JSON.parse(translateData).oldPwdValid);
		   var oldpassword = jQuery("#oldpassword").val();
 
			var newpassword = jQuery("#newpassword").val();

			var confirmpassword = jQuery("#confirmnewpassword").val();
	
	if( oldpassword.length== 0){
			
		//jQuery("#invalidoldpassword").html("Please enter old password");
		
		jQuery("#invalidoldpassword").html(JSON.parse(translateData).oldPwdValid);
		
		$timeout(function(){
			jQuery("#invalidoldpassword").html (" ");
		},3000);
	}
	else if( newpassword.length== 0){
		
		//jQuery("#invalidnewpassword").html("Please enter new password");
		jQuery("#invalidnewpassword").html(JSON.parse(translateData).newPwdValid);
		
		$timeout(function(){
			jQuery("#invalidnewpassword").html (" ");
		},3000);
	}
	else if( confirmpassword.length== 0){
			
		//jQuery("#invalidconfirmpassword").html("Please enter confirm password");
		jQuery("#invalidconfirmpassword").html(JSON.parse(translateData).confirmPwdValid);
		
		$timeout(function(){
			jQuery("#invalidconfirmpassword").html (" ");
		},3000);
	}
	else if( newpassword!=confirmpassword){
			
		//jQuery("#invalidconfirmpassword").html( "Please enter confirm password same as password" );
		jQuery("#invalidconfirmpassword").html( JSON.parse(translateData).pwdMatchValid );
		
		$timeout(function(){
			jQuery("#invalidconfirmpassword").html (" ");
		},3000);
	}
	else{
		//alert("login ::"+$sessionStorage.userName);
		
		var requestData = {
       
	   'emailId' : $sessionStorage.EMAILID,
        'oldpassword' : oldpassword,
        'newpassword'  : newpassword,
       
		
      };   
       //alert(JSON.stringify(requestData));
	   var translateData = $sessionStorage.translateData;
		    commonFactory.changePassword(JSON.stringify(requestData)).success(function(data) {

      $timeout(function(){

                if (data.success == 'SUCCESS') 
				{	
          // swal("Password changed successfully", " ", "success");
					swal(JSON.parse(translateData).passsuccswlAlert, " ", "success");
                  
				   $state.go('dashboard');
                } 
                else 
                {
              //    swal("Old Password is incorrect", " ", "warning");
                 swal(JSON.parse(translateData).passerrswlAlert, " ", "warning");
                }
                


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

	}
	  
	  });
    
  
  //update password
  
  //update email
  
  jQuery("#updateemailbutton").click(function(){
   
  var oldemail = jQuery("#oldemail").val();
 
 var newemail = jQuery("#newemail").val();

 var confirmemail = jQuery("#confirmemail").val();
 
 
 
 if( oldemail.length== 0){
   
  jQuery("#invalidoldemail").html("Please enter old email");
  
  $timeout(function(){
   jQuery("#invalidoldemail").html (" ");
  },3000);
 }
 else if( newemail.length== 0){
   
  jQuery("#invalidnewemail").html("Please enter new email");
  
  $timeout(function(){
   jQuery("#invalidnewemail").html (" ");
  },3000);
 }
 else if( confirmemail.length== 0){
   
  jQuery("#invalidconfirmemail").html("Please enter confirm email");
  
  $timeout(function(){
   jQuery("#invalidconfirmemail").html (" ");
  },3000);
 }
 else if( confirmemail!=newemail){
   
  jQuery("#invalidconfirmemail").html( "Please enter confirm email same as newemail" );
  
  $timeout(function(){
   jQuery("#invalidconfirmemail").html (" ");
  },3000);
 }
 else{	
		var requestData = {
        'oldemail' : oldemail,
        'newemail'  : newemail,	
      };   
       //alert(JSON.stringify(requestData));
	   var translateData = $sessionStorage.translateData;
	   
		    commonFactory.changeEmail(JSON.stringify(requestData)).success(function(data) {

      $timeout(function(){

                if (data.success == 'SUCCESS') 
				{	
				//	swal("Email changed successfully", " ", "success");
                swal(JSON.parse(translateData).emlswlAlert, " ", "success");
				  $state.go('dashboard');
				  
                } 
                else 
                {
               //   swal("Invalid email id", " ", "warning");
                   swal(JSON.parse(translateData).erremlswlAlert, " ", "warning");
                }
                


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
  
  
 }//else
 
 
  });  //update email
  
   

			
 
 
 
 
 
 
 
	}]);
app.controller('SliderController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window,
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
}]);
app.controller('staticdataController', ['$scope', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory) {
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
    
 
 
	}]);
app.controller('vehicle1Controller', ['$scope', '$filter', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope,$filter, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window, commonFactory, userFactory) {

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



}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
app.controller('vehicleController', ['$scope', '$filter', '$sessionStorage', '$rootScope', '$state', '$scope', '$timeout', 'UserAuthFactory', 'AuthenticationFactory', '$window', 'commonFactory', 'userFactory', function($scope,$filter, $sessionStorage, $rootScope, $state, $scope, $timeout, UserAuthFactory, AuthenticationFactory, $window, commonFactory, userFactory) {

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
    $sessionStorage.isVehicleControllerPage = "SECONDARY";

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



}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});

var services = angular.module('CDSApp.services', ['ngResource'])

services.factory('citizenFactory',['$http', '$resource', function($http,$resource){    
    
 console.log("hi");
	
return $resource('/users/statistics', {},
			{
				getCitizen: {
				
				query: {
                method: 'GET',
                isArray: false
				
            }
					
				}

				
			}
		);	


}]);
//This Factory is responsible for checking the user status on the client side.
app.factory('AuthenticationFactory', ['$window', function($window) {
var auth = {
isLogged: false,
check: function() {
if ($window.sessionStorage.token && $window.sessionStorage.user) {
this.isLogged = true;
} else {
this.isLogged = false;
delete this.user;
}
}
}
return auth;
}]);
//This factory is responsible for contacting the login endpoint and validating the user. And also logging out the user.
app.factory('UserAuthFactory', ['$window', '$location', '$http', 'AuthenticationFactory', function($window, $location, $http, AuthenticationFactory) {
return {
login: function(username, password) {
return $http.post('/login', {
username: username,
password: password
});
},
generatecustomertoken: function() {
return $http.post('/generatecustomertoken', {

});
},
logout: function() {
if (AuthenticationFactory.isLogged) {
AuthenticationFactory.isLogged = false;
delete AuthenticationFactory.user;
delete AuthenticationFactory.userRole;
delete $window.sessionStorage.token;
delete $window.sessionStorage.user;
delete $window.sessionStorage.userRole;
$location.path("/login");
}
},


}
}]);
//This factory is responsible for sending in the access token and the key along with each request to the server.
app.factory('TokenInterceptor', ['$q', '$window', function($q, $window) {
return {
request: function(config) {
config.headers = config.headers || {};
if ($window.sessionStorage.token) {
config.headers['X-Access-Token'] = $window.sessionStorage.token;
config.headers['X-Key'] = $window.sessionStorage.user;
config.headers['Content-Type'] = "application/json";
}
return config || $q.when(config);
},
response: function(response) {
return response || $q.when(response);
}
};
}]);
app.factory('bankManagementFactory', ['$http', '$sessionStorage', function($http, $sessionStorage) {

    return {

    	getallbanks: function(params){
	        return  $http.post('/api/v1/getallbanks',{"userId":$sessionStorage.userID});
	    },
	    
	    getallloanmasters: function(params){
	        return  $http.post('/api/v1/getallloanmasters');
	    },
	    getallloanbases: function(params){
	        return  $http.post('/api/v1/getallloanbases',{"userId":$sessionStorage.userID});
	    },
	      getallloantypes: function(params){
	        return  $http.post('/api/v1/getallloantypes',{"phoneno":$sessionStorage.phoneNo});
	    },
	     inactivateBankcharges: function(params){
	        return  $http.post('/api/v1/inactivateBankcharges',{"baseid":$sessionStorage.baseID});
	    },

	
    };
}]);
app.factory('commonFactory', ['$http', '$sessionStorage', function($http, $sessionStorage) {

    return {

    	getallcountryForAdmin: function(params){
    	   return  $http.post('/api/v1/getallCountriesForAdmin',params);
	    },
	    getallCitiesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallCitiesForAdmin',params);
	    },
	    getallCityForUser: function(params){
    	   return  $http.post('/api/v1/getallCityForUser',params);
	    },
	     getallAmenitiesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallAmenitiesForAdmin',params);
	    },
	     getallAmenitiesForUser: function(params){
    	   return  $http.post('/api/v1/getallAmenitiesForUser',params);
	    },
	     getallTransportationTypeForAdmin: function(params){
    	   return  $http.post('/api/v1/getallTransportationTypeForAdmin',params);
	    },
	    getallTransportationTypeForUser: function(params){
    	   return  $http.post('/api/v1/getallTransportationTypeForUser',params);
	    },
	    
	     addorupdatecountry: function(params){
    	   return  $http.post('/api/v1/addorupdatecountry',params);
	    },
	     getallCountriesForUser: function(params){
    	   return  $http.post('/api/v1/getallCountriesForUser',params);
	    },
	      addorupdatecity: function(params){
    	   return  $http.post('/api/v1/addorupdatecity',params);
	    },
	     addorupdateAmenities: function(params){
    	   return  $http.post('/api/v1/addorupdateAmenities',params);
	    },
	     addorupdateTransportationType: function(params){
    	   return  $http.post('/api/v1/addorupdateTransportationType',params);
	    },
	     getallSettingsForAdmin: function(params){
    	   return  $http.post('/api/v1/getallSettingsForAdmin',params);
	    },
	    addorudateSettings: function(params){
    	   return  $http.post('/api/v1/addorudateSettings',params);
	    },
	     getallEmailTemplatesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallEmailTemplatesForAdmin',params);
	    },
	     addorudateEmailTemplate: function(params){
    	   return  $http.post('/api/v1/addorudateEmailTemplate',params);
	    },
	     getallEmailAction: function(params){
    	   return  $http.post('/api/v1/getallEmailAction',params);
	    },
	      addorudateEmailAction: function(params){
    	   return  $http.post('/api/v1/addorudateEmailAction',params);
	    },
	     getallEmailForLanguage: function(params){
    	   return  $http.post('/api/v1/getallEmailForLanguage',params);
	    },
	     addorudateEmailLanguage: function(params){
    	   return  $http.post('/api/v1/addorudateEmailLanguage',params);
	    },
	     getallServiceForAdmin: function(params){
    	   return  $http.post('/api/v1/getallServiceForAdmin',params);
	    },
	     addorupdateservice: function(params){
    	   return  $http.post('/api/v1/addorupdateservice',params);
	    },
	     getallPaymentmethodsForAdmin: function(params){
    	   return  $http.post('/api/v1/getallPaymentmethodsForAdmin',params);
	    },
	      addorupdatePaymentMethods: function(params){
    	   return  $http.post('/api/v1/addorupdatePaymentMethods',params);
	    },
	     getallPaymentprocessorForAdmin: function(params){
    	   return  $http.post('/api/v1/getallPaymentprocessorForAdmin',params);
	    },
	      addorupdatePaymentProcessor: function(params){
    	   return  $http.post('/api/v1/addorupdatePaymentProcessor',params);
	    },
	     getalllanguage: function(params){
    	   return  $http.post('/api/v1/getalllanguage',params);
	    },
	     addorupdatelanguage: function(params){
    	   return  $http.post('/api/v1/addorupdatelanguage',params);
	    },
	     getalllabelforuserinterface: function(params){
    	   return  $http.post('/api/v1/getalllabelforuserinterface',params);
	    },
	     addorudateLabelUserInterface: function(params){
    	   return  $http.post('/api/v1/addorudateLabelUserInterface',params);
	    },
	      getalllabelforlanguage: function(params){
    	   return  $http.post('/api/v1/getalllabelforlanguage',params);
	    },
	     addorudateLabelforlanguage: function(params){
    	   return  $http.post('/api/v1/addorudateLabelforlanguage',params);
	    },
	     getallbusecompanyForAdmin: function(params){

	     	if($sessionStorage.companyID==0){
    	   return  $http.post('/api/v1/getallbusecompanyForAdmin',params);
    	}else{
    		 return  $http.post('/api/v1/getallbuscompany',{ "companyid":$sessionStorage.companyID})
    	}
	    },
	     addcompany: function(params){
    	   return  $http.post('/api/v1/addcompany',params);
	    },
	     updatecompany: function(params){
    	   return  $http.post('/api/v1/updatecompany',params);
	    },
	     getallbusecompanyContacts: function(params){
    	   return  $http.post('/api/v1/getallbusecompanyContacts',params);
	    },
	     getallRoutesforAdmin: function(params){
	     	if($sessionStorage.companyID==0){
    	   return  $http.post('/api/v1/getallRoutesforAdmin',params);
    	}else{
    		
           return  $http.post('/api/v1/getallRoutesforCompany',{ "companyid":$sessionStorage.companyID});

    	}
	    },
	     getallRoutesforUser: function(params){
    	   return  $http.post('/api/v1/getallRoutesforUser',params);
	    },
	     saveroutes: function(params){
    	   return  $http.post('/api/v1/saveroutes',params);
	    },
	     getallCitysByRouteId: function(params){
    	   return  $http.post('/api/v1/getallCitysByRouteId',params);
	    },
	      updateroutes: function(params){
    	   return  $http.post('/api/v1/updateroutes',params);
	    },
	      getallbusecompanyForUser: function(params){
    	   return  $http.post('/api/v1/getallbusecompanyForUser',params);
	    },
	     getallFeesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallFeesForAdmin',params);
	    },
	     getallFeesForUser: function(params){
    	   return  $http.post('/api/v1/getallFeesForUser',params);
	    },
	     addorupdateFees: function(params){
    	   return  $http.post('/api/v1/addorupdateFees',params);
	    },
	     getallServiceForUser: function(params){
    	   return  $http.post('/api/v1/getallServiceForUser',params);
	    },
	     getallCurrencyForAdmin: function(params){
    	   return  $http.post('/api/v1/getallCurrencyForAdmin',params);
	    },
	     addorupdatecurrency: function(params){
    	   return  $http.post('/api/v1/addorupdatecurrency',params);
	    },
	     getallCustomersForAdmin: function(params){
    	   return  $http.post('/api/v1/getallCustomersForAdmin',params);
	    },
	     getallCustomersForUser: function(params){
    	   return  $http.post('/api/v1/getallCustomersForUser',params);
	    },
	     addorupdatecustomer: function(params){
    	   return  $http.post('/api/v1/addorupdatecustomer',params);
	    },
	      getCustomerbyID: function(params){
    	   return  $http.post('/api/v1/getCustomerbyID',params);
	    }
	    ,
	     getallPromoCodesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallPromoCodesForAdmin',params);
	    },
	     getallPromoCodesForUser: function(params){
    	   return  $http.post('/api/v1/getallPromoCodesForUser',params);
	    },
	     addorupdatepromocode: function(params){
    	   return  $http.post('/api/v1/addorupdatepromocode',params);
	    },
	      getallPromoCodesByID: function(params){
    	   return  $http.post('/api/v1/getallPromoCodesByID',params);
	    },
	    getalltaxesForAdmin: function(params){
    	   return  $http.post('/api/v1/getalltaxesForAdmin',params);
	    },
	      addorupdatestaxes: function(params){
    	   return  $http.post('/api/v1/addorupdatestaxes',params);
	    },
	     getallscreens: function(params){
    	   return  $http.post('/api/v1/getallscreensForAdmin',params);
	    },
	    adduserrole: function(params){
    	   return  $http.post('/api/v1/adduserrole',params);
	    },
	     getallUserRolesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallUserRolesForAdmin',params);
	    },
	    getallUserRolesForUser: function(params){
    	   return  $http.post('/api/v1/getallUserRolesForUser',params);
	    },
	     getallRolePermissionsbasedonRoleId: function(params){
    	   return  $http.post('/api/v1/getallRolePermissionsbasedonRoleId',params);
	    },
	     getallMenuPermissionsbasedonRoleId: function(params){
    	   return  $http.post('/api/v1/getallMenuPermissionsbasedonRoleId',params);
	    },
	    getallMenus: function(params){
    	   return  $http.post('/api/v1/getallMenus',params);
	    },
	    menupermission: function(params){
    	   return  $http.post('/api/v1/menupermission',params);
	    },
	       getallRolesbyType: function(params){
    	   return  $http.post('/api/v1/getallRolesbyType',params);
	    },
	     getallUsersForAdmin: function(params){
    	   return  $http.post('/api/v1/getallUsersForAdmin',params);
	    },
	     addorupdateuser: function(params){
    	   return  $http.post('/api/v1/addorupdateuser',params);
	    },
	     getallContactRolesForUser: function(params){
    	   return  $http.post('/api/v1/getallContactRolesForUser',params);
	    },
	     getallContactRolesForAdmin: function(params){
    	   return  $http.post('/api/v1/getallContactRolesForAdmin',params);
	    },
	     addorupdatecontactroles: function(params){
    	   return  $http.post('/api/v1/addorupdatecontactroles',params);
	    },
	    getallvehicletypeforUser: function(params){
    	   return  $http.post('/api/v1/getallvehicletypeforUser',params);
	    },
	     getallvehicletypeforAdmin: function(params){
	     	if($sessionStorage.companyID==0){
             return  $http.post('/api/v1/getallvehicletypeforAdmin',params);
	     	}else{
               return  $http.post('/api/v1/getallvehicletypeforcomapny',{"companyid":$sessionStorage.companyID});
	     	}
    	   
	    },
	    updatevehicletype: function(params){
    	   return  $http.post('/api/v1/updatevehicletype',params);
	    },
	     addvehicletype: function(params){
    	   return  $http.post('/api/v1/addvehicletype',params);
	    },
	     getallvehicletypeById: function(params){
    	   return  $http.post('/api/v1/getallvehicletypeById',params);
	    },
	    updatevehicletype: function(params){
    	   return  $http.post('/api/v1/updatevehicletype',params);
	    },
	     getallvehicletypebycompanyid: function(params){
    	   return  $http.post('/api/v1/getallvehicletypebycompanyid',params);
	    },
	     getallRoutesbyComapnyId: function(params){
    	   return  $http.post('/api/v1/getallRoutesbyComapnyId',params);
	    },
	     saveVehicle: function(params){
    	   return  $http.post('/api/v1/saveVehicle',params);
	    },
	     getallvehicles: function(params){
	     	if($sessionStorage.companyID==0){
             return  $http.post('/api/v1/getallvehicles',params);
	     	}else{
                return  $http.post('/api/v1/getallcompanyvehicles',{"companyid":$sessionStorage.companyID});
	     	}
    	   
	    },
	       getvehiclebyid: function(params){
    	   return  $http.post('/api/v1/getvehiclebyid',params);
	    },
	       getallvehicleoutofdate: function(params){
    	   return  $http.post('/api/v1/getallvehicleoutofdate',params);
	    },
	       getallvehicletickettype: function(params){
    	   return  $http.post('/api/v1/getallvehicletickettype',params);
	    },
	       getallvehicleticketprice: function(params){
    	   return  $http.post('/api/v1/getallvehicleticketprice',params);
	    },
	       getallvehicledepaturearrival: function(params){
    	   return  $http.post('/api/v1/getallvehicledepaturearrival',params);
	    },
	      updateuserrole: function(params){
    	   return  $http.post('/api/v1/updateuserrole',params);
	    },
	     getallactivebuscompany: function(params){
    	   return  $http.post('/api/v1/getallactivebuscompany',{"companyid":$sessionStorage.companyID});
	    },
	    getallactiveroutes: function(params){
    	   return  $http.post('/api/v1/getallactiveroutes',{"companyid":$sessionStorage.companyID});
	    },
	    getallcompanyvehicles: function(params){
    	   return  $http.post('/api/v1/getallcompanyvehicles',{"companyid":$sessionStorage.companyID});
	    },
	     fromlocation: function(params){
    	   return  $http.post('/api/v1/fromlocation',params);
	    },
	     tolocation: function(params){
    	   return  $http.post('/api/v1/tolocation',params);
	    },
	    changePassword: function(params){
    	   return  $http.post('/api/v1/changePassword',params);
	    },
		  changeEmail: function(params){
    	   return  $http.post('/api/v1/changeEmail',params);
	    },
        changeCustomerSettings: function(params){
    	   return  $http.post('/api/v1/changeCustomerSettings',params);
	    },
	      forgotpassword: function(params){
    	   return  $http.post('/api/v1/forgotpassword',params);
	    }



	    



	    
	    
	
	    
    };
}]);
app.factory('dashboardFactory', ['$http', function($http) {

    return {

        getmyRequests: function(userid) {

            return $http.get('/graphdata/mystatusrequestreport/' + userid);
        },
        getmyPriority: function(userid) {
            console.log("se" + userid);
            return $http.get('/graphdata/myproirityrequestreport/' + userid);
        },
        gettopRequests: function(userid) {

            return $http.get('/graphdata/topratedrequestsreportwithimage/'+userid);
        },
        getcitizentrendsreport: function() {

            return $http.get('/graphdata/citizentrendsreport/');
        },
         getmyLocationReport: function(userid) {

            return $http.get('/graphdata/getmyLocationReport/' +userid);
        },
         gettopRequestswithoutimage: function(userid) {

            return $http.get('/graphdata/topratedrequestsreportwithoutimage/'+userid);
        },
         gettopRequestswithiamge: function(userid) {

            return $http.get('/graphdata/topratedrequestsreportwithimage/'+userid);
        }
    };
}]);

(function () {
    'use strict';

    angular
        .module('CDSApp')
        .factory('FlashService', FlashService);

    FlashService.$inject = ['$rootScope'];
    function FlashService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();
app.factory('govtdashboardFactory', ['$http', '$sessionStorage', function($http,$sessionStorage) {

 
    return {

        govtstatusreport: function() {
         var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;

            return $http.post('/govtdata/govtstatusreport',{"userid":userid,"usertype":userytype});
        },
        govtpriorityreport: function() {
            var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;
           
            return $http.post('/govtdata/govtpriorityreport',{"userid":userid,"usertype":userytype});
        },
        govtcategoryreport: function() {

        var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;
            return $http.post('/govtdata/govtcategoryreport',{"userid":userid,"usertype":userytype});
        },
        govtlocationreport: function() {
          var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;

            return $http.post('/govtdata/govtlocationreport',{"userid":userid,"usertype":userytype});
        },
          govtslarequestreport: function() {
            var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;

            return $http.post('/govtdata/govtslarequestreport',{"userid":userid,"usertype":userytype});
        },
          govtrequestbyagereport: function() {
            var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;

            return $http.post('/govtdata/govtrequestbyagereport',{"userid":userid,"usertype":userytype});
        },
          govtdepartmentreport: function() {
          var userid =$sessionStorage.userID;
         var userytype =$sessionStorage.isUserType;

            return $http.post('/govtdata/govtdepartmentreport',{"userid":userid,"usertype":userytype});
        },
        getLocationList: function() {
            var userid =$sessionStorage.userID;

          return $http.post('/govtdata/getlocationlist',{"userid":userid});
      },
      getCategoryList: function() {
          var userid =$sessionStorage.userID;

            return $http.post('/govtdata/getcategorylist',{"userid":userid});
        }
         
    };
}]);

app.factory('graphFactory', ['$http', '$sessionStorage', function($http, $sessionStorage) {
    
	return {
        getStatusReport: function() {
            return $http.get('/graphdata/statusreport');
        },
        getLocationReport: function() {
            return $http.get('/graphdata/locationreport');
        },
        getcategoryReport: function() {
            return $http.get('/graphdata/categoryreport');
        },
        getmoodfactorReport: function() {
            return $http.get('/graphdata/moodfactorreport');
        },
        getTotalRequests: function() {
            return $http.get('/graphdata/totalrequestcount');
        },
        poststories: function() {
           var userid =$sessionStorage.userID;
           var story =  $sessionStorage.mystory;
           return $http.post('/graphdata/poststories',{"userid":userid,"story":story});
        },
         getstories: function() {
        	 var userid =$sessionStorage.userID;
            return $http.post('/graphdata/getstories',{"userid":userid});
        },
        gettopstories: function() {
            return $http.post('/graphdata/gettopstories');
        }
    };
}]);
app.factory('myrequestFactory',['$http', '$sessionStorage', function($http,$sessionStorage){    
    
return {
	
	  mypostrequestlocationid : function(params){
		var locname = $sessionStorage.reqLocationName;
		return $http.post('/requestdata/mylocationid',{"locname":locname});
	  },
	  
      mypostrequests: function(params){
         
        $sessionStorage.pageno =1;
        $sessionStorage.reqtitle ="N";
        $sessionStorage.reqpriority ="0";
        $sessionStorage.reqstatus ="0";
        $sessionStorage.reqcategory ="N";
        $sessionStorage.reqlocation ="N";

        console.log($sessionStorage.pagetype);
        

         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title =$sessionStorage.reqtitle;
         var priority =$sessionStorage.reqpriority;
         var status =$sessionStorage.reqstatus;
         var category =$sessionStorage.reqcategory;
         var pagetype =$sessionStorage.pagetype;
         var usertype =$sessionStorage.isUserType;
         var locid =$sessionStorage.reqlocation;
         
        return  $http.post('/api/v1/mypostrequests',{"userid": userid, "pageno": 
            pageno,"title": title,"priority": priority,"status": status,"category": 
            category,"requestid":0,"pagetype": pagetype,"usertype":usertype,"locid":locid});
    },

     mypostrequestsparams: function(params){

         
         $sessionStorage.pageno =1;
         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title =$sessionStorage.reqtitle;
         var priority =$sessionStorage.reqpriority;
         var status =$sessionStorage.reqstatus;
         var category =$sessionStorage.reqcategory;
         var pagetype =$sessionStorage.pagetype;
         var usertype =$sessionStorage.isUserType;
         var locid =$sessionStorage.reqlocation;
         var sla = $sessionStorage.sla;
        return  $http.post('/api/v1/mypostrequests',{"userid": userid, "pageno": pageno,
            "title": title,"priority": priority,"status": status,"category": category,
            "requestid":0,"pagetype": pagetype,"usertype":usertype,"locid":locid, "sla":sla});
    },

    postvoteforrequest: function(params){
         
        var userid =$sessionStorage.userID;
         var requestid =$sessionStorage.requestid;  

        return  $http.post('/requestdata/postvotes',{"userid":userid,"requestid":requestid});
    },
      requestdetails: function(params){
         
        $sessionStorage.pageno =1;
         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title ="N";
         var priority ="0";
         var status ="0";
         var category ="N";
         var locid="N";
         var requestid =$sessionStorage.requestid;
         var pagetype =$sessionStorage.pagetype;
          var usertype =$sessionStorage.isUserType;
        
        return  $http.post('/api/v1/mypostrequests',{"userid": userid, "pageno": pageno,
            "title": title,"priority": priority,"status": status,"category": category,
            "requestid":requestid,"pagetype": pagetype,"usertype":usertype,"locid":locid});
    },
     getnextrequests: function(params){

         var userid =$sessionStorage.userID;
         var pageno =$sessionStorage.pageno;
         var title =$sessionStorage.reqtitle;
         var priority =$sessionStorage.reqpriority;
         var status =$sessionStorage.reqstatus;
         var category =$sessionStorage.reqcategory;
          var pagetype =$sessionStorage.pagetype;
          var usertype =$sessionStorage.isUserType; 
          var locid =$sessionStorage.reqlocation;
          var sla = $sessionStorage.sla;
        
        return  $http.post('/api/v1/mypostrequests',{"userid": userid, "pageno": pageno,
            "title": title,"priority": priority,"status": status,"category": category,
            "requestid":0,"pagetype": pagetype,"usertype":usertype,"locid":locid, "sla":sla});
    },
     capturemood: function(params){
         
        var userid =$sessionStorage.userID;
         var requestid =$sessionStorage.requestid;  
         var factorid =$sessionStorage.moodid;
       
         return  $http.post('/requestdata/mymoods',{"userid":userid,"factorid":factorid,"requestid":requestid});
    },
    moodperrequest: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
        
        return  $http.post('/requestdata/moodperrequestpercentage',{"requestid":requestid});
    },
     getrequesthistory: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
        
        return  $http.post('/processdata/getrequesthistory',{"requestid":requestid});
    },
    getrequestcomments: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
         console.log("facgo"+requestid);
        
        return  $http.post('/processdata/getrequestusercomments',{"requestid":requestid});
    },
    postrequestcomments: function(params){
         
       
         var requestid =$sessionStorage.requestid;  
         var desc =$sessionStorage.desc;  
         var userid =$sessionStorage.userID;
        
        return  $http.post('/processdata/postcommentsforrequest',{"requestid":requestid,"desc":desc,"userid":userid});
    },
     moodoverall: function(params){
      
        return  $http.post('/requestdata/moodoveralltpercentage');
    },
     myrequestcounts: function(params){
         
        var userid =$sessionStorage.userID;
       
        return  $http.post('/processdata/getmyrequestcount',{"userid":userid});
    },
     otherrequestcounts: function(params){
         
        var userid =$sessionStorage.userID;
       
        return  $http.post('/processdata/getoverallrequestcount',{"userid":userid});
    },
    catlocrequestcounts: function(params){
        
        var userid =$sessionStorage.userID;
       
        return  $http.post('/requestdata/getcatlocallrequestcount',{"userid":userid});
    },
    
    
     updateuserrequeststatus: function(params){
         
        var requestid =$sessionStorage.requestid;  
         var statusid =$sessionStorage.statusid;  
         var statusname =$sessionStorage.statusname; 
         var userid =$sessionStorage.userID;
         var newImages =$sessionStorage.newImages;
         var delImageNames =$sessionStorage.delImageNames;
         var req_type_id = $sessionStorage.req_type_id;
         var is_anonymus = $sessionStorage.is_anonymus;
         var isstatuschange =$sessionStorage.isstatuschanged;
         var priority = $sessionStorage.requestPriority;
         
         return  $http.post('/processdata/citizenrequestupdatestatus',{"requestid":requestid,"statusid":statusid,
            "userid":userid,"statusname":statusname,"newImages":newImages,"delImageNames": delImageNames,
            "req_type_id":req_type_id,"is_anonymus":is_anonymus,"isstatuschange":isstatuschange,"priority":priority});
    },
    
    getllCategories: function(params){
      
        return  $http.post('/processdata/getallcategories');
    },
    
    getallLocations: function(params){
      
        return  $http.post('/processdata/getallLocations');
    },
    
    getImageDataForRequestId : function(params){
      
        return  $http.post('/processdata/getimagedataforrequestid', {"requestid":$sessionStorage.requestid});
    },
    
    checkLastUpdateBy : function(params){
        return  $http.post('/processdata/checkLastUpdateBy', {"requestid":$sessionStorage.requestid, "userId":$sessionStorage.userID});
    },
    getrequestsbycatlocation: function(params){
        var categoryid =$sessionStorage.categoryId;  
        var latitude =$sessionStorage.latitude;
        var longitude =$sessionStorage.longitude;
        var pageno =$sessionStorage.pageno;
        
       return  $http.post('/requestdata/getrequestsbycatlocation',{"categoryid":categoryid,"latitude":latitude, "longitude":longitude,"pageno": pageno});
    },
    
    getRequestStatusList: function(params){
    	var roleId =$sessionStorage.roleId;
    	var requestStatusId = $sessionStorage.requestStatusId;
        
       return  $http.post('/requestdata/getrequeststatuslist',{"requestStatusId":requestStatusId,"roleId":roleId});
    },
      getAllStatues: function(params){
      
        return  $http.post('/requestdata/getallstatuses');
    },
    
    requestContact: function(params){
    	var locationid = $sessionStorage.locationid;
        return  $http.post('/requestdata/getgovtcontacts' ,{"locationid":locationid});
    },
    
    politicianContact: function(params){
    	var locationid = $sessionStorage.locationid;
        return  $http.post('/requestdata/getpoliticalcontacts' ,{"locationid":locationid});
    },
    
    postToFacebook: function(params){
    	var postMessage = $sessionStorage.postMessage;
    	return  $http.post('/processdata/postToFacebook' ,{"postMessage":postMessage});
    },
    postTweetMessage: function(params){
    	var posttweetmsg = $sessionStorage.posttweetmsg;
        return  $http.post('/processdata/postontwitter' ,{"posttweetmsg":posttweetmsg});
    },
    sendEmailToAllCitizenEmail : function(params){
    	var message = $sessionStorage.story;
    	return $http.post('/requestdata/sendEmailToAllCitizenEmail',{"message":message});
    },
    sendSMSToAllCitizens : function(params){
    	var message = $sessionStorage.story;
    	return $http.post('/requestdata/sendSMSToAllCitizens',{"message":message});
    }
};	
}]);
app.factory('userFactory', ['$http', '$sessionStorage', function($http, $sessionStorage) {

    return {

    	getalldefaultdestinations: function(params){
	        return  $http.post('/api/v1/getalldefaultdestinations',params);
	    },
	    getallvehiclesForSearch: function(params){
	        return  $http.post('/api/v1/getallvehiclesForSearch',params);
	    },
	     getticketprice: function(params){
	        return  $http.post('/api/v1/getticketprice',params);
	    },
	    gettaxes: function(params){
	        return  $http.post('/api/v1/gettaxes',params);
	    },
	      getfees: function(params){
	        return  $http.post('/api/v1/getfees',params);
	    },
	      gettaxdetails: function(params){
	        return  $http.post('/api/v1/gettaxdetails',params);
	    },
	     getticketdetails: function(params){
	        return  $http.post('/api/v1/getticketdetails',params);
	    },
	     getbookingdetails: function(params){
	     
	        return  $http.post('/api/v1/getbookingdetails',params);
	    },
	     createbooking: function(params){
	        return  $http.post('/api/v1/createbooking',params);
	    },
	    blockseats: function(params){
	        return  $http.post('/api/v1/blockseats',params);
	    },
	     getpaymentdetails: function(params){
	        return  $http.post('/api/v1/getpaymentdetails',params);
	    },
	      getcustomerbookings: function(params){
	        return  $http.post('/api/v1/getcustomerbookings',params);
	    },
       
        getvehiclecount: function(params){
	        return  $http.post('/api/v1/getvehiclecount',params);
	    },
	     getcompanycount: function(params){
	        return  $http.post('/api/v1/getcompanycount',params);
	    },
	     getroutescount: function(params){
	        return  $http.post('/api/v1/getroutescount',params);
	    },
	     getbookingscount: function(params){
	        return  $http.post('/api/v1/getbookingscount',params);
	    },
	      getalldefaultdestinationsCounts: function(params){
	        return  $http.post('/api/v1/getalldefaultdestinations',params);
	    },
	     getallvehiclesForSearchCount: function(params){
	        return  $http.post('/api/v1/getallvehiclesForSearch',params);
	    },
	     validatepromocode: function(params){
	        return  $http.post('/api/v1/validatepromocode',params);
	    },
	     getcustomerbookingsCounts: function(params){
	        return  $http.post('/api/v1/getcustomerbookings',params);
	    },
	     getCustomerID: function(params){
	        return  $http.post('/api/v1/getCustomerID',params);
	    },
	     getreturntriponly: function(params){
	        return  $http.post('/api/v1/getreturntriponly',params);
	    },
	     getreturntriponlycounts: function(params){
	        return  $http.post('/api/v1/getreturntriponly',params);
	    },
	     getvehicleseatmapbookings: function(params){
	        return  $http.post('/api/v1/getvehicleseatmapbookings',params);
	    },
	      getvehicleseatlayout: function(params){
	        return  $http.post('/api/v1/getvehicleseatlayout',params);
	    },
	      getvehicleseatmapbookingreturn: function(params){
	        return  $http.post('/api/v1/getvehicleseatmapbookings',params);
	    },
	     getvehicletopseatlayout: function(params){
	        return  $http.post('/api/v1/getvehicletopseatlayout',params);
	    },
	     getvehiclepdrops: function(params){
	        return  $http.post('/api/v1/getvehiclepdrops',params);
	    },
	     getvehiclepickups: function(params){
	        return  $http.post('/api/v1/getvehiclepickups',params);
	    },
	    insertguestcheckout: function(params){
	        return  $http.post('/api/v1/insertguestcheckout',params);
	    },
	    updaterefrenenceid: function(params){
	        return  $http.post('/api/v1/updaterefrenenceid',params);
	    },
	     sendbookingmail: function(params){
	        return  $http.post('/api/v1/sendbookingmail',params);
	    }
	    
	 
	 
	
	    
    };
}]);

var englishTranslate = {
	'loginLabel': 'LOGIN',
	'signupLabel': 'SIGNUP',
	'pageTitleLabel': 'Buy your Bus Ticket to any province of Panama',
	'pageSubTitleLabel': 'Avoid long lines and book online from the comfort of your home, your office or your phone',
	'fromLocationLabel': 'From Location',
	'toLocationLabel': 'To Destination',
	'fromDateplaceholder': 'Travel Date',
	'toDateplaceholder': 'Return Date',
	'noOfPassengersLabel': 'No of Passenger',
	'searchnowLabel': 'SEARCH NOW',
	'popularRoutesLabel': 'The Most Popular Routes',
	'ourPartnersLabel': 'Our Partners',
	'whyBoletobusLabel': 'THE MOST POPULAR ROUTES',
	'noofroutesLabel': '135,000+ Routes',
	'routesparagraphLabel': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	'lowrateLabel': 'Low Rates & Top Savings',
	'realtravellersLabel': 'Reviewed by Real Travellers',
	'speaklangLabel': 'We Speak your Language',
	'discoverlabel': 'Discover',
	'AboutLabel': 'About',
	'AbusLabel': 'About us',
	
	'TravelConditionsLabel': 'Travel Conditions',
	'PrivacyPolicyLabel': 'Privacy Policy',
	'FrequentQuestionsLabel': 'Frequent Questions',
	'TermsConditionsLabel': 'Terms & Conditions',
	'ContactUsLabel': 'Contact Us',
	'AddressLabel': 'Address',
	'AddressparagraphLabel': '65 San Francisco Street PH Diamond Tower, Panama',
	'MailingListLabel': 'Mailing List',
	'MailingListparagraphLabel': 'Enter your email address to find out about the latest Bukate news, new destinations and promotions right in your inbox..',
	'youremailplaceholder': 'your email',
	'privacyLabel': 'We respect your privacy',
	'AboutBoletobusLabel': 'About Bukate',
	'AboutBoletobusparagraphLabel': 'Bukate is the first online bus ticket booking platform in Panama. Passengers will be able to look up for routes, compare the different schedules, and secure their seat before arriving......',
	'noOfPassengers1Label': '1 Passenger',
	'AnameLabel':'Nitesh Mayani',
	'noOfPassengers2Label': '2 Passenger',
	'noOfPassengers3Label': '3 Passenger',
	'noOfPassengers4Label': '4 Passenger',
	'noOfPassengers5Label': '5 Passenger',
	'noOfPassengers6Label': '6 Passenger',
	'howboletoLabel': 'How Bukate Works',
	'ExploreDestinationslabel': 'Explore Destinations',
	'checkavailabilitylabel': 'Check Availability',
	'Bookonlinelabel': 'Book Online',
	'getreadyLabel': 'Get Ready to Fly',
	'printticketlabel': 'Print Ticket',
	'safeLabel': 'SAFE - SECURE - FAST',
	'searchLabel': 'SEARCH',
	'availablevehLabel': 'Available vehicles',
	'homeLabel': 'HOME',
	'othrLabel': 'OTHERS',
	'searchresultsLabel': 'Search Results',
	'departlabel': 'Departure from',
	'userdetailsLabel': 'User Details',
	'firstnameLabel': 'First Name',
	'lastnameLabel': 'Last Name',
	'emailLabel': 'Email',
	'telLabel': 'Tel',
	'languageLabel': 'Language',
	'selectlanguagelabel': 'Select language',
	'selectcitylabel': 'Select city',
	'selectcountrylabel': 'Select country',
	'cityLabel': 'City',
	'countryLabel': 'Country',
	'addressLabel': 'Address',
	'companyLabel': 'Company',
	'editprofileButton': 'EDIT PROFILE',
	'personaldetailslabel': 'Personal Details',
	'firstnameplaceholder': 'Enter first name',
	'lastnameplaceholder': 'Enter last name',
	'emailplaceholder': 'Enter email',
	'telplaceholder': 'Enter mobile number',
	'contactdetailsLabel': 'Contact Details',
	'updateprofileButton': 'UPDATE PROFILE',
	'dashboardLabel': 'Dashboard',
	'eticketLabel': 'e-ticket',
	'printLabel': ' Print',
	'travelinfoLabel': 'Traveler Information',
	'bkngnumLabel': 'Booking number',
	'bkngstatusLabel': 'Booking status',
	'bkngdateLabel': 'Booking Date',
	'usernameLabel': 'User name',
	'emailLabel': 'E-mail address',
	'streetLabel': 'Street Address and number',
	'documentLabel': 'Document',
	'documentnoLabel': 'Document Number',
	'phoneLabel': 'Phone',
	'tktinfoLabel': 'Ticket Information',
	'routeLabel': 'Route',
	'routesLabel': '135,00+ Routes',
	'dprtfromLabel': 'Departure from to',
	'tktnoLabel': 'Ticket Number',
	'depttimeLabel': 'Departure Time',
	'arvltimeLabel': 'Arrival Time',
	'cnfrmseatsLabel': 'Confirmed Seats',
	'traveldateLabel': 'Travel Date',
	'addinfoLabel': 'Additional Information',
	'needLabel': 'Need Bukate Help?',
	'weLabel': 'We would be more than happy to help you. Our team advisor are 24/7 at your service to help you',
	'whybookLabel': 'Why Book with us?',
	'lowrateLabel': 'Low Rates & Savings',
	'suportLabel': 'Excellent Support',
	'hometLabel': 'Home',
	'thanksLabel': 'Thank You',
	'tktLabel': 'Ticket Booking',
	'helloLabel': '1-800-123-HELLO',
	'onewayLabel': 'Booking Oneway Trip',
	'bkngcnfrmLabel': 'Booking Confirmation',
	'prntLabel': 'PRINT DETAILS',
	'passengerLabel': 'Passenger',
	'adultLabel': 'Adult',
	'childrenLabel': 'Children',
	'retiredLabel': 'Retired',
	'taxLabel': 'Taxes & Fees',
	'totalLabel': 'Total Seats',
	'subLabel': 'Sub Total',
	'chargeLabel': 'Charges',
	'taxesLabel': 'Taxes',
	'priceLabel': 'Total Price',
	'cnfmmmLabel': 'Thank You. Your Ticket booking is Confirmed Now',
	'adrsLabel': 'A confirmation email has been sent to your provided email address',
	'homeLabel': 'Home',
	'dashboardLabel': 'Dashboard',
	'dashboardTittleLabel': 'My Dashboard',
	'dashtittleLabel': 'Hi , Welcome to Bukate!',
	'dashSubtittleLabel': 'All your trips booked with us will appear here and you’ll be able to manage everything!',
	'box_dataLabel': 'Bookings',
	'box1_dataLabel': 'Total Destinations',
	'box2_dataLabel': 'Total Vehicles',
	'box3_dataLabel': 'Total Operators',
	'blueboxLabel': 'Learn How It Works',
	'bluebox1Label': 'Get Help',
	'profileLabel': 'Profile',
	'mybookingLabel': 'My Booking',
	'settingsLabel': 'Settings',
	'blueboxcontent1Label': ' - View our help section and FAQs to get started on Bukate',
	'blueboxcontentlabel': ' - Watch a short video that shows you how Bukate works',
	'parabox_contentLabel': 'This is your Dashboard, the place to check your Profile, respond to Reservation Requests, view upcoming Trip Information, and much more',
	'homeLabel': 'Home',
	'dashboardLabel': 'Dashboard',
	'dashboardTittleLabel': 'My Dashboard',
	'dashboardLabelTab': 'Dashboard',
	'profileLabel': 'Profile',
	'mybookingLabel': 'My Booking',
	'settingsLabel': 'Settings',
	'accountsettingsLabel': 'Account Settings',
	'Change_Your_PasswordLabel': 'Change Your Password',
	'Old_PasswordLabel': 'Old Password',
	'Enter_New_PasswordLabel': 'Enter New Password',
	'Confirm_New_passwordLabel': 'Confirm New password',
	'updatebutton': 'UPDATE PASSWORD',
	'Change_Your_EmailLabel': 'Change Your Email',
	'Old_emailLabel': 'Old email',
	'Enter_New_EmailLabel': 'Enter New Email',
	'Confirm_New_EmailLabel': 'Confirm New Email',
	'updateemailbutton': 'UPDATE EMAIL ADDRESS',
	'Send_Me_Emails_WhenLabel': 'Send Me Emails When',
	'Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel': 'Travelo has periodic offers and deals on really cool destinations',
	'Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel': 'Travelo has fun company news, as well as periodic emails',
	'I_have_an_upcoming_reservationLabel': 'I have an upcoming reservation',
	'Update_All_SettingsButon': 'Update All Settings',
	'destinationTitleLabel': 'All Destinations',
	'destinationLabel': 'Destinations',
	'bookingsTitleLable': 'Trips You have Booked! ',
	'bsLabel': 'Booking Summary',
	'promoPlaceHolder': 'Enter Promo Code',
	'ticketbookingLabel': 'Ticket Booking',
	'vehiclesLabel': 'vehicles',
	'personalinfolabel': 'Your Personal Information',
	'DOBLabel': 'DOB',
	'dateofbirthPlaceHolder': 'Date of Birth',
	'emailaddressLabel': 'email address',
	'verifyemailLabel': 'Verify E-mail Address',
	'genderLabel': 'Gender',
	'gendermaleLabel': 'Male',
	'genderfemaleLabel': 'Female',
	'countrycodeLabel': 'Country code',
	'phnumLabel': 'Phone number',
	'typeofdocLabel': 'Type of Document',
	'selectdoctypeLabel': 'Select document type',
	'passportLabel': 'Passport',
	'docnumLabel': 'Document Number',
	'tripinfoLabel': 'Your Trip Details (Forward Trip)',
	'deptLabel': 'Departure',
	'arrvlLabel': 'Arrival',
	'rturntripinfoLabel': 'Your Trip Details (Return Trip)',
	'checkboxLabel': 'Guest checkout',
	'checkboxinfoLabel': 'promotional offers in the future',
	'checboxoneLabel': 'By continuing, you agree to the',
	'bluechcbxLabel': 'Terms and Conditions',
	'checboxtwoLabel': 'Block your seat before you can confirm your bookings to avoid seats unavailability',
	'checboxparaLabel': 'Your seats will be blocked upto',
	'payLabel': 'Payment is made by Credit Card Via Paypal.',
	'viLabel': 'View /Print Ticket',
	'vehLabel': 'vehicle number',
	'onlLabel': 'online payment',
	'firstname': 'First name',
	'lastname': 'last name',
	'emailid': 'email address',
	'mobileno': 'mobile number',
	'password': 'password',
	'confirmpassword': 'confirm password',
	'byLabel': 'By signing up, I agree to Bukate Terms of Service, Privacy Policy, Guest Refund Policy, and Host Guarantee Terms',
	'forLabel': 'forgot password',
	'doLabel': 'Dont have an account?',
	'loginemail': 'email address or mobile no.',
	'sgLabel': 'Sign up with Email or mobile number',
	'bLabel': 'By signing up, I agree to Bukate Terms of Service, Privacy Policy, Guest Refund olicy, and Host Guarantee Terms',
	'aLabel': 'Already a Bukate member?',
	'bysLabel': 'By signing up, I agree to Bukate Terms of Service, Privacy Policy, Guest Refund Policy, and Host Guarantee Terms.',
	'ssLabel': 'Seat Selection',
	'frontLabel': 'Front',
	'ssotLabel': 'Selected Seats (One-way Trip):',
	'ssrtLabel': 'Selected Seats (Return Trip):',
	'contButtonLabel': 'Continue Booking',
	'loginPopupLabel': 'Login',
	'signupPopupLabel': 'Sign up',
	'confirmBookingButtonLabel': 'Confirm Booking',
	'blockSeatsButtonLabel': 'Block Seats',
	'firstNameValid': 'First name is mandatory!',
	'firstNameValid2': 'First name is mandatory!',
	'Continuelabel': 'Continue',
	'avgpersonLabel': 'avg/person',
	'toLabel': 'to',
	'departureLabel': 'Departure',
	'arrivalLabel': 'Arrival',
	'servicesLabel': 'Services',
	'BooknowLabel': 'Book NOW',
	'bookingIDplaceholder': 'Enter booking ID',
	'seatsLabel': 'Seats',
	'availableLabel': 'Available',
	'perpersonLabel': 'per person',
	'selectLabel': 'select',
	'SELECTEDLabel': 'SELECTED',
	'emailaddressLabel': 'email address',
	'verifyemailaddressLabel': 'Verify E-mail Address',
	'personalinfo': 'Your Personal Information',
	'ticketbookingLabel': 'Ticket Booking',
	'genderLabel': 'Gender',
	'selectgenderLabel': 'Select gender',
	'maleLabel': 'Male',
	'femaleLabel': 'Female',
	'countrycodeLabel': 'Country code',
	'phonenumberLabel': 'Phone number',
	'typeofDocLabel': 'Type of Document',
	'selectdoctypeLabel': 'Select document type',
	'passportLabel': 'Passport',
	'docnumberLabel': 'Document Number',
	'seatnumberLabel': 'Seat Number',
	'wantlabel': 'I want to receive',
	'promotionallabel': 'promotional offers in the future',
	'forwardtriplabel': 'Your Trip Details (Forward Trip)',
	'returntriplabel': 'Your Trip Details (Return Trip)',
	'onlinepaylabel': 'Online Payment',
	'bookingsTitleLable': 'Trips You have Booked! ',
	'lastNameValid': 'Last name is mandatory!',
	'addressValid': 'Address is mandatory!',
	'dobValid': 'Date of birth is mandatory!',
	'emailValid': 'Email is mandatory!',
	'email1Valid': 'Please enter valid email id!',
	'verifyValid': 'Verify email is mandatory!',
	'verify1Valid': 'Please enter valid verify email id!',
	'genderValid': 'gender is mandatory!";',
	'countryValid': 'Country code is mandatory!',
	'phoneValid': 'Phone number is mandatory!',
	'verify2Valid': 'Email address and verify email address should be same!',
	'phone1Valid': 'Phone number should be digts only!',
	'docValid': 'type of document is mandatory!',
	'doc1Valid': 'Document number is mandatory!',
	'oldPwdValid': 'Please enter old password',
	'newPwdValid': 'Please enter new password',
	'confirmPwdValid': 'Please enter confirm password',
	'pwdMatchValid': 'Please enter confirm password same as password',
	'loginemailAlert': 'Authentication failed with the give username and password',
	'locidAlert': 'Please select from location',
	'toidAlert': 'Please select to location',
	'returndateAlert': 'Please enter either travel from date or return date',
	'regsuccAlert': 'User registration successful.Please login to book the tickets',
	'regfailAlert': 'Failed to register the user.Please check whether email id and mobile already exists',
	'bookingConAlert': 'Please login to book tickets or use guest checkout',
	'bookingConseatAlert': 'Seat selected is not equal to the no.of passengers',
	'bookingConreturnAlert': 'Seat selected is not equal to the no.of passengers for return trip',
	't&cAlert': 'please click on terms and conditions',
	'sercallAlert': 'service calling',
	'confbookAlert': 'Your booking has expired.Please block your seats again to confirm booking',
	'failbookAlert': 'Failed to book your seats .Please call our cutomer care for quick booking or try after some time.',
	'blockseatAlert': 'Please login to book tickets or use the guest checkout',
	'reqparamsAlert': 'Seats blocked successfully',
	'reqparamsfailAlert': 'Failed to block the seats',
	'reqparamsavlAlert': 'Seats not available',
	'reqparamsmoreavlAlert': 'Selected seats is more than the available seats',
	'promAlert': 'Invalid promotional offer code.',
	'promexpAlert': 'The promotional offer code has expired.',
	'prfswlAlert': 'Profile updated successfully',
	'failedswlAlert': 'Failed to update profile',
	'emlswlAlert': 'Email changed successfully',
	'erremlswlAlert': 'Invalid email id',
	'passsuccswlAlert': 'Password changed successfully',
	'passerrswlAlert': 'Old Password is incorrect',
	'plAlert': 'Please select the Forward trip first before selecting the return trip',
	'slAlert': 'Please select the Forward trip first before selecting the return trip',
	'loAlert': 'Please select from location',
	'laAlert': 'Please select to location',
	'pdAlert': 'Please enter either travel from date or return date',
	'bookingscreenAlert': 'Please select the seats to continue booking',
	'bookingscreenreturnAlert': 'Please select the return trip seats to continue booking',
	'custIDAlert': 'Please login to book tickets',
	'blockseatsAlert': 'Seats blocked successfully',
	'blockseatsfailAlert': 'Failed to block the seats',
	'blockseatavalAlert': 'Seats not available',
	'blockseatmoreavalAlert': 'Selected seats is more than the available seats',
	'emailValidError': 'Please enter email',
	'pwdValidError': 'Please enter password',
	'emailValidError2': 'Please enter email or mobile number',
	'invalidfnameValid': 'Please enter first name',
	'invalidlnameValid': 'Please enter last name',
	'invalidemailValid': 'Please enter a valid email id',
	'invalidmobileValid': 'Please enter a valid mobile number',
	'invalidpasswordValid': 'Please enter password',
	'invalidconfirmValid': 'Password and confirm password is not same',
	'myAccountLabel': 'MY ACCOUNT',
	'myDashboardLabel': 'My Dashboard',
	'allDestinationsLabel': 'All Destinations',
	'LogoutLabel': 'Logout',
	'ApplyLabel': 'Apply',
	'bookingIdValidError': 'Please enter booking ID',
	'toLabel': 'to',
	'selectGenderLabel': 'Select Gender',
	'pickupdropLabel':'Your pickup and drop points',
	'pickupLabel':'Pickup Point',
	'dropLabel':'Drop Point',
	'supLabel' :'Supermarket Cash',
	'bookingrefLabel' :'Use this option to book ticket by paying cash at supermarket.booking will be confirmed only when the reference id is enter and linked to that booking request created. Post 2 hours from the booking period,Booking will gets expired.',
	'PaymenttypeAlert':'Please select the payment option',
	'guestboxLabel':'Guest checkout (User this feature if you do not wish to login)',
	'guestboxLabel1':'Guest checkout',
	'guestwarning1' :'Failed to checkout as guest .Please try after some time',
	'guestwarning2':'You already have a guest checkout session running',
	'guestsuccess1':'Guest checkout successfully',
	'confrefLabel':'Reference ID',
	'refmobileno':'Mobile no. used during purchase of reference id',
	'ManyRequestErrorLabel':'Too Many request at this point of time. Please try after sometime',
	'OtherErrorLabel':'Application is not available at this point of time Please contact the support team',
	'errorMessageLabel':'Application is temporary unavailable .Please try after some time',
	'errorLabel':'Go to Home',
	'invalidRefId':'Please enter reference id',
	'refmessg1':'Failed to update booking',
	'refmessg2':'Invalid reference ID',
	'refmessg3':'Reference ID already used for booking',
	'refmessg4':'Booking updated successfully',
	'gustLabel' :'Enter Email ID to continue guest checkout',
	'gustAlertLabel':'Please enter your email id to continue guest checkout',
	'guestButton1' :'Cancel',
	'guestButton2':'Continue',
	'passengersLabel':'Passenger',
	'forwardLabel':'Forward Trip',
	'returnLabel':'Return Trip',
	
	'paydetailLabel':'Payment Details',
	'selectpaydetailLabel':'Select payment type',
	'cardinfoLabel':'Card Information',
	'cardholdnameLabel':'Card holder name',
	'cardholdlastnameLabel':'Card holder last name',
	'cardholdemailLabel':'Card Holder Email',
	'cardholdaddLabel':'Card Holder Address',
	'cardholdphoneLabel':'Card holder phone',
	'cardnumLabel':'Credit card number',
	'cardexpmonLabel':'Card Expiry Month',
	'cardexpyearLabel':'Card Expiry Year',
	'cvvLabel':'CVV',
	'suprmarhtchckoutLabel':'Supermarket Checkout',
	'firstNameAlert':'Please enter first name',
	'lastNameAlert':'Please enter last name',
	'addressAlert':'Please enter address',
	'dobAlert':'Please enter date of birth',
	'emailAlert':'Please enter Email Id',
	'emailvalidAlert':'Please enter vaild Email Id',
	'verifyemailAlert':'Please enter verify Email Id',
	'verifyvalidemailAlert':'Please enter valid verify Email Id',
	'validemailAlert':'Email address and verify email address should be same!',
	'genderAlert':'Please enter gender',
	'countryAlert':'Please enter country code',
	'phoneAlert':'Please enter phone number',
	'phonevalidAlert':'Phone number should be digits only',
	'cardholderAlert':'Please enter card holder name',
	'cardholderlastAlert':'Please enter card holder last name',
	'cardholderemailAlert':'Please enter card holder email',
	'cardholderaddAlert':'Please enter card holder address',
	'cardholderphoneAlert':'Please enter card holder phone',
	'cardexpmntAlert':'Please enter expiry month',
	'cardexpyrAlert':'Please enter expiry year',
	'cvvAlert':'Please enter  cvv number',
	'creditcardAlert':'Please enter  credit card number',
	 'sentmailLabel':'Send Mail',

	
//about
'freLabel':'Frequently Asked Questions',
'iLabel':'Do I need to register to use Bukate?',
 'nlLabel':'No, Bukate does not require registration to buy a bus ticket.',
 'bsLabel1':'How can I buy a bus ticket with Bukate?',
 'youLabel':'You must select the place of departure, the destination and date of departure and if you want to return. Then you must select the available route and the desired bus seat. Once the passenger information is entered you will have the option to pay with a credit card or cash. After making the payment, the bus ticket will be sent to your email and you will be ready to avoid the lines and go straight to the bus.',
 'hoLabel':'How can I pay for my ticket?',
 'yo1Label':'You will be able to pay your bus ticket with credit card or cash.',
 'cnLabel':'Can I buy a ticket for another person?',
 'yuLabel':'Yes, you can. You should type the passenger details and introduce the email you would like to receive the bus ticket.',
 'whtLabel':'What to do if you lose your bus ticket?',
 'yshLabel':'You should have a copy of your bus ticket in your email. If not, you should contact our customer support service and they will be happy to help you.',
 'ujLabel':'What to do if your bus ticket wasn’t send?',
 'yhgLabel':'You should contact right away our customer support service and they will be happy to help you. 2222-2222',
 'canLabel':'Can I cancel my bus ticket?',
 'klLabel':'Cancelation or refund is not permitted.',
  'canjLabel':'Can I change my schedule once I have purchased my bus ticket',
 'kjLabel':'Once you purchased the bus ticket bukate would not be able to change it. In that case you should contact the bus company provider of your trip. ',

 'iklLabel':'Questions to answer:',
 'kmlLabel':'What to do if you lose the bus?',
 'whdLabel':'What to do if the bus leaves before the time provided by the ticket?',
  'moLabel': 'More About Bukate',
  'AboutbukateparagraphLabel': 'Bukate is the first online bus ticket booking platform in Panama. Passengers will be able to look up for routes, compare the different schedules, and secure their seat before arriving. In this way, passengers would skip the long lines to buy the bus ticket and secure their seats before reaching to the bus terminal. Bukate objective is to improve the passenger’s life quality and at the same time to provide a better trip experience.',
  'MailSentLabel':'Mail send successfully',
  'MarketChkLabel' :'Please select the supermarket checkout option to continue booking '
	

	
	
	
};
var spanishTranslate = {
	'loginLabel': 'INICIAR SESIÓN',
	'signupLabel': 'REGÍSTRATE',
	'pageTitleLabel': 'Compre su Bukate de autobús al interior de Panamá',
	'pageSubTitleLabel': 'Evite las largas filas y reserve en línea desde la comodidad de su hogar, su oficina o su teléfono',
	'fromLocationLabel': 'Origen',
	'toLocationLabel': 'Destino',
	'fromDateplaceholder': 'Fecha de viaje',
	'toDateplaceholder': 'Fecha de regreso',
	'noOfPassengersLabel': 'No. de Pasajero',
	'searchnowLabel': 'BUSCAR AHORA',
	'popularRoutesLabel': 'Las rutas más populares',
	'ourPartnersLabel': 'Nuestros compañeros',
	'whyBoletobusLabel': 'LAS RUTAS MÁS POPULARES',
	'noofroutesLabel': 'Rutas',
	'routesparagraphLabel': 'Lorem Ipsum es simplemente texto ficticio de la industria de impresión y composición tipográfica.',
	'lowrateLabel': 'Bajas tasas & Ahorro superior',
	'realtravellersLabel': 'Revisado por Viajeros Reales',
	'speaklangLabel': 'Hablamos su idioma',
	'discoverlabel': 'Descubrir',
	'AboutLabel': 'Acerca de',
	'TravelConditionsLabel': 'Condiciones de viaje',
	'PrivacyPolicyLabel': 'Política de privacidad',
	'FrequentQuestionsLabel': 'Preguntas Frecuentes',
	'TermsConditionsLabel': 'Términos y condiciones',
	'ContactUsLabel': 'Contáctenos',
	'AddressLabel': 'Dirección',
	'AddressparagraphLabel': '65 Calle San Francisco PH torre de diamantes, Panamá',
	'MailingListLabel': 'Lista de correo',
	'MailingListparagraphLabel': 'Ingrese su dirección de correo electrónico para conocer las últimas novedades de Bukate, nuevos destinos y promociones directamente en su bandeja de entrada.',
	'youremailplaceholder': 'Tu correo electrónico',
	'privacyLabel': 'respetamos tu privacidad',
	'AboutBoletobusLabel': 'Acerca de Bukate',
	'AboutBoletobusparagraphLabel': 'Bukate es la primera plataforma de reserva de boletos de autobús en línea en Panamá. Los pasajeros podrán buscar rutas, comparar los diferentes horarios y asegurar su asiento antes de llegar.....',
	'noOfPassengers1Label': ' 1 pasajero',
	'noOfPassengers2Label': ' 2 pasajero',
	'noOfPassengers3Label': ' 3 pasajero',
	'noOfPassengers4Label': ' 4 pasajero',
	'noOfPassengers5Label': ' 5 pasajero',
	'noOfPassengers6Label': '6 pasajero',
	'howboletoLabel': 'Cómo funciona Bukate',
	'ExploreDestinationslabel': 'Explora los destinos',
	'checkavailabilitylabel': 'Verificar disponibilidad',
	'Bookonlinelabel': 'Libro en línea',
	'getreadyLabel': 'Prepárate para volar',
	'printticketlabel': 'Imprimir Entrada',
	'safeLabel': 'FACIL - SEGURO - RÁPIDO',
	'searchLabel': 'BUSCAR',
	'availablevehLabel': 'Vehículos disponibles',
	'homeLabel': 'CASA',
	'searchresultsLabel': 'Resultados de la búsqueda',
	'departlabel': 'Salida de',
	'userdetailsLabel': 'Detalles de usuario',
	'firstnameLabel': 'Nombre de pila',
	'lastnameLabel': 'Apellido',
	'emailLabel': 'Email',
	'telLabel': 'Tel.',
	'languageLabel': 'Idioma',
	'cityLabel': 'Ciudad',
	'countryLabel': 'País',
	'addressLabel': 'Dirección',
	'companyLabel': 'Empresa',
	'editprofileButton': 'EDITAR PERFIL',
	'personaldetailslabel': 'Detalles personales',
	'firstnameplaceholder': 'Ingresa el nombre',
	'lastnameplaceholder': 'Introduzca el apellido',
	'emailplaceholder': 'Ingrese correo electrónico',
	'telplaceholder': 'Ingrese el número de celular',
	'contactdetailsLabel': 'Detalles de contacto',
	'updateprofileButton': 'ACTUALIZACIÓN DEL PERFIL',
	'dashboardLabel': 'Tablero',
	'selectlanguagelabel': 'Seleccione el idioma',
	'selectcitylabel': 'Ciudad selecta',
	'selectcountrylabel': 'Seleccionar país',
	'travelinfoLabel': 'Información del viajero',
	'bkngnumLabel': 'Número de reserva',
	'eticketLabel': 'billete electrónico',
	'printLabel': 'imprimir',
	'travelinfoLabel': 'Información del viajero',
	'bkngnumLabel': 'Número de reserva',
	'bkngstatusLabel': 'Estado de la reservación',
	'bkngdateLabel': 'Fecha para registrarse',
	'usernameLabel': 'Nombre de usuario',
	'emailLabel': 'Dirección de correo electrónico',
	'streetLabel': 'Dirección y número de calle',
	'documentLabel': 'Documento',
	'documentnoLabel': 'Número del Documento',
	'phoneLabel': 'Teléfono',
	'tktinfoLabel': 'información de entradas',
	'routeLabel': 'Ruta',
	'routesLabel': '135,00+ Rutas',
	'dprtfromLabel': 'Salida de a',
	'tktnoLabel': 'Numero de ticket',
	'depttimeLabel': 'Hora de salida',
	'arvltimeLabel': 'Hora de llegada',
	'cnfrmseatsLabel': 'Asientos confirmados',
	'traveldateLabel': 'Fecha de viaje',
	'addinfoLabel': 'Información Adicional',
	'needLabel': 'Necesitas la ayuda de Bukate?',
	'weLabel': 'Estaríamos mas que felices de ayudarte. Nuestro asesor de equipo está a su disposición las 24 horas, los 7 días de la semana para ayudarlo',
	'whybookLabel': 'Por qué reservar con nosotros?',
	'lowrateLabel': 'Tarifas bajas y ahorros',
	'suportLabel': 'Excelente soporte',
	'hometLabel': 'casa',
	'thanksLabel': 'Gracias',
	'tktLabel': 'Boleto de reserva',
	'helloLabel': '1-800-123-Hola',
	'onewayLabel': 'Reserva viaje de ida',
	'bkngcnfrmLabel': 'Confirmación de reserva',
	'prntLabel': 'IMPRIMIR DETALLES',
	'passengerLabel': 'Pasajero',
	'adultLabel': 'Adulto',
	'childrenLabel': 'Niños',
	'retiredLabel': 'Retirado',
	'taxLabel': 'impuestos y pagos',
	'totalLabel': 'Asientos totales',
	'subLabel': 'Sub Total',
	'chargeLabel': 'Cargos',
	'taxesLabel': 'Impuestos',
	'priceLabel': 'Precio total',
	'cnfmmmLabel': 'Gracias. Su reserva de entradas está confirmada ahora',
	'adrsLabel': 'Se ha enviado un correo electrónico de confirmación a su dirección de correo electrónico proporcionada',
	'homeLabel': 'hogar',
	'dashboardLabel': 'Tablero',
	'dashboardTittleLabel': 'Mi Tablero',
	'dashtittleLabel': 'Hola, ¡Bienvenido a Bukate!',
	'dashSubtittleLabel': '¡Todos sus viajes reservados con nosotros aparecerán aquí y podrá administrar todo!',
	'box_dataLabel': 'Reservas',
	'box1_dataLabel': 'Total de destinos',
	'box2_dataLabel': 'Total de vehículos',
	'box3_dataLabel': 'Operadores totales',
	'blueboxLabel': 'Aprenda cómo funciona',
	'bluebox1Label': 'Consigue ayuda',
	'profileLabel': 'Perfil',
	'mybookingLabel': 'Mi reserva',
	'settingsLabel': 'Configuraciones',
	'blueboxcontent1Label': 'Consulte nuestra sección de ayuda y las preguntas frecuentes para comenzar a usar Bukate',
	'blueboxcontentlabel': 'Vea un breve video que le muestra cómo funciona Bukate',
	'parabox_contentLabel': 'Este es su tablero de instrumentos, el lugar para verificar su perfil, responder a las solicitudes de reserva, ver la próxima información de viaje y mucho más',
	'homeLabel': 'Casa',
	'dashboardLabel': 'Tablero',
	'dashboardTittleLabel': 'Mi Tablero',
	'dashboardLabelTab': 'Tablero',
	'profileLabel': 'Perfil',
	'mybookingLabel': 'Mi reserva',
	'settingsLabel': 'Configuraciones',
	'accountsettingsLabel': 'Configuraciones de la cuenta',
	'Change_Your_PasswordLabel': 'Cambia tu contraseña',
	'Old_PasswordLabel': 'Contraseña anterior',
	'Enter_New_PasswordLabel': 'Introduzca nueva contraseña',
	'Confirm_New_passwordLabel': 'Confirmar nueva contraseña',
	'updatebutton': 'ACTUALIZA CONTRASEÑA',
	'Change_Your_EmailLabel': 'Cambia tu correo electrónico',
	'Old_emailLabel': 'Correo electrónico viejo',
	'Enter_New_EmailLabel': 'Ingresa un nuevo correo electrónico',
	'Confirm_New_EmailLabel': 'confirme nuevo correo electrónico',
	'updateemailbutton': 'ACTUALIZACIÓN DE LA DIRECCIÓN DE CORREO ELECTRÓNICO',
	'Send_Me_Emails_WhenLabel': 'Enviarme correos electrónicos cuando',
	'Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel': 'Travelo tiene ofertas periódicas y ofertas en destinos realmente interesantes',
	'Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel': 'Travelo tiene noticias divertidas de la compañía, así como correos electrónicos periódicos',
	'I_have_an_upcoming_reservationLabel': 'Tengo una próxima reserva',
	'Update_All_SettingsButon': 'Actualizar todas las configuraciones',
	'destinationTitleLabel': 'Todos los destinos',
	'destinationLabel': 'Destinos',
	'bookingsTitleLable': 'Viajes que has reservado!',
	'bsLabel': 'Resumen de reserva',
	'promoPlaceHolder': 'Introduce el código de promoción',
	'ticketbookingLabel': 'Boleto de reserva',
	'vehiclesLabel': 'vehículos',
	'personalinfolabel': 'Tu información personal',
	'DOBLabel': 'Fecha de nacimiento',
	'dateofbirthPlaceHolder': 'Fecha de nacimiento',
	'emailaddressLabel': 'dirección de correo electrónico',
	'verifyemailLabel': 'Confirme su dirección de correo electrónico',
	'genderLabel': 'Género',
	'gendermaleLabel': 'Masculino',
	'genderfemaleLabel': 'Hembra',
	'countrycodeLabel': 'Código de país',
	'phnumLabel': 'Número de teléfono',
	'typeofdocLabel': 'Tipo de documento',
	'selectdoctypeLabel': 'Seleccionar tipo de documento',
	'passportLabel': 'Pasaporte',
	'docnumLabel': 'Número del Documento',
	'tripinfoLabel': 'Detalles de su viaje (viaje de ida y vuelta)',
	'deptLabel': 'Salida',
	'arrvlLabel': 'Llegada',
	'rturntripinfoLabel': 'Detalles de su viaje (Viaje de regreso)',
	'checkboxLabel': 'Pago de la huésped',
	'checkboxinfoLabel': 'ofertas promocionales en el futuro',
	'checboxoneLabel': 'Al continuar, usted acepta el',
	'bluechcbxLabel': 'Términos y Condiciones',
	'checboxtwoLabel': 'Bloquee su asiento antes de poder confirmar sus reservas para evitar asientos no disponibles',
	'checboxparaLabel': 'Sus asientos estarán bloqueados hasta',
	'payLabel': 'El pago se realiza con tarjeta de crédito a través de Paypal',
	'viLabel': 'Ver / imprimir boleto',
	'vehLabel': 'número de vehículo',
	'firstname': 'Nombre de pila',
	'lastname': 'apellido',
	'emailid': 'dirección de correo electrónico',
	'mobileno': 'número de teléfono móvil',
	'password': 'contraseña',
	'confirmpassword': 'Confirmar contraseña',
	'byLabel': 'Al suscribirme, acepto los Términos de servicio de Bukate, la Política de privacidad, la Política de reembolso de invitados y los Términos de garantía de host',
	'forLabel': 'Se te olvidó tu contraseña',
	'doLabel': 'No tienes una cuenta?',
	'loginemail': 'dirección de correo electrónico o móvil no.',
	'sgLabel': 'Regístrese con el número de correo electrónico o móvil',
	'bLabel': 'Al suscribirme, acepto los términos de servicio de Bukate, la política de privacidad, la política de reembolso de huéspedes y los términos de la garantía de host.',
	'aLabel': 'Ya eres miembro de Bukate?',
	'bysLabel': 'Al suscribirme, acepto los Términos de servicio de Bukate, la Política de privacidad, la Política de reembolso de invitados y los Términos de garantía de host.',
	'onlLabel': 'pago en línea',
	'ssLabel': 'Selección de asiento',
	'frontLabel': 'Frente',
	'ssotLabel': 'Asientos seleccionados (viaje de ida):',
	'ssrtLabel': 'Asientos seleccionados (viaje de regreso):',
	'contButtonLabel': 'Continuar reservando',
	'loginPopupLabel': 'Iniciar sesión',
	'signupPopupLabel': 'Regístrate',
	'confirmBookingButtonLabel': 'Reserva confirmada',
	'blockSeatsButtonLabel': 'Asientos de bloque',
	'firstNameValid': 'El primer nombre es obligatorio',
	'firstNameValid2': 'El primer nombre es obligatorio',
	'Continuelabel': 'Continuar',
	'bookingIDplaceholder': 'Ingrese la ID de reserva',
	'BooknowLabel': 'Reservahora',
	'avgpersonLabel': 'avg / persona',
	'toLabel': 'a',
	'departureLabel': 'Salida',
	'arrivalLabel': 'Llegada',
	'servicesLabel': 'Servicios',
	'seatsLabel': 'Asientos',
	'availableLabel': 'Disponible',
	'perpersonLabel': 'por persona',
	'selectLabel': 'seleccionar',
	'SELECTEDLabel': 'SELECCIONADO',
	'emailaddressLabel': 'dirección de correo electrónico',
	'personalinfo': 'Tu información personal',
	'verifyemailaddressLabel': 'Confirme su dirección de correo electrónico',
	'ticketbookingLabel': 'Boleto de reserva',
	'genderLabel': 'Género',
	'selectgenderLabel': 'Seleccione género',
	'maleLabel': 'Masculino',
	'femaleLabel': 'Hembra',
	'countrycodeLabel': 'Código de país',
	'phonenumberLabel': 'Número de teléfono',
	'typeofDocLabel': 'Tipo de documento',
	'selectdoctypeLabel': 'Seleccionar tipo de documento',
	'passportLabel': 'Pasaporte',
	'docnumberLabel': 'Número del Documento',
	'seatnumberLabel': 'Número de asiento',
	'wantlabel': 'Quiero recibir',
	'promotionallabel': 'ofertas promocionales en el futuro',
	'forwardtriplabel': 'Detalles de su viaje (viaje de ida y vuelta)',
	'returntriplabel': 'Detalles de su viaje (Viaje de regreso)',
	'onlinepaylabel': 'Pago en línea',
	'bookingsTitleLable': 'Viajes que has reservado!',
	'lastNameValid': 'El apellido es obligatorio!',
	'addressValid': 'La dirección es obligatoria!',
	'dobValid': 'La fecha de nacimiento es obligatoria!',
	'emailValid': 'El correo electrónico es obligatorio!',
	'email1Valid': 'Por favor ingrese una identificación válida de correo electrónico',
	'verifyValid': 'Verifique que el correo electrónico sea obligatorio!',
	'verify1Valid': 'Por favor, ingrese la identificación válida de correo electrónico de verificación',
	'genderValid': 'el sexo es obligatorio!',
	'countryValid': 'El código de país es obligatorio!',
	'phoneValid': 'El número de teléfono es obligatorio!',
	'verify2Valid': 'La dirección de correo electrónico y verificar la dirección de correo electrónico deben ser las mismas!',
	'phone1Valid': 'El número de teléfono debe ser solo de excavación!',
	'docValid': 'tipo de documento es obligatorio!',
	'doc1Valid': 'El número de documento es obligatorio!',
	'oldPwdValid': 'Por favor ingrese la contraseña anterior',
	'newPwdValid': 'Por favor ingrese una nueva contraseña',
	'confirmPwdValid': 'Por favor ingrese confirmar contraseña',
	'pwdMatchValid': 'Por favor, introduzca la contraseña de confirmación igual que la contraseña',
	'loginemailAlert': 'Autenticación fallida con el nombre de usuario y la contraseña',
	'locidAlert': 'Seleccione de la ubicación',
	'toidAlert': 'Seleccione ubicación',
	'returndateAlert': 'Ingrese un viaje desde la fecha o la fecha de regreso',
	'regsuccAlert': 'Registro de usuario exitoso. Inicie sesión para reservar las entradas',
	'regfailAlert': 'Error al registrar el usuario. Compruebe por favor si el email ID y el móvil ya existe',
	'bookingConAlert': 'Por favor login para reservar boletos o utilizar el check-out de invitados',
	'bookingConseatAlert': 'El asiento seleccionado no es igual al no. De pasajeros',
	'bookingConreturnAlert': 'El asiento seleccionado no es igual al número de pasajeros para el viaje de regreso',
	't&cAlert': 'por favor haga clic en los términos y condiciones',
	'sercallAlert': 'servicio de llamadas',
	'confbookAlert': 'Su reserva ha expirado. Bloquee sus asientos nuevamente para confirmar la reserva',
	'failbookAlert': 'Error al reservar sus asientos. Llame a nuestro cuidado cutomer para una reserva rápida o intente después de un tiempo',
	'blockseatAlert': 'Por favor inicie sesión para reservar boletos',
	'reqparamsAlert': 'Asientos bloqueados con éxito',
	'reqparamsfailAlert': 'Error al bloquear los asientos',
	'reqparamsavlAlert': 'Asientos no disponibles',
	'reqparamsmoreavlAlert': 'Asientos seleccionados es más que los asientos disponibles',
	'promAlert': 'Código de oferta promocional no válido',
	'promexpAlert': 'El código de oferta promocional ha expirado.',
	'prfswlAlert': 'perfil actualizado con éxito',
	'failedswlAlert': 'Error al actualizar el perfil++',
	'emlswlAlert': 'El correo electrónico se cambió correctamente',
	'erremlswlAlert': 'ID de correo electrónico no válido',
	'passsuccswlAlert': 'Contraseña cambiada con éxito',
	'passerrswlAlert': 'Antigua contraseña es incorrecta',
	'plAlert': 'Seleccione el viaje hacia adelante primero antes de seleccionar el viaje de regreso',
	'slAlert': 'Seleccione el viaje hacia adelante primero antes de seleccionar el viaje de regreso',
	'loAlert': 'Seleccione de la ubicación',
	'laAlert': 'Seleccione ubicación',
	'pdAlert': 'Ingrese un viaje desde la fecha o la fecha de regreso',
	'bookingscreenAlert': 'Seleccione los asientos para continuar reservando',
	'bookingscreenreturnAlert': 'Seleccione los asientos del viaje de regreso para continuar reservando',
	'custIDAlert': 'Por favor inicie sesión para reservar boletos',
	'blockseatsAlert': 'Asientos bloqueados con éxito',
	'blockseatsfailAlert': 'Error al bloquear los asientos',
	'blockseatavalAlert': 'Asientos no disponibles',
	'blockseatmoreavalAlert': 'Asientos seleccionados es más que los asientos disponibles',
	'emailValidError': 'Por favor ingrese el correo',
	'pwdValidError': 'Por favor, ingrese contraseña',
	'emailValidError2': 'Por favor ingrese su correo electrónico o número de teléfono móvil',
	'invalidfnameValid': 'Por favor ingrese su nombre',
	'invalidlnameValid': 'Por favor ingrese el apellido',
	'invalidemailValid': 'Por favor ingrese un ID de correo electrónico válido',
	'invalidmobileValid': 'Por favor, introduzca un número de móvil válido',
	'invalidpasswordValid': 'Por favor, ingrese contraseña',
	'invalidconfirmValid': 'La contraseña y la contraseña no son las mismas',
	'myAccountLabel': 'MI CUENTA',
	'myDashboardLabel': 'Mi tablero',
	'allDestinationsLabel': 'Todos los destinos',
	'LogoutLabel': 'Cerrar sesión',
	'ApplyLabel': 'Aplicar',
	'bookingIdValidError': 'Ingrese la ID de reserva',
	'toLabel': 'a',
	'selectGenderLabel': 'Seleccione género',
	'pickupdropLabel':'Sus puntos de recogida y caída',
	'pickupLabel':'Puntos de recogida',
	'dropLabel':'Punto de caída',
	'supLabel' :'Efectivo del supermercado',
	'bookingrefLabel' :'Utilice esta opción para reservar un boleto pagando en efectivo en el supermercado. la reserva sólo se confirmará cuando se especifique el identificador de referencia y se vincule a la solicitud de reserva creada. Contabilizar 2 horas desde el período de reserva, la reserva se vence.',
     'PaymenttypeAlert':'Por favor seleccione la opción de pago',
     'guestboxLabel':'Retirada de los huéspedes (usuario esta función si no desea iniciar sesión)',
     'guestboxLabel1':'Retirada de los huéspedes',
     'guestwarning1' :'No se pudo retirar como huésped. Intente por favor después de un cierto tiempo',
	'guestwarning2':'Ya tiene activa una sesión de comprobación de invitado',
	'guestsuccess1':'Comprobación de clientes con éxito',
	'confrefLabel':'ID. de referencia',
	'refmobileno':'Móvil no. utilizado durante la compra del identificador de referencia',
	'ManyRequestErrorLabel':'Demasiadas solicitudes en este momento. Por favor intente después de alguna vez',
	'OtherErrorLabel':'La aplicación no está disponible en este punto de tiempo por favor póngase en contacto con el equipo de soporte',
	'errorMessageLabel':'La aplicación no es de carácter temporal. Intente por favor después de un cierto tiempo',
	'errorLabel':'Ir a Inicio',
	'invalidRefId':'Introduzca ID de referencia',
	'refmessg1':'No se pudo actualizar la reserva',
	'refmessg2' :'ID de referencia no válido',
	'refmessg3':'Identificador de referencia ya utilizado para la reserva',
	'refmessg4':'Reserva actualizada con éxito',
	'gustLabel' :'Ingrese la identificación del email para continuar la comprobación del huésped',
	'gustAlertLabel':'Por favor ingrese su ID de correo electrónico para continuar la retirada de invitados',
	'guestButton1' :'cancelar',
	'guestButton2':'continuar',
	'passengersLabel':'el pasajero',
	'forwardLabel':'Viaje hacia adelante',
	
	'returnLabel':'Viaje de regreso',
	'freLabel':'Preguntas Frecuentes',
	
	'paydetailLabel':'Detalles del pago',
	'selectpaydetailLabel':'Seleccione el tipo de pago',
	'cardinfoLabel':'Información de la tarjeta',
	'cardholdnameLabel':'Nombre del titular de la tarjeta',
	'cardholdlastnameLabel':'Apellido del Titular de la Tarjeta',
	'cardholdemailLabel':'Correo electrónico del titular de la tarjeta',
	'cardholdaddLabel':'Titular de la Tarjeta Dirección',
	'cardholdphoneLabel':'Teléfono con soporte de tarjeta',
	'cardnumLabel':'Número de tarjeta de crédito',
	'cardexpmonLabel':'Mes de vencimiento de la tarjeta',
	'cardexpyearLabel':'Año de vencimiento de la tarjeta',
	'cvvLabel':'CVV',
    'suprmarhtchckoutLabel':'Supermercado Checkout',
	'firstNameAlert':'Por favor ingrese su nombre',
	'lastNameAlert':'Por favor ingrese el apellido',
	'addressAlert':'Por favor ingrese la dirección',
	'dobAlert':'Por favor ingrese la fecha de nacimiento',
	'emailAlert':'Por favor ingrese la ID de correo',
	'emailvalidAlert':'Por favor ingrese el ID del correo vaild',
	'verifyemailAlert':'Por favor ingrese verificar ID de correo electrónico',
	'verifyvalidemailAlert':'Por favor, ingrese la identificación válida de correo electrónico',
	'validemailAlert':'La dirección de correo electrónico y verificar la dirección de correo electrónico deben ser las mismas!',
	'genderAlert':'Por favor ingrese el género',
	'countryAlert':'Por favor ingrese el código de país',
	'phoneAlert':'Por favor ingrese el número de teléfono',
	'phonevalidAlert':'El número de teléfono debe ser solo dígitos',
	'cardholderAlert':'Ingrese el nombre del titular de la tarjeta',
	'cardholderlastAlert':'Por favor ingrese el titular de la tarjeta de apellido',
	'cardholderemailAlert':'Ingrese el correo electrónico del titular de la tarjeta',
	'cardholderaddAlert':'Ingrese la dirección del titular de la tarjeta',
	'cardholderphoneAlert':'Por favor ingrese el teléfono con soporte para tarjeta',
	'cardexpmntAlert':'Ingrese el mes de vencimiento',
	'cardexpyrAlert':'Por favor ingrese el año de vencimiento',
	'cvvAlert':'Por favor ingrese el número de cvv',
	'creditcardAlert':'Ingrese el número de tarjeta de crédito',
	 'sentmailLabel':'Enviar correo',

	
	//about
 'iLabel':'Necesito Registrarme para comprar en Bukate?',
 'nlLabel':'No, Bukate no solicita a sus clientes que se registren. …',
 'bsLabel1':'Como comprar tu pasaje con Bukate?',
 'youLabel':'Debes seleccionar el lugar de salida, el destino y fecha de ida y si desea vuelta. Luego deberá seleccionar la ruta disponible y el asiento de bus deseado. Una vez introducida la información del pasajero tendrá la opción de pagar con tarjeta de crédito o efectivo. Luego de hacer el pago, el pasaje de bus se le enviara a su correo electrónico y ya estará listo para evitar las filas e ir directo al bus. ',
 'hoLabel':'Como puedo pagar mi pasaje?',
 'yo1Label':'Podrás pagar tu pasaje con el uso de tarjeta de crédito o efectivo.',
 'cnLabel':'Puedo comprarle un pasaje a otra persona?',
 'yuLabel':'Claro que si! Debes introducir los datos del pasajero que va a viajar, e ingresar la dirección de correo electrónico donde deseas recibir el pasaje. ',
 'whtLabel':'Que hacer si pierde su pasaje?',
 'yshLabel':'Una copia de su pasaje debe de haberle sido envidada a su correo electrónico.',
 'ujLabel':'No recibí mi pasaje, que debo hacer?',
 'yhgLabel':'Contáctese con nuestro servicio de atención al numero 2222-2222',
 'canLabel':'Puedo anular mi pasaje?',
 'klLabel':'Las anulaciones y rembolsos no están permitidos.',
  'canjLabel':'Puedo cambiar la fecha y hora de mi pasaje de bus?',
  'kjLabel':'Para Bukate no es posible reprogramar los pasajes una vez ya comprados. En este caso deberá contactar a la empresa de bus responsable de su viaje, para que le puedan facilitar cualquier cambio deseado.',

 'iklLabel':'Preguntas por responder:',
 'kmlLabel':'Que hacer si pierde el bus?',
 'whdLabel':'Que hacer si el bus sale antes de la hora proporcionada por el pasaje?',
 'othrLabel': 'OTROS',
 'moLabel': 'Más sobre Bukate',
 'AbusLabel': 'sobre nosotros',
  'AboutbukateparagraphLabel': 'Bukate es la primera plataforma en Panamá para reservar y comprar boletos de autobús por internet. Los viajeros tendrán la facilidad de buscar rutas, comparar los horarios y asegurar su asiento de autobús desde cualquier parte de panamá. De esta manera podrán evitar las largas filas y a su vez asegurar su asiento antes de llegar a la terminal de autobuses. Bukate tiene como objetivo mejorar la calidad de vida del viajero y a su vez brindarle una mejor experiencia a la hora de emprender su viaje.',
 'MailSentLabel':'Envío de correo con éxito',
 'MarketChkLabel' :'Por favor seleccione la opción de compra de supermercado para continuar reservando'
	
 



};
localStorage.setItem('englishTranslate', JSON.stringify(englishTranslate));
localStorage.setItem('spanishTranslate', JSON.stringify(spanishTranslate));