import { Injectable, NgZone, Optional } from '@angular/core';
import { ExtendedDatabaseUser, User, ExtendedDatabaseUserMapper } from "../models/user";
import 'firebase/app';
import { AuthProvider } from '@firebase/auth-types';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { Business } from '../models/business.interface';

@Injectable
  ({
    providedIn: 'root'
  })

export class AuthService {
  userData: ExtendedDatabaseUser | any; // Save logged in user data
  user: User | any;
  userLoggedIn: boolean;
  personalCodeSubscription: Subscription;
  allowSignUp: boolean;
  personalCodeSnapshot: any;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning

  ) {
    this.userLoggedIn = false;
    this.allowSignUp = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });

    this.subscribeToUser();
  }

  ngOnInit() {
    this.subscribeToUser();
  }

  subscribeToUser() {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe( async user => {
      if (user) {
        this.user = user;
        this.setUserInLS();
        await this.getLoggedInUserFromFS();
        this.setUserDataInLS();
      } else {
        localStorage.setItem('user', '');
        let userFromLS: any = !!localStorage.getItem('user') ? localStorage.getItem('user') : ''
      }
    })
  }

  getUserfromLS() {
    let userFromLS: any = !!localStorage.getItem('user') ? localStorage.getItem('user') : ''
    return JSON.parse(userFromLS);
  }

  setUserDataInLS() {
    return localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  setUserInLS(user = this.user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserDataFromLS() {
    let userFromLS: any = !!localStorage.getItem('userData') ? localStorage.getItem('userData') : ''
    return JSON.parse(userFromLS);
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      // set  basic user in local storage
      this.setUserInLS(result.user);

      // get and set extended user data from Users collection to local storage
      await this.getLoggedInUserFromFS();
      this.setUserDataInLS();

      this.ngZone.run(() => {
        this.router.navigate([`profile-page/${result.user.uid}`]);
      });
    } catch (error: any) {
      localStorage.setItem('user', '');
      window.alert(error.message);
    }
  }

  async confirmPersonalCode(personalCode: string) {
    this.userData = {};
    try {
      this.personalCodeSnapshot = this.afs.collection('/personal-codes', ref => ref.where('personalCode', '==', parseInt(personalCode))).get()
      this.personalCodeSubscription = this.personalCodeSnapshot.subscribe(personalCodeResult => {
        if (personalCodeResult.docs.length == 1) {
          personalCodeResult.docs.forEach(doc => {
            this.userData.userGroup = doc.get('userGroup');
            this.userData.personalCode = doc.get('personalCode');
            this.setUserDataInLS();
            this.allowSignUp = true;
          })
        } else {
          window.alert('Cannot find personal code')
        }
      })
    }
    catch (error: any) {
      window.alert('Issue connectiong to Database.');
    }
  }

  // Sign up with email/password
  async signUp(userData) {
    try {
      let result = await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.userPwd);
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.sendVerificationMail();
      if (userData.userGroup == 'celebrity') {
          let formattedUser: ExtendedDatabaseUser = {
          firstName: userData.firstName,
          lastName: userData.lastName, 
          email: userData.email,
          emailVerified: result.user.emailVerified,
          personalCode: this.userData.personalCode,
          userGroup: this.userData.userGroup,
          uid: result.user.uid
        }

        this.setUserData(formattedUser);
        
      } else {
        let formattedUser: Business = {
          name: userData.name,
          email: userData.email,
          emailVerified: result.user.emailVerified,
          personalCode: this.userData.personalCode,
          userGroup: this.userData.userGroup,
          uid: result.user.uid,
        }
        this.setBusinessData(formattedUser)
      }
      
      this.setUserDataInLS();
    } catch (error: any) {
      window.alert(error.message);
    }
  }


  // Send email verfificaiton when new user sign up
  async sendVerificationMail() {
    return this.afAuth.currentUser.then(u => { if (u !== null) { u.sendEmailVerification() } })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forgotten password
  async forgotPassword(passwordResetEmail: any) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    let userFromLS: any = !!localStorage.getItem('user') ? localStorage.getItem('user') : ''
    let user = JSON.parse(userFromLS);
    return user !== ''  ? true : false;
  }


  // Sign in with Google
  GoogleAuth() {
    return;
    // return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async authLogin(provider: AuthProvider) {
    try {
      let result = await this.afAuth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
    } catch (error) {
      window.alert(error);
    }
  }

  /* Setting up user data when sign in with username/password,
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service 
    NOTE: 
    - this is coded here to avoid circular dependency b/ween user and auth services;
    - outside of this service, please use userService.setUserData() for consistency;
  */
  setUserData(user: ExtendedDatabaseUser) {
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

  /* Setting up business data when sign in with username/password,
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service 
    NOTE: 
    - this is coded here to avoid circular dependency b/ween user and auth services;
    - outside of this service, please use userService.setBusinessData() for consistency;*/
  setBusinessData(business: Business) {
    if (business.uid) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`business-partners/${business.uid}`);
      let businessMappedForDB = business;
      businessMappedForDB['createdAt'] = new Date().toDateString();
      return userRef.set(businessMappedForDB, {
        merge: true
      });
    } else {
      return console.error('business is undefined. Cannot set user data.');
    }
  }

  /* Sign out */
  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.userLoggedIn = false;
    this.user = {};
    this.userData = {};
    this.router.navigate(['sign-in']);
  }

  /* Getting the user which is currently logged in from the firestore DB  */
  async getLoggedInUserFromFS() {
    try {
      if (!this.user) {
        this.subscribeToUser();
      } else {
        let userURL = 'users/' + this.user.uid;
        const userRef = this.afs.doc(userURL).get()
        userRef.subscribe(user => {
          if(user.exists) {
            this.userData = user.data();
          } else {
            let businessURL = 'business-partners/' + this.user.uid;
            const businessref = this.afs.doc(businessURL).get()
            businessref.subscribe( business => {
              this.userData = business;
            }

            )
          }
        })

      }
      
    }
    catch (error: any) {
      console.log('Issue connectiong to Database.', error.message);
    }
  }

  
  ngOnDestroy() {
    this.personalCodeSubscription.unsubscribe();

  }
}

