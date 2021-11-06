import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadProfilePictureComponent } from './profile-page-edit/upload-profile-picture/upload-profile-picture.component';
import { ProfilePageEditComponent } from './profile-page-edit/profile-page-edit.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { MapsAPILoader } from '@agm/core';
import { SofiaLatLng } from 'src/app/shared/services/maps/sofiaLatLng';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProfilePageComponent implements OnInit {

  public view: boolean;
  public edit: boolean;
  public loading: boolean;
  public userData: any;
  public isMyProfile: boolean;
  public sub: any;
  public isBusiness: boolean;
  public isCelebrity: boolean;
  public lat = SofiaLatLng.lat;
  public lng = SofiaLatLng.lng;
  geoCoder: any;


  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UsersService,
    private mapsAPILoader: MapsAPILoader,

  ) {
   }

  openUpdateProfilePictureDialog() {
    const dialogRef = this.dialog.open(UploadProfilePictureComponent, {
      data: {
        user: this.userData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openUserProfileEditDialog() {
    const dialogRef = this.dialog.open(ProfilePageEditComponent, {
      data: {
        user: this.userData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  // Sets a business's address in DB
  async storeAddress() {
    this.userData.location = [this.lat, this.lng];
    try {
      await this.userService.setBusinessData(this.userData); // at the moment, only a business needs to have address stored
      alert('Запазихме вашият адрес.')
    } catch (e) {
        alert(e.message)
    }
  }

  async ngOnInit() {
    

    this.sub = this.route.params.subscribe(async params => {
      let id = params['id'];
      if (id) {
        this.userService.getUserFromFSByID(id)
          .then(res => res.subscribe(async user => {
            if (user.exists) {
              this.userData = user.data();
              this.isMyProfile = this.userData.uid === this.authService.user.uid;
              this.isBusiness = false;
              this.isCelebrity = true;
            } else {
              await this.mapsAPILoader.load();

              this.userService.getBusinessFromFSByID(id)
                .then(res => res.subscribe(user => {
                  if (user.exists) {
                    this.userData = user.data();
                    this.isMyProfile = this.userData.uid === this.authService.user.uid;
                    this.isBusiness = true;
                    this.isCelebrity = false;
                    this.userData.userAddress = this.userData.location || '';

                    this.setCurrentLocation();
                    this.geoCoder = new google.maps.Geocoder;

                  }
                }))

            }
          }))
      } else {
        console.warn('no user')
      }
    })
  }


  setCurrentLocation() {
    if(this.userData.location.length) {
      this.lat = this.userData.location[0];
      this.lng = this.userData.location[1];
    }
    else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  markerDragEnd($event: any) {
    this.lat = $event.latLng.lat();
    this.lng = $event.latLng.lng();
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.userData.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  
  public ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}

