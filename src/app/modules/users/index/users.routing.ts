import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddUserComponent} from './views/add-user/add-user.component';
import {ListUserComponent} from './views/list-user/list-user.component';
import {EditUserComponent} from './views/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', component: ListUserComponent},
  {path: 'add', component: AddUserComponent},
  {path: ':id/edit', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class UsersRouting {}
