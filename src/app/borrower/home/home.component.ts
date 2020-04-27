import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { Borrower } from '../entity/borrower';
import { BorrowerService } from '../service/borrower.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public borrower: Borrower;

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
    //   this.borrowerService.postBorrower(borrowerId)
    //     .subscribe( (borrower) => { this.borrower = borrower; });
    // } else {
    //   this.router.navigate(['/borrower/login']);
    // }

    if(cookieExists){
      const borrowerId = this.cookieService.get('borrowerId');
      const borrower = this.borrowerService.postBorrower(borrowerId);
      this.borrower = borrower;
    } else {
      this.router.navigate(['/borrower/login']);
    }
  }

  logout(): void {
    console.log("LOGGING OUT");
    this.cookieService.delete('borrowerId');
    this.router.navigate(['/borrower/login']);
  }

}
