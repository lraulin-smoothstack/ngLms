import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { LibrarianComponent } from './librarian.component';
import { BranchesComponent } from './branches/branches.component';
import { BookCopiesComponent } from './book-copies/book-copies.component';
import { LibraryBranchesService } from './services/library-branches.service';
import { BookCopiesService } from './services/book-copies.service';
import { BooksComponent } from './books/books.component';
import { BooksService } from './services/books.service';

@NgModule({
  declarations: [
    LibrarianComponent,
    BranchesComponent,
    BookCopiesComponent,
    BooksComponent,
  ],
  imports: [
    CommonModule,
    LibrarianRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    LibraryBranchesService,
    BookCopiesService,
    BooksService,
    { provide: 'domain', useValue: 'http://localhost:8080' },
  ],
})
export class LibrarianModule {}
