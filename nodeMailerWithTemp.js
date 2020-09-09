/**
 * Created by olyjosh on 29/06/2017.
 */

//var sender = 'smtps://myvoicetodayteam%40gmail.com'   // The emailto use in sending the email(Change the @ symbol to %40 or do a url encoding )
//var password = 'osicpl@1'  // password of the email to use

var sender = 'smtps://hola%40bukate.com'   // The emailto use in sending the email(Change the @ symbol to %40 or do a url encoding )
var password = 'mqqqazwjkulgegmu'  // password of the email to use

//smtps://myvoicetodayteam%40gmail.com
/*
host: 'smtp.gmail.com',
                                    port: 465,
                                    auth: {
                                        user: 'hola@bukate.com',
                                        pass: 'bukate@2425289'
                                    }*/

var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;


var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
var sendResetPasswordLink = transporter.templateSender(
    new EmailTemplate('./templates/resetPassword'), {
        from: 'hola@bukate.com',
    });

var sendChangePasswordLink = transporter.templateSender(
    new EmailTemplate('./templates/changePassword'), {
        from: 'hola@bukate.com',
    });

var sendNewUserLink = transporter.templateSender(
    new EmailTemplate('./templates/newUser'), {
        from: 'hola@bukate.com',
    });

var sendBookingLink = transporter.templateSender(
    new EmailTemplate('./templates/Bookings'), {
        from: 'hola@bukate.com',
    });
var sendBookingExpiryLink = transporter.templateSender(
    new EmailTemplate('./templates/BookingExpiry'), {
        from: 'hola@bukate.com',
    });


exports.sendPasswordReset = function (username,password,useremail) {
    console.log("send password");
    // transporter.template
   sendResetPasswordLink({
    to: useremail,
    // EmailTemplate renders html and text but no subject so we need to
    // set it manually either here or in the defaults section of templateSender()
    subject: 'Forgot Password'
}, {
        username: username,
        password : password

}, function(err, info){
    if(err){
       console.log('Error'+err);
    }else{
        console.log('Forgot password sent');
    }
});
};

exports.sendChangePassword = function (email, username,password) {
    // transporter.template
   sendChangePasswordLink({
    to: email,
    // EmailTemplate renders html and text but no subject so we need to
    // set it manually either here or in the defaults section of templateSender()
    subject: 'Change Password Successful'
}, {
        username: username,
        password : password

}, function(err, info){
    if(err){
       console.log('Error'+err);
    }else{
        console.log('Change Password');
    }
});
};

exports.sendNewUser = function (username,email,password) {
    // transporter.template
   sendNewUserLink({
    to: email,
    // EmailTemplate renders html and text but no subject so we need to
    // set it manually either here or in the defaults section of templateSender()
    subject: 'Welcome to Bukate'
}, {
        username: username,
        password :password,
        email:email

}, function(err, info){
    if(err){
       console.log('Error'+err);
    }else{
        console.log('Welcome Mail');
    }
});
};

