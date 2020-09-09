var mysqlLib = require("./mysqlLib").pool;

var cron = require('node-cron');
var mail = require('../nodeMailerWithTemp');
var request = require('request');
var https = require('https');
 


exports.clearblockedseats = function(req,res) {
   console.log("clear blocked ");
   try{
   
    mysqlLib.acquire(function(err, mclient) {
     
      mclient.beginTransaction(function (err) {
        //SELECT TIMESTAMPDIFF(MINUTE, booking_date, now())  from vehicle_seats_booking

        var query = mclient.query('delete from vehicle_seats_booking where TIMESTAMPDIFF(MINUTE, created_date, now()) >=4 and  booking_id is null', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to clear blocked seats'
                                                        };
                                                        
                                                        mysqlLib.release(mclient);
                                                        return;
                                                    });
            } else {

                console.log("rows"+rows.length);

                      mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to clear blocked seats'
                                                        };
                                                         
                                                        mysqlLib.release(mclient);
                                                        return;
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Booking Success'
                                                   
                                                };
                                                console.log("END--");
                                                 
                                               mysqlLib.release(mclient);
                                               return;

                                            });


            }
        });

       
       });

    });
 }catch(err)
 {
    console.log("Error in clearblockedseats"+err);
 }

};



exports.updateexpiredorrideclosedtickets = function() {
   console.log("Update ticket  ");
   try{
    mysqlLib.acquire(function(err, mclient) {

        mclient.on('error', function(err) {      
              //res.json({"code" : 100, "status" : "Error in connection database"});
            console.log("err"+err);     
        });
     
      mclient.beginTransaction(function (err) {

        var query = mclient.query("update bookings set BOOKING_STATUS ='CLOSED',COMMENTS='Status updated by Job' WHERE BOOKING_ID in (select distinct BOOKING_ID from tickets where travel_datetime < now())", function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to clear blocked seats'
                                                        };
                                                       // mclient.release();
                                                        mysqlLib.release(mclient);
                                                        return;
                                                       // res.end(JSON.stringify(data));
                                                    });
            } else {


mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to clear blocked seats'
                                                        };
                                                        mclient.release();
                                                        mysqlLib.release(mclient);
                                                        return;
                                                        //res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'booking updated'
                                                   
                                                };
                                               // mclient.release();
                                               console.log("END TASK2");    
                                                mysqlLib.release(mclient);
                                                return;
                                               // res.end(JSON.stringify(data));

                                            });

                       
            }
        });

       
       });

    });
 }catch(err)
 {
    console.log("updateexpiredorrideclosedtickets"+err);
 }

};


exports.updatebookingforexpiry = function() {
   console.log("Update ticket  ");
   try {
    mysqlLib.acquire(function(err, mclient) {
     
      mclient.beginTransaction(function (err) {

        var query = mclient.query("select * from bookings where booking_status ='PENDING' and TIMESTAMPDIFF(MINUTE, booking_date, now()) >=120", function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to clear blocked seats'
                                                        };
                                                        //mclient.release();
                                                        mysqlLib.release(mclient);
                                                        return;
                                                       // res.end(JSON.stringify(data));
                                                    });
            } else {
                if(rows.length >0){

        var  booking_id =rows[0].BOOKING_ID;
        var email =rows[0].EMAIL_ID;
        var customername= rows[0].NAME;


        var querystring =" update bookings set booking_status ='EXPIRED',BOOKING_EXPIRY=now() where booking_id=? ";
     
       var querys = mclient.query(querystring,[booking_id], function(err, rows) {

        mail.sendBookingExpirymail(booking_id,customername,email);

      
mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to clear blocked seats'
                                                        };
                                                       
                                                        mysqlLib.release(mclient);
                                                        return;
                                                        //res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'booking updated'
                                                   
                                                };
                                                
                                                mysqlLib.release(mclient);
                                                return;
                                               // res.end(JSON.stringify(data));

                                            });


              });

          }else{
            console.log("releasing connection Task 3");
             mysqlLib.release(mclient);
             return;
          }
                       
            }
        });

       
       });

    });
 }catch(err)
 {
    console.log("err");
 }

};