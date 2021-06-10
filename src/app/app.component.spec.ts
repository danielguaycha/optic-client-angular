import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './modules/auth/store/user.reducer';
import {AuthService} from './modules/auth/services/auth.service';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({data: userReducer}),
      ],
      providers: [AuthService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /*it(`should have as title 'optic-client-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('optic-client-angular');
  });*/

/*  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('optic-client-angular app is running!');
  });*/
});
