var mysqlLib = require("./mysqlLib").pool;

exports.getallusers = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var userid = input.userId;
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);

        var query = mclient.query("select USERID,USERNAME,ISACTIVE,DATE_FORMAT(CREATEDDATE, '%d-%m-%Y')CREATEDDATE from USERS where CREATEDBY =?", [userid], function(err, rows) {
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

exports.getuserdetails = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var userid = input.userId;
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);

        var query = mclient.query('select * from USERS where USERID =?', [userid], function(err, rows) {
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


exports.getallroles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var isactive = 1;
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from roles where ISACTIVE =?', [isactive], function(err, rows) {
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



exports.register = function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var base64 = require('base-64');
    var encryptPassword = base64.encode(input.password);
    var username = input.username;
    var firstname = input.firstname;
    var middlename = input.middlename;
    var lastname = input.lastname;
    var createdby = input.createdby;
    var roleid = input.roleid;
    var activeinactive = input.actinact;

    mysqlLib.acquire(function(err, mclient) {

        mclient.beginTransaction(function(err) {

            if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'User creation failed please try after some time'
                };
                //mclient.release(); 
                mysqlLib.release(mclient);
                res.end(JSON.stringify(data));

            }

            var query = mclient.query("SELECT * FROM USERS where USERNAME =? ", [username], function(err, rows) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function() {
                        var data = {
                            success: 'FAILURE',
                            message: 'User Creation failed please try after some time'
                        };
                        //mclient.release(); 
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });

                } else {
                    if (rows.length > 0) {

                        mclient.rollback(function() {
                            var data = {
                                success: 'FAILURE',
                                message: 'User creation failed as the details with the given user name already exists'
                            };
                            ////mclient.release(); 
                            mysqlLib.release(mclient);
                            res.end(JSON.stringify(data));
                        });

                    } else {

                        var uploadfilecallback = function(data) {

                            var dbimagepath = data.dbImagePath;
                            var inputData = {
                                PASSWORD: encryptPassword,
                                USERNAME: username,
                                FIRSTNAME: firstname,
                                MIDDLENAME: middlename,
                                IMGURL: dbimagepath,
                                LASTNAME: lastname,
                                CREATEDBY: createdby,
                                ISACTIVE: activeinactive
                            };
                            var query = mclient.query("INSERT INTO USERS set ?,CREATEDDATE=current_date() ", inputData, function(err, rows) {
                                if (err) {
                                    console.log("Error inserting : %s ", err);
                                    mclient.rollback(function() {
                                        var data = {
                                            success: 'FAILURE',
                                            message: 'User creation failed .Please try after some time'
                                        };
                                        //mclient.release(); 
                                        mysqlLib.release(mclient);
                                        res.end(JSON.stringify(data));
                                    });
                                } else {

                                    var query = mclient.query("SELECT USERID FROM USERS where USERNAME =?", [username], function(err, rows) {


                                        if (err) {
                                            console.log("Error inserting : %s ", err);
                                            mclient.rollback(function() {
                                                var data = {
                                                    success: 'FAILURE',
                                                    message: 'User creation failed .Please try after some time'
                                                };
                                                //mclient.release(); 
                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));
                                            });
                                        } else {

                                            var userid = rows[0].USERID;


                                            var inData = {
                                                ROLEID: roleid,
                                                USERID: userid,
                                                STARTDATE:current_date(),
                                                ENDDATE:'2099-01-01'
                                            };

                                            var query = mclient.query("INSERT INTO user_roles set ? ", inData, function(err, rows) {

                                                if (err) {
                                                    console.log("Error inserting : %s ", err);
                                                    mclient.rollback(function() {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'user creation failed .Please try after some time'
                                                        };
                                                        //mclient.release(); 
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                } else {

                                                    /*var nodemailer = require('nodemailer');
                                                    var transport = nodemailer.createTransport({
                                                        host: 'smtp.gmail.com',
                                                        port: 587,
                                                        auth: {
                                                            user: 'myvoicetodayteam@gmail.com',
                                                            pass: 'osicpl@1'
                                                        }
                                                    });
                                                    var mailOptions = {
                                                        from: 'myvoicetodayteam@gmail.com',
                                                        to: email_id,
                                                        subject: 'Registered At myvoicetoday',
                                                        text: "Dear Citizen, \n\n"+
                                                                "Thank you for joining us to be part of myVoiceToday community.\n" +
                                                                "Your registration is completed and you can participate in your location improvement activities by posting requests. \n\n" +
                                                                "Password : " + input.password + " \n\n" +
                                                                "Please contact us at OSIBTBTatyourservice@gmail.com for any queries/assistance. \n\n" +
                                                                "Sincerely, \n" +
                                                                "myVoiceToday Team \n" +
                                                                "Email: OSIBTBTatyourservice@gmail.com \n\n" +
                                                                "Note:This is a system generated mail so please do not reply to this mail. "

                                                    };

                                                    transport.sendMail(mailOptions, function (error, info) {
                                                        /* if(error){
                                                         console.log(error);
                                                         res.json({yo: 'error'});
                                                         }else{
                                                         console.log('Message sent: ' + info.response);
                                                         res.json({yo: info.response});
                                                         };*/
                                                    //});


                                                    mclient.commit(function(err) {
                                                        console.log(err);
                                                        if (err) {
                                                            mclient.rollback(function() {
                                                                var data = {
                                                                    success: 'FAILURE',
                                                                    message: 'User creation failed .Please try after some time'
                                                                };
                                                                mysqlLib.release(mclient);
                                                                res.end(JSON.stringify(data));
                                                            });
                                                        }
                                                        var data = {
                                                            success: 'SUCCESS',
                                                            message: ' User Creation successful'
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

                        };
                        var upload_files = input.upload_images;
                        upload(req, upload_files, username, uploadfilecallback, mclient);

                    }
                }

            });

        });

    });
};

var fs = require('fs');


function upload(req, upload_files, username, uploadfilecallback, mclient) {

    console.log("upload_files.length" + upload_files.length);
    if (upload_files.length > 0) {
        for (var i = 0; i < upload_files.length; i++) {
            var image = upload_files[i];
            var imageCount = i + 1;
            var imageName = username + "_" + Date.now() + "_" + imageCount + ".jpg";
            var base64Data = image.substring(image.indexOf(','), image.length);
            //for local
            var imagePath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + '\\public\\app\\myRequestImages\\images\\attachments\\profile\\';

            //for local
            var dbImagePath = imageName;

            var attachment_name = imagePath + imageName;
            fs.writeFile(attachment_name, base64Data, 'base64', function(err) {


                if (upload_files.length == 1) {

                    var data = {
                        success: 'SUCCESS',
                        dbImagePath: dbImagePath
                    };

                    uploadfilecallback(data);


                } else if (upload_files.length == 2) {

                    var data = {
                        success: 'SUCCESS',
                        dbImagePath: dbImagePath
                    };

                    uploadfilecallback(data);
                }

            });
        }


    } else {

        var data = {
            success: 'SUCCESS',
            dbImagePath: 'N'
        };
        uploadfilecallback(data);

    }
}

function removeimagefromdisk(unlinkimagecallback,imagenames)
{

     var imagePath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + '\\public\\app\\myRequestImages\\images\\attachments\\profile\\';

         

            var attachment_name = imagePath + imagenames; 
    fs.unlink(attachment_name, function(err) {

       var data = {
                        success: 'SUCCESS'
                    };

                    unlinkimagecallback(data);

    })

}

exports.updateprofile = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var emailid = input.emailid;
    var firstname = input.firstname;
    var middlename = input.middlename;
    var lastname = input.lastname;
    var createdby = input.createdby;
    var phone = input.phone;
    var state = input.state;
    var address = input.address;
    var pincode = input.pincode;
    var address1 = input.address1;
    var username = input.username;
    var imagenames =input.updateimage;
    var noimage =input.noimage;

    mysqlLib.acquire(function(err, mclient) {

        var uploadfilecallback = function(data) {
            console.log(data.dbImagePath);
             var dbimagepath =""; 
            if(data.dbImagePath=="N")
            {
           

             if(noimage=="Y")
             {
             dbimagepath=null; 

              var unlinkimagecallback =function(data)
              {

              }
              removeimagefromdisk(unlinkimagecallback,imagenames);

             }else{

               dbimagepath=imagenames;

             }

            }else{
            dbimagepath =data.dbImagePath;
            }

            mclient.beginTransaction(function(err) {

               
                var inputData = {
                    EMAILID: emailid,
                    PHONENO: phone,
                    FIRSTNAME: firstname,
                    MIDDLENAME: middlename,
                    IMGURL: dbimagepath,
                    LASTNAME: lastname,
                    UPDATEDBY: createdby,
                    STATE: state,
                    PINCODE: pincode,
                    ADDRESS1: address,
                    ADDRESS2: address1
                };

                var query = mclient.query("UPDATE USERS set ?,UPDATEDDATE=current_date() where USERID =? ", [inputData, createdby], function(err, rows) {

                    if (err) {
                        console.log("Error inserting : %s ", err);
                        mclient.rollback(function() {
                            var data = {
                                success: 'FAILURE',
                                message: 'User updation failed.Please try after some time'
                            };
                            //mclient.release(); 
                            mysqlLib.release(mclient);
                            res.end(JSON.stringify(data));
                        });
                    } else {

                        /*var nodemailer = require('nodemailer');
                                          var transport = nodemailer.createTransport({
                                              host: 'smtp.gmail.com',
                                              port: 587,
                                              auth: {
                                                  user: 'myvoicetodayteam@gmail.com',
                                                  pass: 'osicpl@1'
                                              }
                                          });
                                          var mailOptions = {
                                              from: 'myvoicetodayteam@gmail.com',
                                              to: email_id,
                                              subject: 'Registered At myvoicetoday',
                                              text: "Dear Citizen, \n\n"+
                                                      "Thank you for joining us to be part of myVoiceToday community.\n" +
                                                      "Your registration is completed and you can participate in your location improvement activities by posting requests. \n\n" +
                                                      "Password : " + input.password + " \n\n" +
                                                      "Please contact us at OSIBTBTatyourservice@gmail.com for any queries/assistance. \n\n" +
                                                      "Sincerely, \n" +
                                                      "myVoiceToday Team \n" +
                                                      "Email: OSIBTBTatyourservice@gmail.com \n\n" +
                                                      "Note:This is a system generated mail so please do not reply to this mail. "

                                          };

                                          transport.sendMail(mailOptions, function (error, info) {
                                              /* if(error){
                                               console.log(error);
                                               res.json({yo: 'error'});
                                               }else{
                                               console.log('Message sent: ' + info.response);
                                               res.json({yo: info.response});
                                               };*/
                        //});


                        mclient.commit(function(err) {
                            console.log(err);
                            if (err) {
                                mclient.rollback(function() {
                                    var data = {
                                        success: 'FAILURE',
                                        message: 'User updation failed .Please try after some time'
                                    };
                                    mysqlLib.release(mclient);
                                    res.end(JSON.stringify(data));
                                });
                            }
                            var data = {
                                success: 'SUCCESS',
                                message: ' User updation successful'
                            };

                            mysqlLib.release(mclient);
                            res.end(JSON.stringify(data));

                        });



                    }




                });




            });




        };
        var upload_files = input.upload_images;
        upload(req, upload_files, username, uploadfilecallback, mclient);



    });



}


exports.verifyphone = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var phoneno = input.phoneno;
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);

        var query = mclient.query('select * from USERS where PHONENO =?', [phoneno], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {
                  
                  if(rows.length>0)
                  {
                    var data = {
                                        success: 'FAILURE',
                                        message: 'Phone number already exists'
                                    };

                  }else{

                      var data = {
                                        success: 'SUCCESS',
                                        message: ''
                                    };


                  }  

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.verifyemailid = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var emailid = input.emailid;
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);

        var query = mclient.query('select * from USERS where EMAILID =?', [emailid], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {
                  
                  if(rows.length>0)
                  {
                    var data = {
                                        success: 'FAILURE',
                                        message: 'Email ID already exists'
                                    };

                  }else{

                      var data = {
                                        success: 'SUCCESS',
                                        message: ''
                                    };


                  }  

                mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));

            }
        });

    });

};


exports.deleteUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var updatedby = input.createdby;
    var userid =input.userid;
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);

   

        mclient.beginTransaction(function (err) {

                  var query = mclient.query("UPDATE USERS set ISACTIVE=0,UPDATEDBY=?,UPDATEDDATE=current_date() where USERID =? ", [updatedby,userid], function (err, rows) {
                  
                     if (err) {
                                console.log("Error inserting : %s ", err);
                                mclient.rollback(function () {
                                    var data = {
                                        success: 'FAILURE',
                                        message: 'User updation failed.Please try after some time'
                                    };
                                    //mclient.release(); 
                                    mysqlLib.release(mclient);
                                    res.end(JSON.stringify(data));
                                });
                            }else{

                              /*var nodemailer = require('nodemailer');
                                                var transport = nodemailer.createTransport({
                                                    host: 'smtp.gmail.com',
                                                    port: 587,
                                                    auth: {
                                                        user: 'myvoicetodayteam@gmail.com',
                                                        pass: 'osicpl@1'
                                                    }
                                                });
                                                var mailOptions = {
                                                    from: 'myvoicetodayteam@gmail.com',
                                                    to: email_id,
                                                    subject: 'Registered At myvoicetoday',
                                                    text: "Dear Citizen, \n\n"+
                                                            "Thank you for joining us to be part of myVoiceToday community.\n" +
                                                            "Your registration is completed and you can participate in your location improvement activities by posting requests. \n\n" +
                                                            "Password : " + input.password + " \n\n" +
                                                            "Please contact us at OSIBTBTatyourservice@gmail.com for any queries/assistance. \n\n" +
                                                            "Sincerely, \n" +
                                                            "myVoiceToday Team \n" +
                                                            "Email: OSIBTBTatyourservice@gmail.com \n\n" +
                                                            "Note:This is a system generated mail so please do not reply to this mail. "

                                                };

                                                transport.sendMail(mailOptions, function (error, info) {
                                                    /* if(error){
                                                     console.log(error);
                                                     res.json({yo: 'error'});
                                                     }else{
                                                     console.log('Message sent: ' + info.response);
                                                     res.json({yo: info.response});
                                                     };*/
                                                //});


                                                mclient.commit(function (err) {
                                                    console.log(err);
                                                    if (err) {
                                                        mclient.rollback(function () {
                                                            var data = {
                                                                success: 'FAILURE',
                                                                message: 'User deletion failed .Please try after some time'
                                                            };
                                                            mysqlLib.release(mclient);
                                                            res.end(JSON.stringify(data));
                                                        });
                                                    }
                                                    var data = {
                                                        success: 'SUCCESS',
                                                        message: ' User deleted successfully'
                                                    };

                                                    mysqlLib.release(mclient);
                                                    res.end(JSON.stringify(data));

                                                });   



                            }


                 


                  });        




                  });
  


    });

};


