app.factory('govtdashboardFactory', function($http,$sessionStorage) {

 
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
});
