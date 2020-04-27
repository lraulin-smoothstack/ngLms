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
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BooksDialogBoxComponent } from './books-dialog-box/books-dialog-box.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    BooksComponent,
    PublishersComponent,
    BranchesComponent,
    BorrowersComponent,
    LoansComponent,
    DialogBoxComponent,
    BooksDialogBoxComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  entryComponents: [DialogBoxComponent],
})
export class AdminModule {}