exports.additionalroles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
   
    var userid =input.userid;
    var roleid =input.roleid;
    var startdate =input.startdate;
    var enddate =input.enddate; 
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);
       var query = mclient.query( "select * from  user_roles where USERID =? and ROLEID =? ", [userid,roleid], function (err, rows) {
         
         if (err) {
                console.log("Error Selecting : %s ", err);
                res.end(JSON.stringify(rows));
            } else {
             if(rows.length>0)
             {
              var data = {
                                                        success: 'SUCCESS',
                                                        message: ' User role already exists'
                                                    };

                                                    mysqlLib.release(mclient);
                                                    res.end(JSON.stringify(data));

             }else{
            
           

        mclient.beginTransaction(function (err) {

              var inData = {
                                                USERID: userid,
                                                ROLEID: roleid,
                                                STARTDATE:startdate,
                                                ENDDATE:enddate
                                            };

                  var query = mclient.query( "Insert into user_roles set ? ", [inData], function (err, rows) {
                  
                     if (err) {
                                console.log("Error inserting : %s ", err);
                                mclient.rollback(function () {
                                    var data = {
                                        success: 'FAILURE',
                                        message: 'Failed to add new role.Please try after some time'
                                    };
                                    //mclient.release(); 
                                    res.end(JSON.stringify(data));
                                });
                            }else{

                              /*var nodemailer = require('nodemailer');
                                                var transport = nodemailer.createTransport({
                                                    host: 'smtp.gmail.com',
                                                    port: 587,
                                                    auth: {
                                                        user: 'myvoicetodayteam@gmail.com',
                                                        pass: 'osicpl@1'
                                                    }
                                                });
                                                var mailOptions = {
                                                    from: 'myvoicetodayteam@gmail.com',
                                                    to: email_id,
                                                    subject: 'Registered At myvoicetoday',
                                                    text: "Dear Citizen, \n\n"+
                                                            "Thank you for joining us to be part of myVoiceToday community.\n" +
                                                            "Your registration is completed and you can participate in your location improvement activities by posting requests. \n\n" +
                                                            "Password : " + input.password + " \n\n" +
                                                            "Please contact us at OSIBTBTatyourservice@gmail.com for any queries/assistance. \n\n" +
                                                            "Sincerely, \n" +
                                                            "myVoiceToday Team \n" +
                                                            "Email: OSIBTBTatyourservice@gmail.com \n\n" +
                                                            "Note:This is a system generated mail so please do not reply to this mail. "

                                                };

                                                transport.sendMail(mailOptions, function (error, info) {
                                                    /* if(error){
                                                     console.log(error);
                                                     res.json({yo: 'error'});
                                                     }else{
                                                     console.log('Message sent: ' + info.response);
                                                     res.json({yo: info.response});
                                                     };*/
                                                //});


                                                mclient.commit(function (err) {
                                                    console.log(err);
                                                    if (err) {
                                                        mclient.rollback(function () {
                                                            var data = {
                                                                success: 'FAILURE',
                                                                message: 'Failed to add new role .Please try after some time'
                                                            };
                                                            mysqlLib.release(mclient);
                                                            res.end(JSON.stringify(data));
                                                        });
                                                    }
                                                    var data = {
                                                        success: 'SUCCESS',
                                                        message: ' New User Role added successfully'
                                                    };

                                                    mysqlLib.release(mclient);
                                                    res.end(JSON.stringify(data));

                                                });   
                                    }
                         });        

 
                  });
              }   
           }              
  
       });
  
  

    });



};


