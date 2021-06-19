import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateNoteCreditComponent} from './views/create-note-credit/create-note-credit.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: CreateNoteCreditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class NoteCreditRouting {}
