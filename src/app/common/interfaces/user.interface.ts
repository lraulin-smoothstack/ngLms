export class User {
  id: number;
  accountType: 'admin' | 'librarian';
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}
