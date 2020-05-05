export interface Author {
  id: number;
  name: string;
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

export interface Publisher {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  publisher: Publisher;
  genres: Genre[];
}

export interface Loan {
  id: {
    book: Book;
    borrower: Borrower;
    branch: Branch;
  };
  dateOut: Date;
  dueDate: Date;
  dateIn: Date | null;
}
