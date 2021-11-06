import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BusinessPartnersService } from 'src/app/shared/services/business-partners.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  cards: any[]
  lat: any;
  lng: any;
  markers: any = [];
  openedWindow: any;

  constructor(
    public authService: AuthService,
    public businessService: BusinessPartnersService,
    public usersService: UsersService,
    private mapsAPILoader: MapsAPILoader
  ) {
    this.cards = [];
    this.loading = false;

  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  setMarkers() {
    this.businessService.businessPartners.forEach((business) => { 
      if(business.location) {
        let marker = {
          'lat': business.location[0], 
          'lng': business.location[1],
          'id': business.uid,
          'name': business.name
        }
        this.markers.push(marker)
      }
    })
  }

  
openWindow(id) {
  this.openedWindow = id; // alternative: push to array of numbers
}

isInfoWindowOpen(id) {
  return this.openedWindow == id; // alternative: check if id is in array
}


  ngOnInit(): void {
    this.usersService.getAllCelebrities();
    this.businessService.getBusinessPartners();
    this.mapsAPILoader.load();
    this.setCurrentLocation();
    this.setMarkers();
  }

}
