import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private profiles: Profile[] = [
      { id: 1, name: 'Alice', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Alice' },
      { id: 2, name: 'Bob', image:  'https://api.dicebear.com/9.x/micah/svg?seed=Bob' },
      { id: 3, name: 'Charlie', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Charlie' },
      { id: 4, name: 'David', image: 'https://api.dicebear.com/9.x/micah/svg?seed=David' },
    ];
  
    getProfiles(): Profile[] {
      console.log('Fetching profiles:', this.profiles);
      return [...this.profiles];
    }
  
    addProfile(profile: Profile): void {
      const newId = this.profiles.length > 0 ? Math.max(...this.profiles.map(p => p.id)) + 1 : 1;
      profile.id = newId;
      this.profiles.push(profile);
    }
  
    updateProfile(updatedProfile: Profile): void {
        const index = this.profiles.findIndex(p => p.id === updatedProfile.id);
        if (index !== -1) {
          this.profiles[index] = updatedProfile;
        }
    }
  
    deleteProfile(index: number): void {
      this.profiles.splice(index, 1);
    }
  }