import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPricesComponent } from './frm-prices.component';

describe('FrmPricesComponent', () => {
  let component: FrmPricesComponent;
  let fixture: ComponentFixture<FrmPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
