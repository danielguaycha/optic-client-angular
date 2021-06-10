import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddRolComponent} from './views/add-rol/add-rol.component';

const routes: Routes = [
  {path: 'add', component: AddRolComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class RolesRouting {
}
