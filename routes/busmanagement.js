var mysqlLib = require("./mysqlLib").pool;


var fs = require('fs');

function upload(req, upload_files, type,name,imagename,imageurl, uploadfilecallback) {

    console.log("upload_files.length" + upload_files.length);
    if (upload_files.length > 0) {
        for (var i = 0; i < upload_files.length; i++) {
            var image = upload_files[i];
            var imageCount = i + 1;
            if(imagename=="0"){
            var imageName = name + "_" + Date.now() + "_" + imageCount + ".jpg";
            }else{
                imageName =imagename;
            }
            var base64Data = image.substring(image.indexOf(','), image.length);
            //for local
            var imagePath = __dirname.substring(0, __dirname.lastIndexOf('\\')) + '\\public\\app\\myRequestImages\\images\\'+type+'\\';

            //for linux
           // var dbImagePath = '\\app\\myRequestImages\\images\\'+type+'\\' + imageName;

            var attachment_name = imagePath + imageName;
            fs.writeFile(attachment_name, base64Data, 'base64', function (err) {
                console.log("err"+err);
                var  imageurl ="/app/myRequestImages/images/"+type+"/" + imageName;
                var data = {
                    success: 'SUCCESS',
                    attachment_name:imageurl,
                    image_name:imageName
                };
                uploadfilecallback(data);
            });
        }


    } else {
 
        var data = {
            success: 'SUCCESS',
            image_name:imagename,
            attachment_name:imageurl

        };
        uploadfilecallback(data);

    }
}


exports.getallbusecompanyForAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from company', function(err, rows) {
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

exports.getallbusecompanyForUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from company where IS_ACTIVE =1', function(err, rows) {
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


exports.addcompany = function(req, res) {
   
    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    var name =input.companyname;
    var imagename =input.imagename;
    var imageurl =input.imageurl;
    
   var uploadfilecallback = function (data)
    {
        console.log("data.attachment_name"+data.attachment_name);
        if (data.success == "SUCCESS")
        {
        var imageUrl =data.attachment_name;
        var imageName =data.image_name;
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save company'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
          
             

         var  insertData ={
               COMPANY_NAME:input.companyname, 
               LEGAL_NAME :input.legalname, 
               ADDRESS :input.address, 
               TRANSPORTATION_TYPE_ID :input.transportationtypeid,
               COUNTRY_ID :input.countryid, 
               CITY_ID :input.cityid, 
               IMAGE_URL:imageUrl, 
               IMAGE_NAME:imageName,
               IS_ACTIVE :input.active, 
               CREATED_BY:input.userid, 
               MOBILE_NO:input.mobileno
            }
    
            var query = mclient.query("insert into company set ?,CREATED_DATE =now()", insertData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save company'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                     var query = mclient.query('select ID from company where company_name =?',[input.companyname], function(err, rows) {
             
                
                 var companyid = rows[0].ID;

                        var contactcallback =function(result)
                        {


                         if(result.success=="SUCCESS")
                         {

                          mclient.commit(function (err) {
                                                console.log("ERRORS"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save bus company'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'bus company saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                         }else{

                           mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save bus company'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });


                         }

                        };

                        updatebusCompanyContact(companyid,req,res,mclient,contactcallback);
              


              });




                }
                
              
                 });
         
        
             }   
       
           });
       });
      }
      else{
         var data = {
                            success: 'FAILURE',
                            message: 'Failed to save language.Please try after some time'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));

      }
    };

    var upload_files = input.upload_images;
    upload(req, upload_files,"company",name,imagename,imageurl, uploadfilecallback);

};





function updatebusCompanyContact(companyid,req,res,mclient,contactcallback)
{

 var input = JSON.parse(JSON.stringify(req.body));

   var counter =1;

     var query = mclient.query(" delete from company_contacts where company_id =?",[companyid], function(err, rows){

    for( var k =0; k < input.items.length ;k++)
           {

             var fullname =input.items[k].c_name;
             var email =input.items[k].c_email;
             var officetel =input.items[k].c_office_phone;
             var mobileno =input.items[k].c_phone;
             var roleid =input.items[k].c_role;
            
              var insertData ={
              company_id :companyid,
              CONTACT_NAME: fullname,
              email:email,
              office_tel:officetel,
              mobile_no :mobileno,
              role_id :roleid,
              created_by:input.userid
              }
 
          var query = mclient.query(" insert into company_contacts set ?,created_date=now()",[insertData], function(err, rows){

               if(err)
                 {
                    console.log("Error inserting 260: %s ", err);
                        var resdata = {
                          success: 'FAILURE',
                         
                        };
                      contactcallback(resdata);
                    
                 }else{
                    
                     if(counter==input.items.length)
                         {


                           var resdata = {
                          success: 'SUCCESS',
                         
                        };
                      contactcallback(resdata);

                         }


                  counter++;

                 }



          });





           }

        });   



}


