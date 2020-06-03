import { AuthGuard } from './common/helpers/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import(`./admin/admin.module`).then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'librarian',
    loadChildren: () =>
      import('./librarian/librarian.module').then((m) => m.LibrarianModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'borrower',
    loadChildren: () =>
      import('./borrower/borrower.module').then((m) => m.BorrowerModule),
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
