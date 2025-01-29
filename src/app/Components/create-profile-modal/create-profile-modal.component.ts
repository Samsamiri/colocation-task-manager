import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CreateProfileModalComponent implements OnInit {
  @Input() profile!: Profile;
  @Input() isEditing = false;

  newProfile: Profile = {
    id: 0,
    name: '',
    image: '',
    tasks: [],
    points: 0,
    pin: ''
  };
  nameError: string | null = null;

  constructor(private modalController: ModalController, private profileService: ProfileService) { }

  ngOnInit() {
    if (this.profile) {
      this.newProfile = { ...this.profile };
    }
    this.generateImage();
  }

  generateImage() {
    if (this.newProfile.name) {
      this.newProfile.image = `https://api.dicebear.com/9.x/micah/svg?seed=${this.newProfile.name}`;
    }
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }


    validateName() {
        if (!this.newProfile.name || this.newProfile.name.trim() === '') {
            this.nameError = "Le nom est requis.";
            return false;
        }
    
        if (this.newProfile.name.length < 3) {
        this.nameError = "Le nom doit contenir au moins 3 caractères.";
        return false;
        }
        if (/\d/.test(this.newProfile.name)) {
        this.nameError = "Le nom ne doit pas contenir de chiffres.";
        return false;
        }

        const profiles = this.profileService.getProfiles();
        const isNameTaken = profiles.some(profile => profile.name === this.newProfile.name && profile.id !== this.newProfile.id);
        if(isNameTaken){
           this.nameError = "Ce nom de profil est déjà pris.";
            return false;
        }
    
        this.nameError = null;
        return true;
    }

  confirm(form: NgForm) {
    if (this.validateName() && form.valid) {
      if (this.isEditing) {
        this.profileService.updateProfile(this.newProfile);
        this.modalController.dismiss(null, 'profileEdited');
      } else {
        this.profileService.addProfile(this.newProfile);
        this.modalController.dismiss(null, 'profileCreated');
      }
    }
  }
}