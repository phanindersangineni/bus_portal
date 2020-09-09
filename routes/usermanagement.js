var mysqlLib = require("./mysqlLib").pool;

exports.adduserrole = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));

      mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {

      
          var inputData ={
            
            ROLE_NAME:input.rolename,
            TYPE:input.roletype,
            COMPANY_ID:input.companyid,
            SCREENS:'PRIVILEGED',
            IS_ACTIVE :input.isactive,
            CREATED_BY :input.userid
           }

       var query = mclient.query('insert into user_roles set ?,CREATED_DATE=now()',[inputData], function(err, rows) {
      
              if(err)
              {

              	   mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save tax.'
                        };
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });
              }else{

         var query = mclient.query('select * from user_roles where role_name =?',[input.rolename], function(err, rows) {
    
                var roleid =rows[0].ID;


                var screenprivilegecallback =function(result)
                {
                  
                  if(result.success=="SUCCESS")
                  {
                  	   mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save user role'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'user role saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });


                  }



                };
                rolescreenprivileges(req,res,roleid,mclient,screenprivilegecallback);




                 });

              }
 


                  });     

             });
         });

	}


  exports.updateuserrole = function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));

      mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {

      

       var query = mclient.query('update user_roles set IS_ACTIVE =?,TYPE=?,UPDATED_BY=?,UPDATED_DATE=now() where id=?',[input.isactive,input.roletype,input.userid,input.roleid], function(err, rows) {
      
              if(err)
              {

                   mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save user role.'
                        };
                        mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });
              }else{

                var roleid =input.roleid;


                var screenprivilegecallback =function(result)
                {
                  
                  if(result.success=="SUCCESS")
                  {
                       mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save user role'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'user role saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });


                  }



                };
                rolescreenprivileges(req,res,roleid,mclient,screenprivilegecallback);




                

              }
 


                  });     

             });
         });

  }

	function  rolescreenprivileges(req,res,roleid,mclient,screenprivilegecallback)
	{
   console.log("rolescreenprivileges"+roleid);
   var input = JSON.parse(JSON.stringify(req.body));

   var counter =1;

     var query = mclient.query(" delete from  role_permissions where role_id =?",[roleid], function(err, rows){

    for( var k =0; k < input.items.length ;k++)
           {

             var screenname =input.items[k].c_screen;
             var privilege =input.items[k].c_privilegetype;
            

              var insertData ={
              role_id :roleid,
              screen_id: screenname,
              permission_type:privilege,
              created_by :input.userid
             
              }
 
          var query = mclient.query(" insert into role_permissions set ?,created_date=now()",[insertData], function(err, rows){

               if(err)
                 {
                  console.log("ERROR 187"+err);
                        var resdata = {
                          success: 'FAILURE',
                         
                        };
                      screenprivilegecallback(resdata);
                    
                 }else{
                    
                     if(counter==input.items.length)
                         {


                           var resdata = {
                          success: 'SUCCESS',
                         
                        };
                      screenprivilegecallback(resdata);

                         }


                  counter++;

                 }



          });





           }

        });



	}


exports.menupermission = function(req, res) {
	

   var input = JSON.parse(JSON.stringify(req.body));
   var roleid =input.roleid;

      mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {		
   
   var input = JSON.parse(JSON.stringify(req.body));

   var counter =1;

     var query = mclient.query(" delete from  menu_permissions where role_id =?",[roleid], function(err, rows){

    for( var k =0; k < input.items.length ;k++)
           {

             var menuid =input.items[k].c_menu;
              var permissiontype =input.items[k].c_permission;
              var insertData ={
              role_id :roleid,
              menu_id: menuid,
              can_access:permissiontype,
              created_by :input.userid
             
              }
 
          var query = mclient.query(" insert into menu_permissions set ?,created_date=now()",[insertData], function(err, rows){

               if(err)
                 {
                  console.log("ERROR 187"+err);
                         mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save menu permissions'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                    
                 }else{
                    
                     if(counter==input.items.length)
                         {


                            mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save menu permissions'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Menu permissions saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                         }


                  counter++;

                 }



          });





           }

        });

      });
   });



	}

  exports.getallUserRolesForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from user_roles WHERE id !=1', function(err, rows) {
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

exports.getallUserRolesForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from user_roles where is_active=1 and id !=1', function(err, rows) {
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

exports.getallRolePermissionsbasedonRoleId = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var roleid =input.roleid;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('select * from role_permissions where role_id=?',[roleid], function(err, rows) {
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


exports.getallMenuPermissionsbasedonRoleId = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var roleid =input.roleid;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('select * from menu_permissions where role_id=?',[roleid], function(err, rows) {
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

exports.getallMenus= function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('select * from menus', function(err, rows) {
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
 

exports.addorupdateuser= function(req, res) {

   var input = JSON.parse(JSON.stringify(req.body));
   var base64 = require('base-64');
   var newuserid =input.newuserid;


    mysqlLib.acquire(function(err, mclient) {

        mclient.beginTransaction(function (err) { 
       
          if(newuserid==0)
          {
            var passwrd = base64.encode("welcome");

            var newpassword =base64.encode(passwrd);

           var insertData ={
              FULL_NAME :input.username, 
               TYPE :input.typeid,
               COMPANY_ID:input.companyid,
               CUSTOMER_ID:0, 
               ROLE_ID:input.roleid, 
               EMAIL:input.useremail,
               PASSWORD:newpassword,
               IS_ACTIVE:input.isactive, 
               CREATED_BY:input.userid 
              
           } 
            var query = mclient.query(" insert into user_tbl set ?,created_date=now()",[insertData], function(err, rows){

                   if(err)
                   {
                    console.log(err);
                      mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save user'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });

                   }else{
                


                            mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save user'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'user saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                              }

          
          });



          }else{
   

  var query = mclient.query("  update user_tbl set  FULL_NAME=?,type=?,COMPANY_ID=?,ROLE_ID=?,EMAIL=?,IS_ACTIVE=?,UPDATED_BY =?,updated_date=now() where id=?",
        [input.username,input.typeid,input.companyid,input.roleid,input.useremail,input.isactive,input.userid,newuserid], function(err, rows){

                
                 if(err)
                   {
                    console.log(err);
                      mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save user'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });

                   }else{
                


                            mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save user'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'user saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                              }



               });

          }


       

         });
    });


};

exports.getallRolesbyType = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var company =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('select * from user_roles where company_id=? and id !=1',[company], function(err, rows) {
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

exports.getallUsersForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var company =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('select ut.ID,ut.FULL_NAME,ut.TYPE,ut.COMPANY_ID,ut.ROLE_ID,ur.ROLE_NAME,ut.EMAIL,ut.IS_ACTIVE \
 from user_tbl ut,user_roles ur where ut.ROLE_ID =ur.ID and ut.ID !=1', function(err, rows) {
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