exports.sendBooking = function (bookingdetails, ticketdetails,paymentdetails,emailid) {
    // transporter.template
   console.log("sendbooking"+bookingdetails[0].BOOKING_ID);
   var BOOKING_ID =bookingdetails[0].BOOKING_ID;
   var BOOKING_STATUS =bookingdetails[0].BOOKING_STATUS;
   var BKDATE =bookingdetails[0].BKDATE;
   var CUSTOMERNAME =bookingdetails[0].CUSTOMERNAME;
   var EMAIL_ID =bookingdetails[0].EMAIL_ID;
   var BOOKINGADDRESS =bookingdetails[0].BOOKINGADDRESS; 
   var DOCUMENT =bookingdetails[0].DOCUMENT; 
   var DOCUMENT_NUMBER =bookingdetails[0].DOCUMENT_NUMBER; 
   var PHONE =bookingdetails[0].COUNTRY_CODE +"-"+bookingdetails[0].PHONE; 
   var departurefrom =bookingdetails[0].FROMCITYNAME; 
   var departureto =bookingdetails[0].TOCITYNAME;


   var TICKET_ID =ticketdetails[0].TICKET_ID;
   var DEPARTURE_DATE =ticketdetails[0].DEPARTURE_DATE;
   var ARRIVAL_DATE =ticketdetails[0].ARRIVAL_DATE;
   var TOTAL_TICKETS =ticketdetails[0].TOTAL_TICKETS;
   var SEAT_NUMBER =ticketdetails[0].SEAT_NUMBER;
   var TRAVELDATE =ticketdetails[0].TRAVELDATE;

   var VEH_REG_NUMBER =ticketdetails[0].VEH_REG_NUMBER;
   var PICKUP_POINT_NAME =ticketdetails[0].PICKUP_POINT_NAME;
   var DROP_POINT_NAME =ticketdetails[0].DROP_POINT_NAME;

   var TICKET_ID1 ="N";
   var DEPARTURE_DATE1 ="";
   var ARRIVAL_DATE1 ="";
   var TOTAL_TICKETS1 ="";
   var SEAT_NUMBER1 ="";
   var TRAVELDATE1 ="";

   var VEH_REG_NUMBER1 ="";
   var PICKUP_POINT_NAME1 ="";
   var DROP_POINT_NAME1 ="";


   if(ticketdetails.length ==2)
   {

    TICKET_ID1 =ticketdetails[1].TICKET_ID;
    DEPARTURE_DATE1 =ticketdetails[1].DEPARTURE_DATE;
    ARRIVAL_DATE1 =ticketdetails[1].ARRIVAL_DATE;
    TOTAL_TICKETS1 =ticketdetails[1].TOTAL_TICKETS;
    SEAT_NUMBER1 =ticketdetails[1].SEAT_NUMBER;
    TRAVELDATE1 =ticketdetails[1].TRAVELDATE;

    VEH_REG_NUMBER1 =ticketdetails[1].VEH_REG_NUMBER;
    PICKUP_POINT_NAME1 =ticketdetails[1].PICKUP_POINT_NAME;
    DROP_POINT_NAME1 =ticketdetails[1].DROP_POINT_NAME;

   }
 
    var tomail =EMAIL_ID;
    if(emailid !="N")
    {
      tomail =emailid;

    }


   sendBookingLink({
    to: tomail,
    // EmailTemplate renders html and text but no subject so we need to
    // set it manually either here or in the defaults section of templateSender()
    subject: 'Booking Confirmation:'
}, {
    BOOKING_ID: BOOKING_ID,
    BOOKING_STATUS: BOOKING_STATUS,
    BKDATE :BKDATE,
    CUSTOMERNAME:CUSTOMERNAME,
    EMAIL_ID:EMAIL_ID,
    BOOKINGADDRESS:BOOKINGADDRESS,
    DOCUMENT:DOCUMENT,
    DOCUMENT_NUMBER:DOCUMENT_NUMBER,
    PHONE:PHONE,
    departurefrom:departurefrom,
    departureto:departureto,
    TICKET_ID:TICKET_ID,
    DEPARTURE_DATE:DEPARTURE_DATE,
    ARRIVAL_DATE:ARRIVAL_DATE,
    TOTAL_TICKETS:TOTAL_TICKETS,
    SEAT_NUMBER:SEAT_NUMBER,
    TRAVELDATE:TRAVELDATE,
    VEH_REG_NUMBER:VEH_REG_NUMBER,
    PICKUP_POINT_NAME:PICKUP_POINT_NAME,
    DROP_POINT_NAME:DROP_POINT_NAME,
    TICKET_ID1:TICKET_ID1,
    DEPARTURE_DATE1:DEPARTURE_DATE1,
    ARRIVAL_DATE1:ARRIVAL_DATE1,
    TOTAL_TICKETS1:TOTAL_TICKETS1,
    SEAT_NUMBER1:SEAT_NUMBER1,
    TRAVELDATE1:TRAVELDATE1,
    VEH_REG_NUMBER1:VEH_REG_NUMBER1,
    PICKUP_POINT_NAME1:PICKUP_POINT_NAME1,
    DROP_POINT_NAME1:DROP_POINT_NAME1

}, function(err, info){
    if(err){
       console.log('Error'+err);
    }else{
        console.log('Booking mail send successfully');
    }
});
};

exports.sendBookingExpirymail = function (bookingid,customername,emailid) {
    console.log("send password");
    // transporter.template
   sendBookingExpiryLink({
    to: emailid,
    // EmailTemplate renders html and text but no subject so we need to
    // set it manually either here or in the defaults section of templateSender()
    subject: 'Booking Expired'
}, {
        username: customername,
        bookingid : bookingid

}, function(err, info){
    if(err){
       console.log('Error'+err);
    }else{
        console.log('Booking Expired Mail sent successfully');
    }
});
};



