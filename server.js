/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var multer = require('multer');
var compression = require('compression');
var helmet = require('helmet');
var cron = require('node-cron');
var RateLimit = require('express-rate-limit');
var nodemailer = require('nodemailer');


//load users route externalising the business logic to routes folder
var auth = require('./routes/auth');
var configuration = require('./routes/configuration');
var busmanagement = require('./routes/busmanagement');
var routemanagement = require('./routes/routemanagement');
var otherconfiguration = require('./routes/otherconfigurations');
var customermanagement = require('./routes/customermanagement');
var clientmanagement =require('./routes/clientmanagement');
var bookingmanagement =require('./routes/bookingmanagement');

var jobs =require('./routes/jobs');
var app = express();
app.use(compression());
app.use(helmet());

app.disable('x-powered-by');

app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}))

app.use(function(err,req, res, next) {
   res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));



var connection = require('express-myconnection');
var mysql = require('mysql');

/*app.use(

    connection(mysql, {

        host: '10.10.10.62',//'103.253.33.36',
        user: 'cds',
        password: 'osicpl123',
        port: 3306, //port mysql
        database: 'cds_demo'

    }, 'pool') //or single

);*/

var task = cron.schedule('* * * * *', function() {
  jobs.clearblockedseats();
  console.log('immediately started task');
});

var task2 = cron.schedule('* * * * *', function() {
  jobs.updateexpiredorrideclosedtickets();
  console.log('immediately started task2');
});

/*var task3 = cron.schedule('* * * * *', function() {
  jobs.updatebookingforexpiry();
  console.log('immediately started task3');
});*/


// all environments
app.set('port',4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(bodyParser.json());


/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

//enabling cors origin filter so that they can be access across the domains
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Middle ware to authenticate and authorize the request .
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);



/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/



app.get('/', routes.index);
// no authentication
app.post('/login', auth.login);

app.post('/generatecustomertoken', auth.generatecustomertoken);

var createAccountLimiter = new RateLimit({
  windowMs: 1*60*1000, // 15 hour window
  delayAfter: 0, // begin slowing down responses after the first request
  delayMs: 0, // slow down subsequent responses by 3 seconds per request
  max: 100000, // start blocking after 5 requests
  message: "Too many request from this IP, please try again after an hour"
});

app.post('/api/v1/getallvehiclesForSearch',createAccountLimiter, clientmanagement.getallvehiclesForSearch);
app.post('/api/v1/fromlocation',createAccountLimiter, clientmanagement.fromlocation);
app.post('/api/v1/tolocation',createAccountLimiter, clientmanagement.tolocation);
app.post('/api/v1/getalldefaultdestinations',createAccountLimiter, clientmanagement.getalldefaultdestinations);
app.post('/api/v1/getticketprice',createAccountLimiter, clientmanagement.getticketprice);
app.post('/api/v1/gettaxes',createAccountLimiter, clientmanagement.gettaxes);
app.post('/api/v1/getfees',createAccountLimiter, clientmanagement.getfees);
app.post('/api/v1/gettaxdetails',createAccountLimiter, bookingmanagement.gettaxdetails);
app.post('/api/v1/getticketdetails',createAccountLimiter, bookingmanagement.getticketdetails);
app.post('/api/v1/getbookingdetails',createAccountLimiter, bookingmanagement.getbookingdetails);
app.post('/api/v1/createbooking',createAccountLimiter, bookingmanagement.createbooking);
app.post('/api/v1/blockseats',createAccountLimiter, bookingmanagement.blockseats);
app.post('/api/v1/getpaymentdetails',createAccountLimiter, bookingmanagement.getpaymentdetails);
app.post('/api/v1/getcustomerbookings',createAccountLimiter, bookingmanagement.getcustomerbookings);

app.post('/api/v1/getvehiclecount',createAccountLimiter, clientmanagement.getvehiclecount);
app.post('/api/v1/getcompanycount',createAccountLimiter, clientmanagement.getcompanycount);
app.post('/api/v1/getroutescount', clientmanagement.getroutescount);
app.post('/api/v1/getbookingscount',createAccountLimiter, clientmanagement.getbookingscount);
app.post('/api/v1/changePassword',createAccountLimiter, clientmanagement.changePassword);
app.post('/api/v1/changeEmail',createAccountLimiter, clientmanagement.changeEmail);
app.post('/api/v1/validatepromocode',createAccountLimiter, bookingmanagement.validatepromocode);

