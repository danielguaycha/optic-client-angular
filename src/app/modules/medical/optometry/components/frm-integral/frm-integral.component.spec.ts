import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmIntegralComponent } from './frm-integral.component';

describe('FrmIntegralComponent', () => {
  let component: FrmIntegralComponent;
  let fixture: ComponentFixture<FrmIntegralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmIntegralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmIntegralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
