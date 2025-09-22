import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImageEntity } from 'src/app/shared/interface/image.interface';
import { FilePickerService } from './file-picker.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private collectionName = 'imagen';

  constructor(
    private filePicker: FilePickerService,
    private firestore: AngularFirestore
  ) {}

  async pickAndUploadImage(): Promise<ImageEntity | null> {
    const file = await this.filePicker.pickFile();
    if (!file) return null;

    const url = await this.filePicker.uploadFile(file);
    if (!url) return null;

    const image: ImageEntity = {
      name: file.name,
      url,
      createdAt: new Date()
    };

    const docRef = await this.firestore.collection<ImageEntity>(this.collectionName).add(image);
    image.id = docRef.id;

    return image;
  }

  getImages(): Observable<ImageEntity[]> {
    return this.firestore
      .collection<ImageEntity>(this.collectionName, ref => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ImageEntity;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  async deleteImage(image: ImageEntity) {
    if (!image.id) return;
    await this.firestore.collection(this.collectionName).doc(image.id).delete();
  }
}