exports.updatecompany = function(req, res) {
   
    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    var name =input.name;
    var imagename =input.imagename;
    var imageurl =input.imageurl;
    
   var uploadfilecallback = function (data)
    {
        console.log("data.attachment_name"+data.attachment_name);
        if (data.success == "SUCCESS")
        {
        var imageUrl =data.attachment_name;
        var imageName =data.image_name;
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save company'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{

         
          
            var query = mclient.query("   update company set company_name =?,legal_name =?,ADDRESS=?,COUNTRY_ID=?,CITY_ID=?,IMAGE_URL=?,IMAGE_NAME=?,IS_ACTIVE=?,updated_by=?,MOBILE_NO=?,TRANSPORTATION_TYPE_ID=? where id =? ", 
            [input.companyname,input.legalname,input.address,input.countryid,input.cityid,imageUrl,imageName,input.active,input.userid,input.mobileno,input.transportationtypeid,companyid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save company'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));
                    });

                }else{
                    
                      var contactcallback =function(result)
                        {

                         if(result.success=="SUCCESS")
                         {

                          mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save bus company'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'bus company saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                         }else{

                           mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save bus company'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });


                         }

                        };

                        updatebusCompanyContact(companyid,req,res,mclient,contactcallback);  






                }
                
              
                 });
           
        
             }   
       
           });
       });
      }
      else{
         var data = {
                            success: 'FAILURE',
                            message: 'Failed to save language.Please try after some time'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));

      }
    };

    var upload_files = input.upload_images;
    upload(req, upload_files,"company",name,imagename,imageurl, uploadfilecallback);

};


exports.getallbusecompanyContacts = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from company_contacts where company_id =?',[companyid], function(err, rows) {
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



exports.addvehicletype = function(req, res) {
   
    var input = JSON.parse(JSON.stringify(req.body));
    var name =input.name;
    var imagename =input.image_name;
    var imageurl =input.image_url;
    
   var uploadfilecallback = function (data)
    {
        console.log("data.attachment_name"+data.attachment_name);
        if (data.success == "SUCCESS")
        {
        var imageUrl =data.attachment_name;
        var imageName =data.image_name;
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save vehicle type'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
          
             

         var  insertData ={
               vehicle_name:input.name, 
               brand :input.brand, 
               company_id :input.companyid, 
               no_of_seats :input.noofseats,
               tel :input.telephone, 
               amenities :input.amenities, 
               transportation_id:input.transportationid,
               image_url:imageUrl, 
               image_name:imageName,
               is_active :input.active, 
               created_by:input.userid ,
               seat_map :input.isseatmap
              }
                
            var query = mclient.query("insert into vehicle_type set ?,created_date =now()", insertData, function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save vehicle type'
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
                                                            message: 'Failed to save vehicle type'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Vehicle type saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

                    
               

                }
                
              
                 });
         
        
             }   
       
           });
       });
      }
      else{
         var data = {
                            success: 'FAILURE',
                            message: 'Failed to save vehicle type.Please try after some time'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));

      }
    };

    var upload_files = input.upload_images;
    upload(req, upload_files,"vehicletype",name,imagename,imageurl, uploadfilecallback);

};


