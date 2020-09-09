var mysqlLib = require("./mysqlLib").pool;
var mail = require('../nodeMailerWithTemp');
var request = require('request');
var https = require('https');


exports.createbooking = function(req, res) {

   console.log("CREATEBOOKING START");
   mysqlLib.acquire(function(err, mclient) {
 
           mclient.beginTransaction(function (err) {


            var bookingcallback =function(data)
            {

              if(data.isSuccess=="SUCCESS")
              {
                 var bookingid =data.bookingid;
                 var ticketcallback =function(data)
                 {
                   
                  if(data.isSuccess=="SUCCESS")
                  {
                  
                    var paymentcallback =function(data)
                    {

                      if(data.isSuccess=="SUCCESS")
                      {
                       var transcallback = function(data)
                       {

                        if(data.isSuccess=="SUCCESS")
                        {

                          var seatupdatecallback =function(data)
                          {
                        reason =data.reason;
                          if(data.isSuccess=="SUCCESS")
                        { 

                         var guestcheckoutcallback=function(data)
                            { 

                              if(data.isSuccess =="SUCCESS") {

                             mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save Booking',
                                                            reason:reason
                                                        };
														console.log("CREATEBOOKING CONNECTION RELEASE");
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                } else{
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Booking Success',
                                                    bookingid:bookingid,
                                                    reason:reason
                                                };
                                                console.log("CREATEBOOKING CONNECTION RELEASE");
                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));
												}

                                            });
                                       }else{
                                         mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save Booking',
                                                            reason:reason
                                                        };
														console.log("CREATEBOOKING CONNECTION RELEASE");
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });


                                       }

                                       };

                                       saveguestcheckoutdetails(bookingid,req,res,mclient,guestcheckoutcallback);



                                  }else{

                                     mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to create booking',
                            reason:reason
                        };
						console.log("CREATEBOOKING CONNECTION RELEASE");
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                          });


                                  }




                               };
                        
                        updateseatbookingdetails(bookingid,req,res,mclient,seatupdatecallback);


                        }else{

                           mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to create booking'
                        };
						console.log("CREATEBOOKING CONNECTION RELEASE");
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                          });

                        }


                       };

                        insertintotransaction(bookingid,req,res,mclient,transcallback);


                      }else{

                         mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to create booking'
                        };
						console.log("CREATEBOOKING CONNECTION RELEASE");
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });



                      }


                    };

                    insertintopayment(bookingid,req,res,mclient,paymentcallback);


                  }else{

                     mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to create booking'
                        };
						console.log("CREATEBOOKING CONNECTION RELEASE");
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });


                  }


                 };

                 insertintoticket(bookingid,req,res,mclient,ticketcallback);

              }else{

                 mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to create booking'
                        };
						console.log("CREATEBOOKING CONNECTION RELEASE");
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });

              }


            };

            insertintobooking(req,res,mclient,bookingcallback);

 

           });

   });


  }

  function   updateseatbookingdetails(bookingid,req,res,mclient,seatupdatecallback)
  {
       var input = JSON.parse(JSON.stringify(req.body));
       var cutomerid= input.customerid;
       if(cutomerid==0)
       {
        cutomerid =input.getcheckoutid;
       }
        console.log("cutomerid"+cutomerid);
         var queryp ="update vehicle_seats_booking set BOOKING_ID ='"+bookingid+"' where CREATED_BY ='"+cutomerid+"' and BOOKING_ID is null"
         
          var sequ = mclient.query(queryp, function (err, rows) {
            
              if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE',
                         reason:'-1'
                           }
                     seatupdatecallback(data);       
               }else{

                 console.log("seatupdate"+JSON.stringify(rows))
                 if(rows.affectedRows ==1 || rows.affectedRows ==2){
                 var data = {
                         isSuccess: 'SUCCESS',
                         reason:'1'
                           }
                     seatupdatecallback(data); 
                   }else{
                     var data = {
                         isSuccess: 'FAILURE',
                          reason : '-2'
                           }
                     seatupdatecallback(data); 

                   }
               }

           });

  }

  function insertintobooking(req,res,mclient,bookingcallback)
  {
    var input = JSON.parse(JSON.stringify(req.body));

    var fname =input.fname;
    var lname =input.lname;
    var address=input.address;
    var dob =input.dob;
    var  emailid =input.emailid;
    var  gender=input.gender;
    var  code =input.code ;
    var  phone =input.phone;
    var typeofdoc =input.typeofdoc;
    var docnumber= input.docnumber;
    var  fromcityid =input.fromcityid ;
    var tocityid =input.tocityid ;
    var cutomerid= input.customerid;

    var paymenttype =input.paymenttype;
    var bookingstatus ="CONFIRMED";
    var paymentstatus ="PAID";
    var cancontinue =true;
    if(paymenttype=="ONLINE")
    {
     bookingstatus ="CONFIRMED";
     paymentstatus="PAID";
     

      var requestdata =
      {"CCLW" :"9AF88E9DAC96D23E928DFSGSDGDSF347CEE2D780BBF6E5993CA768",
      "txType":"SALE",
      "CMTN":input.totalamount,
      "CDSC":"Test processing by server to server API",
      "CCNum":input.cardnumber,
      "ExpMonth":input.expirymonth,
      "ExpYear":input.expiryyear,
      "CVV2":input.cvv,
      "Name":input.cardholdername,
      "LastName":input.cardholderlastname,
      "Email":input.cardholderemail,
      "Address":input.cardholderaddress,
      "Tel":input.cardholderhone,
      "SecretHash":"24FE446E62DCEF11BE4D0A275586FBAD6BB5791AF964241160DA2AFA8A42567303BDADBEA069440357515E94EAAB827DEECA12E10464D95A28A4026EAD02A774"
      }
       

        request.post({ 
        headers: {'content-type':'application/json'},
        url: "https://dev.paguelofacil.com/rest/ccprocessing",
        body:requestdata,
        json: true
          }, function(error, response, body) { 
          console.log(response.statusCode);

          if (!error && response.statusCode == 200) { 
          res.set('Access-Control-Allow-Origin', '*');
          

     var sequ = mclient.query("SELECT booking_seq('sq_my_sequence') as booking_next_sequence ", function (err, rows) {
 
           if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     bookingcallback(data);       
               }
               else{
                var bookingid ="BI-BL-"+rows[0].booking_next_sequence;
                var uname =fname+" "+lname;

    var insertData ={

       BOOKING_ID :bookingid, 
       CUSTOMER_ID:cutomerid, 
       BOOKING_EXPIRY:null, 
       FROM_CITY:fromcityid, 
       TO_CITY:tocityid, 
       NAME :fname, 
       EMAIL_ID :emailid, 
       DOB :dob, 
       ADDRESS :address, 
       COUNTRY_CODE :code, 
       PHONE:phone, 
       DOCUMENT :typeofdoc,
       DOCUMENT_NUMBER :docnumber, 
       BOOKING_STATUS :bookingstatus, 
       PAYMENT_STATUS :paymentstatus, 
       GENDER:gender
    }

    var query = mclient.query(" insert into bookings set ?,BOOKING_DATE=now()",[insertData], function(err, rows){
          
           if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     bookingcallback(data);       
               }else{

                  var data = {
                         isSuccess: 'SUCCESS',
                         bookingid:bookingid
                           }
                     bookingcallback(data);


               }


         });


  }

  });
         

          } else{
          res.set('Access-Control-Allow-Origin', '*');
          var data = {
                         isSuccess: 'FAILURE'
                           }
                     bookingcallback(data);
          }
          

          }); 


    }
    else{
      cancontinue =true;
      bookingstatus ="PENDING";
      paymentstatus="PENDING";

    

     var sequ = mclient.query("SELECT booking_seq('sq_my_sequence') as booking_next_sequence ", function (err, rows) {
 
           if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     bookingcallback(data);       
               }
               else{
                var bookingid ="BI-BL-"+rows[0].booking_next_sequence;
                var uname =fname+" "+lname;

    var insertData ={

       BOOKING_ID :bookingid, 
       CUSTOMER_ID:cutomerid, 
       BOOKING_EXPIRY:null, 
       FROM_CITY:fromcityid, 
       TO_CITY:tocityid, 
       NAME :fname, 
       EMAIL_ID :emailid, 
       DOB :dob, 
       ADDRESS :address, 
       COUNTRY_CODE :code, 
       PHONE:phone, 
       DOCUMENT :typeofdoc,
       DOCUMENT_NUMBER :docnumber, 
       BOOKING_STATUS :bookingstatus, 
       PAYMENT_STATUS :paymentstatus, 
       GENDER:gender
    }

    var query = mclient.query(" insert into bookings set ?,BOOKING_DATE=now()",[insertData], function(err, rows){
          
           if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     bookingcallback(data);       
               }else{

                  var data = {
                         isSuccess: 'SUCCESS',
                         bookingid:bookingid
                           }
                     bookingcallback(data);


               }


         });


  }

  });

 }





  }

  function  insertintoticket(bookingid,req,res,mclient,ticketcallback)
  {
     
      var input = JSON.parse(JSON.stringify(req.body));
      var ticketarray =input.ticket; 

               

              var counter =1;
               var indx=0;
                var counter = 0;
                        var totalrecords =ticketarray.length;
            
              var looparray =function(indx){
              
                  console.log("ticketarray[indx].departuretime"+ticketarray[indx].departuretime);
       
              var departuretime = ticketarray[indx].departuretime;
              var arrivaltime = ticketarray[indx].arrivaltime;
              var depdate = ticketarray[indx].depdate;
              var arrdate = ticketarray[indx].arrdate;
              var vehid = ticketarray[indx].vehid;
              var companyid =ticketarray[indx].companyid;
              var adult = ticketarray[indx].adult;
              var child = ticketarray[indx].child;
              var retired = ticketarray[indx].retired;
              var adultticketprice = ticketarray[indx].adultticketprice;
              var childticketprice = ticketarray[indx].childticketprice;
              var retiredticketprice = ticketarray[indx].retiredticketprice; 
              var promocode =ticketarray[indx].promocode;
              var promoamount =ticketarray[indx].promoamount;
              var charges =ticketarray[indx].charges;
              var taxes =ticketarray[indx].taxes;
              var seats =ticketarray[indx].seats;
              var pickup =ticketarray[indx].pickup;
              var drop =ticketarray[indx].drop;

               if(seats==null)
              {
                seats=0;
              }
          var sequ = mclient.query("SELECT ticket_seq('sq_my_sequence') as ticket_next_sequence ", function (err, rows) {
                  
                if (err) {
                console.log(err);
                     var resdata = {
                         isSuccess: 'FAILURE'
                           }
                     ticketcallback(resdata);       
               }
                else{
             
                var seq ="TKT-BO-"+rows[0].ticket_next_sequence;

     

      var  traveldate ="";

         if(indx==0)
         {
              traveldate =input.travelfromdate;
         }else{
          traveldate =input.traveltodate;
         }

         var totalseats =parseInt(adult)+parseInt(child)+parseInt(retired);
         var totalprice =(parseFloat(adultticketprice)+parseFloat(childticketprice)+parseFloat(retiredticketprice)).toFixed(2);
       
       var traveldatetime =traveldate+" "+departuretime;
                  
        var insertData ={ 
        TICKET_ID :seq, 
        BOOKING_ID :bookingid, 
        DEPARTURE_TIME :departuretime, 
        ARRIVAL_TIME :arrivaltime, 
        DEPARTURE_DATE :depdate, 
        ARRIVAL_DATE :arrdate, 
        ADULT :adult, 
        ADULT_TICKET_PRICE :adultticketprice, 
        CHILD :child, 
        CHILD_TICKET_PRICE :childticketprice, 
        RETIRED :retired,
        RETIRED_TICKET_PRICE :retiredticketprice, 
        COMPANY_ID:companyid, 
        VEHICLE_ID:vehid,
        TRAVEL_DATE :traveldate,
        TOTAL_TICKETS:totalseats,
        TOTAL_PRICE :totalprice,
        PROMO_CODE :promocode,
        PROMO_AMOUNT :promoamount,
        CHARGES:charges,
        TAXES:taxes,
        SEAT_NUMBER :seats,
        TRAVEL_DATETIME :traveldatetime,
        PICKUP_POINT:pickup,
        DROP_POINT :drop
        }

                var query = mclient.query(" insert into tickets set ?",[insertData], function(err, rows){
          
           if (err) {
                console.log(err);
                     var resdata = {
                         isSuccess: 'FAILURE'
                           }
                     ticketcallback(resdata);       
               }else{
                var currendate = new Date();
               var  cmonth = '' + (currendate.getMonth() + 1);
               
         var query = mclient.query(" select * from top_routes_booking where start_point =?and end_point=? and created_month=? ",
              [input.fromcityid,input.tocityid,cmonth], function(err, rows){
               
                if(err)
                {
                   console.log("error at 387"+err);
                     var resdata = {
                         isSuccess: 'FAILURE'
                           }
                     ticketcallback(resdata);

                }else{
               console.log("2"+rows.length);
                  if(rows.length==0){
                   var rotData ={
                    start_point :input.fromcityid ,
                    end_point :input.tocityid ,
                    total_tickets:totalseats,
                    created_month:cmonth
                        }


                         var query = mclient.query(" insert into top_routes_booking set ?",[rotData], function(err, rows){
              if(err)
                {
                   console.log(err);
                     var resdata = {
                         isSuccess: 'FAILURE'
                           }
                     ticketcallback(resdata);

                }else{
                   var counter = totalrecords-1;

                if (indx == counter)
                {

                  var resdata = {
                         isSuccess: 'SUCCESS'
                           }
                     ticketcallback(resdata);

                 }else{
                   indx=indx+1;
                  looparray(indx);

                 }


                }

                        });

                  }else{

                    var tickets =rows[0].TOTAL_TICKETS;
                    var newtickets =parseInt(tickets)+parseInt(totalseats);
                   var query = mclient.query(" update top_routes_booking set  total_tickets =? where start_point =?and end_point=? and created_month=? ",[newtickets,input.fromcityid,input.tocityid,cmonth ], function(err, rows){
                        if(err)
                {
                   console.log(err);
                     var resdata = {
                         isSuccess: 'FAILURE'
                           }
                     ticketcallback(resdata);

                }else{

                   var counter = totalrecords-1;

                if (indx == counter)
                {

                  var resdata = {
                         isSuccess: 'SUCCESS'
                           }
                     ticketcallback(resdata);

                 }else{
                   indx=indx+1;
                  looparray(indx);

                 }


                }
                     


                   });   


                  }                

                

               



             
                  }
             });
               
               //else ends hear
               }


         });

                 
              
                }
            

              });

          //forloop ends hear
               }

                 looparray(indx);
    


  }

  function insertintopayment(bookingid,req,res,mclient,paymentcallback)
  {

     var input = JSON.parse(JSON.stringify(req.body));

     var insertData ={
              BOOKING_ID :bookingid, 
              TRANSACTION_AMOUNT :input.totalamount, 
              TOTAL_PRICE :input.totalprice, 
              TOTAL_SEATS :input.totalseats, 
              TOTAL_CHARGES:input.totalcharges,
              TOTAL_TAX :input.totaltaxes,
              TOTAL_DISCOUNT:input.totaldiscount,
              PAYMENT_TYPE :input.paymenttype
         }

         var query = mclient.query(" insert into payment_details set ?",[insertData], function(err, rows){
         
             
             if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     paymentcallback(data);       
               }else{

                var counter =1;

                  var data = {
                         isSuccess: 'SUCCESS'
                           }
                     paymentcallback(data);




               }

         }); 




  }

  function insertintotransaction(bookingid,req,res,mclient,transcallback)
  {
      
      var input = JSON.parse(JSON.stringify(req.body));

      var insertData ={
        BOOKING_ID :bookingid, 
        TRANSACTION_AMOUNT :input.transactionamount, 
        STATUS :input.transactionsatus, 
        TRANSACTION_DATE :input.transdate, 
        TRANSACTION_TIME :input.transtime, 
        TRANSACTION_NUMBER :input.transnumber, 
        NAME :input.transname, 
        EMAIL_ID:input.transemail

      }

         var query = mclient.query(" insert into transactions set ?",[insertData], function(err, rows){
              
                  if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     transcallback(data);       
               }else{

                 var data = {
                         isSuccess: 'SUCCESS'
                           }
                     transcallback(data); 

               }


              });


  }

  function  saveguestcheckoutdetails(bookingid,req,res,mclient,guestcheckoutcallback)
  {

     var input = JSON.parse(JSON.stringify(req.body));

     var guestcheckoutid =input.getcheckoutid;
     var customerid =input.custid;

     if(guestcheckoutid =="N")
     {
      var data = {
                         isSuccess: 'SUCCESS'
                           }
                     guestcheckoutcallback(data); 

              

     }else{

      if(customerid =="0")
      {



         var query = mclient.query(" update guest_checkout set BOOKING_ID=? where checkout_id =?",[BOOKING_ID,guestcheckoutid], function(err, rows){
              
                  if (err) {
                console.log(err);
                     var data = {
                         isSuccess: 'FAILURE'
                           }
                     guestcheckoutcallback(data);       
               }else{

                 var data = {
                         isSuccess: 'SUCCESS'
                           }
                     guestcheckoutcallback(data); 

               }


              });

         }else{

           var query = mclient.query(" delete from guest_checkout where checkout_id=? and booking_id is null",[guestcheckoutid], function(err, rows){
           
            var data = {
                         isSuccess: 'SUCCESS'
                           }
                     guestcheckoutcallback(data); 
         });
       }

   }

  }

  exports.getbookingdetails = function(req, res) {


    var input = JSON.parse(JSON.stringify(req.body));

    var bookingid =input.bookingid;
    var customerid =input.customerid;
    
    console.log("customerid"+customerid);
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query(' select *,bk.NAME CUSTOMERNAME,bk.ADDRESS BOOKINGADDRESS, DATE_FORMAT(bk.BOOKING_DATE , "%Y-%m-%d")BKDATE, ct.NAME FROMCITYNAME,ct1.NAME TOCITYNAME from bookings bk left JOIN customers cs on bk.CUSTOMER_ID =cs.ID, city ct ,city ct1 \
                 where bk.FROM_CITY =ct.ID and bk.TO_CITY=ct1.ID and bk.booking_id =? ',[bookingid], function(err, rows) {
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

exports.getticketdetails = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var bookingid =input.bookingid;
    var customerid =input.customerid;
    
    mysqlLib.acquire(function(err, mclient) {



  var query = mclient.query(' SELECT *,DATE_FORMAT(tk.TRAVEL_DATE , "%Y-%m-%d")TRAVELDATE, \
  vh.VEH_REG_NUMBER, (select  vpp.PICKUP_POINT_NAME from vehicle_pickup_points  vpp where \
  tk.PICKUP_POINT =vpp.ID and vh.ID =vpp.VEH_ID)PICKUP_POINT_NAME,(select  vpp.DROP_POINT_NAME \
  from vehicle_drop_points  vpp where tk.DROP_POINT =vpp.ID and vh.ID =vpp.VEH_ID)DROP_POINT_NAME \
  FROM tickets tk,company cp,bookings  bk ,vehicle vh \
  where bk.BOOKING_ID =tk.BOOKING_ID and cp.ID =tk.COMPANY_ID  and tk.VEHICLE_ID =vh.ID and bk.BOOKING_ID=?',[bookingid], function(err, rows) {
  


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

exports.getpaymentdetails = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var bookingid =input.bookingid;
    var customerid =input.customerid;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query(' SELECT * FROM payment_details tk,bookings  bk where bk.BOOKING_ID =tk.BOOKING_ID and bk.BOOKING_ID=?',[bookingid], function(err, rows) {
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

exports.gettaxdetails = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var bookingid =input.bookingid;
    var customerid =input.customerid;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query(' SELECT * FROM tax_payment tk,bookings  bk where bk.BOOKING_ID =tk.BOOKING_ID and bk.BOOKING_ID=? ',[bookingid], function(err, rows) {
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


exports.blockseats =function(req,res) {
   var input = JSON.parse(JSON.stringify(req.body));
   console.log("blockseats");
  var vehid =input.vehid;
  var selectfromloc =input.fromloc;
  var selecttoloc =input.toloc;
  var bookedseats =input.seats;
  var  traveldate =input.traveldate;
  var traveltodate =input.traveltodate;
  var vehid1 =input.vehid1;
  var bookedseats1 =input.seats1;
  var customerid =input.customerid;
  var forwardseats=input.forwardseats;
  var forwardpositions=input.forwardpositions;
  var backwardseats=input.backwardseats;
  var backwardpositions=input.backwardpositions;
  var topforwardseats=input.topforwardseats;
  var topforwardpositions=input.topforwardpositions;
  var topbackwardseats=input.topbackwardseats;
  var topbackwardpositions=input.topbackwardpositions;

     mysqlLib.acquire(function(err, mclient) {

       mclient.beginTransaction(function (err) {

     var querystringdel ="delete from vehicle_seats_booking where veh_id =? and from_loc =? and to_loc = ? and created_by ='"+customerid+"' and booking_id is null" ;    
    var query1 = mclient.query(querystringdel, [vehid,selectfromloc,selecttoloc], function(err, rows) {
	 
	    if(err)
		{
		console.log(err);
		 mclient.rollback(function () {
                        var resdata = {
                            success: '-1',
                            message: 'Failed to block seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 994 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });
		
		}else {
       

    var querystring = " select * from vehicle_seats_booking where veh_id =? and booking_date =?";


    var query = mclient.query(querystring, [vehid,traveldate], function(err, rows) {
        if (err) {
          console.log("err"+err);
             mclient.rollback(function () {
                        var resdata = {
                            success: '-1',
                            message: 'Failed to block seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1014 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });

        } else {

            if (rows.length == 0) {
                var querystring = "select * from vehicle_seats_availability where veh_id=? and from_loc =? and to_loc =?";

                var query = mclient.query(querystring, [vehid, selectfromloc, selecttoloc], function(err, rows) {

                    if (err) {
                      console.log("err585"+err);
                        mclient.rollback(function () {
                        var resdata = {
                            success: '-1',
                            message: 'Failed to block seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1033 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });


                    } else {

                        if (rows.length > 0) {

                         var canbook = rows[0].CAN_BOOK_SEATS;
                           

                         var totalavailableseats =canbook;

                          if(totalavailableseats<bookedseats)
                          {
                              mclient.rollback(function () {
                        var resdata = {
                            success: '-3',
                            message: 'Seats selected is greater than available seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1055 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });  


                          }else{
                        
                       var insertdata ={
                            VEH_ID :vehid,
                            FROM_LOC :selectfromloc,
                            TO_LOC :selecttoloc,
                            SEATS :bookedseats,
                            BOOKING_DATE:traveldate,
                            CREATED_BY:customerid,
                            SEAT_SELECTED:forwardseats,
                            SEAT_POSITION:forwardpositions,
                            TOP_SEAT_SELECTED :topforwardseats,
                            TOP_SEAT_POSITION:topforwardpositions

                            } 

                               var query = mclient.query(" insert into vehicle_seats_booking  set ?,created_date=now() ", [insertdata], function(err, rows) {

                                 if (err) {
                                  console.log("err629"+err);
                        mclient.rollback(function () {
                        var resdata = {
                            success: '-1',
                            message: 'Failed to block seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1085 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });


                    }else{
                      if(traveltodate =="N"){
                        // one way trip
                           mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: '-1',
                                                            message: 'Failed to block seats'
                                                        };
                                                        mysqlLib.release(mclient);
														console.log("blockseats 1102 RELEASE CONNECTION");
                                                        res.end(JSON.stringify(data));
                                                    });
                                                } else {
                                                var data = {
                                                    success: '4',
                                                    message: 'Seat Blocked'
                                                };

                                                mysqlLib.release(mclient);
												console.log("blockseats 1113 RELEASE CONNECTION");
                                                res.end(JSON.stringify(data));
												}

                                            }); 

                                  }else{
                                  //return trip
                                    var successcallback =function(retdata)
                                    {
                                      if(retdata.isSuccess=="SUCCESS")
                                      {

                                      mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: '-1',
                                                            message: 'Failed to block seats'
                                                        };
                                                        mysqlLib.release(mclient);
														console.log("blockseats RELEASE CONNECTION");
                                                        res.end(JSON.stringify(data));
                                                    });
                                                } else{
                                                var data = {
                                                    success: '4',
                                                    message: 'Seat Blocked'
                                                };

                                                mysqlLib.release(mclient);
												console.log("blockseats1145  RELEASE CONNECTION");
                                                res.end(JSON.stringify(data));
												}

                                            });   


                                      }else{
                                      mclient.rollback(function () {
                                      var resdata = {
                                      success: '-1',
                                      message: 'Failed to block seats'
                                      };
                                      mysqlLib.release(mclient);
									  console.log("blockseats 1159 RELEASE CONNECTION");
                                      res.end(JSON.stringify(resdata));
                                      });

                                      }

                                    };
                                    blockseatsreturn(req,res,mclient,successcallback);

                                  }

                              }                              
 


                              });


                          }



                        }else{

                         mclient.rollback(function () {
                        var resdata = {
                            success: '-2',
                            message: 'No Seats Available'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1189 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });   
                        }



                    }


                });


            } else {

                //already 1 seat booked
                var seatstominus = 0;
                var isbetweencheck = false;
                var indx=0;
                var counter =0;
                var totalrecords =rows.length;

               var looparray =function(indx){
                    var row = rows[indx];
                    var fromloc = row.FROM_LOC;
                    var toloc = row.TO_LOC;
                    var seats = row.SEATS

                    if (isBetween(selectfromloc, fromloc, toloc)) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(selecttoloc, fromloc, toloc) && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(fromloc, selecttoloc, toloc) && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(toloc, fromloc, selecttoloc) && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (selectfromloc == fromloc && selecttoloc == toloc && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    }
                       var counter = totalrecords-1;

                    if (indx == counter) {

                        var querystring = "select * from vehicle_seats_availability where veh_id=? and from_loc =? and to_loc =?";

                        var query = mclient.query(querystring, [vehid, selectfromloc, selecttoloc], function(err, rows) {

                            if (err) {
                             mclient.rollback(function () {
                        var resdata = {
                            success: '-1',
                            message: 'Failed to block seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1274 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });


                            } else {

                                if (rows.length > 0) {

                                    var canbook = rows[0].CAN_BOOK_SEATS;

                                    var totalavailableseats =canbook-seatstominus;

                                     if(totalavailableseats<bookedseats)
                          {
                              mclient.rollback(function () {
                        var resdata = {
                            success: '-3',
                            message: totalavailableseats
                            //'Seats selected is greater than available seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1296  RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });  


                          }
                          else if(totalavailableseats =="0" || totalavailableseats== "-1")
                          {
                             mclient.rollback(function () {
                        var resdata = {
                            success: '-5',
                            message: totalavailableseats
                            //'No Seats available'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1311  RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          }); 

                          }

                          else{
                        
                       var insertdata ={
                            VEH_ID :vehid,
                            FROM_LOC :selectfromloc,
                            TO_LOC :selecttoloc,
                            SEATS :bookedseats,
                            BOOKING_DATE:traveldate,
                            CREATED_BY:customerid,
                            SEAT_SELECTED:forwardseats,
                            SEAT_POSITION:forwardpositions,
                            TOP_SEAT_SELECTED :topforwardseats,
                            TOP_SEAT_POSITION:topforwardpositions
                            } 

                               var query = mclient.query(" insert into vehicle_seats_booking  set ?,created_date=now() ", [insertdata], function(err, rows) {

                                 if (err) {
                        mclient.rollback(function () {
                        var resdata = {
                            success: '-1',
                            message: 'Failed to block seats'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1341 RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });


                    }else{
                          if(traveltodate =="N"){
                           mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: '-1',
                                                            message: 'Failed to block seats'
                                                        };
														console.log("blockseats  RELEASE 1356 CONNECTION");
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: '4',
                                                    message: 'Seat Blocked'
                                                };
                                                 console.log("blockseats 1365  RELEASE CONNECTION");
                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            }); 
                                 }else{

                                  var successcallback =function(retdata)
                                    {
                                      console.log("JSON.stringify(data)"+JSON.stringify(retdata));
                                      if(retdata.isSuccess=="SUCCESS")
                                      {

                                      mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: retdata.success,
                                                            message: 'Failed to block seats'
                                                        };
														console.log("blockseats  RELEASE 1386 CONNECTION");
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }else{
                                                var data = {
                                                    success: retdata.success,
                                                    message: 'Seat Blocked'
                                                };

                                                mysqlLib.release(mclient);
												console.log("blockseats 1397 RELEASE CONNECTION");
                                                res.end(JSON.stringify(data));
												}

                                            });   


                                      }else{
                                      mclient.rollback(function () {
                                      var resdata = {
                                      success: '-1',
                                      message: 'Failed to block seats'
                                      };
                                      mysqlLib.release(mclient);
									  console.log("blockseats 1411 RELEASE CONNECTION");
                                      res.end(JSON.stringify(resdata));
                                      });

                                      }

                                    };
                                    blockseatsreturn(req,res,mclient,successcallback);

                                 }
                              }                              
 
                            });

                          }

                        }
                        else{

                         mclient.rollback(function () {
                        var resdata = {
                            success: '-2',
                            message: 'No Seats Available'
                        };
                        mysqlLib.release(mclient);
						console.log("blockseats 1436  RELEASE CONNECTION");
                        res.end(JSON.stringify(resdata));
                          });   
                        }
                    }
                      });


                    }else{
                       indx=indx+1;
                      looparray(indx);
                    }

                //for loop ends hear
                }
                 looparray(indx);
        

            }

        }


           });
		   
		   }
    });

    });

  });


}

function blockseatsreturn(req,res,mclient,successcallback)
{
 var input = JSON.parse(JSON.stringify(req.body));
   console.log("blockseats return");
  var vehid =input.vehid1;
  var selectfromloc =input.toloc;
  var selecttoloc =input.fromloc;
  var bookedseats =input.seats1;
  var  traveldate =input.traveltodate;
  var traveltodate =input.traveltodate;
  var backwardseats =input.backwardseats;
  var backwardpositions=input.backwardpositions;
  var topbackwardseats =input.topbackwardseats;
  var topbackwardpositions=input.topbackwardpositions;
  
  var customerid =input.customerid;
   var querystringdel ="delete from vehicle_seats_booking where veh_id =? and from_loc =? and to_loc = ? and created_by ='"+customerid+"' and booking_id is null" ;    
    var query1 = mclient.query(querystringdel, [vehid,selectfromloc,selecttoloc], function(err, rows) {
	
	  if(err)
	  {
	     var resdata ={
              isSuccess:"FAILURE",
              status :"-1"
            }

            successcallback(resdata);
	  
	  }else{
   
   
    var querystring = " select * from vehicle_seats_booking where veh_id =? and booking_date =?";


    var query = mclient.query(querystring, [vehid,traveldate], function(err, rows) {
        if (err) {
          console.log("err"+err);
            var resdata ={
              isSuccess:"FAILURE",
              status :"-1"
            }

            successcallback(resdata);

        } else {
          
              
            if (rows.length == 0) {
             
                var querystring = "select * from vehicle_seats_availability where veh_id=? and from_loc =? and to_loc =?";

                var query = mclient.query(querystring, [vehid, selectfromloc, selecttoloc], function(err, rows) {

                    if (err) {
                      console.log("err585"+err);
                        var resdata ={
                        isSuccess:"FAILURE",
                        status:"-1"
                        }
                        successcallback(resdata);


                    } else {
                        
                        if (rows.length > 0) {


                         var canbook = rows[0].CAN_BOOK_SEATS;
                           
                          
                         var totalavailableseats =canbook;
                         console.log("av"+totalavailableseats);

                          if(totalavailableseats<bookedseats)
                          {
                          
                            var resdata ={
                            isSuccess:"FAILURE",
                            success:"-3"
                            }
                            successcallback(resdata);

                          }else{
                        
                       var insertdata ={
                            VEH_ID :vehid,
                            FROM_LOC :selectfromloc,
                            TO_LOC :selecttoloc,
                            SEATS :bookedseats,
                            BOOKING_DATE:traveldate,
                            CREATED_BY:customerid,
                            SEAT_SELECTED:backwardseats,
                            SEAT_POSITION:backwardpositions,
                            TOP_SEAT_SELECTED:topbackwardseats,
                            TOP_SEAT_POSITION:topbackwardpositions
                            } 

                               var query = mclient.query(" insert into vehicle_seats_booking  set ?,created_date=now() ", [insertdata], function(err, rows) {

                                 if (err) {
                            var resdata ={
                            isSuccess:"FAILURE",
                            success:"-1"
                            }
                            successcallback(resdata);


                    }else{
                      
                     var resdata ={
                            isSuccess:"SUCCESS",
                            success:"4"
                            }
                            successcallback(resdata);

                      }                              
 


                              });


                          }



                        }else{

                         var resdata ={
                            isSuccess:"FAILURE",
                            success:"-2"
                            }
                            successcallback(resdata);

                         
                        }



                    }


                });


            } else {

                //already 1 seat booked
                var seatstominus = 0;
                var isbetweencheck = false;
                var indx =0;
                 var counter = 0;
                        var totalrecords =rows.length;

               var looparray =function(indx){
                    var row = rows[indx];
                    var fromloc = row.FROM_LOC;
                    var toloc = row.TO_LOC;
                    var seats = row.SEATS

                    if (isBetween(selectfromloc, fromloc, toloc)) {
                        seatstominus = +seats;
                        isbetweencheck = true;
                    } else if (isBetween(selecttoloc, fromloc, toloc) && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(fromloc, selecttoloc, toloc) && !isbetweencheck) {
                         if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(toloc, fromloc, selecttoloc) && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (selectfromloc == fromloc && selecttoloc == toloc && !isbetweencheck) {
                        if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    }

                      var counter = totalrecords-1;
                    if (indx == counter) {

                        var querystring = "select * from vehicle_seats_availability where veh_id=? and from_loc =? and to_loc =?";

                        var query = mclient.query(querystring, [vehid, selectfromloc, selecttoloc], function(err, rows) {

                            if (err) {
                              var resdata ={
                              isSuccess:"FAILURE",
                              success:"-1"
                              }
                              successcallback(resdata);

                            } else {

                                if (rows.length > 0) {

                                    var canbook = rows[0].CAN_BOOK_SEATS;

                                    var totalavailableseats =canbook-seatstominus;

                          if(totalavailableseats<bookedseats)
                          {
                              var resdata ={
                          isSuccess:"FAILURE",
                          success:"-3"
                          }
                          successcallback(resdata);

                          }

                           else if(totalavailableseats=="0" || totalavailableseats =="-1")
                          {
                              var resdata ={
                          isSuccess:"FAILURE",
                          success:"-5"
                          }
                          successcallback(resdata);


                          }
                          else{
                        
                       var insertdata ={
                            VEH_ID :vehid,
                            FROM_LOC :selectfromloc,
                            TO_LOC :selecttoloc,
                            SEATS :bookedseats,
                            BOOKING_DATE:traveldate,
                            CREATED_BY:customerid,
                            SEAT_SELECTED:backwardseats,
                            SEAT_POSITION:backwardpositions,
                            TOP_SEAT_SELECTED:topbackwardseats,
                            TOP_SEAT_POSITION:topbackwardpositions
                            } 

                               var query = mclient.query(" insert into vehicle_seats_booking  set ?,created_date=now() ", [insertdata], function(err, rows) {

                                 if (err) {
                         var resdata ={
                          isSuccess:"FAILURE",
                          success:"-1"
                          }
                          successcallback(resdata);


                    }else{
                          var resdata ={
                          isSuccess:"SUCCESS",
                          success :"4"
                          }
                          successcallback(resdata);
                               }                              
 
                          });

                        }
                      }else{
                        var resdata ={
                          isSuccess:"FAILURE",
                          success :"-2"
                          }
                          successcallback(resdata);

                      }
                   }
                });

                    }else{

                      indx=indx+1;
                      looparray(indx);
                    }

                 //loop arry ends hear
                }
                 looparray(indx);
             }
            }
       });
	   }
   });

}

function isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0
}


exports.getcustomerbookings = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    
    var customerid =input.customerid;
    var pageno =10 * (input.pageno - 1);
    var iscount =input.count;
    
    mysqlLib.acquire(function(err, mclient) {

      var  querystring =" SELECT tk.TICKET_ID,tk.BOOKING_ID,tk.DEPARTURE_TIME,tk.ARRIVAL_TIME,tk.DEPARTURE_DATE,tk.ARRIVAL_DATE, "
            +" DATE_FORMAT(tk.TRAVEL_DATE , '%Y-%m-%d')TRAVELDATE,tk.TOTAL_TICKETS,bk.BOOKING_STATUS,bk.NAME,bk.EMAIL_ID, "
            +" bk.COUNTRY_CODE,bk.PHONE,bk.DOCUMENT,bk.DOCUMENT_NUMBER,ct.NAME FROMCITY,ct1.NAME TOCITY,DATE_FORMAT(bk.BOOKING_DATE , '%Y-%m-%d')BOOKINGDATE "
            +" FROM tickets tk,company cp, city ct,city ct1, "
            +" bookings  bk where bk.BOOKING_ID =tk.BOOKING_ID and cp.ID =tk.COMPANY_ID " 
           +" and ct.ID =bk.FROM_CITY and ct1.ID =bk.TO_CITY "
           +" and bk.CUSTOMER_ID =? ";
        
        if(iscount=="N"){
          querystring = querystring + " order by 1 desc LIMIT " + pageno + ",10";   
        }

        var query = mclient.query(querystring,[customerid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                   mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                mysqlLib.release(mclient);
                  if(iscount=="N"){
                res.end(JSON.stringify(rows));
              }else{
                var resdata ={
                  count :rows.length
                }
                res.end(JSON.stringify(resdata));  
              }

            }
        });

    });

};

exports.validatepromocode = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));

   var promocode =input.promocode;
   var company =input.companyid;
   var customerid =input.customerid;

  mysqlLib.acquire(function(err, mclient) {

      var  querystring =" select DISCOUNT_AMOUNT,PROMO_CODE ,DISCOUNT_TYPE from promo_code "
             +" where (now() between from_date and to_date) and PROMO_CODE =? and COMPANY_ID =?" 
            +" and PROMO_CODE not in(select tk.PROMO_CODE from tickets tk,bookings bs where  "
            +"  tk.BOOKING_ID =bs.BOOKING_ID and bs.CUSTOMER_ID =? and tk.PROMO_CODE is not null) ";
        
      
        var query = mclient.query(querystring,[promocode,company,customerid], function(err, rows) {
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


exports.getvehicleseatmapbookings = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));

   var vehid =input.vehid;
   var fromloc =input.fromloc;
   var toloc =input.toloc;
   var traveldate =input.traveldate;
  

  mysqlLib.acquire(function(err, mclient) {

      var  querystring =" select SEAT_POSITION,TOP_SEAT_POSITION from vehicle_seats_booking where veh_id =? and from_loc =? and to_loc =? \
                    and booking_date =?";
        
      console.log("quey"+querystring);
        var query = mclient.query(querystring,[vehid,fromloc,toloc,traveldate], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                   mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {
                
                var arraypostion =[];
                var toparraypostion =[];
                var seatpostion ="0";
                var topseatposition ="0";
                console.log("rows"+rows.length);
                for(var k =0 ; k< rows.length;k++)
                {
                 if(seatpostion=="0")
                 {
                   seatpostion = rows[k].SEAT_POSITION;
                 }else{
                  seatpostion =seatpostion+","+rows[k].SEAT_POSITION;

                 }
                 if(topseatposition=="0")
                 {
                  topseatposition =rows[k].TOP_SEAT_POSITION;

                 }else{
                  topseatposition =topseatposition+","+rows[k].TOP_SEAT_POSITION;

                 }
               

                }
                arraypostion.push(seatpostion);
                toparraypostion.push(topseatposition);
                var resdata ={
                  arraypostion:arraypostion,
                  toparraypostion:toparraypostion
                }
                mysqlLib.release(mclient);
                
                res.end(JSON.stringify(resdata));
              

            }
        });

    });

};


exports.getvehicleseatlayout = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));

   var vehid =input.vehid;
  
  mysqlLib.acquire(function(err, mclient) {

      var  querystring =" select * from vehicle_seat_map where veh_type_id =?";
        
      
        var query = mclient.query(querystring,[vehid], function(err, rows) {
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


exports.getvehicletopseatlayout = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));

   var vehid =input.vehid;
  
  mysqlLib.acquire(function(err, mclient) {

      var  querystring =" select * from vehicle_topseat_map where veh_type_id =?";
        
      
        var query = mclient.query(querystring,[vehid], function(err, rows) {
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

exports.insertguestcheckout = function(req, res) {


    var input = JSON.parse(JSON.stringify(req.body));

    var mobileno =input.mobilenumber;
    
    
    mysqlLib.acquire(function(err, mclient) {


var sequ = mclient.query("SELECT gc_seq('sq_my_sequence') as gc_next_sequence ", function (err, rows) {

            if (err) {
                var data = {
                            success: '-1',
                            message: 'Failed to save guest checkout'
                        };
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));    
               }else{
                 var gcid ="GC-UR-"+rows[0].gc_next_sequence;

       mclient.beginTransaction(function (err) {

          if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: '-1',
                            message: 'Failed to save guest checkout'
                        };
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });

                }else{
               
                var  insertData ={
               EMAIL_ID:mobileno ,
               CHECKOUT_ID :gcid
              }

            var query = mclient.query("insert into guest_checkout set ?,CREATED_DATE =now()", insertData, function (err, rows) {
             
              if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: '-1',
                            message: 'Failed to save company'
                        };
                        mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

                }
                  else{

                          mclient.commit(function (err) {
                                                console.log("ERRORS"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: '-1',
                                                            message: 'Failed to save guest checkout'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: '1',
                                                    message: 'guest checkout saved successful',
                                                    gcid:gcid
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });
                  }

            });   



            }



       });
       }
       
       });
       

       
     
    });

};

exports.updaterefrenenceid = function(req, res) {

 var input = JSON.parse(JSON.stringify(req.body));

 var bookingid =input.bookingid;
 var referenceid =input.referenceid;
 var mobileno =input.mobileno;

  mysqlLib.acquire(function(err, mclient) {
   
   mclient.beginTransaction(function (err) {

    var querystring =" select * from booking_reference where reference_id =? and phone_number =?";
  

  var query = mclient.query(querystring, [referenceid,mobileno], function (err, rows) {
        
        if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: '-1',
                            message: 'Failed update booking reference id'
                        };
                        mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

                } 
              else{

              if(rows.length==0)
              {

                 mclient.rollback(function () {
                        var data = {
                            success: '-2',
                            message: 'Invalid reference id'
                        };
                        mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

              } else{ 

      var querystring1 =" select * from bookings where BOOKING_REF_ID =? "; 
       var query = mclient.query(querystring1, [referenceid], function (err, rows) {
         if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: '-1',
                            message: 'Failed update booking reference id'
                        };
                        mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

                }else{

                if(rows.length>0)
                {
                   mclient.rollback(function () {
                        var data = {
                            success: '-3',
                            message: 'Failed update booking reference id'
                        };
                        mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

                } else{ 
       
          var querystring2 =" update bookings set booking_status='CONFIRMED',payment_status='PAID',BOOKING_REF_ID =? where booking_id =? ";
               
               var query = mclient.query(querystring2, [referenceid,bookingid], function (err, rows) {
                       if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: '-1',
                            message: 'Failed update booking reference id'
                        };
                        mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

                }else{

            
                          mclient.commit(function (err) {
                                                console.log("ERRORS"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: '-1',
                                                            message: 'Failed to save guest checkout'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: '1',
                                                    message: 'booking details updated successfully'
                                                   
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });



                }

                    
 
                           
                            });
                         }
                     }
                  });
               }
      
              }
  
          });    
       });   
    }); 


  };

  exports.sendbookingmail = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var isactive = 1;
    var bookingdetails = input.bookingdetails;
    var ticketdetails = input.ticketdetails;
    var paymentdetails =input.paymentdetails;
    var emailid =input.mailid;

    mail.sendBooking(bookingdetails,ticketdetails,paymentdetails,emailid);

    var resdata ={
      data :"Success"
    };
     res.end(JSON.stringify(resdata));

};