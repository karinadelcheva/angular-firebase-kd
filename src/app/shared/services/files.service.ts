import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FileUpload } from '../models/file.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase) {
    const firebaseApp = getApp();
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();

    // Create a storage reference from our storage service
    const storageRef = ref(storage);

    // Create a storage reference for profile_pictures
    const profilePicturesFolderRef = ref(storage, 'profile_pictures');

   }

}