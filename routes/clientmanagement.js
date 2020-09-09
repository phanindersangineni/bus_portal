var jwt = require('jwt-simple');
var mysqlLib = require("./mysqlLib").pool;
var mail = require('../nodeMailerWithTemp');
exports.getalldefaultdestinations = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var fromlocation = input.fromlocation;
    var tolocation = input.tolocation;
    var traveldate = input.traveldate;
    var returndate = input.returndate;
    var iscount =  input.count;
     try{

    var pageno = 8 * (input.pageno - 1);

    mysqlLib.acquire(function(err, mclient) {
        if(err)
        {
            console.log("getalldefaultdestinations"+err);

        }

        var querystring = " select distinct rt.ROUTE_NAME,rt.START_LOCATION,rt.END_LOCATION,rt.DURATION,rt.IMAGE_URL,vh.ROUTE_ID,ct.NAME STARTLOCNAME, ct1.NAME ENDLOCNAME \
             from routes rt ,vehicle vh,city ct ,city ct1 ,vehicle_type vt \
              where  rt.id = vh.route_id  and vt.id =vh.VEHICLE_TYPE_ID \
              and rt.is_active=1 and rt.start_location =ct.id and rt.end_location=ct1.id";

        if (fromlocation != "N") {
            querystring = querystring + " and rt.start_location  in(" + fromlocation + ") ";
        }
        if (tolocation != "N") {
            querystring = querystring + " and rt.end_location  in(" + tolocation + ") ";
        }

        querystring = querystring + " and vh.id  not in( select veh_id from vehicle_out_date where out_of_date =current_date())";

        if (traveldate == "N") {
            var d = new Date();
            var n = d.getDay();
            console.log("n" + n);
            var daydesc = "";
            if (n == 1) {
                daydesc = "MONDAY";
            }
            if (n == 2) {
                daydesc = "TUESDAY";
            }
            if (n == 3) {
                daydesc = "WEDNESDAY";
            }
            if (n == 4) {
                daydesc = "THURSDAY";
            }
            if (n == 5) {
                daydesc = "FRIDAY";
            }
            if (n == 6) {
                daydesc = "SATURDAY";
            }
            if (n == 0) {
                daydesc = "SUNDAY";
            }

            querystring = querystring + " and vh.week_days  like '%" + daydesc + "%' ";

        }

          
          if(iscount=="N"){
        querystring = querystring + " order by 1 desc LIMIT " + pageno + ",8";
    }

        console.log("query"+querystring);

        var query = mclient.query(querystring, function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
               mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

               mysqlLib.release(mclient);
               
                res.end(JSON.stringify(rows));
               

            }
        });

    }, 0, {timeout: 5000});
  
  }catch(err)
  {
    console.log("err"+err);
  }

};


