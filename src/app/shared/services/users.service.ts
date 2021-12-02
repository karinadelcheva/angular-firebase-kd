import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Business } from '../models/business.interface';
import { ExtendedDatabaseUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  celebrities: any[];
  celebritiesSubscription: any;
  constructor(
    public afs: AngularFirestore   // Inject Firestore service

  ) {
    this.celebrities = [];
  }

  getAllCelebrities() {
    try {
      let usersSnapshot = this.afs.collection('/users', ref => ref.where('userGroup', '==', 'celebrity')).get()
      this.celebritiesSubscription = usersSnapshot.subscribe(users => {
        this.celebrities = users.docs.map(doc => doc.data());
      });
    }
    catch (error: any) {
      window.alert('Issue connectiong to Database.');
    }
  }


  async getUserFromFSByID(id: string) {
    try {
      let userURL = 'users/' + id;
      const userRef = this.afs.doc(userURL).get()
      return userRef;
    }
    catch (error: any) {
      console.log('Issue connectiong to Database.', error.message);
      return null;
    }
  }

  async getBusinessFromFSByID(id: string) {
    try {
      let userURL = 'business-partners/' + id;
      const userRef = this.afs.doc(userURL).get()
      return userRef;

    }
    catch (error: any) {
      console.log('Issue connectiong to Database.', error.message);
      return null;
    }
  }

  /* Setting up business data provider in Firestore database using AngularFirestore */
  async setBusinessData(business: Business) {
    if (business.uid) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`business-partners/${business.uid}`);

      let userMappedForDB = business;
      userMappedForDB['hashtags'] = this.formatHashtags(business.hashtags)
      userMappedForDB['createdAt'] = new Date().toDateString();
      return userRef.set(userMappedForDB, {
        merge: true
      });
    } else {
      return console.error('User is undefined. Cannot set user data.');
    }
  }

   /* Setting up user data provider in Firestore database using AngularFirestore service */
  async setUserData(user: ExtendedDatabaseUser) {
    if (user.uid) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      let userMappedForDB = user;
      userMappedForDB['createdAt'] = new Date().toDateString();
      return userRef.set(userMappedForDB, {
        merge: true
      });
    } else {
      return console.error('User is undefined. Cannot set user data.');
    }
  }
  
  formatHashtags(tags) {
    if(typeof tags == 'string') {
      let array = tags.split(',');
      return array.map((word: string) => { return word.trim()})
    } else {
      return tags;
    }
  }


  ngOnDestroy() {
    this.celebritiesSubscription.unsibscribe()
  }
}