app.post('/api/v1/getCustomerID',createAccountLimiter, customermanagement.getCustomerID);
app.post('/api/v1/changeCustomerSettings',createAccountLimiter, clientmanagement.changeCustomerSettings);
app.post('/api/v1/getreturntriponly',createAccountLimiter, clientmanagement.getreturntriponly);
app.post('/api/v1/getvehicleseatmapbookings',createAccountLimiter, bookingmanagement.getvehicleseatmapbookings);
app.post('/api/v1/getvehicleseatlayout',createAccountLimiter, bookingmanagement.getvehicleseatlayout);
app.post('/api/v1/getvehicletopseatlayout',createAccountLimiter, bookingmanagement.getvehicletopseatlayout);
app.post('/api/v1/insertguestcheckout',createAccountLimiter, bookingmanagement.insertguestcheckout);

app.post('/api/v1/updaterefrenenceid',createAccountLimiter, bookingmanagement.updaterefrenenceid);
app.post('/api/v1/sendbookingmail',createAccountLimiter, bookingmanagement.sendbookingmail);






//authenticating and authorizing user.
//app.post('/api/v1/getallusers', allusers.getallusers);

app.post('/api/v1/getallCountriesForAdmin', configuration.getallCountriesForAdmin);
app.post('/api/v1/getallCountriesForUser', configuration.getallCountriesForUser);
app.post('/api/v1/addorupdatecountry', configuration.addorupdatecountry);
app.post('/api/v1/getallCitiesForAdmin', configuration.getallCitiesForAdmin);
app.post('/api/v1/getallCityForUser', configuration.getallCityForUser);
app.post('/api/v1/addorupdatecity', configuration.addorupdatecity);
app.post('/api/v1/addorupdatecurrency', configuration.addorupdatecurrency);
app.post('/api/v1/getallCurrencyForAdmin', configuration.getallCurrencyForAdmin);
app.post('/api/v1/getallCurrencyForUser', configuration.getallCurrencyForUser);
app.post('/api/v1/getallAmenitiesForAdmin', configuration.getallAmenitiesForAdmin);
app.post('/api/v1/getallAmenitiesForUser', configuration.getallAmenitiesForUser);
app.post('/api/v1/addorupdateAmenities', configuration.addorupdateAmenities);
app.post('/api/v1/getallrolesForAdmin', configuration.getallrolesForAdmin);
app.post('/api/v1/getallrolesForUser', configuration.getallrolesForUser);
app.post('/api/v1/addorupdateroles', configuration.addorupdateroles);
app.post('/api/v1/getallscreensForAdmin', configuration.getallscreensForAdmin);
app.post('/api/v1/addorupdatescreens', configuration.addorupdatescreens);
app.post('/api/v1/getalltaxesForAdmin', configuration.getalltaxesForAdmin);
app.post('/api/v1/getalltaxesForUser', configuration.getalltaxesForUser);
app.post('/api/v1/addorupdatestaxes', configuration.addorupdatestaxes);
app.post('/api/v1/getallTransportationTypeForAdmin', configuration.getallTransportationTypeForAdmin);
app.post('/api/v1/getallTransportationTypeForUser', configuration.getallTransportationTypeForUser);
app.post('/api/v1/addorupdateTransportationType', configuration.addorupdateTransportationType);
app.post('/api/v1/getallSettingsForAdmin', configuration.getallSettingsForAdmin);
app.post('/api/v1/getallSettingsForUser', configuration.getallSettingsForUser);
app.post('/api/v1/addorudateSettings', configuration.addorudateSettings);
app.post('/api/v1/getallEmailTemplatesForAdmin', configuration.getallEmailTemplatesForAdmin);
app.post('/api/v1/addorudateEmailTemplate', configuration.addorudateEmailTemplate);
app.post('/api/v1/getallEmailForLanguage', configuration.getallEmailForLanguage);
app.post('/api/v1/addorudateEmailLanguage', configuration.addorudateEmailLanguage);
app.post('/api/v1/getallEmailAction', configuration.getallEmailAction);
app.post('/api/v1/addorudateEmailAction', configuration.addorudateEmailAction);

app.post('/api/v1/getalllanguage', configuration.getalllanguage);
app.post('/api/v1/addorupdatelanguage', configuration.addorupdatelanguage);
app.post('/api/v1/getalllabelforuserinterface', configuration.getalllabelforuserinterface);
app.post('/api/v1/addorudateLabelUserInterface', configuration.addorudateLabelUserInterface);

app.post('/api/v1/getalllabelforlanguage', configuration.getalllabelforlanguage);
app.post('/api/v1/addorudateLabelforlanguage', configuration.addorudateLabelforlanguage);

app.post('/api/v1/getallServiceForAdmin', configuration.getallServiceForAdmin);
app.post('/api/v1/getallServiceForUser', configuration.getallServiceForUser);
app.post('/api/v1/addorupdateservice', configuration.addorupdateservice);


app.post('/api/v1/getallPaymentmethodsForAdmin', configuration.getallPaymentmethodsForAdmin);
app.post('/api/v1/getallPaymentmethodsForUser', configuration.getallPaymentmethodsForUser);
app.post('/api/v1/addorupdatePaymentMethods', configuration.addorupdatePaymentMethods);


