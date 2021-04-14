document.addEventListener('DOMContentLoaded', function () {


})
function closeAllSubmenus(){
  // Function to remove show class from dropdowns that are open
  var dropdownMenus = [].slice.call(document.querySelectorAll('.dropdown-submenu'));
  dropdownMenus.map(function (menu) {
    menu.classList.remove('show');
  });
}
