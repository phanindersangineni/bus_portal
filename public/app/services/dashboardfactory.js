app.factory('dashboardFactory', function($http) {

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
});
