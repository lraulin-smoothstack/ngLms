import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { BorrowerService } from '../service/borrower.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Cookie containing borrower user id
  public borrowerId: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private borrowerService: BorrowerService
  ) { }

  ngOnInit(): void {
    const cookieExists: boolean = this.cookieService.check('borrowerId');
    if(cookieExists){
      this.router.navigate(['/borrower/home']);
    }
  }

  /* PRODUCTION: For login once auth server isup. */
  // onSubmit(borrowerId: string) {
  //   this.borrowerService.postBorrower(borrowerId)
  //     .subscribe( (borrower) => {
  //       this.cookieService.set(
  //         'borrowerId',
  //         String(borrower.id))
  //       this.router.navigate(['/borrower/home']);
  //     });
  // }
  
  onSubmit(id: string) {
    const borrower = this.borrowerService.postBorrower(id);
    this.cookieService.set(
        'borrowerId',
        String(borrower.id));
    this.router.navigate(['/borrower/home']);
  }
}
