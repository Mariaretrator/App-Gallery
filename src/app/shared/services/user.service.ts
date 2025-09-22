import { Injectable } from '@angular/core';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from 'src/app/core/firebase.config';
import { AppUser } from '../interface/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private collection = 'users';

  constructor() {}

  async createUser(user: AppUser): Promise<void> {
    const ref = doc(firebaseDB, this.collection, user.uid);
    await setDoc(ref, user, { merge: true });
  }

  async getUser(uid: string): Promise<AppUser | null> {
    const ref = doc(firebaseDB, this.collection, uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as AppUser) : null;
  }

  async updateUser(uid: string, data: Partial<AppUser>): Promise<void> {
    const ref = doc(firebaseDB, this.collection, uid);
    await updateDoc(ref, data);
  }

  async deleteUser(uid: string): Promise<void> {
    const ref = doc(firebaseDB, this.collection, uid);
    await deleteDoc(ref);
  }
}