app.post('/api/v1/getallbusecompanyForAdmin', busmanagement.getallbusecompanyForAdmin);
app.post('/api/v1/getallbusecompanyForUser', busmanagement.getallbusecompanyForUser);
app.post('/api/v1/addcompany', busmanagement.addcompany);
app.post('/api/v1/updatecompany', busmanagement.updatecompany);
app.post('/api/v1/getallbusecompanyContacts', busmanagement.getallbusecompanyContacts);
app.post('/api/v1/getallvehicletypebycompanyid', busmanagement.getallvehicletypebycompanyid);


app.post('/api/v1/getallvehicletypeforUser', busmanagement.getallvehicletypeforUser);
app.post('/api/v1/getallvehicletypeforAdmin', busmanagement.getallvehicletypeforAdmin);
app.post('/api/v1/updatevehicletype', busmanagement.updatevehicletype);
app.post('/api/v1/addvehicletype', busmanagement.addvehicletype);
app.post('/api/v1/getallvehicletypeById', busmanagement.getallvehicletypeById);
app.post('/api/v1/getallvehicletypeById', busmanagement.getallvehicletypeById);

app.post('/api/v1/saveVehicle', busmanagement.saveVehicle);
app.post('/api/v1/getallvehicleoutofdate', busmanagement.getallvehicleoutofdate);
app.post('/api/v1/getallvehicletickettype', busmanagement.getallvehicletickettype);
app.post('/api/v1/getallvehicleticketprice', busmanagement.getallvehicleticketprice);
app.post('/api/v1/getallvehicles', busmanagement.getallvehicles);
app.post('/api/v1/getvehiclebyid', busmanagement.getvehiclebyid);
app.post('/api/v1/getallactivebuscompany', busmanagement.getallactivebuscompany);
app.post('/api/v1/getallbuscompany', busmanagement.getallbuscompany);
app.post('/api/v1/getallvehicletypeforcomapny', busmanagement.getallvehicletypeforcomapny);
app.post('/api/v1/getallactivevehicletypes', busmanagement.getallactivevehicletypes);
app.post('/api/v1/getallcompanyvehicles', busmanagement.getallcompanyvehicles);

app.post('/api/v1/getvehiclepdrops', busmanagement.getvehiclepdrops);
app.post('/api/v1/getvehiclepickups', busmanagement.getvehiclepickups);


app.post('/api/v1/getallvehicledepaturearrival', busmanagement.getallvehicledepaturearrival);
app.post('/api/v1/getallRoutesforAdmin', routemanagement.getallRoutesforAdmin);
app.post('/api/v1/getallRoutesforUser', routemanagement.getallRoutesforUser);
app.post('/api/v1/saveroutes', routemanagement.saveroutes);
app.post('/api/v1/getallCitysByRouteId', routemanagement.getallCitysByRouteId);
app.post('/api/v1/updateroutes', routemanagement.updateroutes);
app.post('/api/v1/getallRoutesbyComapnyId', routemanagement.getallRoutesbyComapnyId);
app.post('/api/v1/getallRoutesforCompany', routemanagement.getallRoutesforCompany);
app.post('/api/v1/getallactiveroutes', routemanagement.getallactiveroutes);



app.post('/api/v1/getallPaymentprocessorForAdmin', otherconfiguration.getallPaymentprocessorForAdmin);
app.post('/api/v1/getallPaymentprocessorForUser', otherconfiguration.getallPaymentprocessorForUser);
app.post('/api/v1/addorupdatePaymentProcessor', otherconfiguration.addorupdatePaymentProcessor);

app.post('/api/v1/getallFeesForAdmin', otherconfiguration.getallFeesForAdmin);
app.post('/api/v1/getallFeesForUser', otherconfiguration.getallFeesForUser);
app.post('/api/v1/addorupdateFees', otherconfiguration.addorupdateFees);

app.post('/api/v1/getallCustomersForAdmin', customermanagement.getallCustomersForAdmin);
app.post('/api/v1/getallCustomersForUser', customermanagement.getallCustomersForUser);
app.post('/api/v1/addorupdatecustomer', customermanagement.addorupdatecustomer);
app.post('/api/v1/getCustomerbyID', customermanagement.getCustomerbyID);

app.post('/api/v1/getallPromoCodesForAdmin', customermanagement.getallPromoCodesForAdmin);
app.post('/api/v1/getallPromoCodesForUser', customermanagement.getallPromoCodesForUser);
app.post('/api/v1/addorupdatepromocode', customermanagement.addorupdatepromocode);
app.post('/api/v1/getallPromoCodesByID', customermanagement.getallPromoCodesByID);
app.post('/api/v1/forgotpassword', customermanagement.forgotpassword);




http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

process.on('uncaughtException', function (err) {
  console.error(err.stack)
  process.exit(1);
})
