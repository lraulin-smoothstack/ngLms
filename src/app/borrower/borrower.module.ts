import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { BorrowerService } from './service/borrower.service';

import { BorrowerRoutingModule } from './borrower-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [HomeComponent, LoginComponent, ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BorrowerRoutingModule
  ],
  providers: [CookieService, BorrowerService]
})
export class BorrowerModule { }
