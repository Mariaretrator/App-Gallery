import { Injectable } from '@angular/core';
import { FilePicker, PickFilesResult, PickedFile } from '@capawesome/capacitor-file-picker';
import { environment } from '../../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class FilePickerService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  /** Selecciona un solo archivo */
  async pickFile(): Promise<File | null> {
    try {
      const result: PickFilesResult = await FilePicker.pickFiles({
        readData: true
      });

      const pickedFile = result.files[0]; 
      if (!pickedFile) return null;

      return this.convertPickedFileToFile(pickedFile);
    } catch (err) {
      console.error('Error picking file', err);
      return null;
    }
  }

  /** Selecciona múltiples archivos */
  async pickFiles(): Promise<File[]> {
    try {
      const result: PickFilesResult = await FilePicker.pickFiles({
        readData: true
      });

      return result.files.map(f => this.convertPickedFileToFile(f));
    } catch (err) {
      console.error('Error picking files', err);
      return [];
    }
  }

  /** Convierte PickedFile a File */
  private convertPickedFileToFile(pickedFile: PickedFile): File {
    if (pickedFile.data) {
      const byteString = atob(pickedFile.data.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      return new File([ab], pickedFile.name, { type: pickedFile.mimeType });
    } else {
      // fallback si no hay data
      return new File([], pickedFile.name, { type: pickedFile.mimeType });
    }
  }

  /** Subir un solo archivo a Supabase */
  async uploadFile(file: File, folder: string = 'imagen'): Promise<string | null> {
    try {
      const { data, error } = await this.supabase.storage
        .from(folder)
        .upload(file.name, file, { upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = this.supabase.storage.from(folder).getPublicUrl(file.name);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Error uploading file', err);
      return null;
    }
  }

  /** Subir múltiples archivos a Supabase */
  async uploadFiles(files: File[], folder: string = 'imagen'): Promise<string[]> {
    const urls: string[] = [];
    for (const file of files) {
      const url = await this.uploadFile(file, folder);
      if (url) urls.push(url);
    }
    return urls;
  }
}
