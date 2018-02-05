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

  //translate plugin
  //jQuery('#langPicker').translate();

    //Vacatures link
  var jobId, vacatureItem,
      clickCountJobId1 = 0,
      jobId1Check = 0,
      jobId2Check = 0,
      clickCountJobId2 = 0;


  jQuery('#job1 h2').click(function (event) {

      jobId = jQuery(this).parent().parent().attr('id');
      vacatureItem = '';

      if (clickCountJobId1 == 0 && jobId2Check == 0) {
        if (jobId == 'job1' && vacatureItem == undefined || vacatureItem == '') {
            jQuery('#jobdescription1').show();
            jQuery('#jobdescription2').hide();
            clickCountJobId1 = clickCountJobId1 + 1;
            jobId1Check = 1;
            return false;
        }
      }
      else if (clickCountJobId1 == 1 && jobId2Check == 0) {
            jQuery('#jobdescription1').hide();
      }
      else if (clickCountJobId1 == 1 && jobId2Check == 1) {
         jobId2Check = 2;
         jQuery('#jobdescription1').show();
         jQuery('#jobdescription2').hide();
         clickCountJobId1 = 0;
         jobId1Check = 0;
         return false;
      }
      else if (clickCountJobId1 == 0 && jobId2Check == 2) {
        jQuery('#jobdescription1').hide();
        jobId2Check = 0;
        return false;
      }
      else if (clickCountJobId1 == 0 && jobId2Check == 1) {
        jQuery('#jobdescription1').show();
        jQuery('#jobdescription2').hide();
        jobId2Check = 2;
        jobId1Check = 1;
        return false;
      }
  });


  jQuery('#job2 h2').click(function () {

      jobId = jQuery(this).parent().parent().attr('id');
      vacatureItem = '';

      if (clickCountJobId2 == 0 && jobId1Check == 0) {
        if (jobId == 'job2' && vacatureItem == undefined || vacatureItem == '') {
          jQuery('#jobdescription1').hide();
          jQuery('#jobdescription2').show();
          clickCountJobId2 = clickCountJobId2 + 1;
          jobId2Check = 1;
          return false;
        }
      }
      else if ((clickCountJobId2 == 1   ) && jobId1Check == 0) {
          jQuery('#jobdescription2').hide();
      }
      else if (clickCountJobId2 == 1 && jobId1Check == 1) {
          jobId1Check = 2;
          jQuery('#jobdescription2').show();
          jQuery('#jobdescription1').hide();
          clickCountJobId2 = 0;
          jobId2Check = 0;
          return false;
      }
      else if (clickCountJobId2 == 0 && jobId1Check == 2) {
          jQuery('#jobdescription2').hide();
          jobId1Check = 0;
      }
      else if (clickCountJobId2 == 0 && jobId1Check == 1) {
          jQuery('#jobdescription2').show();
          jQuery('#jobdescription1').hide();
          jobId1Check = 2;
          jobId2Check = 1;
          return false;
      }
  });


  /*
  jQuery('.vacatures-item').click(function () {

    vacatureItem = jQuery(this).attr('class');

    if (jobId == 'job2' || jobId == 'job1' && vacatureItem == 'vacatures-item') {
      jQuery('#jobdescription1').hide();
      jQuery('#jobdescription2').hide();
      clickCountJobId2 = 0;
      clickCountJobId1 = 0;
      jobId1Check = 0;
      jobId2Check = 0;
    }
  });
  */

  // Datetimepicker
  jQuery(".form_datetime").datetimepicker(
    {
      startDate: moment().format('DD-MM-YYYY HH:mm'),
      format: 'dd-mm-yyyy hh:ii',
      language:  'nl',
      minView: 'day',
      daysOfWeekDisabled: '0,6',
      hoursDisabled: '00, 01, 02, 03, 04, 05, 06, 07, 08, 18, 19, 20, 21, 22, 23',
      minutesDisabled: '00-60',
      autoclose: true
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
    var contactCompanyName = jQuery.trim(jQuery("#contactCompanyName").val());
    var contactPhone = jQuery.trim(jQuery("#contactTelephone").val());
    var contactSubject = jQuery.trim(jQuery("#contactSubject").val());
    var contactDateTime = jQuery.trim(jQuery("#contactDateTime").val());
    var message = jQuery.trim(jQuery("#message").val());
    var radioInfo = jQuery('#radioInfo').is(':checked');

    var errorColor = "#c85a3c";
    var rightColor = "white";
    var rightFontColor = "#833C11";
    //"https://standby.ask-cs.nl/tymon/sendMail.php"
    var sendMailURL = "sendMail.php";
    sendMailURL += "?contactName="+contactName +
      "&contactEmail="+contactEmail+
      "&contactCompanyName="+contactCompanyName;

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

    if(contactCompanyName == '' )
    {
      alert("Vul alstublieft uw bedrijfsnaam in.");
      console.log("Vul alstublieft uw bedrijfsnaam in.");
      jQuery("#contactCompanyName").css("background-color" ,errorColor).css("color" ,errorFontColor);
      return ;
    }
    else
    {
      jQuery("#contactCompanyName").css("background-color" ,rightColor).css("color" ,rightFontColor);
    }

    if(contactPhone)
    {
      sendMailURL += "&contactCompanyPhone="+contactPhone;
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

    var contactFormConfirmation = jQuery('#contactFormSuccess');
    var contactFormError = jQuery('#contactFormError');

    jQuery.ajax({
      url: sendMailURL
    })
      .success(function(data) {

        emptyValues();

        contactFormError.hide()
        contactFormConfirmation.show()

        window.setTimeout(function() {
          contactFormConfirmation.hide()
        }, 6000);

      })
      .error(function(error) {

        emptyValues();

        contactFormError.show()
        contactFormConfirmation.hide()

        window.setTimeout(function() {
          contactFormError.hide()
        }, 30000);

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
    jQuery("#contactCompanyName").val('');
    jQuery("#contactSubject").val('');
    jQuery("#contactDateTime").val('');
    jQuery("#contactTelephone").val('');
    jQuery("#message").val('');
    jQuery('#radioInfo').prop("checked", true);
    jQuery(".contactRadios").change();
  }
});

/**
 * Check if the team phone was filled in and valid, if that's the case show the name field
 * @returns {boolean}
 */
function checkTeamPhone()
{
  var phoneElement = jQuery('#teamPhoneInput'),
        phoneValue = phoneElement.val();

  if(! phoneValue)
  {
    var emptyTeamPhoneNumber = "Voer een geldig team telefoonnummer in<br>";
    emptyTeamPhoneNumber += "* Verplicht veld";
    error(emptyTeamPhoneNumber, "#teamPhoneInput");
  }
  else
  {
    validateTeamPhone(phoneValue)
      .then(function (roomId)
        {
            jQuery('#teamPhoneNumber')
              .fadeOut(600, function ()
              {
                var nameField  = jQuery('#nameUser');

                nameField.attr('roomId', roomId);
                nameField.fadeIn(800);
                jQuery("#nextVideoCoversationBtn").fadeIn(800);
              });
          error("* Verplicht veld", "teamPhoneInput");
        }, function ()
        {
          var phoneNotValid = "Het ingevoerde nummer is onjuist. Dit nummer is niet bekend bij een team met videobellen.";
          error(phoneNotValid + "<br>* Verplicht veld", "teamPhoneInput");
        });

  }
  return false;
}

/**
 * Validate if the phonenumber belongs to a team
 * If that's the case return the roomId in the reponse
 * @param phoneNumber the phonenumber of the team
 * @returns {*} promise
 */
function validateTeamPhone(phoneNumber)
{
  var url = getDomain() + 'proxy/teamTelephone/call?phoneNumber=' + phoneNumber + '&type=video',
      defer = jQuery.Deferred();

  $.ajax({
    url: url,
    type: 'post',
    error: function()
    {
      defer.reject(false);
    },
    success: function(result)
    {
      defer.resolve(result.callId);
    }
  });
  return defer.promise();
}

/**
 * Start the conversation, if the form is valid
 * @returns {boolean} return true is the form is valid
 */
function startVideoConversation()
{
  var fullName = jQuery('#nameInput').val();

  if(! fullName)
  {
    var emptyFullName = "Voer een naam in <br>";
    emptyFullName += "* Verplicht veld";
    error(emptyFullName, "#nameInput");
  }
  else
  {
    var backEndUrl = getDomain(),//http://localhost:4000/
        roomId = jQuery('#nameUser').attr('roomId');

    currentURLtext = backEndUrl + 'index.html';
    currentURLtext += '#/video/?roomId=' + encodeURIComponent(roomId);
    currentURLtext += '&fullName=' + encodeURI(fullName);

    reset();
    window.location.href = currentURLtext;
  }
}

function getDomain()
{
  var backEndLocation = (window.location.pathname.indexOf('demo') > 0)
      ? 'demo'
      : 'test';
  return 'https://teamup-' + backEndLocation + '.ask-cs.nl/';
}

/**
 * Reset html elements in there default state
 */
function reset()
{
  jQuery('.modal-body input')
    .val('')
    .css("border", "solid 1px #ccc");
  //jQuery('#teamPhoneInput').attr("href", "http://test.teamup.ask-cs.com/index.html");
  jQuery("#nextVideoCoversationBtn").hide();
  jQuery('#nameUser').hide(800);
  jQuery('#teamPhoneNumber').show();
  jQuery('#contactFormSuccess').hide()
  jQuery('#contactFormError').hide()
}

/**
 * Fade error message in
 * @param message
 * @param input
 */
function error(message, input)
{
  var errorDiv = jQuery('.contactText');
  
  if(errorDiv.html().length !== message.length)
  {
    errorDiv.fadeOut(400, function ()
    {
      jQuery(input).css({
        "border": "solid 1px #c85a3c"
      });
      errorDiv
        .html(message)
        .fadeIn();
    });
  }
}

