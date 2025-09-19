import { Injectable } from '@angular/core';
import { firebaseAuth, firebaseDB } from '../firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AppUser } from 'src/app/shared/interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  async register(email: string, password: string, displayName?: string): Promise<AppUser> {
    const cred: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    const user: AppUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName || '',
      photoURL: cred.user.photoURL || '',
      createdAt: Date.now()
    };

    await setDoc(doc(firebaseDB, 'users', user.uid), user);
    return user;
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return cred.user;
  }

  async logout() {
    return signOut(firebaseAuth);
  }
}