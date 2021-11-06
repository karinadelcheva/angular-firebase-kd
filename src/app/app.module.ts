import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import "@angular/compiler";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase services + enviorment module
import firebase from '@firebase/app-compat';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// App components and services
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AuthService } from "./shared/services/auth.service";

// Noop animations
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';

// Toastr
import { ToastrModule } from 'ngx-toastr';

// Material theme comps
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfilePageViewComponent } from './components/profile-page/profile-page-view/profile-page-view.component';
import { ProfilePageEditComponent } from './components/profile-page/profile-page-edit/profile-page-edit.component';
import { UploadFileService } from './shared/services/files.service';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadProfilePictureComponent } from './components/profile-page/profile-page-edit/upload-profile-picture/upload-profile-picture.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MembershipComponent } from './components/membership/membership.component';
import { MailingService } from './shared/services/mailing.service';



@NgModule
({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfilePageComponent,
    LandingPageComponent,
    ProfilePageViewComponent,
    ProfilePageEditComponent,
    DropZoneDirective,
    FileUploadComponent,
    UploadProfilePictureComponent,
    AboutUsComponent,
    MembershipComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjcW0c1O5KxsIGKpz6quqFQ8d-5mQFH38'
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AngularFireDatabaseModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxDropzoneModule,
    ToastrModule.forRoot(),
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,

  ],
  providers: [AuthService, UploadFileService, MailingService],
  bootstrap: [AppComponent]
})


export class AppModule { }
