import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  styleUrls: ['./upload-profile-picture.component.css']
})
export class UploadProfilePictureComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    public dialogRef: MatDialogRef<UploadProfilePictureComponent>,
    public authService: AuthService,
    public router: Router
  ) {
    this.user = user.user;

  }

  ngOnInit(): void {
  }

  async close() {
    await this.authService.getLoggedInUserFromFS();
    this.router.navigate(['profile-page/profile-page-view']);
    window.location.reload();
    this.dialogRef.close();
  }
}
