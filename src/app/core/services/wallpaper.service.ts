import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { FilePickerService } from './file-picker.service';
import { ImageEntity } from 'src/app/shared/interface/image.interface';
import { v4 as uuidv4 } from 'uuid';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth,
    private filePicker: FilePickerService
  ) {}

  async uploadWallpaper(): Promise<ImageEntity | null> {
    try {
      const file = await this.filePicker.pickFile();
      if (!file) return null;

      const uid = this.auth.currentUser?.uid;
      if (!uid) throw new Error('No authenticated user');


      const fileRef = ref(this.storage, `users/${uid}/wallpapers/${file.name}`);
      await uploadBytes(fileRef, file);

  
      const url = await getDownloadURL(fileRef);

 
      const wallpaper: ImageEntity = {
        id: uuidv4(),
        name: file.name,
        url,
        createdAt: new Date()
      };


      const refCollection = collection(this.firestore, `users/${uid}/wallpapers`);
      await addDoc(refCollection, wallpaper);

      return wallpaper;
    } catch (err) {
      console.error('Error uploading wallpaper:', err);
      return null;
    }
  }

  
  getWallpapers(): Observable<ImageEntity[]> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) throw new Error('No authenticated user');

    const refCollection = collection(this.firestore, `users/${uid}/wallpapers`);
    return collectionData(refCollection, { idField: 'id' }).pipe(
      map((data) => data as ImageEntity[])
    );
  }

  async deleteWallpaper(id: string): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) throw new Error('No authenticated user');

    const docRef = doc(this.firestore, `users/${uid}/wallpapers/${id}`);
    await deleteDoc(docRef);
  }
}
