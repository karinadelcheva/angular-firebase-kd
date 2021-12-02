import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  public isCelebrity: boolean = false;
  public isBusiness: boolean = false;
  public formData: FormGroup;
  constructor(
    public authService: AuthService,
    public builder: FormBuilder
  ) { }

  async confirmPersonalCode(code) {
    let personalCodeSnapshot = await this.authService.confirmPersonalCode(code);
    let personalCodeSubscription = personalCodeSnapshot.subscribe(personalCodeResult => {
      if (personalCodeResult.docs.length == 1) {
        let doc = personalCodeResult.docs[0];
        this.authService.userData.userGroup = doc.get('userGroup');
        this.authService.userData.personalCode = doc.get('personalCode');
        this.authService.setUserDataInLS();


        doc.get('userGroup') == 'business' ? this.isBusiness = true : this.isCelebrity = true;
        if (this.isBusiness) {
          this.formData = this.builder.group({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            userPwd: new FormControl('', [Validators.required])
          })
        } else {
          this.formData = this.builder.group({
            userFirstName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
            userLastName: new FormControl('', [Validators.required]),
            userPwd: new FormControl('', [Validators.required]),

          });
          this.authService.allowSignUp = true;

          console.log(this.formData);


        }

      } else {
        window.alert('Cannot find personal code')
        return null;
      }
    })

  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.authService.allowSignUp = false;
  }
}