exports.updatevehicletype = function(req, res) {
   
    var input = JSON.parse(JSON.stringify(req.body));
    var name =input.name;
    var imagename =input.image_name;
    var imageurl =input.image_url;
    
   var uploadfilecallback = function (data)
    {
        console.log("data.attachment_name"+data.attachment_name);
        if (data.success == "SUCCESS")
        {
        var imageUrl =data.attachment_name;
        var imageName =data.image_name;
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to save vehicle type'
                };
                //mclient.release(); 
                res.end(JSON.stringify(data));

            }else{
          
             

                
            var query = mclient.query("  update vehicle_type set  vehicle_name=?,brand=?,company_id=?,no_of_seats=?,tel=?,amenities=?,\
              transportation_id=?,image_url=?,image_name=?,is_active=?,updated_by=?,seat_map =?,updated_date=now() where id=?", [input.name,input.brand,input.companyid,
              input.noofseats,input.telephone,input.amenities,input.transportationid,imageUrl,imageName,input.active,input.userid,input.isseatmap,input.vehtypeid], function (err, rows) {
                
                 if (err) {
                    console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save vehicle type'
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
                                                            message: 'Failed to save vehicle type'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Vehicle type saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });

               

                }
                
              
                 });
         
        
             }   
       
           });
       });
      }
      else{
         var data = {
                            success: 'FAILURE',
                            message: 'Failed to save vehicle type.Please try after some time'
                        };
                        //mclient.release(); 
                        res.end(JSON.stringify(data));

      }
    };

    var upload_files = input.upload_images;
    upload(req, upload_files,"vehicletype",name,imagename,imageurl, uploadfilecallback);

};


exports.getallvehicletypeforAdmin = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {
   
        var query = mclient.query('select vt.ID, vt.VEHICLE_NAME, vt.BRAND, vt.COMPANY_ID, vt.NO_OF_SEATS, vt.TEL, vt.AMENITIES, vt.TRANSPORTATION_ID, vt.IMAGE_URL, vt.IMAGE_NAME, vt.SEAT_MAP, vt.IS_ACTIVE,c.COMPANY_NAME from vehicle_type vt,company c where vt.company_id=c.id ', function(err, rows) {
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


exports.getallvehicletypeforUser = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.acquire(function(err, mclient) {
   
        var query = mclient.query('select * from vehicle_type vt where vt.is_active=1', function(err, rows) {
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

exports.saveVehicle = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {

      mclient.beginTransaction(function (err) {


        var vehiclecallback =function(result)
        {
            var vehicleid =result.vehicleid;

         if(result.issuccess=="SUCCESS")
         {

          var deapturearrivalcallback =function(result)
          {

            if(result.issuccess=="SUCCESS")
            {

            var outdatedservicecallback =function(result)
            {

             if(result.issuccess=="SUCCESS")
             {

             var tickettypecallback =function(result)
             {

                if(result.issuccess=="SUCCESS")
                {

                 var ticketpricecallback =function(result)
                 {
                
                  if(result.issuccess=="SUCCESS")
                  {


                      mclient.commit(function (err) {
                                                console.log(err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to save vehicle'
                                                        };
                                                        mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                var data = {
                                                    success: 'SUCCESS',
                                                    message: 'vehicle saved successful'
                                                };

                                                mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

                                            });


                  }else{

                      mclient.rollback(function () {
            var data = {
            success: 'FAILURE',
            message: 'Failed to save vehicle'
            };
            mysqlLib.release(mclient);
            res.end(JSON.stringify(data));
            });

                  }





                 };
                 insertintoticketprice(req,res,vehicleid,mclient,ticketpricecallback);






                }
                else{

                       mclient.rollback(function () {
            var data = {
            success: 'FAILURE',
            message: 'Failed to save vehicle'
            };
            mysqlLib.release(mclient);
            res.end(JSON.stringify(data));
            });


                }


             };

              insertintotickettype(req,res,vehicleid,mclient,tickettypecallback);    

           

             }else{

                 mclient.rollback(function () {
            var data = {
            success: 'FAILURE',
            message: 'Failed to save vehicle'
            };
            mysqlLib.release(mclient);
            res.end(JSON.stringify(data));
            });

             }



            };

            insertintooutdatedservice(req,res,vehicleid,mclient,outdatedservicecallback);    





            }else{

                  mclient.rollback(function () {
            var data = {
            success: 'FAILURE',
            message: 'Failed to save vehicle'
            };
            mysqlLib.release(mclient);
            res.end(JSON.stringify(data));
            });


            }





          };


          insertintodepaturearrival(req,res,vehicleid,mclient,deapturearrivalcallback);


         } else{
           
            mclient.rollback(function () {
            var data = {
            success: 'FAILURE',
            message: 'Failed to save vehicle'
            };
            mysqlLib.release(mclient);
            res.end(JSON.stringify(data));
            });


         } 



        };

        if(vehid==0){

        insertintovehicle(req,res,mclient,vehiclecallback);
          }else{

            updatevehicle(req,res,mclient,vehid,vehiclecallback);
          }




           });
    });

};


function updatevehicle(req,res,mclient,vehid,vehiclecallback)
{

  var input = JSON.parse(JSON.stringify(req.body));

    var query = mclient.query('update vehicle set  company_id =?,vehicle_type_id=?,\
        veh_reg_number=?,route_id=?,week_days=?,updated_by=?,updated_date=now() where id=?',[input.companyid,input.vehtypeid,input.registrationno,
        input.routeid,input.dayofweek,input.userid,vehid], function(err, rows) {
       
            if(err)
            {
             var reqdata={
                 issuccess:"FAILURE"

             };
               vehiclecallback(reqdata);

            }else{

             var reqdata={
                 issuccess:"SUCCESS",
                  vehicleid :vehid

             };
               vehiclecallback(reqdata);

            }
         


       });


}




function insertintovehicle(req,res,mclient,vehiclecallback)
{

  var input = JSON.parse(JSON.stringify(req.body));

  var  insertData ={
              company_id:input.companyid,
              vehicle_type_id :input.vehicletypeid,
              veh_reg_number:input.registrationnumber,
              route_id:input.routeid,
              day_of_week:input.dayofweek,
              created_by:input.userid,
              is_active :input.active
         }

    var query = mclient.query('insert into vehicle set ?, created_by=?',insertData, function(err, rows) {
       
            if(err)
            {
             var reqdata={
                 issuccess:"FAILURE"

             };
               vehiclecallback(reqdata);

            }else{

         var query = mclient.query('select * from  vehicle where veh_reg_number =?',[input.registrationnumber], function(err, rows) {
           
             if(err)
            {
             var reqdata={
                 issuccess:"FAILURE"

             };
               vehiclecallback(reqdata);

            }else{

                    var reqdata={
                 issuccess:"SUCCESS",
                 vehicleid :rows[0].ID
                };
               vehiclecallback(reqdata);




            }



             });

            }
         


       });


}


function insertintovehicle(req,res,mclient,vehiclecallback)
{

  var input = JSON.parse(JSON.stringify(req.body));

  var  insertData ={
              company_id:input.companyid,
              vehicle_type_id :input.vehtypeid,
              veh_reg_number:input.registrationno,
              route_id:input.routeid,
              week_days:input.dayofweek,
              created_by:input.userid
         }

    var query = mclient.query('insert into vehicle set ?, created_date=now()',insertData, function(err, rows) {
       
            if(err)
            {
              console.log("error at 1052"+err);
             var reqdata={
                 issuccess:"FAILURE"

             };
               vehiclecallback(reqdata);

            }else{
             
         var query = mclient.query('select * from  vehicle where veh_reg_number =?',[input.registrationno], function(err, rows) {
           
             if(err)
            {
               console.log("error at 1065"+err);
             var reqdata={
                 issuccess:"FAILURE"

             };
               vehiclecallback(reqdata);

            }else{
              console.log("re"+rows.length);

                    var reqdata={
                 issuccess:"SUCCESS",
                 vehicleid :rows[0].ID
                };
               vehiclecallback(reqdata);




            }



             });

            }
         


       });


}

function insertintodepaturearrival(req,res,vehicleid,mclient,deapturearrivalcallback)
{
  var input = JSON.parse(JSON.stringify(req.body));


   var counter =1;

      if(input.deparrival.length>0){

     var query = mclient.query(" delete from vehicle_depature_arrival where veh_id =?",[vehicleid], function(err, rows){

    for( var k =0; k < input.deparrival.length ;k++)
           {

             var location =input.deparrival[k].c_location;
             var deprturehr =input.deparrival[k].c_depaturetime_HH;
              var deprturemm =input.deparrival[k].c_depaturetime_MM;
              var arrivalhr =input.deparrival[k].c_arrivaltime_HH;
              var arrivalmm =input.deparrival[k].c_arrivaltime_MM;
          
              var insertData ={
              location_id :location,
              departure_hr: deprturehr,
              departure_mm: deprturemm,
              arrival_hr:arrivalhr,
              arrival_mm:arrivalmm,
              veh_id :vehicleid
              }
 
          var query = mclient.query(" insert into vehicle_depature_arrival set ?",[insertData], function(err, rows){

               if(err)
                 {
                  console.log("error at 1131"+err);
                        var resdata = {
                          issuccess: 'FAILURE',
                         
                        };
                      deapturearrivalcallback(resdata);
                    
                 }else{
                    
                     if(counter==input.deparrival.length)
                         {


                           var resdata = {
                          issuccess: 'SUCCESS',
                         
                        };
                      deapturearrivalcallback(resdata);

                         }


                  counter++;

                 }



          });





           }

        });  


        }else{
          
        var resdata = {
        issuccess: 'SUCCESS',

        };
        deapturearrivalcallback(resdata);

        } 

}


function insertintooutdatedservice(req,res,vehicleid,mclient,outdatedservicecallback)
{
  var input = JSON.parse(JSON.stringify(req.body));


   var counter =1;

      if(input.outagedates.length>0){

     var query = mclient.query(" delete from vehicle_out_date where veh_id =?",[vehicleid], function(err, rows){

    for( var k =0; k < input.outagedates.length ;k++)
           {

             var outofdate =input.deparrival[k].date;
             
              var insertData ={
              veh_id :vehicleid,
              out_of_date: outofdate,
           
              }
              if(outofdate!=null) {
 
          var query = mclient.query(" insert into vehicle_out_date set ?",[insertData], function(err, rows){

               if(err)
                 {
                   console.log("error at 1209"+err);
                        var resdata = {
                          issuccess: 'FAILURE',
                         
                        };
                      outdatedservicecallback(resdata);
                    
                 }else{
                    
                     if(counter==input.outagedates.length)
                         {


                           var resdata = {
                          issuccess: 'SUCCESS',
                         
                        };
                      outdatedservicecallback(resdata);

                         }


                  counter++;

                 }



          });

         }else{

           var resdata = {
                          issuccess: 'SUCCESS',
                         
                        };
                      outdatedservicecallback(resdata);
         }





           }

        });  


        }else{
          
        var resdata = {
        issuccess: 'SUCCESS',

        };
        outdatedservicecallback(resdata);

        } 

}

function   insertintotickettype(req,res,vehicleid,mclient,tickettypecallback)  
{
  
  var input = JSON.parse(JSON.stringify(req.body));


   var counter =1;

      if(input.tickettypes.length>0){

     var query = mclient.query(" delete from vehicle_ticket_type where veh_id =?",[vehicleid], function(err, rows){

    for( var k =0; k < input.tickettypes.length ;k++)
           {

             var ticket_type =input.tickettypes[k].c_tickettype;
             
              var insertData ={
              veh_id :vehicleid,
              ticket_type: ticket_type,
           
              }
 
          var query = mclient.query(" insert into vehicle_ticket_type set ?",[insertData], function(err, rows){

               if(err)
                 {
                   console.log("error at 1287"+err);
                        var resdata = {
                          issuccess: 'FAILURE',
                         
                        };
                      tickettypecallback(resdata);
                    
                 }else{
                    
                     if(counter==input.tickettypes.length)
                         {


                           var resdata = {
                          issuccess: 'SUCCESS',
                         
                        };
                      tickettypecallback(resdata);

                         }


                  counter++;

                 }



          });





           }

        });  


        }else{
          
        var resdata = {
        issuccess: 'SUCCESS',

        };
        tickettypecallback(resdata);

        }



}

function  insertintoticketprice(req,res,vehicleid,mclient,ticketpricecallback)
{

  var input = JSON.parse(JSON.stringify(req.body));


   var counter =1;

      if(input.ticketprices.length>0){

     var query = mclient.query(" delete from vehicle_ticket_price where veh_id =?",[vehicleid], function(err, rows){

    for( var k =0; k < input.ticketprices.length ;k++)
           {

             var ticket_price =input.ticketprices[k].c_price;
             var start_point =input.ticketprices[k].c_pickuppoint;
             var drop_point =input.ticketprices[k].c_droppoint;
            var ticketype =input.ticketprices[k].c_tkttype;
            var discount =input.ticketprices[k].c_discounttype;
             
              var insertData ={
              veh_id :vehicleid,
              ticket_price: ticket_price,
              start_point:start_point,
              drop_point:drop_point,
              ticket_type:ticketype,
              discount:discount
           
              }
 
          var query = mclient.query(" insert into vehicle_ticket_price set ?",[insertData], function(err, rows){

               if(err)
                 {
                   console.log("error at 1371"+err);
                        var resdata = {
                          issuccess: 'FAILURE',
                         
                        };
                      ticketpricecallback(resdata);
                    
                 }else{
                    
                     if(counter==input.ticketprices.length)
                         {


                           var resdata = {
                          issuccess: 'SUCCESS',
                         
                        };
                      ticketpricecallback(resdata);

                         }


                  counter++;

                 }



          });





           }

        });  


        }else{
          
        var resdata = {
        issuccess: 'SUCCESS',

        };
        ticketpricecallback(resdata);

        }


}



    exports.getallvehicledepaturearrival = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehicleid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from vehicle_depature_arrival where veh_id =?',[vehicleid], function(err, rows) {
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

exports.getallvehicleoutofdate = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehicleid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select *,DATE_FORMAT(OUT_OF_DATE, "%Y-%m-%d")OUT_OF_DATE_FORMAT from vehicle_out_date where veh_id =?',[vehicleid], function(err, rows) {
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

exports.getallvehicletickettype = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehicleid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from vehicle_ticket_type where veh_id =?',[vehicleid], function(err, rows) {
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

exports.getallvehicleticketprice = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehicleid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from vehicle_ticket_price where veh_id =?',[vehicleid], function(err, rows) {
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


exports.getallvehicles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehicleid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select vh.ID,vh.COMPANY_ID,vh.VEH_REG_NUMBER,cc.COMPANY_NAME,vt.VEHICLE_NAME,rt.ROUTE_NAME from vehicle vh,company cc, routes rt,vehicle_type vt \
           where vh.company_id =cc.id and  vh.route_id =rt.id  and vh.vehicle_type_id =vt.id', function(err, rows) {
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


exports.getallvehicletypeById = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehtypeid =input.vehtypeid;
    
    mysqlLib.acquire(function(err, mclient) {
   
        var query = mclient.query('select * from vehicle_type where id =?',[vehtypeid], function(err, rows) {
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

exports.getallvehicletypebycompanyid = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {
   
        var query = mclient.query('select * from vehicle_type where company_id =?',[companyid], function(err, rows) {
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

exports.getvehiclebyid = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var vehicleid =input.vehid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from vehicle where id =?',[vehicleid], function(err, rows) {
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


exports.getallactivebuscompany = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from company where IS_ACTIVE =1 and id =?',[companyid], function(err, rows) {
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

exports.getallbuscompany = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select * from company where  id =?',[companyid], function(err, rows) {
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

exports.getallvehicletypeforcomapny = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    mysqlLib.acquire(function(err, mclient) {
   
        var query = mclient.query('select vt.ID, vt.VEHICLE_NAME, vt.BRAND, vt.COMPANY_ID, vt.NO_OF_SEATS, vt.TEL, vt.AMENITIES, vt.TRANSPORTATION_ID, vt.IMAGE_URL, vt.IMAGE_NAME, vt.SEAT_MAP, vt.IS_ACTIVE,c.COMPANY_NAME from vehicle_type vt,company c where vt.company_id=c.id and vt.company_id =?',[companyid], function(err, rows) {
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

exports.getallactivevehicletypes= function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var companyid =input.companyid;
    mysqlLib.acquire(function(err, mclient) {
   
        var query = mclient.query('select vt.ID, vt.VEHICLE_NAME, vt.BRAND, vt.COMPANY_ID, vt.NO_OF_SEATS, vt.TEL, vt.AMENITIES, vt.TRANSPORTATION_ID, vt.IMAGE_URL, vt.IMAGE_NAME, vt.SEAT_MAP, vt.IS_ACTIVE,c.COMPANY_NAME from vehicle_type vt,company c where vt.company_id=c.id and vt.company_id =? and vt.IS_ACTIVE =1',[companyid], function(err, rows) {
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


exports.getallcompanyvehicles = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
   var companyid =input.companyid;
    
    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select vh.ID,vh.COMPANY_ID,vh.VEH_REG_NUMBER,cc.COMPANY_NAME,vt.VEHICLE_NAME,rt.ROUTE_NAME from vehicle vh,company cc, routes rt,vehicle_type vt \
           where vh.company_id =cc.id and  vh.route_id =rt.id  and vh.vehicle_type_id =vt.id and vt.company_id =?',[companyid], function(err, rows) {
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

exports.getvehiclepickups = function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  var vehid = input.vehid;
  mysqlLib.acquire(function(err, mclient) {
    var query = mclient.query('select * from vehicle_pickup_points where veh_id =?', [vehid], function(err, rows) {
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

exports.getvehiclepdrops = function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  var vehid = input.vehid;
  mysqlLib.acquire(function(err, mclient) {
    var query = mclient.query('select * from vehicle_drop_points where veh_id =?', [vehid], function(err, rows) {
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
