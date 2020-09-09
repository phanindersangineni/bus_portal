app.factory('graphFactory', function($http, $sessionStorage) {
    
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
});