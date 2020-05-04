import { PagerService } from './../common/services/pager.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SortableDirective } from './sortable.directive';
import { GenresComponent } from './genres/genres.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    BooksComponent,
    BorrowersComponent,
    BranchesComponent,
    LoansComponent,
    PublishersComponent,
    SortableDirective,
    GenresComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [PagerService],
})
export class AdminModule {}
