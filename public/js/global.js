$( document ).ready(function() {

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
    message: 'Recruitment Plan Created!',
    input: [
          '<style>',
              '.vex-custom-field-wrapper {',
                  'margin: 1em 0;',
              '}',
              '.vex-custom-field-wrapper > label {',
                  'display: inline-block;',
                  'margin-bottom: .2em;',
              '}',
          '</style>',
          '<div class="vex-custom-field-wrapper">',
              '<h3>What do I do now?</h3>',
              '<p>This link needs to be shared on your desired platforms</p>',
              '<div class="clipboard">',
              '<input name="clipboard" type="text" readonly="readonly" value="https://localhost:3443/mikes-business/applications/jenfni39rf39fjmc"/>',
              '<label for="clipboard">Copy to clipboard</label>',
              '</div>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="date" type="date" value="ass" />',
              '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="color">Color</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="color" type="color" value="#ff00cc" />',
              '</div>',
          '</div>'
      ].join(''),
    });
  }

  function sameHeight(sameheightclass) {
    var maxheight = 0;
    // find max height
    sameheightclass.each(function(){
      currentHeight = this.height();
      if(currentHeight > maxheight) {
        maxheight = currentHeight;
      }
    });

    // apply max height
    sameheightclass.each(function(){
      this.height(maxheight);
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
