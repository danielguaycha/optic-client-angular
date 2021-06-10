import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DocsComponent} from './views/docs/docs.component';

const routes: Routes = [
  {path: '', component: DocsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class CfdiRouting {}
