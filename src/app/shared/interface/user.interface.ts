export interface AppUser {
  uid: string;
  email: string | null;
  displayName?: string;
  photoURL?: string;
  createdAt: number;
}