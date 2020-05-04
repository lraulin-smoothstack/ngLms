import { Book } from './book';
import { Loan } from './loan';
import { Branch } from './branch';
import { Borrower } from './borrower';


import { Subject } from 'rxjs';

export interface BorrowerState {
  books?: Book[],
  loans?: Loan[],
  branches?: Branch[],
  borrower?: Borrower
}