exports.getallvehiclesForSearch = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var pageno = 10 * (input.pageno - 1);
    var tolocation = input.tolocation;
    var fromlocation = input.fromlocation;
    var fromdate = input.fromdate;
    var todate = input.todate;
    var fromdesc = input.fromdesc;
    var todesc = input.todesc;
    var routeid =input.routeid;
    
    var noofseats =input.noofseats;
    var routesarray = [];
    var iscount =input.count;

    mysqlLib.acquire(function(err, mclient) {

     var query = mclient.query("SELECT  GROUP_CONCAT(distinct vt.veh_id SEPARATOR ', ') veh_id FROM vehicle_ticket_price vt ,vehicle vh where  vt.start_point =? and vt.drop_point =?  and vt.veh_id =vh.id and vh.trip_type ='F'", [fromlocation, tolocation], function(err, rows) {
         
     // var query = mclient.query('SELECT  * from vehicle_ticket_price', function(err, rows) {
            
         
            if (err) {
                console.log("err104"+err);
               mysqlLib.release(mclient);
                res.end(JSON.stringify(routesarray));

            } else {

                var vehicleid = rows[0].veh_id;

                console.log("veh_id"+vehicleid);

                var querystring = "  select distinct vt.ID VEH_TYPE_ID,vt.AMENITIES,vt.SEAT_MAP,rt.ROUTE_NAME,rt.DURATION,vh.ROUTE_ID,cp.ID COMPANY_ID,cp.COMPANY_NAME,cp.IMAGE_URL,vh.ID ,vh.VEH_REG_NUMBER,(select  concat(departure_hr,':',departure_mm )  from vehicle_depature_arrival  where veh_id =vh.id " +
                    " and id =( (select min(id) from vehicle_depature_arrival where veh_id =vh.id )))as departure, " +
                    " (select  concat(arrival_hr,':',arrival_mm )  from vehicle_depature_arrival  where veh_id =vh.id " +
                    " and id =( (select max(id) from vehicle_depature_arrival where veh_id =vh.id )))as arrival, " +
                    "( SELECT MAX(TICKET_PRICE)   from vehicle_ticket_price  WHERE veh_id =vh.id and start_point ="+fromlocation+" and drop_point="+tolocation+") maxprice, " +
                    " ( SELECT Min(TICKET_PRICE)   from vehicle_ticket_price  WHERE veh_id =vh.id and start_point ="+fromlocation+" and drop_point="+tolocation+") minprice " +
                    "from  vehicle  vh ,routes rt,company cp ,vehicle_type vt,vehicle_ticket_price vtt where rt.id=vh.route_id and rt.is_active =1 " +
                    " and  vh.company_id = cp.id and vh.trip_type='F' and vtt.veh_id =vh.ID and vt.id =vh.VEHICLE_TYPE_ID and vh.id in(" + vehicleid + ") ";

                if (fromlocation != "N") {
                    querystring = querystring + " and vtt.start_point  in(" + fromlocation + ") ";
                }
                if (tolocation != "N") {
                    querystring = querystring + " and vtt.drop_point  in(" + tolocation + ") ";
                }

                querystring = querystring + " and vh.id  not in( select veh_id from vehicle_out_date where out_of_date ='"+fromdate+"')";

                if (fromdate != "N") {
                    querystring = querystring + " and vh.week_days  like '%" + fromdesc + "%' ";

                }
                if(routeid!="N")
                {
                     querystring = querystring+" and vh.route_id ="+routeid+" ";
                }




                /*if (iscount == "N") {
                    querystring = querystring + " order by 1 asc LIMIT " + pageno + ",10";
                }*/
                console.log("querystring" + querystring);
                var indx=0;
                var query = mclient.query(querystring, function(err, rows) {
                    if (err) {
                       mysqlLib.release(mclient);
                        console.log("Error Selecting : %s ", err);
                        res.end(JSON.stringify(rows));
                    } else {
                        var counter = 0;
                        var totalrecords =rows.length; 

                        console.log("totalrecords"+totalrecords);
                        if(totalrecords >0){
                        var looparray =function(indx){

                            var row = rows[indx];
                            var vehtypeid = row.VEH_TYPE_ID;
                            var amentites = row.AMENITIES;
                            var vehid =row.ID;
                            var routeid = row.ROUTE_ID;
                            var companyname = row.COMPANY_NAME;
                            var imageurl = row.IMAGE_URL;
                            var vehregno = row.VEH_REG_NUMBER;
                            var duration = row.DURATION;
                            var price = row.maxprice;
                            var companyid = row.COMPANY_ID;
                            var seatmap =row.SEAT_MAP;
                            
                            var deparrcallback =function(data){
                              var dprture =data.departure;
                              var arrivl =data.arrival;
                              var depdate =data.departuredate;
                              var arrdate =data.arrivaldate;
                              var departure = dprture;
                             var arrival = arrivl;

                             var canaddrecord =true;

                             var d = new Date();
                             var hh = d.getHours();
                             var mm  =d.getMinutes();

                             var traveldate = new Date(fromdate);
                            
                              var departuresplit  =dprture.split(":");
                              var dephh =departuresplit[0];
                              var depmm =departuresplit[1];
                             var Departuredate =new Date();
                             if(traveldate.toDateString()==Departuredate.toDateString())
                             {

                                console.log("Travelling today only");
                                traveldate.setHours(hh);
                                traveldate.setMinutes(mm);
                                Departuredate.setHours(dephh);
                                Departuredate.setMinutes(depmm);

                            if (traveldate.getTime() > Departuredate.getTime())
                             {
                                console.log("Booking date time is greater");
                                canaddrecord =false;

                             }

                             }

                             
                            

                              console.log("1");
                             
                            var seatscallback =function(datares){
                                var availableseats =datares.availableseats;
                                 console.log("2");
                                   
                            var amentitescallback = function(dataamens) {

                                     console.log("3");
                                    var amenties = [];
                                     
                                     if(noofseats<= availableseats) {
                                        if(canaddrecord){
                                    var listdata = {
                                        routeid: routeid,
                                        companyname: companyname,
                                        imageurl: imageurl,
                                        vehid: vehid,
                                        vehregno: vehregno,
                                        duration: duration,
                                        departure: departure,
                                        arrival: arrival,
                                        price: price,
                                        vehtypeid: vehtypeid,
                                        amenties: dataamens.amenities,
                                        companyid: companyid,
                                        availableseats:availableseats,
                                        departuredate:depdate,
                                        arrdate:arrdate,
                                        seatmap:seatmap,
                                        tripetype:"F"

                                    }

                                    routesarray.push(listdata);
                                }
                                   
                                }
                                
                                
                                 var counter = totalrecords-1;
                                
                                console.log("counte228r"+counter);
                                 console.log("indx229"+indx);
                                  console.log("todate"+todate);
                                
                                if (indx == counter) {
                                   
                                    if(todate=="N"){

                                   mysqlLib.release(mclient);
                                     if (iscount == "N") {
                                    res.end(JSON.stringify(routesarray));
                                }else{
                                    var resdata ={
                                        count:routesarray.length
                                    }
                                    res.end(JSON.stringify(resdata));

                                }

                            }else{
                                 /*if (iscount == "N") {*/
                                  mysqlLib.release(mclient);
                                getallvehiclesForReturn(req,res,routesarray,"0");
                            /*}*/
                            /*else{
                                  mysqlLib.release(mclient);
                                getallvehiclesForReturn(req,res,routesarray,routesarray.length); 
                            }*/


                            }
                                

                                }else{

                                     indx=indx+1;
                                    looparray(indx);
                                }

                                

                            };

                            getallamenitiesforvehicle(amentites, mclient, amentitescallback);

                          };
                          getavailbleseats(vehid,fromdate,fromlocation,tolocation,mclient,seatscallback);

                         };

                         getdeparturearrivaltime(vehid,fromdate,fromlocation,tolocation,mclient,deparrcallback)
                         
                        }
                     looparray(indx);
                     }else{
                       mysqlLib.release(mclient);
                        
                        res.end(JSON.stringify(routesarray));

                     }



                    }
                });
            }
        });

    });

};

