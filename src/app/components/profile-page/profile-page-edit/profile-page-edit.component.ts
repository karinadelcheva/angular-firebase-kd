import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFormData } from './models/userFormData.interface';
import { BusinessFormData } from './models/businessFormData.interface';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-profile-page-edit',
  templateUrl: './profile-page-edit.component.html',
  styleUrls: ['./profile-page-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProfilePageEditComponent implements OnInit {
  selectedCategories: string[] = [];
  celebrityCategoryOptions: string[] = ['инфлуенсър', 'музика', 'театър', 'кино', 'литература', 'бизнес', 'спорт'];
  categorySelection = new FormControl();
  isBusiness: boolean;
  isCelebrity: boolean;
  formData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    public authService: AuthService,
    public router: Router,
    public builder: FormBuilder,
    public userService: UsersService
  ) { 

    this.user = user.user;
    
  }

  updateSelection(selection: string[]) {
    this.selectedCategories =selection;
  }

  async saveForm(formData: any) {
    if (this.isBusiness) {
      await this.saveBusinessData(formData);
    } else {
      await this.saveUserData(formData)
    }
  }
  
  async saveUserData(formData: UserFormData) {
    try {
      this.user.email = formData.email;
      this.user.firstName = formData.firstName;
      this.user.lastName = formData.lastName;
      this.user.bio = formData.bio;
      this.user.categories = this.selectedCategories;
      this.user.instagramHandle = formData.instagramHandle;
      this.user.facebookURL = formData.facebookURL;
      this.user.twitterHandle = formData.twitterHandle;
        
      await this.userService.setUserData(this.user);
      await this.authService.getLoggedInUserFromFS();
      this.user = this.authService.userData;
      this.router.navigate(['profile-page/profile-page-view']);
      window.location.reload();

      window.alert('Successfully saved your data!')
    }
    catch {
      window.alert('Cannot save user data.')
    }
  }

  
  async saveBusinessData(formData: BusinessFormData) {
    try {
      this.user.email = formData.email;
      this.user.lastName = formData.name;
      this.user.description = formData.description;
      this.user.categories = this.selectedCategories;
      this.user.instagramHandle = formData.instagramHandle;
      this.user.facebookURL = formData.facebookURL;
      this.user.twitterHandle = formData.twitterHandle;
      this.user.location = formData.location;
      this.user.hashtags = formData.hashtags;
      await this.userService.setBusinessData(this.user);
      await this.authService.getLoggedInUserFromFS();
      this.user = this.authService.userData;
      this.router.navigate(['profile-page/profile-page-view']);
      window.location.reload();

      window.alert('Successfully saved your data!')
    }
    catch {
      window.alert('Cannot save user data.')
    }
  }


  async ngOnInit() {
    this.isBusiness = this.user.userGroup == 'business';
    this.isCelebrity = this.user.userGroup == 'celebrity';
    if (this.isBusiness) {
      let hashtags = this.user.hashtags ? this.user.hashtags.join() : '';
      this.formData = this.builder.group({
        name: new FormControl(this.user.name, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required]),
        description: new FormControl(this.user.description || '', Validators.required),
        instagramHandle: new FormControl(this.user.instagramHandle || ''),
        twitterHandle: new FormControl(this.user.twitterHandle || ''),
        facebookURL: new FormControl(this.user.facebookURL || ''),
        location: new FormControl(!!this.user.location || ''),
        hashtags: new FormControl(hashtags)
      })
    } else {
      this.formData = this.builder.group({
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, Validators.required),
        email: new FormControl(this.user.email, [Validators.compose([Validators.required, Validators.email])]),
        bio: new FormControl(this.user.bio || '', Validators.required),
        instagramHandle: new FormControl(this.user.instagramHandle || ''),
        twitterHandle: new FormControl(this.user.twitterHandle || ''),
        facebookURL: new FormControl(this.user.facebookURL || '')
      })
    }
  }

}
