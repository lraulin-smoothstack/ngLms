import { BorrowerComponent } from './borrower/borrower/borrower.component';
import { AdminComponent } from './admin/admin/admin.component';
import { LibrarianComponent } from './librarian/librarian/librarian.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'admin', component: AdminComponent },
      { path: 'borrower', component: BorrowerComponent },
      { path: 'librarian', component: LibrarianComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