exports.getreturntriponly = function(req, res) {
 
  var input = JSON.parse(JSON.stringify(req.body));
    var pageno = 10 * (input.pageno - 1);
    var tolocation = input.tolocation;
    var fromlocation = input.fromlocation;
    var fromdate = input.fromdate;
    var todate = input.todate;
    var fromdesc = input.fromdesc;
    var todesc = input.todesc;
    
    var noofseats =input.noofseats;
    var routesarray = [];
    var iscount =input.count;

     getallvehiclesForReturn(req,res,routesarray,routesarray.length); 

    };


function getallvehiclesForReturn(req, res,routesarray,reccount) {
      console.log("routesarray"+JSON.stringify(routesarray));
    var input = JSON.parse(JSON.stringify(req.body));
    var pageno = 10 * (input.pageno - 1);
    var tolocation = input.tolocation;
    var fromlocation = input.fromlocation;
    var fromdate = input.fromdate;
    var todate = input.todate;
    var fromdesc = input.fromdesc;
    var todesc = input.todesc;
    var routeid =input.routeid;
    
    var noofseats =input.noofseats;
    
    var iscount =input.count;

    mysqlLib.acquire(function(err, mclient) {

     var query = mclient.query("SELECT  GROUP_CONCAT(distinct vt.veh_id SEPARATOR ', ') veh_id FROM vehicle_ticket_price vt ,vehicle vh where  vt.start_point =? and vt.drop_point =?  and vt.veh_id =vh.id and vh.trip_type ='R' ", [tolocation,fromlocation], function(err, rows) {
         
     // var query = mclient.query('SELECT  * from vehicle_ticket_price', function(err, rows) {
            
         
            if (err) {
                console.log("err104"+err);
               mysqlLib.release(mclient);
                res.end(JSON.stringify(routesarray));

            } else {

                var vehicleid = rows[0].veh_id;

              
              
                var querystring = "  select distinct vt.ID VEH_TYPE_ID,vt.AMENITIES,vt.SEAT_MAP,rt.ROUTE_NAME,rt.DURATION,vh.ROUTE_ID,cp.ID COMPANY_ID,cp.COMPANY_NAME,cp.IMAGE_URL,vh.ID ,vh.VEH_REG_NUMBER,(select  concat(departure_hr,':',departure_mm )  from vehicle_depature_arrival  where veh_id =vh.id " +
                    " and id =( (select min(id) from vehicle_depature_arrival where veh_id =vh.id )))as departure, " +
                    " (select  concat(arrival_hr,':',arrival_mm )  from vehicle_depature_arrival  where veh_id =vh.id " +
                    " and id =( (select max(id) from vehicle_depature_arrival where veh_id =vh.id )))as arrival, " +
                    "( SELECT MAX(TICKET_PRICE)   from vehicle_ticket_price  WHERE veh_id =vh.id  and start_point ="+tolocation+" and drop_point="+fromlocation+" ) maxprice, " +
                    " ( SELECT Min(TICKET_PRICE)   from vehicle_ticket_price  WHERE veh_id =vh.id and start_point ="+tolocation+" and drop_point="+fromlocation+" ) minprice " +
                    "from  vehicle  vh ,routes rt,company cp ,vehicle_type vt,vehicle_ticket_price vtt where rt.id=vh.route_id and rt.is_active =1 " +
                    " and  vh.company_id = cp.id and vh.trip_type='R' and vtt.veh_id =vh.ID and vt.id =vh.VEHICLE_TYPE_ID and vh.id in(" + vehicleid + ") ";

                if (fromlocation != "N") {
                    querystring = querystring + " and vtt.start_point  in(" + tolocation + ") ";
                }
                if (tolocation != "N") {
                    querystring = querystring + " and vtt.drop_point  in(" + fromlocation + ") ";
                }

                querystring = querystring + " and vh.id  not in( select veh_id from vehicle_out_date where out_of_date ='"+todate+"')";

                if (todate != "N") {
                    querystring = querystring + " and vh.week_days  like '%" + todesc + "%' ";

                }

                 if(routeid!="N")
                {
                     querystring = querystring+" and vh.route_id ="+routeid+" ";
                }


               /* if (iscount == "N") {
                    querystring = querystring + " order by 1 asc LIMIT " + pageno + ",10";
                }*/
                console.log("querystring" + querystring);
                var query = mclient.query(querystring, function(err, rows) {
                    if (err) {
                        console.log("Error Selecting : %s ", err);
                       mysqlLib.release(mclient);
                        res.end(JSON.stringify(rows));
                    } else {
                        console.log("354>>"+rows.length);
                        var totalrecords =rows.length;
                        var indx =0;
                        if(rows.length>0){
                        var counter = 0;
                         var looparray =function(indx){

                            var row = rows[indx];
                            var vehtypeid = row.VEH_TYPE_ID;
                            var amentites = row.AMENITIES;
                            var routeid = row.ROUTE_ID;
                            var companyname = row.COMPANY_NAME;
                            var imageurl = row.IMAGE_URL;
                            var vehid = row.ID;
                            var vehregno = row.VEH_REG_NUMBER;
                            var duration = row.DURATION;
                            var price = row.maxprice;
                            var companyid = row.COMPANY_ID;
                            var seatmap =row.SEAT_MAP;

                            var deparrcallback =function(data){
                              var dprture =data.departure;
                              var arrivl =data.arrival;
                              var depdate =data.departuredate;
                              var arrdate =data.arrivaldate;
                               var departure = dprture;
                               var arrival = arrivl;

                               var canaddrecord =true;

                             var d = new Date();
                             var hh = d.getHours();
                             var mm  =d.getMinutes();

                             var traveldate = new Date(todate);
                            
                              var departuresplit  =dprture.split(":");
                              var dephh =departuresplit[0];
                              var depmm =departuresplit[1];
                             var Departuredate =new Date();
                             if(traveldate.toDateString()==Departuredate.toDateString())
                             {

                                console.log("Travelling today only");
                                traveldate.setHours(hh);
                                traveldate.setMinutes(mm);
                                Departuredate.setHours(dephh);
                                Departuredate.setMinutes(depmm);

                            if (traveldate.getTime() > Departuredate.getTime())
                             {
                                console.log("Booking date time is greater");
                                canaddrecord =false;

                             }

                             }

                            var seatscallback =function(datares){
                                var availableseats =datares.availableseats;

                            var amentitescallback = function(dataamens) {

                                    var amenties = [];
                                    console.log("availableseats"+availableseats);
                                     if(noofseats<= availableseats) {
                                        if(canaddrecord){
                                    var listdata = {
                                        routeid: routeid,
                                        companyname: companyname,
                                        imageurl: imageurl,
                                        vehid: vehid,
                                        vehregno: vehregno,
                                        duration: duration,
                                        departure: departure,
                                        arrival: arrival,
                                        price: price,
                                        vehtypeid: vehtypeid,
                                        amenties: dataamens.amenities,
                                        companyid: companyid,
                                        availableseats:availableseats,
                                        departuredate:depdate,
                                        arrdate:arrdate,
                                        seatmap:seatmap,
                                        tripetype:"R"

                                    }

                                    routesarray.push(listdata);
                                }
                                }
                                

                                var counter = totalrecords-1;
                                if (counter == indx) {
                                   console.log("start release");
                                   mysqlLib.release(mclient);
                                    /* if (iscount == "N") {*/
                                        console.log("release");
                                    res.end(JSON.stringify(routesarray));
                                /*}*/
                                /*else{
                                    var recounter =reccount+routesarray.length;
                                    var resdata ={
                                        count:recounter
                                    }
                                    res.end(JSON.stringify(resdata));

                                }*/
                                

                                }else{
                                     indx=indx+1;
                                     looparray(indx);

                                }

                               

                            };

                            getallamenitiesforvehicle(amentites, mclient, amentitescallback);

                          };
                          getavailbleseats(vehid,todate,tolocation,fromlocation,mclient,seatscallback);

                         };

                         getdeparturearrivaltime(vehid,todate,tolocation,fromlocation,mclient,deparrcallback)

                        }
                         looparray(indx);

                    }else{
                          mysqlLib.release(mclient);
                           res.end(JSON.stringify(routesarray));
                          
                    }




                    }
                });
            }
        });

    });

};



