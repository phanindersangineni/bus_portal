app.factory('bankManagementFactory', function($http, $sessionStorage) {

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
});