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
  public formData: any;
  constructor(
    public authService: AuthService,
    public builder: FormBuilder
  ) { }

  async confirmPersonalCode(code) {
    await this.authService.confirmPersonalCode(code);

    this.authService.personalCodeSnapshot.subscribe(personalCodeResult => {
      if (personalCodeResult.docs.length == 1) {
        personalCodeResult.docs.forEach(doc => {
          doc.get('userGroup') == 'business' ? this.isBusiness = true : this.isCelebrity = true;
        })

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

          })
        }
      }
    });
  }

  ngOnInit() {

  }
  ngOnDestroy () {
    this.authService.allowSignUp = false;
  }
}