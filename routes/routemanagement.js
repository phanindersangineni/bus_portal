var mysqlLib = require("./mysqlLib").pool;


exports.getallRoutesforAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select RT.ID,RT.IS_ACTIVE,CP.COMPANY_NAME,RT.COMPANY_ID,RT.ROUTE_NAME,RT.INTERNATIONAL_ROUTE, \
      RT.START_LOCATION,RT.END_LOCATION,CT.NAME STARTLOCNAME, CT1.NAME ENDLOCNAME from routes RT ,city CT,city CT1,company  CP \
      WHERE RT.START_LOCATION =CT.ID  AND RT.END_LOCATION=CT1.ID  and RT.COMPANY_ID =CP.ID', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.getallRoutesforUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



         var query = mclient.query('select RT.ID,RT.IS_ACTIVE,CP.COMPANY_NAME,RT.COMPANY_ID,RT.ROUTE_NAME,RT.INTERNATIONAL_ROUTE, \
      RT.START_LOCATION,RT.END_LOCATION,CT.NAME STARTLOCNAME, CT1.NAME ENDLOCNAME from routes RT ,city CT,city CT1,company  CP \
      WHERE RT.START_LOCATION =CT.ID  AND RT.END_LOCATION=CT1.ID  and RT.COMPANY_ID =CP.ID adn RT.IS_ACTIVE=1', function(err, rows) {
          if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.saveroutes = function(req, res) {

  var input = JSON.parse(JSON.stringify(req.body));

mysqlLib.acquire(function(err, mclient) {

	 mclient.beginTransaction(function(err) {
          
          var inputData ={
           COMPANY_ID :input.companyid,
           ROUTE_NAME :input.routename,
           INTERNATIONAL_ROUTE :input.internationalroute,
           IS_ACTIVE :input.isactive,
           CREATED_BY :input.userid,
           START_LOCATION :input.startLocation,
           END_LOCATION :input.endLocation

          }

           var query = mclient.query("insert into routes set ? ,CREATED_DATE =now()", inputData, function (err, rows) {
 
                if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save company'
                        };
                        //mclient.release(); 
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });

                }else{
   
            var query = mclient.query('select ID from routes where route_name =?',[input.routename], function(err, rows) {
                  
                         console.log("rows"+rows.length);

                       var routeid = rows[0].ID;


                       var citiescallback =function(result)
                        {

                         if(result.success=="SUCCESS")
                         {

                          mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save routes'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'routes saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                         }else{

                           mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save routes'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });


                         }

                        };

                        updateCityRoutes(routeid,req,res,mclient,citiescallback);
                


                 });

                }





           });
            
    
  
             
             });
     });


	};


	function updateCityRoutes(routeid,req,res,mclient,contactcallback)
{

 var input = JSON.parse(JSON.stringify(req.body));

   var counter =1;

     var query = mclient.query(" update from routes_city_list where set is_active =0 where route_id =?",[routeid], function(err, rows){

    for( var k =0; k < input.items.length ;k++)
           {

             var cityid =input.items[k].c_name;
            

              var insertData ={
              route_id :routeid,
              city_id: cityid,
              is_active:1,
             
              }
 
          var query = mclient.query(" insert into routes_city_list set ?",[insertData], function(err, rows){

               if(err)
                 {
                  console.log("ERROR 187"+err);
                        var resdata = {
                          success: 'FAILURE',
                         
                        };
                      contactcallback(resdata);
                    
                 }else{
                    
                     if(counter==input.items.length)
                         {


                           var resdata = {
                          success: 'SUCCESS',
                         
                        };
                      contactcallback(resdata);

                         }


                  counter++;

                 }



          });





           }

        });   



}

exports.getallCitysByRouteId = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var  routeid =input.routeid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select rcl.ID,rcl.ROUTE_ID,rcl.CITY_ID,rcl.IS_ACTIVE,ct.NAME from routes_city_list  rcl,city ct \
                  where ct.ID =rcl.CITY_ID and rcl.IS_ACTIVE=1 and rcl.route_id=? and rcl.is_active=1',[routeid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.updateroutes = function(req, res) {
 var input = JSON.parse(JSON.stringify(req.body));
mysqlLib.acquire(function(err, mclient) {

	 mclient.beginTransaction(function(err) {
        


           var query = mclient.query(" update routes set COMPANY_ID =?,INTERNATIONAL_ROUTE=?,IS_ACTIVE=?,UPDATED_BY=?,UPDATED_DATE=now(), \
          START_LOCATION =?,END_LOCATION =?,ROUTE_NAME=? where id =?", [input.companyid,input.internationalroute,input.isactive,input.userid,input.startLocation,input.endLocation,input.routename,input.routeid], function (err, rows) {
 
                if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save company'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
   
           

                       var citiescallback =function(result)
                        {

                         if(result.success=="SUCCESS")
                         {

                          mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save routes'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'routes saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                         }else{

                           mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save routes'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });


                         }

                        };

                        updateCityRoutes(input.routeid,req,res,mclient,citiescallback);
                


                

                }





           });
            
    
  
             
             });
     });


	};


  exports.getallRoutesbyComapnyId = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {



         var query = mclient.query('select * from routes where company_id =? and is_active=1',[companyid], function(err, rows) {
          if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};



exports.getallRoutesforCompany = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select RT.ID,RT.IS_ACTIVE,CP.COMPANY_NAME,RT.COMPANY_ID,RT.ROUTE_NAME,RT.INTERNATIONAL_ROUTE, \
      RT.START_LOCATION,RT.END_LOCATION,CT.NAME STARTLOCNAME, CT1.NAME ENDLOCNAME from routes RT ,city CT,city CT1,company  CP \
      WHERE RT.START_LOCATION =CT.ID  AND RT.END_LOCATION=CT1.ID  and RT.COMPANY_ID =CP.ID and RT.COMPANY_ID =?',[companyid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.getallactiveroutes = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select RT.ID,RT.IS_ACTIVE,CP.COMPANY_NAME,RT.COMPANY_ID,RT.ROUTE_NAME,RT.INTERNATIONAL_ROUTE, \
      RT.START_LOCATION,RT.END_LOCATION,CT.NAME STARTLOCNAME, CT1.NAME ENDLOCNAME from routes RT ,city CT,city CT1,company  CP \
      WHERE RT.START_LOCATION =CT.ID  AND RT.END_LOCATION=CT1.ID  and RT.COMPANY_ID =CP.ID and RT.IS_ACTIVE =1 and RT.COMPANY_ID =?',[companyid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};



