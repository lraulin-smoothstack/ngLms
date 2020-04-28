export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  author: string;
  title: string;
  publisher: string;
  genre: string;
}
export interface Borrower {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
}

export interface Loan {
  id: number;
  dateIn: Date;
  dateOut: Date;
  dueDate: Date;
  borrower: string;
  bookTitle: string;
  branchName: string;
}

export interface Publisher {
  id: number;
  address: string;
  name: string;
  phoneNumber: string;
}
