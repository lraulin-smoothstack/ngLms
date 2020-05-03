export interface Author {
  id: number;
  name: string;
}

export interface Borrower {
  id: number;
  name: string;
  address: string | null;
  phoneNumber: string | null;
}

export interface Branch {
  id: number;
  name: string;
  address: string | null;
}

export interface Publisher {
  id: number;
  address: string;
  name: string | null;
  phoneNumber: string | null;
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
