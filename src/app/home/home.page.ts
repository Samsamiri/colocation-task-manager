import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  profiles: Profile[] = [];

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    this.profiles = this.profileService.getProfiles();
  }

  selectProfile(profile: Profile) {
    console.log(`Profil sélectionné : ${profile.name}`)
  }

  manageProfiles() {
    this.router.navigate(['/manage-profiles']);
  }
}
