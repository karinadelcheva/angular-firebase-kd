import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  showMoreValue: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  showMore(showMoreValue:boolean) {
    this.showMoreValue = showMoreValue;
  }
}
