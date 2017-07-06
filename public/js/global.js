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


  $('.field.drag').each(function(){
      $(this).click(function(){
          var typeSelector=($(this).find('span').html());
          $(".form-building-container .fields").append('<div class="field"><a><span class="expand">▼</span><span class="name">Enter Text</span><span class="type">'+typeSelector+'</span></a></div>');
      });
  });
    // // target elements with the "draggable" class
    // interact('.form-building-container .fields .field')
    //     .draggable({
    //         // enable inertial throwing
    //         inertia: true,
    //         // keep the element within the area of it's parent
    //         restrict: {
    //             restriction: "parent",
    //             endOnly: true,
    //             elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    //         },
    //         // enable autoScroll
    //         autoScroll: true,
    //
    //         // call this function on every dragmove event
    //         onmove: dragMoveListener,
    //         // call this function on every dragend event
    //         onend: function (event) {
    //             var textEl = event.target.querySelector('p');
    //
    //             textEl && (textEl.textContent =
    //                 'moved a distance of '
    //                 + (Math.sqrt(event.dx * event.dx +
    //                     event.dy * event.dy)|0) + 'px');
    //         }
    //     });
    //
    // function dragMoveListener (event) {
    //     var target = event.target,
    //         // keep the dragged position in the data-x/data-y attributes
    //         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    //         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    //
    //     // translate the element
    //     target.style.webkitTransform =
    //         target.style.transform =
    //             'translate(' + x + 'px, ' + y + 'px)';
    //
    //     // update the posiion attributes
    //     target.setAttribute('data-x', x);
    //     target.setAttribute('data-y', y);
    // }
    var element = document.getElementsByClassName('.form-building-container .fields .field'),
        x = 0, y = 0;

    interact('.form-building-container .fields .field')
        .draggable({
            snap: {
                targets: [
                    interact.createSnapGrid({ x: 30, y: 30 })
                ],
                range: Infinity,
                relativePoints: [ { x: 0, y: 0 } ]
            },
            inertia: true,
            restrict: {
                restriction: ('.form-building-container .inner-inner-container'),
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                endOnly: true
            }
        })
        .on('dragmove', function (event) {
            x += event.dx;
            y += event.dy;


            event.target.style.webkitTransform =
                event.target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
        });


});
