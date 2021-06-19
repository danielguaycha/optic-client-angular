import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ConfigGeneralComponent} from './views/general-config/config.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigGeneralComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class ConfigRouting {
}
