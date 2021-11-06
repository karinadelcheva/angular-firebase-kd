import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnersService {
  businessPartners: any[];
  businessPartnersSubscription: any;
  constructor(
    public afs: AngularFirestore   // Inject Firestore service

  ) {
    this.businessPartners = [];
  }

  getBusinessPartners() {
    try {

      let businessCodesSnapshot = this.afs.collection('/business-partners').get()
      this.businessPartnersSubscription = businessCodesSnapshot.subscribe(businesses => {
        this.businessPartners = businesses.docs.map(doc => doc.data());
      });
    }
    catch (error: any) {
      window.alert('Issue connectiong to Database.');
    }
  }



  ngOnDestroy() {
    this.businessPartnersSubscription.unsibscribe()
  }
}
