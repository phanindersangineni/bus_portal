var mysqlLib = require("./mysqlLib").pool;
exports.getallCountriesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from country', function(err, rows) {
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

exports.getallCountriesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from country where is_active=1', function(err, rows) {
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


exports.addorupdatecountry = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var countryid =input.countryid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save country'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(countryid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into country set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save country.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to add country'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'country saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update country set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,countryid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save country'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save country'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'country saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};

exports.getallCitiesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('SELECT ct.ID,ct.COUNTRY_ID,ct.NAME,ct.IS_ACTIVE,cn.NAME COUNTRYNAME FROM CITY ct ,COUNTRY cn WHERE \
ct.COUNTRY_ID =cn.ID', function(err, rows) {
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

exports.getallCityForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('SELECT ct.ID,ct.COUNTRY_ID,ct.NAME,ct.IS_ACTIVE,cn.NAME COUNTRYNAME FROM city ct ,country cn WHERE \
ct.COUNTRY_ID =cn.ID and  ct.IS_ACTIVE =1', function(err, rows) {
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


exports.addorupdatecity = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var countryid =input.countryid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    var cityid =input.cityid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save city'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(cityid==0)
           {
              var inputData = {
                                      
                                        NAME:name,
                                        is_active: isactive,
                                        created_by:userid,
                                        country_id :countryid
                                        
                                    };  
                
            var query = mclient.query("insert into city set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save city'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save city'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'city saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update city set name =?,country_id =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,countryid,isactive,userid,cityid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save city'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save city'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'city saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};

exports.addorupdatecurrency = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var currencyid =input.currencyid;
    var  countryid =input.countryid;
    var name =input.name;
    var isactive =input.active;
    var currencysumbol =input.currencysumbol;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {
          

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to add currency'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(currencyid==0)
           {
              var inputData = {
                                        currency_symbol: currencysumbol,
                                        currency_name:name,
                                        is_active: isactive,
                                        created_by:userid,
                                        country_id :countryid
                                    };  
                
            var query = mclient.query("insert into currency set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save currency.Either currency code or currency name already exists'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save currency.Either currency code or currency name already exists'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'currency saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update currency set currency_name =?,is_active=?,currency_symbol=?,country_id =?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,currencysumbol,countryid,userid,currencyid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save currency.Either currency code or currency name already exists'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save currency.Either currency code or currency name already exists'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'currency saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }


       
         });            
      
    });

};

exports.getallCurrencyForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from currency  cr,country cc where cr.COUNTRY_ID =cc.ID', function(err, rows) {
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
exports.getallCurrencyForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from currency  cr,country cc where cr.COUNTRY_ID =cc.ID cr.IS_ACTIVE=1', function(err, rows) {
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


exports.getallAmenitiesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from amenities', function(err, rows) {
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

exports.getallAmenitiesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from amenities where is_active=1', function(err, rows) {
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


exports.addorupdateAmenities = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var amenityid =input.amenityid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save amenities'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(amenityid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into amenities set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save amenities.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save amenities'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'amenities saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update amenities set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,amenityid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save amenities'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save amenities'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'amenities saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};


exports.getallrolesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from roles', function(err, rows) {
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

exports.getallrolesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from roles where is_active=1', function(err, rows) {
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


exports.addorupdateroles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var roleid =input.roleid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save amenities'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(roleid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into roles set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save roles.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save roles'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'roles saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update roles set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,roleid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save roles'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save roles'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'roles saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};




exports.getallscreensForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from screens', function(err, rows) {
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



exports.addorupdatescreens = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var screenid =input.screenid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save screen name'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(screenid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into screens set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save screen name.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save screen name'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'screen name saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update screens set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,screenid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save screen name'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save screen name'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Screen name saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};


exports.getalltaxesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select *,DATE_FORMAT(FROM_DATE, "%Y-%m-%d")from_date_format,DATE_FORMAT(TO_DATE, "%Y-%m-%d")to_date_format from tax tx ,country cn where tx.COUNTRY_ID =cn.ID', function(err, rows) {
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

exports.getalltaxesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select *,DATE_FORMAT(FROM_DATE, "%Y-%m-%d")from_date_format,DATE_FORMAT(TO_DATE, "%Y-%m-%d")to_date_format from tax tx ,country cn where tx.COUNTRY_ID =cn.ID and now ()between tx.from_date and tx.to_date', function(err, rows) {
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



exports.addorupdatestaxes = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var taxid =input.taxid;
    var name =input.taxname;
    var fromdate =input.fromdate;
    var todate =input.todate;
    var countryid =input.countryid;
    var taxpercentage =input.taxpercentage;
    var userid =input.userid;
    var includedinprice =input.includedinprice;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save tax'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(taxid==0)
           {

           var query = mclient.query("select * from tax where tax_name =? and now() between from_date and to_date", [name], function (err, rows) {
            
             if(err)
             {
                 console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save tax.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

             }

               if(rows.length ==0)
              {
 
              var inputData = {
                                      
                                        tax_name:name,
                                        country_id :countryid,
                                        tax_percentage :taxpercentage,
                                        from_date :fromdate,
                                        to_date :todate,
                                        created_by:userid,
                                        included_in_price :includedinprice
                                        
                                    };  
                
            var query = mclient.query("insert into tax set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save tax.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save tax'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'tax saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });

            }else{

                var data = {
                            success: 'FAILURE',
                              message: 'tax details already exists.'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

            }

           });
          

            }else{

                 
                
               var query = mclient.query("update tax set tax_name=?, country_id=?,tax_percentage=?,included_in_price=?, from_date=?,to_date =?,updated_by=?,updated_date=now()  where id =? ", [name,countryid,taxpercentage,includedinprice,fromdate,todate,userid,taxid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save tax'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save tax'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'tax  saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};


exports.getallTransportationTypeForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from transportation_type', function(err, rows) {
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

exports.getallTransportationTypeForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from transportation_type where is_active=1', function(err, rows) {
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


exports.addorupdateTransportationType = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var transportationid =input.transportationid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save transportation type'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(transportationid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into transportation_type set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save transportation type'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save transportation type'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'transportation type saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update transportation_type set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,transportationid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save transportation type'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save transportation type'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'transportation type saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};




exports.getallSettingsForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from settings', function(err, rows) {
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

exports.getallSettingsForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from settings where is_active=1', function(err, rows) {
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


exports.addorudateSettings = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var settingsid =input.settingsid;
    var name =input.name;
    var value =input.value;
   
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save settings'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(settingsid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        value:value
                                        
                                    };  
                
            var query = mclient.query("insert into settings set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save settings'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save transportation type'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'settings saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update settings set name =?,value=? where id =? ", [name,value,settingsid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save settings'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save settings'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'settings saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};


exports.getallEmailTemplatesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from email_template', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};




exports.addorudateEmailTemplate = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var templateid =input.templateid;
    var name =input.name;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save email template'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(templateid==0)
           {
              var inputData = {
                                      
                                        name:name
                                        
                                    };  
                
            var query = mclient.query("insert into email_template set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to email template'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save email  template'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'email template saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update email_template set name =? where id =? ", [name,templateid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save email template'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save email template'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Email template saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

    }



exports.getallEmailForLanguage = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select el.ID, el.EMAIL_TEMPLATE_ID,el.LANGUAGE_ID,el.SUBJECT,el.EMAIL_BODY,lg.NAME LNGNAME,et.NAME TEMPLATENAME \
             from email_language el,email_template et ,language lg where el.LANGUAGE_ID =lg.ID and el.EMAIL_TEMPLATE_ID =et.ID', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};




exports.addorudateEmailLanguage = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var templateid =input.templateid;
    var subject =input.subject;
    var languageid =input.languageid;
    var emaillanguageid =input.emaillanguageid;
    var emailbody =input.emailbody;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save email language'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(emaillanguageid==0)
           {
              var inputData = {
                                      
                                        EMAIL_TEMPLATE_ID:templateid,
                                        LANGUAGE_ID :languageid,
                                        SUBJECT:subject,
                                        EMAIL_BODY:emailbody


                                        
                                    };  
                
            var query = mclient.query("insert into email_language set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save email language'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save email  language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'email language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update email_language set EMAIL_TEMPLATE_ID =?,EMAIL_BODY=?,LANGUAGE_ID=?,SUBJECT=? where id =? ", [templateid,emailbody,languageid,subject,emaillanguageid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save email template'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save email language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Email language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });
    
    }


 exports.getallEmailAction = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select ea.ID,ea.EMAIL_ACTION,ea.EMAIL_TEMPLATE_ID,et.NAME  from email_action ea , email_template et where ea.email_template_id =et.id', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};




exports.addorudateEmailAction = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var templateid =input.templateid;
     var emailaction =input.emailaction;
     var emailactionid =input.emailactionid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save email action'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(emailactionid==0)
           {
              var inputData = {
                                      
                                        EMAIL_TEMPLATE_ID:templateid,
                                        EMAIL_ACTION:emailaction
                                      

                                        
                                    };  
                
            var query = mclient.query("insert into email_action set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save email action'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save email  action'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'email action saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update email_action set EMAIL_TEMPLATE_ID=?,EMAIL_ACTION=? where id =? ", [templateid,emailaction,emailactionid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save email template'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save email language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Email language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

 
};

var fs = require('fs');


function upload(req, upload_files, type,name,imagename,imageurl, uploadfilecallback) {

    console.log("upload_files.length" + upload_files.length);
    if (upload_files.length > 0) {
        for (var i = 0; i < upload_files.length; i++) {
            var image = upload_files[i];
            var imageCount = i + 1;
            if(imagename=="0"){
            var imageName = name + "_" + Date.now() + "_" + imageCount + ".jpg";
            }else{
                imageName =imagename;
            }
            var base64Data = image.substring(image.indexOf(','), image.length);
            //for local
            var imagePath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + '\\public\\app\\myRequestImages\\images\\'+type+'\\';

            //for linux
           // var dbImagePath = '\\app\\myRequestImages\\images\\'+type+'\\' + imageName;

            var attachment_name = imagePath + imageName;
            fs.writeFile(attachment_name, base64Data, 'base64', function (err) {
                console.log("err"+err);
                var  imageurl ="/app/myRequestImages/images/"+type+"/" + imageName;
                var data = {
                    success: 'SUCCESS',
                    attachment_name:imageurl,
                    image_name:imageName
                };
                uploadfilecallback(data);
            });
        }


    } else {
 
        var data = {
            success: 'SUCCESS',
            image_name:imagename,
            attachment_name:imageurl

        };
        uploadfilecallback(data);

    }
}


exports.addorupdatelanguage = function(req, res) {
   
    var input = JSON.parse(JSON.stringify(req.body));
    var languageid =input.languageid;
    var name =input.name;
    var imagename =input.imagename;
    var imageurl =input.imageurl;
    
   var uploadfilecallback = function (data)
    {
        console.log("data.attachment_name"+data.attachment_name);
        if (data.success == "SUCCESS")
        {
        var imageUrl =data.attachment_name;
        var imageName =data.image_name;
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save language'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(languageid==0)
           {
              var inputData = {
                                        name: name,
                                        image_url:imageUrl,
                                        image_name:imageName
                                    };  
                
            var query = mclient.query("insert into language set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save language'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update language set name =?,image_url=?,image_name=? where id =? ", [name,imageurl,imagename,languageid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save language'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
           });
       });
      }
      else{
         var data = {
                            success: 'FAILURE',
                            message: 'Failed to save language.Please try after some time'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));

      }
    };

    var upload_files = input.upload_images;
    upload(req, upload_files,"language",name,imagename,imageurl, uploadfilecallback);

};


exports.getalllanguage = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from language', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};

exports.getalllabelforuserinterface = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from label_user_interface', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.addorudateLabelUserInterface = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var userinterfaceid =input.userinterfaceid;
    var name =input.name;
   
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save label for user interface'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(userinterfaceid==0)
           {
              var inputData = {
                                      
                                        name:name
                                      
                                    };  
                
            var query = mclient.query("insert into label_user_interface set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save label for user interface'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save label for user interface'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'label for user interface saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update label_user_interface set name =? where id =? ", [name,userinterfaceid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save label for user interface'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save label for user interface'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'label for user interface saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};

exports.getalllabelforlanguage = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query(' SELECT lfl.ID,lfl.VALUE,lfl.LABEL_ID,lfl.LANGUAGE_ID,lg.NAME LABELNAME,lui.NAME  LNGNAME \
             FROM LABEL_FOR_LANGUAGE lfl, LANGUAGE LG, LABEL_USER_INTERFACE lui where lfl.LABEL_ID =lui.ID  and lfl.LANGUAGE_ID =lg.ID', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.addorudateLabelforlanguage = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var labellanguageid =input.labellanguageid;
    var labelid =input.labelid;
    var languageid =input.languageid;
    var value =input.value;
   
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save label for language'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(labellanguageid==0)
           {
              var inputData = {
                                      
                                        value:value,
                                        label_id:labelid,
                                        language_id:languageid
                                      
                                    };  
                
            var query = mclient.query("insert into label_for_language set ?", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save label for language'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save label for language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'label for language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update label_for_language set value =?,label_id=?,language_id=? where id =? ", [value,labelid,languageid,labellanguageid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save label for language'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save label for language'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'label for language saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};


exports.getallServiceForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from service', function(err, rows) {
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

exports.getallServiceForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from service where is_active=1', function(err, rows) {
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


exports.addorupdateservice = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var serviceid =input.serviceid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save service'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(serviceid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into service set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save service.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save service'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'service saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update service set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,serviceid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save service'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save service'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'service saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};


exports.getallPaymentmethodsForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from payment_methods', function(err, rows) {
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

exports.getallPaymentmethodsForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from payment_methods where is_active=1', function(err, rows) {
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


exports.addorupdatePaymentMethods = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var paymentid =input.paymentid;
    var name =input.name;
    var isactive =input.active;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save payment methods'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(paymentid==0)
           {
              var inputData = {
                                      
                                        name:name,
                                        is_active: isactive,
                                        created_by:userid
                                        
                                    };  
                
            var query = mclient.query("insert into payment_methods set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save payment methods.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save payment methods'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'payment methods saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update payment_methods set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,paymentid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save payment methods'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save payment methods'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'payment methods saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });   
                
                
                
            }
        
         
         }   
       
         });
    });

};
