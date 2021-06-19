import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GetEnterpriseComponent} from './views/get-enterprise/get-enterprise.component';
import {NotifyComponent} from './views/notify/notify.component';

const routes: Routes = [
  {path: '', component: GetEnterpriseComponent},
  {path: 'notifies', component: NotifyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class EnterpriseRouting {}
