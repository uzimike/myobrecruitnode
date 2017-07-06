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
                    '<label for="jobTitle">Job Title</label></br>',
                    '<input type="text" name="jobTitle" id="job-title" value="' + getUrlParameter('jt') + '"></br>',
                    '<label for="jobDesc">Job Description</label></br>',
                    '<textarea name="jobDesc" id="job-desc">' + getUrlParameter('jdesc') + '</textarea></br>',
                    '<label for="employmentType">Employment Type</label></br>',
                    '<input type="text" name="employmentType" id="employment-type" value="' + getUrlParameter('employment') + '">',

                    '<h4>Add details</h4>',
                    '<label for="employeeAddress">Employee address</label></br>',
                    '<input name="employeeAddress" type="text" placeholder="Employee address" value="36 Kruger Avenue, Wellington"></br>',
                    '<label for="workAddress">New work address</label></br>',
                    '<input name="workAddress" type="text" placeholder="New work address" value="83 Grand Street, Auckland"></br>',
                    '<label for="supervisor">Supervisor name (optional)</label></br>',
                    '<input name="supervisor" type="text" placeholder="Supervisor name (optional)" value=""></br>',
                    '<label for="dueDate">Offer due date</label></br>',
                    '<input name="dueDate" type="text" placeholder="Offer due date">',
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
                      var urlQuery = [
                        '?create=true',
                        '&name=',encodeURIComponent(name),
                        '&employeeAddress=',encodeURIComponent(data.employeeAddress),
                        '&workAddress=',encodeURIComponent(data.workAddress),
                        '&supervisor=',encodeURIComponent(data.supervisor),
                        '&dueDate=',encodeURIComponent(data.dueDate)
                      ]
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
