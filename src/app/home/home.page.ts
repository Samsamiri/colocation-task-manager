import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  profiles: Profile[] = [];

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfiles();
  }

    ionViewWillEnter() { // pour load les profils avant que le usr arrive sur la page
        this.loadProfiles();
    }

  loadProfiles() {
    this.profiles = this.profileService.getProfiles();
  }

  selectProfile(profile: Profile) {
    console.log('Selected profile:', profile);
     this.router.navigate(['/task-list', profile.id]);
  }

  manageProfiles() {
    this.router.navigate(['/manage-profiles']);
  }
}