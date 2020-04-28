import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrarianComponent } from './librarian.component';
import { BranchesComponent } from '../admin/branches/branches.component';
import { BookCopiesComponent } from './book-copies/book-copies.component';

const routes: Routes = [
  {
    path: '',
    component: LibrarianComponent,
  },
  {
    path: '/branches',
    component: BranchesComponent,
    children: [{ path: '/book-copies', component: BookCopiesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarianRoutingModule {}