function getallamenitiesforvehicle(amentites, mclient, amentitescallback) {

    var querystring = " select ID AM_ID,NAME,IMAGE_URL IMG_URL from amenities where id in("+amentites+")";

    var query = mclient.query(querystring, [amentites], function(err, rows) {
        if (err) {
            var resdata = {
                success: "FAILURE",
                amenities: rows

            }
        } else {

            var resdata = {
                success: "SUCCESS",
                amenities: rows

            }
            amentitescallback(resdata);

        }
    });

}

function getdeparturearrivaltime(vehid,fromdate,selectfromloc,selecttoloc,mclient,deparrcallback)
{

var querystring = "  select  concat(departure_hr,':',departure_mm ) departure,departure_hr,departure_mm  from vehicle_depature_arrival  where veh_id =? and location_id =?";
 
  var query = mclient.query(querystring, [vehid,selectfromloc], function(err, rows) {

     if(err)
     {
        console.log("err at getdeparturearrivaltime"+err);
         
            var resdata = {
                departure: 0,
                arrival :0,
                departuredate:0,
                arrivaldate:0

            };
            deparrcallback(resdata);

     }else{

       var departure =rows[0].departure;
       var departurehr =rows[0].departure_hr;
       var departuremm =rows[0].departure_mm;


    var querystring = "  select  concat(arrival_hr,':',arrival_mm ) arrival,arrival_hr,arrival_mm  from vehicle_depature_arrival  where veh_id =? and location_id =?";
   
       var query = mclient.query(querystring, [vehid,selecttoloc], function(err, rows) {

        if(err)
        {
          console.log("err at 532 getdeparturearrivaltime"+err);
          var resdata = {
                departure: 0,
                arrival :0,
                departuredate:0,
                arrivaldate:0

            };
            deparrcallback(resdata);

        }else{

         var arrival =rows[0].arrival;
         var arrivalhr =rows[0].arrival_hr;
         var arrivalmm = rows[0].arrival_mm;

         var departr =departurehr+"."+departuremm;

         var arrvtr =arrivalhr+"."+arrivalmm;

         var  dephour="";
          var  arrhour="";
          var nextday=0;

           if(departr>12)
           {
             dephour ="PM";

                    if(arrvtr >12)
                    {
                    arrhour ="PM";
                    }else{
                    nextday =1;
                    arrhour ="AM";
                    }


           }else{

                if(departr <12)
                {
                    dephour ="AM";

                if(arrvtr< 12 && departr <arrival)
                {
                    arrhour ="AM";
               
                }
                else if(arrvtr>12 && departr < arrival)
                {
                    arrhour ="PM";
               

                }else if( arrvtr < 12 && departr > arrvtr)
                {
                nextday=1;
                 arrhour ="AM";
                }


                }



           }
          

            var currendate = new Date(fromdate);
            var  month = '' + (currendate.getMonth() + 1);
            var  day =  currendate.getDate();
            var  year = currendate.getFullYear();
            var n = currendate.getDay();

            console.log("n"+n);
            var monthdesc ="";
               var descday ="";

                if(n==1){descday ="MON";}
                if(n==2){descday ="TUE";}
                if(n==3){descday ="WED";}
                if(n==4){descday ="THU";}
                if(n==5){descday ="FRI";}
                if(n==6){descday ="SAT";}
                if(n==0){descday ="SUN";} 
                console.log("descday"+descday);
            
               
                if(month==1){monthdesc ="JAN";}
                if(month==2){monthdesc ="FEB";}
                if(month==3){monthdesc ="MAR";}
                if(month==4){monthdesc ="APR";}
                if(month==5){monthdesc ="MAY";}
                if(month==6){monthdesc ="JUN";}
                if(month==7){monthdesc ="JUL";}
                if(month==8){monthdesc ="AUG";}
                if(month==9){monthdesc ="SEP";}
                if(month==10){monthdesc ="OCT";}
                if(month==11){monthdesc ="NOV";}
                if(month==12){monthdesc ="DEC";}


                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;


               

               var departuredate =descday+","+day+","+ monthdesc; 
               var arrivaldate ="";

               if(nextday==0)
               {
                arrivaldate =descday+","+day+","+ monthdesc;
               }  else{

                 var tomorrowdate = new Date(fromdate);
            var  tmonth = '' + (tomorrowdate.getMonth() + 1);
            var  tday = ''+(tomorrowdate.getDate()+1);
            var  tyear = tomorrowdate.getFullYear();
             var nn = tomorrowdate.getDay();

           
               var tmonthdesc ="";
               var tdescday ="";
                if(tmonth==1){tmonthdesc ="JAN";}
                if(tmonth==2){tmonthdesc ="FEB";}
                if(tmonth==3){tmonthdesc ="MAR";}
                if(tmonth==4){tmonthdesc ="APR";}
                if(tmonth==5){tmonthdesc ="MAY";}
                if(tmonth==6){tmonthdesc ="JUN";}
                if(tmonth==7){tmonthdesc ="JUL";}
                if(tmonth==8){tmonthdesc ="AUG";}
                if(tmonth==9){tmonthdesc ="SEP";}
                if(tmonth==10){tmonthdesc ="OCT";}
                if(tmonth==11){tmonthdesc ="NOV";}
                if(tmonth==12){tmonthdesc ="DEC";}

                if(nn==1){tdescday ="MON";}
                if(nn==2){tdescday ="TUE";}
                if(nn==3){tdescday ="WED";}
                if(nn==4){tdescday ="THU";}
                if(nn==5){tdescday ="FRI";}
                if(nn==6){tdescday ="SAT";}
                if(nn==0){tdescday ="SUN";} 
                console.log("tdescday"+tdescday);

                 if (tmonth.length < 2) tmonth = '0' + tmonth;
                 if (tday.length < 2) tday = '0' + tday;


                arrivaldate =tdescday+","+ day+","+monthdesc; 


               }


           var resdata = {
                departure: departure,
                arrival :arrival,
                departuredate:departuredate,
                arrivaldate:arrivaldate

            };
            deparrcallback(resdata);

        }



       });

     }


  });


}

