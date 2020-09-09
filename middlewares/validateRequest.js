var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
 
module.exports = function(req, res, next) {
 
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 
 
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
  console.log("INSIDE VALIDATE REQUEST");
  console.log("INSIDE VALIDATE REQUEST");
 //We search for a token/key and in the request. 
 //This is the access token we have issued post successful login 
 //and key is the current logged in user’s username
 //We decode the token and check its validity
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
   
  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());
 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
 
      // Authorize the user to see if s/he can access our resources
      
      //var dbUser = validateUser(req,res,key); // The key would be the logged in user's username

 
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      
 
    } catch (err) {
      console.log("ERRO"+err);
      res.status(500);
      res.json({
        "status": 500,
        "message": "Not Authorized to access this page",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};