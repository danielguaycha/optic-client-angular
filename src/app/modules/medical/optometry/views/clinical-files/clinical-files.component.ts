import { Component, OnInit } from '@angular/core';
import {OptometryService} from '../../services/optometry.service';
import {ClinicalFileModel} from '../../models/clinical_file.model';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-clinical-files',
  templateUrl: './clinical-files.component.html',
  styleUrls: ['./clinical-files.component.css']
})
export class ClinicalFilesComponent implements OnInit {

  public page: number |1;
  public limit: any = 5;
  public loader: boolean;
  public search: string;
  public clientId: number | -1;
  public clinicalFiles: Array<ClinicalFileModel>;

  constructor(
    private toast: ToastService,
    private optometryService: OptometryService
  ) {
    this.search = '';
    this.clinicalFiles = [];
  }

  ngOnInit(): void {
    this.load();

  }

  onSelectPatient(event): void{
    this.clientId = event.id;
    this.load();
  }

  load(): void{
    // if (this.clientId !== -1 && this.clientId !== undefined){
      this.optometryService.getClinicalFiles().subscribe(data => {
        console.log(data);
        this.clinicalFiles = data.body;
      });
    // }
  }
  onSelect($event): void{
    console.log('gola');
  }
  onKeyPressEnterSearchFileClinical(event: any): void{
    if (event.charCode === 13){
      this.load();
    }
  }



  onClickDelete(id: number): void{
    this.optometryService.delete(id).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message);
        this.load();
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    });
  }

}
