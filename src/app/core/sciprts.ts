import {Tooltip} from 'bootstrap';
function init() {
  'use strict'

  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new Tooltip(tooltipTriggerEl)
  });

  const asideSubmenu = document.querySelectorAll('.aside-sub-item .sub-item-btn');
  asideSubmenu.forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('show');
      const tooltip = Tooltip.getInstance(this) ;
      tooltip.hide();
    })
  });

  const menus = document.querySelectorAll('.open-menu-item');
  menus.forEach(m => {
    m.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('.menu-item').forEach(e => e.classList.remove('show'));
      this.parentNode.classList.toggle('show');
    })
  })

  const submenus = document.querySelectorAll('.submenu-content-open');
  submenus.forEach(s => {
    s.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('show');
      closeSubMenusNav(this.parentNode);
    })
  })


  document.addEventListener('click', function (e: any) {

    const compList = e.target;
    const paretnClass = e.target.parentNode;

    if (compList && !compList.classList.contains('sub-item-btn') && paretnClass && !paretnClass.classList.contains('sub-item-btn')) {
        document.querySelectorAll('.aside-sub-item').forEach(e => e.classList.remove('show'));
    }

    if (compList && !compList.classList.contains('submenu-content') && paretnClass && !paretnClass.classList.contains('submenu-content')) {
      document.querySelectorAll('.submenu-content').forEach(e => e.classList.remove('show'));
      if (!compList.classList.contains('open-menu-item')) {
        document.querySelectorAll('.menu-item').forEach(e => e.classList.remove('show'));
      }

    }
  });

  document.getElementById('btnMenu').addEventListener('click', function (e) {
    e.preventDefault();
    const menu = document.getElementById('nav-menu');
    const overlay =  document.querySelector('.overlay');
    menu.classList.toggle('show');
    overlay.classList.toggle('show');
    overlay.addEventListener('click', function (e) {
      e.preventDefault();
      menu.classList.remove('show');
      overlay.classList.remove('show');
    })

  })

  function closeSubMenusNav(component) {
    const s = document.querySelectorAll('.submenu-content');
    s.forEach(m => {
      if(m!==component) {
        m.classList.remove('show');
      }
    })
  }

}
export default init;
