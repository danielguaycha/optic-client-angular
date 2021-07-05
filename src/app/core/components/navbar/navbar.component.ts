import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppState} from '../../../modules/auth/store/user.reducer';
import {AuthService} from '../../../modules/auth/services/auth.service';
import scripts from '../../utils/sciprts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  public menu: Array<any>;
  public appState: AppState;

  constructor(public auth: AuthService, public router: Router) {
    this.auth.storeData.subscribe(res => {
      this.appState = res.data;
    });
  }

  ngOnInit(): void {
    this.configMenu();
  }
  ngAfterViewInit(): void{
    scripts();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  configMenu(): void{
    this.menu = [
      {
        name: 'Registro y control',
        items: [
          { // clientes
            name: 'Clientes',
            icon: 'fa-user',
            submenu: [
              {
                name: 'Registrar',
                to: '/persons/add',
                icon: 'fa-plus',
              },
              {
                name: 'Listar',
                to: '/persons',
                icon: 'fa-list'
              }
            ]
          },
          { // proveedores
            name: 'Proveedores',
            icon: 'fa-book',
            submenu: [
              {
                name: 'Registrar',
                to: '/persons/provider/add',
                icon: 'fa-plus',
              },
              {
                name: 'Listar',
                to: '/persons/providers',
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
                name: 'Agregar producto',
                to: '/inventory/articles/add',
                icon: 'fa-plus',
              },
              {
                name: 'Listar Productos',
                to: '/inventory/articles',
                icon: 'fa-list'
              },
              {
                name: 'Ajustes de inventario',
                to: '/inventory/adjust',
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
                to: '/doc/invoice',
                icon: 'fa-cart-plus'
              },
              {
                name: 'Nota de Crédito (Devolución)',
                to: '/doc/note-credit',
                icon: 'fa-file'
              }
            ]
          },
        ]
      },
      {
        name: 'Configuración',
        items: [
          {
            name: 'Perfil de empresa',
            to: 'enterprise',
            icon: 'fa-university'
          },
          {
            name: 'Configuraciones',
            to: 'enterprise/config',
            icon: 'fa-cog'
          },
          {
            name: 'Roles y permisos',
            to: 'users/roles/add',
            icon: 'fa-users'
          },
          {
            name: 'Usuarios',
            to: 'users',
            icon: 'fa-user'
          }
        ]
      },

      {
        name: 'Medicina',
        items: [
          {
            name: 'Optometría',
            icon: 'fa-eye',
            submenu: [
              {
                name: 'Nueva Ficha Clínica',
                to: '/medical/optometry',
                icon: 'fa-plus'
              },
              {
                name: 'Historial Clínico',
                to: '/medical/optometry',
                icon: 'fa-file'
              }
            ]
          }
        ]
      }
    ];
  }
}
