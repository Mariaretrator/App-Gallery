export interface AppUser {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  createdAt: number;
}
