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
app.run(function($rootScope, $state, $sessionStorage, $window, $location, AuthenticationFactory, UserAuthFactory, commonFactory, $templateCache) {
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
});
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