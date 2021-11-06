import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service

  ) { }

  async createNewDocumentInCollection(collection_id: string, document: any) {
    document['createdAt'] = new Date();
    try { 
      this.afs.collection(collection_id).add(document);
    } catch (e) {
      alert(e.message)
    }
  }
}
