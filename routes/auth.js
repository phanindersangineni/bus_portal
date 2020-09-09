var jwt = require('jwt-simple');
var mysqlLib = require("./mysqlLib").pool;
var auth = {
login: function(req, res) {
var username = req.body.username || '';
var password = req.body.password || '';

console.log("username"+username);
console.log("password"+password);

if (username == '' || password == '') {
res.status(401);
res.json({
"status": 401,
"message": "Invalid credentials"
});
return;
}
// Fire a query to your DB and check if the credentials are valid
var dbUserObj = auth.validate(req,res,username, password);

},
generatecustomertoken :function(req,res){

 var customerkey ="9F/bYI}`{GV(z;(?q|(D0lF<&Km^'s";

var dbObj = auth.generateCustomToken(req,res,customerkey);
},
generateCustomToken :function(req,res,customkey)
{
 res.json(genToken(customkey));
 return; 

},
validate: function(req,res,username, password) {
var base64 = require('base-64');
 var id = username;
 var passwrd = base64.encode(password);

 var newpassword =base64.encode(passwrd);
  console.log("BOLETOBUS AUTHENTICATION");
 var dbUserObj;
 mysqlLib.acquire(function(err, mclient) {
  console.log("Acquiring Connection");
  if(err)
  {
    console.log("error authentication"+err);
     res.json({
                  "status": 500,
                  "message":  "Internal Server Error"
                                                     
                  });
  }
 
 mclient.query("select u.ID,u.FULL_NAME,u.EMAIL,u.CREATED_DATE,u.CUSTOMER_ID from user_tbl u ,customers cu \
where ( u.email = ? or cu.TELEPHONE =?)  AND u.PASSWORD = ? and cu.id =u.customer_id", [id,id,newpassword], function(err, rows) {

            if (err) {
                   console.log("err"+err);
                    res.json({
                  "status": 401,
                  "message":  "Authentication Failed with the given details.\n" +
                               "Either your username or password is invalid or your  access to the system  has expired.Please contact admin. \n\n" 
                                                     
                  });
                     mysqlLib.release(mclient);   

                  return;
            } else {

                if (rows.length > 0) {
                  console.log("inside");

                   
                    var userid =rows[0].ID;
                    var fullname =rows[0].FULL_NAME;
                    var createddate =rows[0].CREATED_DATE;
                    var customerid =rows[0].CUSTOMER_ID;
                    var email =rows[0].EMAIL;
                  
                      dbUserObj = {
                        success: 'SUCCESS',
                        message: 'Authentication successful',
                        USERID: userid,
                        USERNAME: fullname,
                        CUSTOMERID :customerid,
                        EMAIL:email,
                        CREATEDDATE:createddate
                      };
                      console.log("release login connection");
                   mysqlLib.release(mclient); 
                  // console.log("inside else"+JSON.stringify(dbUserObj));
                   res.json(genToken(dbUserObj));
                   return; 



            


                } else {
                  console.log("Inside else");
                     res.json({
                  "status": 401,
                  "message":  "Authentication Failed with the given details.\n" +
                               "Either your username or password is invalid or your  access to the system using the role has expired.Please contact admin. \n\n" 
                 
                  });
                     mysqlLib.release(mclient);   
                     return;
                }
            }
        });

}, 0, {timeout: 5000});

 
},
validateUser: function(req,res,username) {
// spoofing the DB response for simplicity
/*var dbUserObj = { // spoofing a userobject from the DB. 
name: 'arvind',
role: 'admin',
username: 'arvind@myapp.com'
};
return dbUserObj;*/

 var id = username;
 
 mysqlLib.acquire(function(err, mclient) {
  
 mclient.query("select  tc.citizen_id,tc.first_name,tc.last_name,tc.mobile_number, \
  ur.app_role_id from tbl_citizen tc,tbl_app_users_roles ur where tc.citizen_id =ur.app_user_id \
  and ( tc.mobile_number = ? or tc.email_id =?) ", [id,id], function(err, rows) {

            if (err) {
                
                   dbUserObj = {
                        success: 'FAILURE',
                        message: 'iNVALID USER',
                      
                    };

                  return dbUserObj;
            } else {
                
                if (rows.length > 0) {
                     dbUserObj = {
                        success: 'SUCCESS',
                        message: 'Authentication successful',
                        userid: rows[0].citizen_id,
                        firstname: rows[0].first_name,
                        lastname: rows[0].last_name,
                        mobile: rows[0].mobile_number,
                        roleid:rows[0].app_role_id
                    };
                   
                   
                   
                   res.json(dbUserObj);
                   return;
                } else {
                      dbUserObj = {
                        success: 'FAILURE',
                        message: 'iNVALID USER',
                      
                    };
                      mysqlLib.release(mclient);
                  return dbUserObj;
                }
            }
        });

});



},
}
// private method
function genToken(user) {
var expires = expiresIn(1); // 7 days
var token = jwt.encode({
exp: expires
}, require('../config/secret')());
return {
token: token,
expires: expires,
user: user
};
}
function expiresIn(numDays) {
var dateObj = new Date();
return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;