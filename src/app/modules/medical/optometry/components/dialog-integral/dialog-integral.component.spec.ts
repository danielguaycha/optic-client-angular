import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIntegralComponent } from './dialog-integral.component';

describe('DialogIntegralComponent', () => {
  let component: DialogIntegralComponent;
  let fixture: ComponentFixture<DialogIntegralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIntegralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIntegralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
