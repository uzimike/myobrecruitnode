$( document ).ready(function() {

  sameHeight('.same-height-1');
  $(window).resize(function(){
    sameHeight('.same-height-1');
  });

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
          window.location.replace('/recruit/my-recruitment-plan');
        }
    });
  }// endif atpage(recruit/new)
  else if (atPage('applications/new') || atPage('tests/new')) {
    $('.submit').click(goBack);
    $('.cancel').click(goBack);
  }
  else if (atPage('recruit/my-recruitment-plan')) {
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
              '<div class="qr-container no-height">',
                '<h3>Download this QR code for applicants to scan!</h3>',
                '<p>Simply display this QR code on your job advertisement. From there, applicants can scan this code and will be taken to the application form.</p>',
                '<img src="/images/qr-code.jpg"/>',
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
  }

  function sameHeight(sameheightclass) {
    var maxheight = 0;
    console.log("Okay");
    // find max height
    $(sameheightclass).each(function(maxheight){
      currentHeight = $(this).outerHeight(true);
      if(currentHeight > maxheight) {
        console.log("Height = " + currentHeight);
        maxheight = currentHeight;
      }
    });
    // apply max height
    $(sameheightclass).each(function(){
      $(this).outerHeight(maxheight);
      console.log("Height be CHANGED");
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

});
