import { BorrowersComponent } from './admin/borrowers/borrowers.component';
import { PublishersComponent } from './admin/publishers/publishers.component';
import { LoansComponent } from './admin/loans/loans.component';
import { BranchesComponent } from './admin/branches/branches.component';
import { BooksComponent } from './admin/books/books.component';
import { AuthorsComponent } from './admin/authors/authors.component';
import { BorrowerComponent } from './borrower/borrower/borrower.component';
import { AdminComponent } from './admin/admin/admin.component';
import { LibrarianComponent } from './librarian/librarian/librarian.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
