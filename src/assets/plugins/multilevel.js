// (c) 2020 Written by Simon Köhler in Panama
// github.com/koehlersimon
// simon-koehler.com
document.addEventListener('DOMContentLoaded', function () {
  var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl)
  });

  var dropdownSubmenuElementList = [].slice.call(document.querySelectorAll('.dropdown-submenu-toggle'));

  var submenuList = dropdownSubmenuElementList.map(function(e) {
    e.onclick = function(e){
      e.target.parentNode.querySelector('ul').classList.toggle('show');
      e.stopPropagation();
      e.preventDefault();
    }
  });

  var masterClickEvent = document.addEventListener('click',function(e){

    // Function to remove show class from dropdowns that are open
    closeAllSubmenus();

    // Hamburger menu
    if(e.target.classList.contains('hamburger-toggle')){
      e.target.children[0].classList.toggle('active');
    }

  });


})
function closeAllSubmenus(){
  // Function to remove show class from dropdowns that are open
  var dropdownMenus = [].slice.call(document.querySelectorAll('.dropdown-submenu'));
  dropdownMenus.map(function (menu) {
    menu.classList.remove('show');
  });
}
