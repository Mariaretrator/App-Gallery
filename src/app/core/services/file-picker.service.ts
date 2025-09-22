import { Injectable } from '@angular/core';
import { FilePicker, PickFilesResult, PickedFile } from '@capawesome/capacitor-file-picker';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class FilePickerService {
  constructor(private supabaseService: SupabaseService) {}

  async pickFile(): Promise<File | null> {
    try {
      const result: PickFilesResult = await FilePicker.pickFiles({ readData: false });
      const pickedFile = result.files[0]; 
      if (!pickedFile) return null;
      return this.convertPickedFileToFile(pickedFile);
    } catch (err) {
      console.error('Error picking file', err);
      return null;
    }
  }

  private convertPickedFileToFile(pickedFile: PickedFile): File {

    if ((pickedFile as any).blob) {
      return new File([(pickedFile as any).blob], pickedFile.name, {
        type: pickedFile.mimeType
      });
    }

    if (pickedFile.data) {
      try {
        const base64 = pickedFile.data.includes(',')
          ? pickedFile.data.split(',')[1]
          : pickedFile.data;
        const byteString = atob(base64);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        return new File([ab], pickedFile.name, { type: pickedFile.mimeType });
      } catch (err) {
        console.warn('Base64 inválido, creando File vacío', pickedFile.name);
      }
    }

    return new File([], pickedFile.name, { type: pickedFile.mimeType });
  }


  async uploadFile(file: File, folder: string = 'imagen'): Promise<string | null> {
    try {
      const { data, error } = await this.supabaseService.client.storage
        .from(folder)
        .upload(`${Date.now()}_${file.name}`, file, { upsert: true });
  
      if (error) throw error;
  
      const { data: publicUrlData } = this.supabaseService.client.storage
        .from(folder)
        .getPublicUrl(`${data.path}`);
  
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Error uploading file', err);
      return null;
    }
  }
  
}
