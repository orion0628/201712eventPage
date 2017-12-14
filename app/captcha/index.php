<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Demos :  99Points.info : PHP Tutorial: Ajax Contact Form with Ajax based Stylish Captcha using JQuery and PHP.</title>
<script type="text/javascript" src="jquery-1.2.6.min.js"></script>
<script>

$(document).ready(function() { 

	 $('#Send').click(function() {  
	 	
			// name validation
			
			var nameVal = $("#name").val();
			if(nameVal == '') {
				
				$("#name_error").html('');
				$("#name").after('<label class="error" id="name_error">Please enter your name.</label>');
				return false
			}
			else
			{
				$("#name_error").html('');
			}
			
			/// email validation
			
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var emailaddressVal = $("#email").val();
			
			if(emailaddressVal == '') {
				$("#email_error").html('');
				$("#email").after('<label class="error" id="email_error">Please enter your email address.</label>');
				return false
			}
			else if(!emailReg.test(emailaddressVal)) {
				$("#email_error").html('');
				$("#email").after('<label class="error" id="email_error">Enter a valid email address.</label>');
				return false
			 
			}
			else
			{
				$("#email_error").html('');
			}
		
			$.post("post.php?"+$("#MYFORM").serialize(), {
		
			}, function(response){
			
			if(response==1)
			{
				$("#after_submit").html('');
				$("#Send").after('<label class="success" id="after_submit">Your message has been submitted.</label>');
				change_captcha();
				clear_form();
			}
			else
			{
				$("#after_submit").html('');
				$("#Send").after('<label class="error" id="after_submit">Error ! invalid captcha code .</label>');
			}
			
			
		});
				
		return false;
	 });
	 
	 // refresh captcha
	 $('img#refresh').click(function() {  
			
			change_captcha();
	 });
	 
	 function change_captcha()
	 {
	 	document.getElementById('captcha').src="get_captcha.php?rnd=" + Math.random();
	 }
	 
	 function clear_form()
	 {
	 	$("#name").val('');
		$("#email").val('');
		$("#message").val('');
	 }
});
 
 
 	
</script>		 

<style>
body{ font-family:Georgia, "Times New Roman", Times, serif; font-size:14px}
#wrap{
	border:solid #CCCCCC 1px;
	width:203px;
	-webkit-border-radius: 10px;
	float:left;
	-moz-border-radius: 10px;
	border-radius: 10px;
	padding:3px;
	margin-top:3px;
	margin-left:80px;
}

.error{ color:#CC0000; font-size:12px; margin:4px; font-style:italic; width:200px;}

.success{ color:#009900; font-size:12px; margin:4px; font-style:italic; width:200px;}

img#refresh{
	float:left;
	margin-top:30px;
	margin-left:4px;
	cursor:pointer;
}

#name,#email{float:left;margin-bottom:3px; height:20px; border:#CCCCCC 1px solid;}

#message{ width:260px; height:100px;float:left;margin-bottom:3px; border:#CCCCCC 1px solid;}

label{ float:left; color:#666666; width:80px;}

#Send{ border:#CC0000 solid 1px; float:left; background:#CC0000; color:#FFFFFF; padding:5px;}

</style>
</head>
<body>
<?php include ('../99ads.php');?>
<br clear="all" /><br clear="all" />
<div style="font-size:30px;">Ajax Contact Form with Ajax based Stylish Captcha using JQuery and PHP.</div>
<br clear="all" />
<a style="color:#000000; font-size:14px" href="http://www.99points.info/2010/07/youtube-style-share-button-with-url-shortening-using-curl-jquery-and-php">Back To Tutorial</a>
<br clear="all" />
<br clear="all" />

<div align="left" style="padding:30px;">

<form action="#" name="MYFORM" id="MYFORM">

	<label>Name</label>
	<input name="name" size="30" type="text" id="name">
	<br clear="all" />
	<label>Email</label>
	<input name="email" size="30" type="text" id="email">
	<br clear="all" />
	<label>Message</label>
	<textarea id="message" name="message"></textarea>
	<br clear="all" />
	
	
	<div id="wrap" align="center">
		<img src="get_captcha.php" alt="" id="captcha" />
		
		<br clear="all" />
		<input name="code" type="text" id="code">
	</div>
	<img src="refresh.jpg" width="25" alt="" id="refresh" />
		
	<br clear="all" /><br clear="all" />
	<label>&nbsp;</label>
	<input value="Send" type="submit" id="Send">


</form>
	
</div>



<br clear="all" /><br clear="all" /><br clear="all" /><br clear="all" />
<br clear="all" /><br clear="all" /><br clear="all" /><br clear="all" />
<br clear="all" /><br clear="all" />			  
<?php include ('../99footer.php');?>
</body>
</html>