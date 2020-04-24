import { LibrarianRoutingModule } from './librarian-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarianComponent } from './librarian.component';
import { BranchesComponent } from './branches/branches.component';

@NgModule({
  declarations: [LibrarianComponent, BranchesComponent],
  imports: [CommonModule, LibrarianRoutingModule],
})
export class LibrarianModule {}
