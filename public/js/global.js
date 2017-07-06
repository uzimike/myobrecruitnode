$( document ).ready(function() {

  sameHeight('.same-height-1');
  // $(window).resize(function(){
  //   sameHeight('.same-height-1');
  // });

  //Vex dialog default theme
  vex.defaultOptions.className = 'vex-theme-os';

  if (atPage('recruit/new')) {
    var form = $("#recruitment-plan-form");
    form.validate({
      errorPlacement: function errorPlacement(error, element) { element.before(error); },
      rules: {

      }
    });
    form.children("div").steps({
      headerTag: "h3",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      // saveState: true,
      onStepChanging: function (event, currentIndex, newIndex) {
        form.validate().settings.ignore = ":disabled,:hidden";
        upDateFromInput($("#rp-title"), $(".confirm label.recruitment-plan"));
        upDateFromInput($("#job-title"), $(".confirm label.job-title"));
        upDateFromInput($("#job-desc"), $(".confirm label.job-desc"));
        upDateFromInput($("#employment-type"), $(".confirm label.employment-type"));
        return form.valid();
      },
      onFinishing: function (event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
      },
      onFinished: function (event, currentIndex) {
        // form.resetForm();
        var job = [
          '&rpt=' + encodeURIComponent($(".confirm label.recruitment-plan").text()),
          '&jt=' + encodeURIComponent($(".confirm label.job-title").text()),
          '&jdesc=' + encodeURIComponent($(".confirm label.job-desc").text()),
          '&payment=' + encodeURIComponent($("input#per-hour-payment").val()),
          '&pay-period=' + encodeURIComponent($("select#payment-period").val()),
          '&hours=' + encodeURIComponent($("input#hours").val()),
          '&hours-period=' + encodeURIComponent($("select#hours-period").val())
        ].join('');
        window.location.replace('/recruit/my-recruitment-plan?created=true'+job);
      }
    });
  }// endif atpage(recruit/new)
  else if (atPage('applications/new') || atPage('tests/new')) {
    $('.submit').click(goBack);
    $('.cancel').click(goBack);
  }
  else if (atPage('recruit/my-recruitment-plan')) {
    var created = getUrlParameter('created');
    if (created == 'true') {
      vex.dialog.open({
        unsafeMessage: [
          '<div class="vex-field-wrapper">',
          '<h2>Recruitment Plan Created!</h2>',
          '<h3>What do I do now?</h3>',
          '<p>Applicants need to follow this link to fill out the application form</p>',
          '<div class="clipboard">',
          '<input id="clipboardselect" name="clipboard" type="text" readonly="readonly" value="https://localhost:3443/mikes-business/applications/jenfni39rf39fjmc"/>',
          '<label id="clipboardbutton" for="clipboard">Copy to clipboard</label>',
          '</div>',
          '<p>Share this link on job searching platforms to get applicants to apply!</p>',
          '<p class="qr-link"><a>Not advertising on the internet?</a></p>',
          '<div class="qr-container" style="height:0;">',
          '<div class="inner-container">',
          '<h3>Share this QR code</h3>',
          '<p>Simply display this QR code on your job advertisement and applicants will be able to scan the code to go to be taken to the application form.</p>',
          '<img width="100px" height="auto" src="/images/qr-code.jpg"/>',
          '</div>',
          '</div>',
          '</div>'
        ].join(''),
        buttons: [
          $.extend({}, vex.dialog.buttons.YES, { text: 'Ok' })
        ]
      });
      $('#clipboardbutton').click(function(){
        document.querySelector('#clipboardselect').select();
        document.execCommand('copy');
      });
      $('#clipboardbutton2').click(function(){
        document.querySelector('#clipboardselect2').select();
        document.execCommand('copy');
      });
      $('p.qr-link a').click(function(){
        $('.qr-container').height($('.qr-container .inner-container').height());
        $(this).addClass('hide');
      });
    }
    $('a.hire-button').click(function(){
      var checkFound = false,
      applicant,
      name;
      $('.applicants .applicant').each(function(){
        if ($(this).find('.checkbox input')[0].checked) {
          checkFound = true;
          name = $(this).find('.name').html();
          email = $(this).find('.email').html();
          phone = $(this).find('.phone').html();
          test = $(this).find('.testscore').html();
          applicant = [
            '?',
            'created=true',
            '&name=',encodeURIComponent(name),
            '&email=',encodeURIComponent(email),
            '&phone=',encodeURIComponent(phone),
            '&test=',encodeURIComponent(test)
          ].join('');
        }
      });
      if (checkFound) {
        vex.dialog.open({
          unsafeMessage: [
            '<div class="vex-field-wrapper">',
            '<h2>You are hiring ', name, '!</h2>',
            '<h3>What do I do from here?</h3>',
            '<p>These are the final steps we need to take.</p>',
            '<ol>',
            "<li>Finalise the applicant's job details</li>",
            "<li>Create and send an employment offering letter</li>",
            "<li>Finalise the employment contract and send it to the employee</li>",
            '</ol>',
            '</div>'
          ].join(''),
          buttons: [
            $.extend({}, vex.dialog.buttons.YES, {
              text: 'Finalise job details',
              click: function(){
                vex.dialog.open({
                  input: [
                    '<div class="vex-field-wrapper vex-finalise">',
                    '<h2>Finalise Job Details</h2>',
                    '<h3>Check and complete the following job details</h3>',
                    '<h4>Check Details</h4>',
                    '<label for="job-title">Job Title</label></br>',
                    '<input name="job-title" id="job-title" value="' + getUrlParameter('jt') + '"></br>',
                    '<label for="job-desc">Job Description</label></br>',
                    '<textarea name="job-desc" id="job-desc">' + getUrlParameter('jdesc') + '</textarea></br>',
                    '<label for="employment-type">Employment Type</label></br>',
                    '<input name="employment-type" id="employment-type" value="' + getUrlParameter('employment') + '">',

                    '<h4>Add details</h4>',
                    '<label for="employee-address">Employee address</label></br>',
                    '<input name="employee-address" type="text" placeholder="Employee address"></br>',
                    '<label for="work-address">New work address</label></br>',
                    '<input name="work-address" type="text" placeholder="New work address"></br>',
                    '<label for="supervisor">Supervisor name (optional)</label></br>',
                    '<input name="supervisor" type="text" placeholder="Supervisor name (optional)"></br>',
                    '<label for="due-date">Offer due date</label></br>',
                    '<input name="due-date" type="text" placeholder="Offer due date">',
                    '</div>'
                  ].join(''),
                  buttons:
                  [$.extend({}, vex.dialog.buttons.YES, { text: 'Create the offering letter' }),
                  $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })],
                  callback: function(data) {
                    if (!data) {
                      console.log("data don't exist")
                    }
                    else {
                      
                    }
                  }
                })
              },
            }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })
          ]
        });
      }
    });
  }
  else if(atPage('contracts/new')) {
    $('.cancel').click(goBack);
  }

  function sameHeight(sameheightclass) {
    var maxheight = 0;
    // find max height
    $(sameheightclass).each(function(maxheight){
      currentHeight = $(this).outerHeight(true);
      if(currentHeight > maxheight) {
        maxheight = currentHeight;
      }
    });
    // apply max height
    $(sameheightclass).each(function(){
      $(this).outerHeight(maxheight);
    });
  }

  function atPage(path) {
    return window.location.pathname == '/' + path;
  }

  function goBack() {
    event.preventDefault();
    history.go(-1);
  }

  function upDateFromInput(input, label) {
    label.text(input.val());
    input.change(function() {
      label.text(input.val());
    })
  }

  function getUrlParameter(sParam) {
    try {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      }
    } catch (ex) {
      console.log("ERROR DECODING URI: " + ex.message);
    }
  }

});
