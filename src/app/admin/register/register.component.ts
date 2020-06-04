import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService } from 'src/app/common/services';
import { User } from 'src/app/common/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    const newUser: User = this.registerForm.value;
    switch (newUser.role) {
      case 'ROLE_ADMIN':
        this.userService
          .registerAdmin(newUser)
          .pipe(first())
          .subscribe(
            (data) => {
              alert('Success!');
              this.router.navigate(['/admin']);
            },
            (error) => {
              this.loading = false;
              console.log(error);
            }
          );
        break;
      case 'ROLE_LIBRARIAN':
        this.userService
          .registerLibrarian(newUser)
          .pipe(first())
          .subscribe(
            (data) => {
              alert('Success!');
              this.router.navigate(['/admin']);
            },
            (error) => {
              this.loading = false;
              console.log(error);
            }
          );
        break;
      default:
        console.log(`Error: Selected role ${newUser.role} not recognized.`);
    }
  }
}
