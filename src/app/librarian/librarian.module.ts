import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { LibrarianComponent } from './librarian.component';
import { BranchesComponent } from './branches/branches.component';
import { BookCopiesComponent } from './book-copies/book-copies.component';

@NgModule({
  declarations: [LibrarianComponent, BranchesComponent, BookCopiesComponent],
  imports: [CommonModule, LibrarianRoutingModule, HttpClientModule],
})
export class LibrarianModule {}
