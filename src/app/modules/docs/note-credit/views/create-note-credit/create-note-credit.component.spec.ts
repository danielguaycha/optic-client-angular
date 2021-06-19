import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteCreditComponent } from './create-note-credit.component';

describe('CreateNoteCreditComponent', () => {
  let component: CreateNoteCreditComponent;
  let fixture: ComponentFixture<CreateNoteCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNoteCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
