app.factory('commonFactory', function($http, $sessionStorage) {

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
});