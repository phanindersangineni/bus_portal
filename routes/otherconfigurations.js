var mysqlLib = require("./mysqlLib").pool;

exports.getallPaymentprocessorForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from payment_processor', function(err, rows) {
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

exports.getallPaymentprocessorForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from payment_processor where is_active=1', function(err, rows) {
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


exports.addorupdatePaymentProcessor = function(req, res) {

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
                
            var query = mclient.query("insert into payment_processor set ?,created_date=now()", inputData, function (err, rows) {
                
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
                
               var query = mclient.query("update payment_processor set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,paymentid], function (err, rows) {
                
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



exports.getallFeesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select fs.ID,fs.COMPANY_ID,fs.SERVICE_ID,fs.COMISSION_FEES, fs.IS_ACTIVE ,cp.COMPANY_NAME, se.NAME \
from fees fs, company cp, service se  where fs.company_id =cp.id and fs.service_id=se.id', function(err, rows) {
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

exports.getallFeesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select fs.ID,fs.COMPANY_ID,fs.SERVICE_ID,fs.COMISSION_FEES, fs.IS_ACTIVE ,cp.COMPANY_NAME, se.NAME \
from fees fs, company cp, service se  where fs.company_id =cp.id and fs.service_id=se.id and fs.IS_ACTIVE =1', function(err, rows) {
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


exports.addorupdateFees = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var feesid =input.feesid;
    var companyid =input.companyid;
    var serviceid =input.serviceid;
    var comissionfees =input.comissionfees;
    var isactive =input.isactive;
    var userid =input.userid;
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save fees'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(feesid==0)
           {
              var inputData = {
                                      
                                        company_id:companyid,
                                        service_id: serviceid,
                                        comission_fees:comissionfees,
                                        is_active:isactive,
                                        created_by:userid
                                        
                                    };


                
            var query = mclient.query("insert into fees set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save fees.'
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
                                                            message: 'Failed to save fees'
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
                
               var query = mclient.query("update fees set company_id =?,service_id=?,comission_fees=?,is_active=?,updated_by=?,updated_date=now() where id =? ", 
                [companyid,serviceid,comissionfees,isactive,userid,feesid], function (err, rows) {
                
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
                                                            message: 'Failed to save fees'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'fees saved successful'
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


exports.getallContactRolesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from contact_roles', function(err, rows) {
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

exports.getallContactRolesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from contact_roles where is_active=1', function(err, rows) {
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


exports.addorupdatecontactroles = function(req, res) {

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
                    message: 'Failed to save contact roles'
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
                
            var query = mclient.query("insert into contact_roles set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save contact roles.'
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
                                                            message: 'Failed to add contact roles'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'contact roles saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{
                
               var query = mclient.query("update contact_roles set name =?,is_active=?,updated_by=?,updated_date=now()  where id =? ", [name,isactive,userid,roleid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save contact roles'
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
                                                            message: 'Failed to save contact roles'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'contact roles saved successful'
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