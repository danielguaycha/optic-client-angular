import {Component, OnInit} from '@angular/core';
import {AppState} from '../../../modules/auth/store/user.reducer';
import {AuthService} from '../../../modules/auth/services/auth.service';
import scripts from '../../sciprts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menu: Array<any>;
  public appState: AppState;

  constructor(public auth: AuthService, public router: Router) {
    this.auth.storeData.subscribe(res => {
      this.appState = res.data;
    })
  }

  ngOnInit() {
    this.configMenu()
  }
  ngAfterViewInit() {
    scripts();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  configMenu() {
    this.menu = [
      {
        name: "Registro y control",
        items: [
          { // clientes
            name: 'Clientes',
            icon: 'fa-user',
            submenu: [
              {
                name: "Registrar",
                to: "/persons/add",
                icon: 'fa-plus',
              },
              {
                name: "Listar",
                to: "/persons",
                icon: "fa-list"
              }
            ]
          },
          { // proveedores
            name: 'Proveedores',
            icon: 'fa-book',
            submenu: [
              {
                name: "Registrar",
                to: "/providers/add",
                icon: 'fa-plus',
              },
              {
                name: "Listar",
                to: "/providers",
                icon: 'fa-list'
              }
            ]
          },
          {
            name: 'Inventario',
            icon: 'fa-box',
            prefixIcon: 'fas',
            submenu: [
              {
                name: "Agregar producto",
                to: "/products/add",
                icon: 'fa-plus',
              },
              {
                name: "Listar Productos",
                to: "/products",
                icon: 'fa-list'
              },
              {
                name: "Ajustes de inventario",
                to: "/inventory/adjust",
                icon: 'fa-list'
              }
            ]
          },
          {
            name: 'Ventas',
            icon: 'fa-shopping-cart',
            submenu: [
              {
                name: 'Nueva Factura de venta',
                to: '/invoice',
                icon: 'fa-cart-plus'
              }
            ]
          }
        ]
      },
      {
        name: "Configuración",
        items: [
          {
            name: "Perfil de empresa",
            to: "/enterprise",
            icon: 'fa-university'
          },
          {
            name: "Configuraciones",
            to: "/config",
            icon: "fa-cog"
          },
          {
            name: "Roles y permisos",
            to: "/roles/add",
            icon: "fa-users"
          },
          {
            name: "Usuarios",
            to: "users",
            icon: "fa-user"
          }
        ]
      }
    ];
  }
}
