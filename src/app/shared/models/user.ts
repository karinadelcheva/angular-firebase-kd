import { ThrowStmt } from "@angular/compiler";

export interface User {
  uid: string;
  email: string;
  profilePicURL?: string;
  emailVerified: boolean;
}

export interface CoreDatabaseUser {
  uid: string;
  email: string;
  personalCode: number;
  userGroup: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
}

export interface ExtendedDatabaseUser {
  uid: string;
  email: string;
  personalCode: number;
  userGroup: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  bio?: string;
  profilePicURL?: string;
  categories?: string[];
  instagramHandle?: string;
  twitterHandle?: string;
  facebookURL?: string;
}

export class ExtendedDatabaseUserMapper implements ExtendedDatabaseUser {
  uid: string;
  email: string;
  personalCode: number;
  userGroup: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  bio?: string; 
  profilePicURL? : string;

  constructor(user) {
    this.uid = user.uid;
    this.email = user.email;
    this.emailVerified = user.emailVerified || false;
    this.personalCode = user.personalCode;
    this.userGroup = user.userGroup;
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.profilePicURL = user.profilePicURL || '';
    this.bio = user.bio;
  }

  mapObjectToExtendedDatabaseUser (user) {
    return new ExtendedDatabaseUserMapper(user)
  }

  public toDB() {
    return {
      uid: this.uid,
      email: this.email,
      emailVerified: this.emailVerified,
      personalCode: this.personalCode,
      userGroup: this.userGroup,
      firstName: this.firstName,
      lastName: this.lastName,
      bio: this.bio,
      profilePicURL: this.profilePicURL
    }
  }
}

export class DefaultUser implements User {
  uid: string;
  email: string;
  profilePicURL: string;
  emailVerified: boolean;
  personalCode: number;
  userGroup: string;
  firstName: string;
  lastName: string;
  

  constructor() {
    this.uid = '';
    this.email = '';
    this.emailVerified = false;
    this.personalCode = 123456;
    this.profilePicURL = '/src/assets/icons/icon-default.png';
    this.userGroup = '';
    this.firstName = '';
    this.lastName = '';
  }

}