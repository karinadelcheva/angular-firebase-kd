import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfilePageViewComponent } from './components/profile-page/profile-page-view/profile-page-view.component';
import { ProfilePageEditComponent } from './components/profile-page/profile-page-edit/profile-page-edit.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MembershipComponent } from './components/membership/membership.component';

const routes: Routes = [
  {path: 'landing', component: LandingPageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile-page/:id', component: ProfilePageComponent, children: [
    {path: 'profile-page-view', component: ProfilePageViewComponent},
    {path: 'profile-page-edit', component: ProfilePageEditComponent},
  ]},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'about-us', component: AboutUsComponent},
  { path: 'membership', component: MembershipComponent},
  { path: '', redirectTo: 'landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }