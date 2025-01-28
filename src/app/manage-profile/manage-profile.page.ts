import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ManageProfilesPage implements OnInit {
  profiles: Profile[] = [];
  isModalOpen = false;
  isEditing = false;
  currentProfile: Profile = {
    id: 0,
    name: '',
    image: ''
  };
  editingIndex: number = -1;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles(): void {
    console.log('Loading profiles...');
    this.profiles = this.profileService.getProfiles();
    console.log('Profiles loaded:', this.profiles);
  }

}