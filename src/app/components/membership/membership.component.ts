import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder} from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MailingService } from 'src/app/shared/services/mailing.service';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  membershipForm = FormGroup;
  formData: any;
  constructor(
    private builder: FormBuilder, 
    private common: CommonService
    ) { }
    
  ngOnInit() {

    this.formData = this.builder.group({
      requesterName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      companyName: new FormControl('', [Validators.required]),
      companyInformation: new FormControl('', [Validators.required]),

    })
  }

  async sendMembershipRequest(formData) {
    await this.common.createNewDocumentInCollection('membership-form-requests', formData)
  }
}
