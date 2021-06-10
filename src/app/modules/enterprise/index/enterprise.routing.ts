import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GetEnterpriseComponent} from './views/get-enterprise/get-enterprise.component';

const routes: Routes = [
  {path: '', component: GetEnterpriseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class EnterpriseRouting {}
