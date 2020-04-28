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
import { BooksDialogBoxComponent } from './books-dialog-box/books-dialog-box.component';
import { BorrowersDialogBoxComponent } from './borrowers-dialog-box/borrowers-dialog-box.component';
import { BranchesDialogBoxComponent } from './branches-dialog-box/branches-dialog-box.component';
import { LoansDialogBoxComponent } from './loans-dialog-box/loans-dialog-box.component';
import { PublishersDialogBoxComponent } from './publishers-dialog-box/publishers-dialog-box.component';
import { AuthorsDialogBoxComponent } from './authors-dialog-box/authors-dialog-box.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorsComponent,
    BooksComponent,
    PublishersComponent,
    BranchesComponent,
    BorrowersComponent,
    LoansComponent,
    BooksDialogBoxComponent,
    BorrowersDialogBoxComponent,
    BranchesDialogBoxComponent,
    LoansDialogBoxComponent,
    PublishersDialogBoxComponent,
    AuthorsDialogBoxComponent,
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
  entryComponents: [
    BooksDialogBoxComponent,
    BorrowersDialogBoxComponent,
    BranchesDialogBoxComponent,
    LoansDialogBoxComponent,
    PublishersDialogBoxComponent,
    AuthorsDialogBoxComponent,
  ],
})
export class AdminModule {}
