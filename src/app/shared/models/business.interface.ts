export interface Business {
    
    uid: string;
    email: string;
    personalCode: number;
    userGroup: string;
    emailVerified: boolean;
    name: string;
    desciption?: string;
    logoURL?: string;
    categories?: string[];
    instagramHandle?: string;
    twitterHandle?: string;
    facebookURL?: string;
    address?: string;
    location?: [];
    hashtags?: string[]
    
}