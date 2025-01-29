import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private profiles: Profile[] = [
      { id: 1, name: 'Alice', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Alice', tasks: [1,2], points: 20, pin: "0001" },
      { id: 2, name: 'Bob', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Bob', tasks: [3], points: 10, pin: "0002" },
      { id: 3, name: 'Charlie', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Charlie', tasks: [], points: 30, pin: "0003" },
      { id: 4, name: 'David', image: 'https://api.dicebear.com/9.x/micah/svg?seed=David', tasks: [4], points: 5, pin: "0004" },
    ];
  
    getProfiles(): Profile[] {
      console.log('Fetching profiles:', this.profiles);
      return [...this.profiles];
    }
  
    addProfile(profile: Profile): void {
      const newId = this.profiles.length > 0 ? Math.max(...this.profiles.map(p => p.id)) + 1 : 1;
      profile.id = newId;
      profile.tasks = [];
      profile.points = 0;
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