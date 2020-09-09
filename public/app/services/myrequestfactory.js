app.factory('myrequestFactory',function($http,$sessionStorage){    
    
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
});