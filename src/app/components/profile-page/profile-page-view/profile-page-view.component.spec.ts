import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageViewComponent } from './profile-page-view.component';

describe('ProfilePageViewComponent', () => {
  let component: ProfilePageViewComponent;
  let fixture: ComponentFixture<ProfilePageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
