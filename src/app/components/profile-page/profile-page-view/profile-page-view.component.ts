import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UploadFileService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-profile-page-view',
  templateUrl: './profile-page-view.component.html',
  styleUrls: ['./profile-page-view.component.css']
})
export class ProfilePageViewComponent implements OnInit {
  @Input()
  user: any;
  constructor(
    public authService: AuthService,
    public fileService: UploadFileService
  ) { 
  }


  ngOnInit(): void {

  }

}
