jQuery(function() {
  /**
   * Scrollreveal init
   * @type {Window.scrollReveal}
   */
  window.sr = new scrollReveal({
    reset: true,
    opacity: 1,
    move: '50px',
    //scale:    { direction: 'up', power: '0%' },
    mobile: true
  });
  jQuery("[data-sr]").css("visibility", "hidden");

  // Datetimepicker
  jQuery(".form_datetime").datetimepicker(
    {
      format: 'dd-mm-yyyy hh:00',
      language:  'nl',
      minView: 'day',
      daysOfWeekDisabled: '0,6',
      hoursDisabled: '00, 01, 02, 03, 04, 05, 06, 18, 19, 20, 21, 22, 23'
    }
  );

  //contact form
  jQuery('.contactRadios').change(function() {
    var radioValue = jQuery(this).val(),
      dateTimer = jQuery('#contactDateTime'),
      contactTextarea = jQuery('.contactTextarea');

    if(radioValue == 'demonstration')
    {
      dateTimer.show();
      contactTextarea.hide();
    }
    else
    {
      dateTimer.hide();
      contactTextarea.show();
    }
  });

  jQuery(".contactRadios").change();

  //Open contactform
  jQuery('.contactBtn button').click(function ()
  {
    var buttonName = jQuery(this).attr('id');

    if(buttonName == 'moreInfoButton')
    {
      jQuery('#radioInfo').prop("checked", true);
      jQuery('.contactTextarea').show();
      jQuery('#contactDateTime').hide();
    }
    else
    {
      jQuery('#radioDemonstration').prop("checked", true);
      jQuery('.contactTextarea').hide();
      jQuery('#contactDateTime').show();
    }
  });

  jQuery('.alertContact').hide();

  function sendMail()
  {
    var contactName = jQuery.trim(jQuery("#contactName").val());
    var contactEmail = jQuery.trim(jQuery("#contactEmail").val());
    var contactCompagnyName = jQuery.trim(jQuery("#contactCompagnyName").val());
    var contactSubject = jQuery.trim(jQuery("#contactSubject").val());
    var contactDateTime = jQuery.trim(jQuery("#contactDateTime").val());
    var message = jQuery.trim(jQuery("#message").val());
    var radioInfo = jQuery('#radioInfo').is(':checked');

    var errorColor = "#c85a3c";
    var errorFontColor = "white";
    var rightColor = "white";
    var rightFontColor = "#833C11";

    var sendMailURL = "https://standby.ask-cs.nl/tymon/sendMail.php";
    sendMailURL += "?contactName="+contactName +
      "&contactEmail="+contactEmail+
      "&contactCompagnyName="+contactCompagnyName;

    sendMailURL += (radioInfo) ? "&message=" + message : "&contactDateTime=" + contactDateTime;

    if(contactName == '' )
    {
      alert("Vul alstublieft uw naam in.");
      console.log("Vul alstublieft uw naam in.");
      jQuery("#contactName").css("background-color" ,errorColor).css("color" ,errorFontColor);
      return ;
    }
    else
    {
      jQuery("#contactName").css("background-color" ,rightColor).css("color" ,rightFontColor);
    }

    if(contactCompagnyName == '' )
    {
      alert("Vul alstublieft uw bedrijfsnaam in.");
      console.log("Vul alstublieft uw bedrijfsnaam in.");
      jQuery("#contactCompagnyName").css("background-color" ,errorColor).css("color" ,errorFontColor);
      return ;
    }
    else
    {
      jQuery("#contactCompagnyName").css("background-color" ,rightColor).css("color" ,rightFontColor);
    }

    if(contactEmail == '' ){
      alert("Vul alstublieft uw emailadres in.");
      console.log("Vul alstublieft uw emailadres in.");
      jQuery("#contactEmail").css("background-color" ,errorColor).css("color" ,errorFontColor);
      return ;
    }else{
      if(!IsEmail(contactEmail)){
        console.log("Uw emailadres is ongeldig.");
        alert("Uw emailadres is ongeldig.");
        $("#contactEmail").css("background-color" ,errorColor).css("color" ,errorFontColor);
        return;
      }else{
        $("#contactEmail").css("background-color" ,rightColor).css("color" ,rightFontColor);
      }
    }

    //if(contactSubject == '' ){
    //  alert("Vul alstublieft een onderwerp in.");
    //  console.log("Vul alstublieft een onderwerp in.");
    //  jQuery("#contactSubject").css("background-color" ,errorColor).css("color" ,errorFontColor);
    //  return ;
    //}else{
    //  jQuery("#contactSubject").css("background-color" ,rightColor).css("color" ,rightFontColor);
    //}

    if(message == '' && radioInfo)
    {
      alert("Vul alstublieft een bericht in.");
      console.log("Vul alstublieft een bericht in.");
      jQuery("#message").css("background-color" ,errorColor).css("color" ,errorFontColor);
      return ;
    }
    else
    {
      jQuery("#message").css("background-color" ,rightColor).css("color" ,rightFontColor);
    }

    //if(jQuery('#radioDemonstration').is(':checked') && contactDateTime == '')
    //{
    //  alert("Vul alstublieft een datum en tijd in.");
    //  console.log("Vul alstublieft een datum en tijd in");
    //  jQuery("#message").css("background-color" ,errorColor).css("color" ,errorFontColor);
    //  return ;
    //}
    //else
    //{
    //  jQuery("#message").css("background-color" ,rightColor).css("color" ,rightFontColor);
    //}

    var alertText = jQuery('.alertContact');

    jQuery.ajax({
      url: sendMailURL
    }).done(function( data ) {
      console.log(data);
      emptyValues();

      alertText.show();
      window.setTimeout(function() { alertText.hide() }, 6000);

    }).fail(function( error){
      console.log(error);
      emptyValues();

      alertText.show();
      window.setTimeout(function() { alertText.hide() }, 6000);
    });
  }

  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  jQuery('.sendButton').click(function ()
  {
    sendMail();
  });

  function emptyValues()
  {
    jQuery("#contactName").val('');
    jQuery("#contactEmail").val('');
    jQuery("#contactCompagnyName").val('');
    jQuery("#contactSubject").val('');
    jQuery("#contactDateTime").val('');
    jQuery("#contactTelephone").val('');
    jQuery("#message").val('');
    jQuery('#radioInfo').prop("checked", true);
    jQuery(".contactRadios").change();
  }

});

