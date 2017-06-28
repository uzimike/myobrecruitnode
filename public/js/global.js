$( document ).ready(function() {

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

  function atPage(path) {
    return window.location.pathname == '/' + path;
  }


  function upDateFromInput(input, label) {
    label.text(input.val());
    input.change(function() {
      label.text(input.val());
    })
  }

});
