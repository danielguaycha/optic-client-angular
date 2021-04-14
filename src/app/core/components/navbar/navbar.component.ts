import {Component, OnInit} from '@angular/core';
import {Dropdown} from 'bootstrap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.configMenu();
  }

  configMenu() {
    const that = this;
    let dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl)
    });

    let dropdownSubmenuElementList = [].slice.call(document.querySelectorAll('.dropdown-submenu-toggle'));

    dropdownSubmenuElementList.map(function(e) {
      e.onclick = function(e){
        that.closeAllSubmenus()
        e.target.parentNode.querySelector('ul').classList.toggle('show');
        e.stopPropagation();
        e.preventDefault();
      }
    });
    document.addEventListener('click',function(e){
      that.closeAllSubmenus();

      // Hamburger menu
     /* if(e.target.classList.contains('hamburger-toggle')){
        e.target.children[0].classList.toggle('active');
      }*/

    });

  }
  closeAllSubmenus(){
    // Function to remove show class from dropdowns that are open
    var dropdownMenus = [].slice.call(document.querySelectorAll('.dropdown-submenu'));
    dropdownMenus.map(function (menu) {
      menu.classList.remove('show');
    });
  }
}