exports.getalluserroles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var userid =input.userId;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query("select us.USERID,us.USERNAME, DATE_FORMAT(ur.STARTDATE, '%d-%m-%Y')STARTDATE,DATE_FORMAT(ur.ENDDATE, '%d-%m-%Y')ENDDATE,r.DESCRIPTION,ur.ROLEID from users us ,user_roles ur ,roles r "+
                      " where ur.USERID =us.USERID  and ur.ROLEID =r.ROLEID  and r.ISACTIVE=1 and us.USERID=?",[userid], function(err, rows) {
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


exports.getallforloginroles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var isactive = 1;
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from roles ', [isactive], function(err, rows) {
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


exports.updateadditionalroles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var userid =input.userid;
    var startdate =input.startdate;
    var enddate =input.enddate; 
    mysqlLib.acquire(function(err, mclient) {

        console.log("User id" + userid);

   

        mclient.beginTransaction(function (err) {

                    var inData = {
                                               
                                                STARTDATE:startdate,
                                                ENDDATE:enddate
                                            };


                  var query = mclient.query("UPDATE USERS set ? where USERID =? ", [userid], function (err, rows) {
                  
                     if (err) {
                                console.log("Error inserting : %s ", err);
                                mclient.rollback(function () {
                                    var data = {
                                        success: 'FAILURE',
                                        message: 'User updation failed.Please try after some time'
                                    };
                                    //mclient.release(); 
                                    mysqlLib.release(mclient);
                                    res.end(JSON.stringify(data));
                                });
                            }else{

                              /*var nodemailer = require('nodemailer');
                                                var transport = nodemailer.createTransport({
                                                    host: 'smtp.gmail.com',
                                                    port: 587,
                                                    auth: {
                                                        user: 'myvoicetodayteam@gmail.com',
                                                        pass: 'osicpl@1'
                                                    }
                                                });
                                                var mailOptions = {
                                                    from: 'myvoicetodayteam@gmail.com',
                                                    to: email_id,
                                                    subject: 'Registered At myvoicetoday',
                                                    text: "Dear Citizen, \n\n"+
                                                            "Thank you for joining us to be part of myVoiceToday community.\n" +
                                                            "Your registration is completed and you can participate in your location improvement activities by posting requests. \n\n" +
                                                            "Password : " + input.password + " \n\n" +
                                                            "Please contact us at OSIBTBTatyourservice@gmail.com for any queries/assistance. \n\n" +
                                                            "Sincerely, \n" +
                                                            "myVoiceToday Team \n" +
                                                            "Email: OSIBTBTatyourservice@gmail.com \n\n" +
                                                            "Note:This is a system generated mail so please do not reply to this mail. "

                                                };

                                                transport.sendMail(mailOptions, function (error, info) {
                                                    /* if(error){
                                                     console.log(error);
                                                     res.json({yo: 'error'});
                                                     }else{
                                                     console.log('Message sent: ' + info.response);
                                                     res.json({yo: info.response});
                                                     };*/
                                                //});


                                                mclient.commit(function (err) {
                                                    console.log(err);
                                                    if (err) {
                                                        mclient.rollback(function () {
                                                            var data = {
                                                                success: 'FAILURE',
                                                                message: 'User deletion failed .Please try after some time'
                                                            };
                                                            mysqlLib.release(mclient);
                                                            res.end(JSON.stringify(data));
                                                        });
                                                    }
                                                    var data = {
                                                        success: 'SUCCESS',
                                                        message: ' User deleted successfully'
                                                    };

                                                    mysqlLib.release(mclient);
                                                    res.end(JSON.stringify(data));

                                                });   



                            }


                 


                  });        




                  });
  


    });

};