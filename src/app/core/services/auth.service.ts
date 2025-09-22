import { Injectable } from '@angular/core';
import { firebaseAuth } from '../firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private userService: UserService) {
    firebaseAuth.onAuthStateChanged((user) => {
      this.currentUserSubject.next(user);
    });
  }

  async register(email: string, password: string, firstName: string, lastName: string): Promise<AppUser> {
    const cred: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    const user: AppUser = {
      uid: cred.user.uid,
      email: cred.user.email!,
      firstName,
      lastName,
      photoURL: cred.user.photoURL || '',
      createdAt: Date.now(),
    };

    await this.userService.createUser(user);

    await signOut(firebaseAuth);

    return user;
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return cred.user;
  }

  async logout() {
    return signOut(firebaseAuth);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

   currentUserUid(): string | null {
    return this.currentUserSubject.value?.uid || null;
  }
}
