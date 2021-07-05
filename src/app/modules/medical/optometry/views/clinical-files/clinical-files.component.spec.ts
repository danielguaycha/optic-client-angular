import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalFilesComponent } from './clinical-files.component';

describe('ClinicalFilesComponent', () => {
  let component: ClinicalFilesComponent;
  let fixture: ComponentFixture<ClinicalFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
