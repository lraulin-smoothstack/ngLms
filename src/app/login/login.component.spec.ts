import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { User } from '../common/interfaces';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../common/services';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

export class MockRouter {
  navigate(v) {}
}

export class MockAuthenticationService {
  #currentUser: User = null;

  public get currentUser(): User {
    return this.#currentUser;
  }

  login(): Observable<User> {
    const user: User = null;
    return of(user);
  }

  logout(): void {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authenticationService: AuthenticationService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
      ],
      providers: [
        AuthenticationService,
        { provide: Router, useClass: MockRouter },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: 'domain', useValue: 'http://localhost:8080' },
      ],
    }).compileComponents();

    authenticationService = new AuthenticationService(null, '');
    const mockRouter = new MockRouter();
    component = new LoginComponent(authenticationService, mockRouter as any);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
