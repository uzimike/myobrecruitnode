$(document).ready(function(){

  function sectionMake(string) {
    var sections, activeSection, newSection;
    sections = document.getElementById('content');
    activeSection = sections.querySelectorAll('section.active')[0];
    newSection = sections.querySelectorAll('section.'+string)[0];
    switchSection(activeSection, newSection)
  }

  function switchSection(activeSection, newSection) {
    if (activeSection == newSection) return;
    activeSection.classList.remove('active');
    newSection.classList.add('active');
  }

  function addNavActions() {
    var navs, nav, li, count;
    navs = document.getElementsByClassName('nav-ul');
    for (var i = 0; i < navs.length; i++) {
      nav = navs[i];
      li = nav.getElementsByClassName('section-li');
      count = 1;
      for (var j = 0; j < li.length; j++) {
        (function(j){
          var string = 'section-'+pad2(count);
          var li_a = li[j].getElementsByTagName('a')[0]
          if (typeof window.addEventListener === 'function'){
            (function (_string) {
              li_a.addEventListener(
                'click',
                function(){
                  sectionMake(_string);
                },
                false
              );
            })(string)
          }
          count++;
        })(j);
      }
    }
  }


  function pad2(number) {
    return (number < 10 ? '0' : '') + number;
  }


  addNavActions();

});