function getavailbleseats(vehid,traveldate, selectfromloc, selecttoloc, mclient, seatscallback) {
     
    console.log("available seats");
    var querystring = " select * from vehicle_seats_booking where veh_id =? and booking_date =?";


    var query = mclient.query(querystring, [vehid,traveldate], function(err, rows) {


        if (err) {
            console.log("err259"+err);
            var resdata = {
                availableseats: 0

            };
            seatscallback(resdata);

        } else {
             console.log("row"+rows.length);

            if (rows.length == 0) {
                var querystring = "select * from vehicle_seats_availability where veh_id=? and from_loc =? and to_loc =?";

                var query = mclient.query(querystring, [vehid, selectfromloc, selecttoloc], function(err, rows) {

                    if (err) {
                        console.log("err 274"+err);
                        var resdata = {
                            availableseats: 0

                        };
                        seatscallback(resdata);


                    } else {
                        
                        if (rows.length > 0) {

                            var canbook = rows[0].CAN_BOOK_SEATS;
                            var resdata = {
                                availableseats: canbook

                            };
                            seatscallback(resdata);


                        }else{
                             

                          var resdata = {
                            availableseats: 0

                        };
                        seatscallback(resdata);   
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

                    console.log("fromloc"+fromloc);
                     console.log("toloc"+toloc);
                     console.log("seats"+seats);
                      console.log("selectfromloc"+selectfromloc);
                       console.log("selectfromloc"+selecttoloc);

                    if (isBetween(selectfromloc, fromloc, toloc)) {
                         console.log("1");
                       if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(selecttoloc, fromloc, toloc) && !isbetweencheck) {
                         console.log("2");
                       if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(fromloc, selecttoloc, toloc) && !isbetweencheck) {
                         console.log("2");
                       if(seatstominus==0)
                         {
                            seatstominus =seats;
                         }else{
                           seatstominus =seatstominus+seats;
                         }
                        isbetweencheck = true;
                    } else if (isBetween(toloc, fromloc, selecttoloc) && !isbetweencheck) {
                         console.log("4");
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

                      console.log("counter 848"+counter);
                         console.log("rows"+rows.length);
                          var counter = totalrecords-1;

                    if (indx == counter) {

                        var querystring = "select * from vehicle_seats_availability where veh_id=? and from_loc =? and to_loc =?";

                        var query = mclient.query(querystring, [vehid, selectfromloc, selecttoloc], function(err, rows) {

                            if (err) {
                                var resdata = {
                                    availableseats: 0

                                };
                                seatscallback(resdata);


                            } else {

                                if (rows.length > 0) {

                                    var canbook = rows[0].CAN_BOOK_SEATS;

                                    var totalavailableseats =canbook-seatstominus;
                                    var resdata = {
                                        availableseats: totalavailableseats

                                    };
                                    seatscallback(resdata);


                                

                                }



                            }


                        });




                    }else{
                       indx=indx+1;
                      looparray(indx);
                    }


                }

               looparray(indx);




            }



        }



    });


}

function isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0
}


exports.getalldetailsbyRouteandvehicleid = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var iscount = input.iscount;

    var routeid = input.routeid;

    mysqlLib.acquire(function(err, mclient) {

        var querystring = "select vh.ID ,vh.VEH_REG_NUMBER,(select  concat(departure_hr,':',departure_mm )  from vehicle_depature_arrival  where veh_id =vh.id \
         and id =( (select min(id) from vehicle_depature_arrival where veh_id =vh.id )))as departure, \
         (select  concat(arrival_hr,':',arrival_mm )  from vehicle_depature_arrival  where veh_id =vh.id \
          and id =( (select max(id) from vehicle_depature_arrival where veh_id =vh.id )))as arrival \
          ( SELECT MAX(TICKET_PRICE)   from vehicle_ticket_price  WHERE veh_id =vh.id) maxprice, \
          ( SELECT Min(TICKET_PRICE)   from vehicle_ticket_price  WHERE veh_id =vh.id) minprice \
          from  vehicle  vh   where vh.route_id =? ";



        var query = mclient.query(querystring, [routeid], function(err, rows) {
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


exports.getallCitysByRouteId = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var routeid = input.routeid;

    mysqlLib.acquire(function(err, mclient) {



        var query = mclient.query('select rcl.ID,rcl.ROUTE_ID,rcl.CITY_ID,rcl.IS_ACTIVE,ct.NAME from routes_city_list  rcl,city ct \
                  where ct.ID =rcl.CITY_ID and rcl.IS_ACTIVE=1 and rcl.route_id=? and rcl.is_active=1', [routeid], function(err, rows) {
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

exports.fromlocation = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    mysqlLib.acquire(function(err, mclient) {
        /* var query = mclient.query('  select distinct ct.id,ct.NAME from  routes rt ,city ct \
             where rt.START_LOCATION =ct.id and rt.is_active =1', function(err, rows) {
                  if (err) {
                      console.log("Error Selecting : %s ", err);
                      res.end(JSON.stringify(rows));
                  } else {

                     mysqlLib.release(mclient);
                      res.end(JSON.stringify(rows));

                  }
              });*/

        var query = mclient.query('  select distinct vp.START_POINT,ct.NAME from vehicle_ticket_price vp, \
      city  ct where vp.START_POINT =ct.ID ', function(err, rows) {
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

exports.tolocation = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var location = input.tolocation;

    mysqlLib.acquire(function(err, mclient) {
        /* var query = mclient.query('  select distinct ct.id,ct.NAME from  routes rt ,city ct \
             where rt.END_LOCATION =ct.id and rt.is_active =1 and rt.start_location =?',[location], function(err, rows) {
                  if (err) {
                      console.log("Error Selecting : %s ", err);
                      res.end(JSON.stringify(rows));
                  } else {

                     mysqlLib.release(mclient);
                      res.end(JSON.stringify(rows));

                  }
              });*/

        var query = mclient.query('  select distinct vp.DROP_POINT,ct.NAME from vehicle_ticket_price vp, city  ct \
    where vp.DROP_POINT =ct.ID  AND  vp.START_POINT =?', [location], function(err, rows) {
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


exports.getticketprice = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var fromloc = input.fromloc;
    var toloc =input.toloc;
    var vehid =input.vehid;

    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query('SELECT  TICKET_PRICE,TICKET_TYPE,DISCOUNT from vehicle_ticket_price \
            where start_point =? and drop_point =? and veh_id=?', [fromloc,toloc,vehid], function(err, rows) {
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


exports.getfees = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var companyid = input.companyid;
    

    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query(' select sr.NAME,fe.COMISSION_FEES from service sr, fees  fe where sr.ID =fe.SERVICE_ID and sr.IS_ACTIVE =1 and fe.IS_ACTIVE =1 \
         and fe.COMPANY_ID =? ', [companyid], function(err, rows) {
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

exports.gettaxes = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

  
    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query(' select TAX_NAME,TAX_PERCENTAGE from tax where  now() between from_date and to_date', function(err, rows) {
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

exports.getbookingscount = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
      var customerid= input.customerid;
  
    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query(' select count(*) counts from bookings where customer_id =? ',[customerid] ,function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                  mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                var resdata ={
                    count :rows[0].counts
                }
               mysqlLib.release(mclient);
                res.end(JSON.stringify(resdata));

            }
        });

    });

};

exports.getvehiclecount = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
     
    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query(' select count(*) counts from vehicle ',function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                  mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                var resdata ={
                    count :rows[0].counts
                }
               mysqlLib.release(mclient);
                res.end(JSON.stringify(resdata));

            }
        });

    });

};

exports.getcompanycount = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
     
    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query(' select count(*) counts from company ',function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                  mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                var resdata ={
                    count :rows[0].counts
                }
               mysqlLib.release(mclient);
                res.end(JSON.stringify(resdata));

            }
        });

    });

};

exports.getroutescount = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
     
    mysqlLib.acquire(function(err, mclient) {
   

        var query = mclient.query(' select count(*) counts from routes ',function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                  mysqlLib.release(mclient);
                res.end(JSON.stringify(rows));
            } else {

                var resdata ={
                    count :rows[0].counts
                }
               mysqlLib.release(mclient);
                res.end(JSON.stringify(resdata));

            }
        });

    });

};

exports.changePassword = function(req, res) {
    
      
    var input = JSON.parse(JSON.stringify(req.body));
    var oldPassword =input.oldpassword;
    var newPassword =input.newpassword;
    var emailId =input.emailId;
     var base64 = require('base-64');
    var oldPassword1 = base64.encode(oldPassword);

    var oldPassword2 =base64.encode(oldPassword1);

    var newPassword1 = base64.encode(newPassword);

    var newPassword2 =base64.encode(newPassword1);
        
   console.log("oldPassword2"+oldPassword2);
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to update Password'
                };
                //mysqlLib.release(mclient); 
                  mysqlLib.release(mclient);
                res.end(JSON.stringify(data));

            }
            else
            {
         
           var query = mclient.query("select * from user_tbl where EMAIL =? and PASSWORD=?", [emailId,oldPassword2], function (err, rows) {
            
             if(err)
             {
                 console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to save customer.'
                        };
                          mysqlLib.release(mclient);
                        res.end(JSON.stringify(data));
                    });

             }
              //console.log(rows);
               if(rows.length > 0)
              {
    
                 var username =rows[0].FULL_NAME;
                 var email =rows[0].EMAIL;                                  
                
            
                  var query = mclient.query(" update user_tbl set PASSWORD=? where EMAIL =?",[newPassword2,emailId], function(err, rows){

                    
                       mclient.commit(function (err) {
                                                console.log("error user::"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to change password'
                                                        };
                                                       mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                else{
                                                     mail.sendChangePassword(email,username,newPassword);
                            
                                                 var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Password changed successfully'
                                                };

                                               mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));
                                            }
                                               
                                            }); 
                                            
                                      

                                                
                          //   });
                       });//USER TABLE UPDATING


                
            
           }else{

                var data = {
                            success: 'FAILURE',
                              message: 'User Password not matched!'
                                                };

                                               mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

            }

           });
          

           
        
         
         }   
       
         });
    });

};//change password end 



