var mysqlLib = require("./mysqlLib").pool;
var mail = require('../nodeMailerWithTemp');

exports.getallCustomersForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select  *,cn.NAME CNTRYNAME,ln.NAME LNGNAME,ct.NAME CITYNAME  from customers cu, country cn,language ln,city ct \
                where cu.COUNTRY_ID =cn.ID  and cu.LANGUAGE_ID =ln.ID and cu.CITY_ID =ct.ID', function(err, rows) {
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


exports.getallCustomersForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select  *,cn.NAME CNTRYNAME,ln.NAME LNGNAME,ct.NAME CITYNAME  from customers cu, country cn,language ln,city ct \
                where cu.COUNTRY_ID =cn.ID and cu.LANGUAGE_ID =ln.ID and cu.IS_ACTIVE =1 and cu.CITY_ID =ct.ID', function(err, rows) {
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

exports.addorupdatecustomer= function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var countryid =input.countryid;
    var cityid =input.cityid;
    var firstname =input.firstname;
    var lastname =input.lastname
    var isactive =input.active;
    var userid =input.userid;
    var email =input.email;
    var address =input.address;
    var telephone =input.telephone;
    var company =input.company;
    var languageid =input.languageid;
    var customerid =input.customerid;

    var base64 = require('base-64');
    
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save customer'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(customerid==0)
           {
              
				var inputData ={
					first_name :firstname,
					last_name :lastname,
					country_id :countryid,
					city_id :cityid,
					email:email,
					address:address,
					telephone:telephone,
					company :company,
					language_id :languageid,
					is_active:isactive,
					created_by:userid


					}
				 
                
            var query = mclient.query("insert into customers set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save customer.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{

            var query = mclient.query("select ID from customers where email =?", [email], function (err, rows) {
              
                  var passwrd = base64.encode(input.password);

            var newpassword =base64.encode(passwrd);
                  var customerid =rows[0].ID;
                  console.log("customerid"+customerid);

             var insertData ={
              FULL_NAME :firstname+" "+ lastname, 
               TYPE :0,
               COMPANY_ID:0,
               CUSTOMER_ID:customerid, 
               ROLE_ID:0, 
               EMAIL:email,
               PASSWORD:newpassword,
               IS_ACTIVE:1, 
               CREATED_BY:-1 
              
           } 
            var query = mclient.query(" insert into user_tbl set ?,created_date=now()",[insertData], function(err, rows){
                     
                     if(err)
                     {
                           console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save customer.'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                     }else{

                        var mailsuccesscallback =function(data){
                    
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save customer'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'cutomer saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            }); 
                                     };
                                    var username= firstname+" "+ lastname
                                     sendwelcomemail(username,input.password,email,mailsuccesscallback);

                                }
                             });
                       });
                }
                
              
                 });
            }else{

            	
               var query = mclient.query("	update customers set first_name =?,last_name =?,country_id =?,city_id =?,email=?,\
			address=?,telephone=?,company =?,language_id =?,is_active =?,updated_by=?,updated_date =now() where id =? ", 
			  [firstname,lastname,countryid,cityid,email,address,telephone,company,languageid,isactive,userid,customerid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save customer'
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
                                                            message: 'Failed to save customer'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'customer saved successful'
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

exports.getCustomerbyID = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var customerid =input.customerid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select  *,cn.NAME CNTRYNAME,ln.NAME LNGNAME,ct.NAME CITYNAME  from customers cu, country cn,language ln,city ct \
                where cu.COUNTRY_ID =cn.ID  and cu.LANGUAGE_ID =ln.ID and cu.CITY_ID =ct.ID and cu.id=?',[customerid], function(err, rows) {
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


exports.getallPromoCodesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select  *,DATE_FORMAT(FROM_DATE, "%Y-%m-%d")from_date_format,DATE_FORMAT(TO_DATE, "%Y-%m-%d")to_date_format from promo_code', function(err, rows) {
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

exports.getallPromoCodesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select  * from promo_code where now() between from_date and to_date', function(err, rows) {
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

exports.getallPromoCodesByID = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var promoid =input.promoid;
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select  * ,DATE_FORMAT(FROM_DATE, "%Y-%m-%d")from_date_format,DATE_FORMAT(TO_DATE, "%Y-%m-%d")to_date_format from promo_code where id =?',[promoid] ,function(err, rows) {
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


exports.addorupdatepromocode= function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var promoid =input.promoid;
    var promocode =input.promocode;
    var type =input.promotype;
    var amount =input.amount;
    var discountype =input.discounttype;
    var fromdate =input.fromdate;
    var userid =input.userid;
    var todate =input.todate;
    var companyid =input.companyid;

  
   
    
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save promo code'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
           if(promoid==0)
           {
              
                 var inputData ={
                    promo_code :promocode,
                    discount_amount :amount,
                    promo_type :type,
                    discount_type :discountype,
                    from_date:fromdate,
                    to_date:todate,
                    created_by:userid,
                    company_id :companyid,
                 

                    }
                 
                
            var query = mclient.query("insert into promo_code set ?,created_date=now()", inputData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save customer.'
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
                                                            message: 'Failed to save promo code'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'promo code saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                }
                
              
                 });
            }else{

                
             var query = mclient.query("update promo_code set discount_amount =?,promo_type=?,discount_type=?,from_date=?,to_date=?,company_id=?,updated_by=?,updated_date=now() where id =?",  [amount,type,discountype,fromdate,todate,companyid,userid,promoid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save promo code'
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
                                                            message: 'Failed to save promo code'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'promo code saved successful'
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


exports.getCustomerID = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var customerid =input.customerid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select *,(select cn.NAME  from customers cu ,country cn  where \
            cu.COUNTRY_ID =cn.ID and cu.id =?)CNNAME,(select lg.NAME  from customers cu1 ,language lg  where \
            cu1.LANGUAGE_ID =lg.ID and cu1.id =?)LNGNAME, \
            (select ct.NAME  from customers cu2 ,city ct  where \
            cu2.CITY_ID =ct.ID and cu2.id =?)CITYNAME \
            from customers where id =?  ',[customerid,customerid,customerid,customerid], function(err, rows) {
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

function sendwelcomemail(username,password,email,mailsuccesscallback)
{

mail.sendNewUser(username,email,password);

              var data = {
                                 success: "SUCCESS"
                            
                               }; 
                mailsuccesscallback(data);

}


exports.forgotpassword = function(req, res) {
    var base64 = require('base-64');

    var input = JSON.parse(JSON.stringify(req.body));
    var emailid =input.emailid;
 console.log("forgot");
mysqlLib.acquire(function(err, mclient) {
 var querystring  =" select full_name,password from user_tbl where email =? ";

 mclient.query(querystring, [emailid], function(err, rows) {

     if (err) {
                console.log("Err 87"+err);
                var data = {
                                 success: '-1'
                            
                               }; 
                mysqlLib.release(mclient);
                res.end(JSON.stringify(data));
            }else{
           
             if(rows.length==0)
             {
                var data = {
                                 success: '-2'
                            
                               }; 
                mysqlLib.release(mclient);
                res.end(JSON.stringify(data));

             }else{
                console.log("inside else"+rows[0].full_name);
            
               var username =rows[0].full_name;
               var password =base64.decode(rows[0].password);
               var newpassword =base64.decode(password);

              mail.sendPasswordReset(username, newpassword,emailid);

              var data = {
                                 success: '1'
                            
                               }; 
                mysqlLib.release(mclient);
                res.end(JSON.stringify(data));
  

             }


            }

   
  });
});
 
};
