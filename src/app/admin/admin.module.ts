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
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    BooksComponent,
    PublishersComponent,
    BranchesComponent,
    BorrowersComponent,
    LoansComponent,
    TestComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