//change user mail begining
exports.changeEmail = function(req, res) {
    
      
    var input = JSON.parse(JSON.stringify(req.body));
    var oldemail =input.oldemail;
    var newemail =input.newemail;
 
   
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           
           if (err) {
                var data = {
                    success: 'FAILURE',
                    message: 'Failed to update Password'
                };
                 mysqlLib.release(mclient);
                res.end(JSON.stringify(data));

            }
            else
            {
         
           var query = mclient.query("select * from customer where email =?", [oldemail], function (err, rows) {
            
             if(err)
             {
                 console.log("Error inserting : %s ", err);
                    mclient.rollback(function () {
                        var data = {
                            success: 'FAILURE',
                            message: 'Failed to updating user email.'
                        };
                          mysqlLib.release(mclient); 
                        res.end(JSON.stringify(data));
                    });

             }
              //console.log(rows);
               if(rows.length > 0)
              {
    
                                                
                
            
                  var query = mclient.query(" update user_tbl set EMAIL=? where EMAIL =?",[newemail,oldemail], function(err, rows){

                    
                       mclient.commit(function (err) {
                                                console.log("error user::"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to updating user email.'
                                                        };
                                                       mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                
                        var query = mclient.query(" update customer set email=? where email =?",[newemail,oldemail], function(err, rows){

                    
                       mclient.commit(function (err) {
                                                console.log("error user::"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to updating user email.'
                                                        };
                                                       mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }else{
                                                
                                                 var data = {
                                                    success: 'SUCCESS',
                                                    message: 'User email updated successfully'
                                                };

                                               mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));
                                            }
                                               
                                            }); 
                                            
                                            

                                                
                         
                       });//Customer TABLE UPDATING

                       
                                                /* var data = {
                                                    success: 'SUCCESS',
                                                    message: 'User email updated successfully'
                                                };

                                               mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));*/
                                               
                                            }); 
                                            
                                            

                                                
                         
                       });//USER TABLE UPDATING


                
            
           }else{

                var data = {
                            success: 'FAILURE',
                              message: 'User Password not matched!'
                                                };

                                               mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));

            }

           });
          

           
        
         
         }   
       
         });
    });

};//change user mail end
exports.changeCustomerSettings = function(req, res) {
    console.log('changeCustomerSettings');
      
    var input = JSON.parse(JSON.stringify(req.body));
    
	var offersUpdates =input.offersUpdates;
    var newsUpdates =input.newsUpdates;
	var reservationUpdates =input.reservationUpdates;
    var customerId =input.customerId;
   
        
   
    mysqlLib.acquire(function(err, mclient) {

     mclient.beginTransaction(function (err) {
           console.log("customerId::"+customerId);
           if (err) {
                mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to change customer settings'
                                                        };
                                                       mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });

            }
            else
            {
         
            
                  var query = mclient.query(" update customer_settings set OFFER_UPDATES=?,NEWS_UPDATES=?,RESERVATION_UPDATES=? where CUSTOMER_ID =?",[offersUpdates,newsUpdates,reservationUpdates,customerId], function(err, rows){

                    
                       mclient.commit(function (err) {
                                                console.log("error user::"+err);
                                                if (err) {
                                                    mclient.rollback(function () {
                                                        var data = {
                                                            success: 'FAILURE',
                                                            message: 'Failed to change customer settings'
                                                        };
                                                       mysqlLib.release(mclient);
                                                        res.end(JSON.stringify(data));
                                                    });
                                                }
                                                
                                                 var data = {
                                                    success: 'SUCCESS',
                                                    message: 'Customer settings changed successfully'
                                                };

                                               mysqlLib.release(mclient);
                                                res.end(JSON.stringify(data));
                                               
                                            }); 
                        
                       });//USER TABLE UPDATING
 
              }   
       
         });
    });

};//update customer settings
