import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { BorrowerService } from '../service/borrower.service';

import { Loan } from '../entity/loan';
import { Borrower } from '../entity/borrower';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public borrower: Borrower;
  public loans: Array<Loan>;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private borrowerService: BorrowerService
  ) {}

  ngOnInit(): void {
    const cookieExists: boolean = this.cookieService.check('borrowerId');

    /* PRODUCTION: For login once auth server isup. */
    // if(cookieExists){
    //   const borrowerId = this.cookieService.get('borrowerId');
    //   this.borrowerService.getBorrower(borrowerId)
    //     .subscribe( (borrower) => { this.borrower = borrower; });
    // } else {
    //   this.router.navigate(['/borrower/login']);
    // }

    if(cookieExists){
      const borrowerId = this.cookieService.get('borrowerId');
      const borrower = this.borrowerService.getBorrower(borrowerId);
      this.borrower = borrower;
      this.borrowerService.getLoans(this.borrower.id)
         .subscribe( (loans) => { this.loans = loans; });
    } else {
      this.router.navigate(['/borrower/login']);
    }
  }

  checkoutBook(): void {
    this.router.navigate(['/borrower/checkout']);
  }

  logout(): void {
    this.cookieService.deleteAll('/');
    this.router.navigate(['/']);
  }

}
