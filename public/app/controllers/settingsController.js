app.controller('settingsController', function($scope, $sessionStorage,$rootScope,$state,$scope,$timeout,UserAuthFactory,AuthenticationFactory,$window,commonFactory) {
   
  $rootScope.mainheader =false;

   jQuery('#headerid').css("display", "none");
    jQuery('#mainheader').css("display", "block");
    jQuery('#mainheader1').css("display", "block");
    jQuery('.collapse').collapse("hide");

      if($sessionStorage.isAuthenticate =="Y")
      {
         $rootScope.login =true;
        }else{
             $rootScope.login =false;
        }

		
	
		var translateData =  localStorage.getItem('englishTranslate');
	// var spanishTranslate =  localStorage.getItem('spanishTranslate');
  if($sessionStorage.languageselect!="sp")
  {
	 $rootScope.sellang ="English";
	   translateData =  localStorage.getItem('englishTranslate');
	
  }else{
     $rootScope.sellang ="Spanish";
	    translateData =  localStorage.getItem('spanishTranslate');
	
  }

   
  
 if(document.getElementById("homeLabel")!=null)
	  document.getElementById("homeLabel").innerHTML = ""+JSON.parse(translateData).homeLabel;
   if(document.getElementById("dashboardLabel")!=null)
	  document.getElementById("dashboardLabel").innerHTML = ""+JSON.parse(translateData).dashboardLabel;
   if(document.getElementById("dashboardTittleLabel")!=null)
	  document.getElementById("dashboardTittleLabel").innerHTML = ""+JSON.parse(translateData).dashboardTittleLabel;
   if(document.getElementById("dashboardLabelTab")!=null)
	  document.getElementById("dashboardLabelTab").innerHTML = ""+JSON.parse(translateData).dashboardLabelTab;
   if(document.getElementById("profileLabel")!=null)
	  document.getElementById("profileLabel").innerHTML = ""+JSON.parse(translateData).profileLabel;
   if(document.getElementById("mybookingLabel")!=null)
	  document.getElementById("mybookingLabel").innerHTML = ""+JSON.parse(translateData).mybookingLabel;
   if(document.getElementById("settingsLabel")!=null)
	  document.getElementById("settingsLabel").innerHTML = ""+JSON.parse(translateData).settingsLabel;

  
		   if(document.getElementById("accountsettingsLabel")!=null)
	  document.getElementById("accountsettingsLabel").innerHTML = ""+JSON.parse(translateData).accountsettingsLabel;
	  if(document.getElementById("Change_Your_PasswordLabel")!=null)
	  document.getElementById("Change_Your_PasswordLabel").innerHTML = ""+JSON.parse(translateData).Change_Your_PasswordLabel;
   if(document.getElementById("Old_PasswordLabel")!=null)
	  document.getElementById("Old_PasswordLabel").innerHTML = ""+JSON.parse(translateData).Old_PasswordLabel;
   if(document.getElementById("Enter_New_PasswordLabel")!=null)
	  document.getElementById("Enter_New_PasswordLabel").innerHTML = ""+JSON.parse(translateData).Enter_New_PasswordLabel;
   if(document.getElementById("Confirm_New_passwordLabel")!=null)
	  document.getElementById("Confirm_New_passwordLabel").innerHTML = ""+JSON.parse(translateData).Confirm_New_passwordLabel;
   if(document.getElementById("updatebutton")!=null)
	  document.getElementById("updatebutton").innerHTML = ""+JSON.parse(translateData).updatebutton;
   if(document.getElementById("Change_Your_EmailLabel")!=null)
	  document.getElementById("Change_Your_EmailLabel").innerHTML = ""+JSON.parse(translateData).Change_Your_EmailLabel;
	   if(document.getElementById("Old_emailLabel")!=null)
	  document.getElementById("Old_emailLabel").innerHTML = ""+JSON.parse(translateData).Old_emailLabel;
   if(document.getElementById("Enter_New_EmailLabel")!=null)
	  document.getElementById("Enter_New_EmailLabel").innerHTML = ""+JSON.parse(translateData).Enter_New_EmailLabel;
   if(document.getElementById("Confirm_New_EmailLabel")!=null)
	  document.getElementById("Confirm_New_EmailLabel").innerHTML = ""+JSON.parse(translateData).Confirm_New_EmailLabel;
   if(document.getElementById("updateemailbutton")!=null)
	  document.getElementById("updateemailbutton").innerHTML = ""+JSON.parse(translateData).updateemailbutton;
   if(document.getElementById("Send_Me_Emails_WhenLabel")!=null)
	  document.getElementById("Send_Me_Emails_WhenLabel").innerHTML = ""+JSON.parse(translateData).Send_Me_Emails_WhenLabel;
   if(document.getElementById("Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel")!=null)
	  document.getElementById("Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel").innerHTML =
                             ""+JSON.parse(translateData).Travelo_has_periodic_offers_and_deals_on_really_cool_destinationsLabel;
   if(document.getElementById("Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel")!=null)
	  document.getElementById("Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel").innerHTML = 
       ""+JSON.parse(translateData).Travelo_has_fun_company_news_as_well_as_periodic_emailsLabel;
	   
	   if(document.getElementById("I_have_an_upcoming_reservationLabel")!=null)
	  document.getElementById("I_have_an_upcoming_reservationLabel").innerHTML =  ""+JSON.parse(translateData).I_have_an_upcoming_reservationLabel;
                            
   if(document.getElementById("Update_All_SettingsButon")!=null)
	  document.getElementById("Update_All_SettingsButon").innerHTML = ""+JSON.parse(translateData).Update_All_SettingsButon;
  if(document.getElementById("Send_Me_Emails_WhenLabel")!=null)
	  document.getElementById("Send_Me_Emails_WhenLabel").innerHTML = ""+JSON.parse(translateData).Send_Me_Emails_WhenLabel;
  
  
  
     var frlocid =$sessionStorage.locid;
     var tolocid =$sessionStorage.toid;
     var fromdate =$sessionStorage.fromdate;
     var daydesc = $sessionStorage.daydesc ;
     var todate =$sessionStorage.todate;
     var todesc =$sessionStorage.todesc;   

     if($sessionStorage.travelfromlocdesc !=undefined){
      $rootScope.travelfromlocdesc=$sessionStorage.travelfromlocdesc;
    }else{
      $rootScope.travelfromlocdesc ="From Location"
    }
     if($sessionStorage.traveltolocdesc !=undefined){
      $rootScope.traveltolocdesc=$sessionStorage.traveltolocdesc;
    }else{
      $rootScope.traveltolocdesc="To Location" 
    }
    if($sessionStorage.noofseats==undefined)
    { 
      $sessionStorage.noofseats =1;
         $rootScope.seatsdesc="1" 
    }else{
      $rootScope.seatsdesc=$sessionStorage.noofseats
    }
     
 
     if(fromdate==undefined)
     {
     var currendate = new Date();
     var  month = '' + (currendate.getMonth() + 1);
     var  day = ''+currendate.getDate();
     var  year = currendate.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

      fromdate =month+"/"+day+"/"+year;

      $sessionStorage.fromdate =fromdate;

     }
   
        if(fromdate!="N"){
       jQuery('#trdate').val(fromdate); 
     }
     if (todate != "N") {

        jQuery('#rtdate').val(todate);
      }
     // document.getElementById("trdate").value = fromdate;
      
    var resdata={
      
    }
    commonFactory.fromlocation(resdata).success(function(data) {

    $rootScope.allfromloc =data;
      $rootScope.frlocid =frlocid;

    }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

      $rootScope.onfromlocchange =function(locid)
    {
   
     $sessionStorage.locid =jQuery('#frolocid').val();
     $sessionStorage.travelfromlocdesc =jQuery("#frolocid option:selected").text();
   
    var resdata ={
    tolocation: jQuery('#frolocid').val()
    }

    commonFactory.tolocation(resdata).success(function(data) {
    $rootScope.alltoloc =data;

    }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

    };

    $rootScope.toLocchange =function()
    {
      $sessionStorage.toid =jQuery('#torlocid').val();
        $sessionStorage.traveltolocdesc =jQuery("#torlocid option:selected").text();
  
    }

    $rootScope.fromdatechange =function()
    {
    
       
       $sessionStorage.fromdate =jQuery('#trdate').val();
    }

    $rootScope.returndatechange =function()
    {

       $sessionStorage.todate =jQuery('#rtdate').val();
    }
    $rootScope.seatschanged =function()
    {
      $sessionStorage.noofseats =jQuery('#noofpassenger').val();
    }   
  
 
  //update password 
  
	  jQuery("#updatebutton").click(function(){		 
		
		   var translateData = $sessionStorage.translateData;
		//   alert(JSON.parse(translateData).oldPwdValid);
		   var oldpassword = jQuery("#oldpassword").val();
 
			var newpassword = jQuery("#newpassword").val();

			var confirmpassword = jQuery("#confirmnewpassword").val();
	
	if( oldpassword.length== 0){
			
		//jQuery("#invalidoldpassword").html("Please enter old password");
		
		jQuery("#invalidoldpassword").html(JSON.parse(translateData).oldPwdValid);
		
		$timeout(function(){
			jQuery("#invalidoldpassword").html (" ");
		},3000);
	}
	else if( newpassword.length== 0){
		
		//jQuery("#invalidnewpassword").html("Please enter new password");
		jQuery("#invalidnewpassword").html(JSON.parse(translateData).newPwdValid);
		
		$timeout(function(){
			jQuery("#invalidnewpassword").html (" ");
		},3000);
	}
	else if( confirmpassword.length== 0){
			
		//jQuery("#invalidconfirmpassword").html("Please enter confirm password");
		jQuery("#invalidconfirmpassword").html(JSON.parse(translateData).confirmPwdValid);
		
		$timeout(function(){
			jQuery("#invalidconfirmpassword").html (" ");
		},3000);
	}
	else if( newpassword!=confirmpassword){
			
		//jQuery("#invalidconfirmpassword").html( "Please enter confirm password same as password" );
		jQuery("#invalidconfirmpassword").html( JSON.parse(translateData).pwdMatchValid );
		
		$timeout(function(){
			jQuery("#invalidconfirmpassword").html (" ");
		},3000);
	}
	else{
		//alert("login ::"+$sessionStorage.userName);
		
		var requestData = {
       
	   'emailId' : $sessionStorage.EMAILID,
        'oldpassword' : oldpassword,
        'newpassword'  : newpassword,
       
		
      };   
       //alert(JSON.stringify(requestData));
	   var translateData = $sessionStorage.translateData;
		    commonFactory.changePassword(JSON.stringify(requestData)).success(function(data) {

      $timeout(function(){

                if (data.success == 'SUCCESS') 
				{	
          // swal("Password changed successfully", " ", "success");
					swal(JSON.parse(translateData).passsuccswlAlert, " ", "success");
                  
				   $state.go('dashboard');
                } 
                else 
                {
              //    swal("Old Password is incorrect", " ", "warning");
                 swal(JSON.parse(translateData).passerrswlAlert, " ", "warning");
                }
                


                  },1000);

      }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });

	}
	  
	  });
    
  
  //update password
  
  //update email
  
  jQuery("#updateemailbutton").click(function(){
   
  var oldemail = jQuery("#oldemail").val();
 
 var newemail = jQuery("#newemail").val();

 var confirmemail = jQuery("#confirmemail").val();
 
 
 
 if( oldemail.length== 0){
   
  jQuery("#invalidoldemail").html("Please enter old email");
  
  $timeout(function(){
   jQuery("#invalidoldemail").html (" ");
  },3000);
 }
 else if( newemail.length== 0){
   
  jQuery("#invalidnewemail").html("Please enter new email");
  
  $timeout(function(){
   jQuery("#invalidnewemail").html (" ");
  },3000);
 }
 else if( confirmemail.length== 0){
   
  jQuery("#invalidconfirmemail").html("Please enter confirm email");
  
  $timeout(function(){
   jQuery("#invalidconfirmemail").html (" ");
  },3000);
 }
 else if( confirmemail!=newemail){
   
  jQuery("#invalidconfirmemail").html( "Please enter confirm email same as newemail" );
  
  $timeout(function(){
   jQuery("#invalidconfirmemail").html (" ");
  },3000);
 }
 else{	
		var requestData = {
        'oldemail' : oldemail,
        'newemail'  : newemail,	
      };   
       //alert(JSON.stringify(requestData));
	   var translateData = $sessionStorage.translateData;
	   
		    commonFactory.changeEmail(JSON.stringify(requestData)).success(function(data) {

      $timeout(function(){

                if (data.success == 'SUCCESS') 
				{	
				//	swal("Email changed successfully", " ", "success");
                swal(JSON.parse(translateData).emlswlAlert, " ", "success");
				  $state.go('dashboard');
				  
                } 
                else 
                {
               //   swal("Invalid email id", " ", "warning");
                   swal(JSON.parse(translateData).erremlswlAlert, " ", "warning");
                }
                


                  },1000);

      }).error(function(data, status, headers, config) {
       
       if(status ==429)
        {
         swal($rootScope.ManyRequestErrorLabel, " ", "warning");
             jQuery('#mydiv').hide();
             $state.go("error");
        }else{
           swal($rootScope.OtherErrorLabel, " ", "warning");  
           jQuery('#mydiv').hide();
           $state.go("error");
        }
  });
  
  
 }//else
 
 
  });  //update email
  
   

			
 
 
 
 
 
 
 
	});