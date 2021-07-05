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

  public loader: boolean;
  public search: string;
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

  load(): void{
    this.optometryService.getClinicalFiles(this.search).subscribe(data => {
      this.clinicalFiles = data.body;
    });
  }

  onClickEdit(): void{
    console.log('event edition..!');
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
