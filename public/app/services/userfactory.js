app.factory('userFactory', function($http, $sessionStorage) {

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
});
