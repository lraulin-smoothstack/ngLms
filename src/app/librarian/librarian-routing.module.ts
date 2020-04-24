import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LibrarianComponent } from './librarian.component';

const routes: Routes = [
  {
    path: '',
    component: LibrarianComponent,
    children: [],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarianRoutingModule {}
