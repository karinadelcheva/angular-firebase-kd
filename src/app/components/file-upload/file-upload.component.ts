import { Component, Inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  @Input()
  id: string;

  task: any;
  storage: any;
  userProfilePicUploadRef: any;
  uploadTask: UploadTask | undefined;
  files: File[] = [];
  renderImages: any = [];
  progress: any;
  isUploading: boolean;
  sub: any;
  userData: any;

  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    public userService: UsersService,
    private route: ActivatedRoute

  ) {
    this.storage = getStorage();

  }

  ngOnInit(): void {
    // get basic user from route and apply their id to storage reference;
    if (this.id) {
      this.userService.getUserFromFSByID(this.id)
        .then(res => res.subscribe(user => {
          if (user.exists) {
            this.userData = user.data();
          } else {
            this.userService.getBusinessFromFSByID(this.id)
              .then(res => res.subscribe(user => {
                if (user.exists) {
                  this.userData = user.data();
                }
              }))
          }
        }))
    } else {
      console.warn('no user')
    }

  }

  ngOnDestroy() {
    this.sub.unsibscribe()
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  async onImageUpdate() {
    if (this.files.length < 1) {
      this.toaster.error('Please Select Drop your Image first');
      return;
    }

    for (let i = 0; i < this.files.length; i += 1) {
      let file = this.files[i];

      try {
        let response = await this.uploadProfilePicture(this.userData, file);

        this.toaster.success(file.name + 'uploaded Successfully :)');
        const url = (response as any).Location;

      } catch (error) {
        this.toaster.error('Something went wrong! ');
      }
    }
    this.files = [];
  }

  async uploadProfilePicture(user: any, file: File) {
    let userProfilePicUploadRef = ref(this.storage, `profile_pictures/${user.uid}`);
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    this.uploadTask = uploadBytesResumable(userProfilePicUploadRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    this.uploadTask.on('state_changed',
      (snapshot) => {
        this.isUploading = true;
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        this.progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            console.error("User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
            break;

          case 'storage/unknown':
            console.error('Unknown error occurred, inspect error.serverResponse');
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        this.storeDownloadURLtoUser(this.uploadTask);
      }
    );
    this.isUploading = false;

  }

  async storeDownloadURLtoUser(uploadTask: UploadTask) {
    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    this.renderImages.push(JSON.stringify(downloadURL));

    // render new profile pic for user!
    document.getElementById('profile-picture').setAttribute('src', JSON.stringify(downloadURL));

    this.userData.profilePicURL = downloadURL;
    if (this.userData.userGroup == 'business') {
      this.userService.setBusinessData(this.userData);
    } else {
      this.userService.setUserData(this.userData);
    }
  }

  pauseUpload() {
    // Pause the upload
    this.uploadTask.pause();
  }

  resumeUpload() {
    // Resume the upload
    this.uploadTask.resume();
  }

  cancelUpload() {
    // Cancel the upload
    this.uploadTask.cancel();
  }
}
