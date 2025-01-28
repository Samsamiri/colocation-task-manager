import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private profiles: Profile[] = [
      { id: 1, name: 'Alice', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Alice' },
      { id: 2, name: 'Bob', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Bob' },
      { id: 3, name: 'Charlie', image: 'https://api.dicebear.com/9.x/micah/svg?seed=Charlie' },
      { id: 4, name: 'David', image: 'https://api.dicebear.com/9.x/micah/svg?seed=David' },
    ];
  
    getProfiles(): Profile[] {
      console.log('Fetching profiles:', this.profiles);
      return [...this.profiles];
    }
  
    addProfile(profile: Profile): void {
      //todo
    }
  
    updateProfile(index: number, updatedProfile: Profile): void {
      //todo
    }
  
    deleteProfile(index: number): void {
      //todo
    }
  }