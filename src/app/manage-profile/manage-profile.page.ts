import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';
import { CreateProfileModalComponent } from '../Components/create-profile-modal/create-profile-modal.component';

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
    image: '',
    tasks: [],
    points: 0,
    pin: ''
  };
  editingIndex: number = -1;

  constructor(
    private profileService: ProfileService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles(): void {
    console.log('Loading profiles...');
    this.profiles = this.profileService.getProfiles();
    console.log('Profiles loaded:', this.profiles);
  }


  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CreateProfileModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'profileCreated') {
      this.loadProfiles();
    }
  }

  async deleteProfile(index: number) {
      this.profileService.deleteProfile(index);
      this.loadProfiles();
  }


  async editProfile(index: number) {
    this.editingIndex = index;
    this.currentProfile = { ...this.profiles[index] };
    this.isEditing = true;
    const modal = await this.modalController.create({
      component: CreateProfileModalComponent,
      componentProps: {
        profile: this.currentProfile,
        isEditing: true
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if(role === 'profileEdited') {
      this.loadProfiles();
    }
  }
}