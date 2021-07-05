import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClinicalFilesComponent} from './views/clinical-files/clinical-files.component';

const routes: Routes = [
  {
    component: ClinicalFilesComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class OptometryRouting {
}
