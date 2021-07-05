import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../../core/core.module';
import {OptometryRouting} from './optometry.routing';
import { ClinicalFilesComponent } from './views/clinical-files/clinical-files.component';
import { FrmIntegralComponent } from './components/frm-integral/frm-integral.component';
import { DialogIntegralComponent } from './components/dialog-integral/dialog-integral.component';
import {PersonModule} from '../../persons/person.module';



@NgModule({
  declarations: [
    ClinicalFilesComponent,
    FrmIntegralComponent,
    DialogIntegralComponent
  ],
    imports: [
        CoreModule,
        OptometryRouting,
        PersonModule
    ]
})
export class OptometryModule { }
