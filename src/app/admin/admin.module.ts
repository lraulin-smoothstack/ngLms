import { PagerService } from './../common/services/pager.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { PublishersComponent } from './publishers/publishers.component';
import { BranchesComponent } from './branches/branches.component';
import { BorrowersComponent } from './borrowers/borrowers.component';
import { LoansComponent } from './loans/loans.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    BooksComponent,
    PublishersComponent,
    BranchesComponent,
    BorrowersComponent,
    LoansComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [PagerService],
})
export class AdminModule {}
