import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BranchSelectComponent } from './branch-select/branch-select.component';
import { BookCheckoutComponent } from './book-checkout/book-checkout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'branch',
        component: BranchSelectComponent,
      },
      {
        path: 'branch/:id/books',
        component: BookCheckoutComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowerRoutingModule {}
