import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../common/interfaces/user.interface';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  email: string;
  password: string;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (this.authenticationService.currentUser) {
      this.navigateHome(this.authenticationService.currentUser.role);
    }
  }

  ngOnInit(): void {}

  navigateHome(role: string) {
    if (role == 'ROLE_LIBRARIAN') {
      this.router.navigate(['/librarian']);
    } else if (role == 'ROLE_ADMIN') {
      this.router.navigate(['/admin']);
    }
  }

  login(form: NgForm): void {
    this.error = '';
    this.isLoading = true;
    this.authenticationService.login(form.value).subscribe(
      (data: User) => {
        this.isLoading = false;
        this.email = '';
        this.password = '';
        this.navigateHome(data.role);
      },
      (error) => {
        this.isLoading = false;
        this.password = '';
        this.error = error;
      }
    );
  }
}
