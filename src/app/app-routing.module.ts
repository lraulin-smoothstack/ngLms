import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LibrarianComponent } from './librarian/librarian/librarian.component';
import { PublishersComponent } from './admin/publishers/publishers.component';
import { LoansComponent } from './admin/loans/loans.component';
import { BranchesComponent } from './admin/branches/branches.component';
import { BorrowerComponent } from './borrower/borrower/borrower.component';
import { BooksComponent } from './admin/books/books.component';
import { AuthorsComponent } from './admin/authors/authors.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
  { path: 'admin/authors', component: AuthorsComponent },
  { path: 'admin/books', component: BooksComponent },
  { path: 'admin/borrowers', component: BorrowerComponent },
  { path: 'admin/branches', component: BranchesComponent },
  { path: 'admin/loans', component: LoansComponent },
  { path: 'admin/publishers', component: PublishersComponent },
  { path: 'borrower', component: BorrowerComponent },
  { path: 'librarian', component: LibrarianComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
