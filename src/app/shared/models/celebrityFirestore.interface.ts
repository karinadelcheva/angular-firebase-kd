export interface CelebrityFireStoreInterface {
    email: string;
    personalCode: number;
    firstName: string;
    lastName: string;
    userGroup: string;
    bio: string;
    socialMedia: {};
    address: {};
  }
  

export class DefaultCelebrityFromFirestore implements CelebrityFireStoreInterface{
    
    email: string;
    personalCode: number;
    firstName: string;
    lastName: string;
    userGroup: string;
    bio: string;
    socialMedia: {};
    address: {};
    constructor(
    ) {
        this.email = 'email';
        this.personalCode = 1224;
        this.firstName = 'firstName';
        this.lastName = 'lastName';
        this.userGroup = 'userGroup';
        this.bio = 'bio';
        this.socialMedia = {};
        this.address = {};
    }
}