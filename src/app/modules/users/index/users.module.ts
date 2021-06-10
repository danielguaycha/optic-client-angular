import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {UsersRouting} from './users.routing';
import {DialogAddUser} from './components/dialog-add-user/dialog-add-user.component';
import {FormUserComponent} from './components/form-user/form-user.component';
import {AddUserComponent} from './views/add-user/add-user.component';
import {EditUserComponent} from './views/edit-user/edit-user.component';
import {ListUserComponent} from './views/list-user/list-user.component';


@NgModule({
  imports: [CoreModule, UsersRouting],
  exports: [],
  declarations: [
    DialogAddUser,
    FormUserComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  providers: [],
})
export class UserModuleModule {
}
