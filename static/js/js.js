$(document).ready(function(){

  function sectionMake(string) {
    var sections, activeSection, newSection;
    sections = document.getElementsByClassName('section');
    activeSection = sections.getElementsByClassName('active')[0];
    newSection = sections.getElementsByClassName(string)[0];
    switchSection(activeSection, newSection)
  }

  function switchSection(activeSection, newSection) {
    if (activeSection == newSection) return;
    activeSection.classList.remove('active');
    newSection.classList.add('active');
  }

  function addNavActions() {
    var navs, li, count;
    navs = document.getElementsByClassName('nav-ul');
    li = navs.getElementsByTagName('li');
    count = 1;

    for (var i = 0; i < li.length; ++i) {
      li[i].addEventListener('click', function(){sectionMake('section-'+pad2(count))})
      count++;
    }
  }

  function pad2(number) {
    return (number < 10 ? '0' : '') + number;
  }


});
