import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { LibrarianComponent } from './librarian.component';
import { BranchesComponent } from './branches/branches.component';
import { BookCopiesComponent } from './book-copies/book-copies.component';
import { LibraryBranchesService } from './services/library-branches.service';

@NgModule({
  declarations: [LibrarianComponent, BranchesComponent, BookCopiesComponent],
  imports: [CommonModule, LibrarianRoutingModule, HttpClientModule, NgbModule],
  providers: [LibraryBranchesService],
})
export class LibrarianModule {}
