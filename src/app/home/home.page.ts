import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Profile {
  id: number
  name: string
  image?: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  
  profiles: Profile[] = [
    { id: 1, name: "Alice", image: "https://api.dicebear.com/9.x/micah/svg?seed=Alice&hair=full&shirtColor=ffdfbf&backgroundColor=ffd5dc" },
    { id: 2, name: "Bob", image: "https://api.dicebear.com/9.x/micah/svg?seed=Bob&hair=mrT&shirtColor=c0aede&backgroundColor=b6e3f4" },
    { id: 3, name: "Charlie", image: "https://api.dicebear.com/9.x/micah/svg?seed=Charlie&hair=pixie&shirtColor=d1d4f9&backgroundColor=ffedef" },
    { id: 4, name: "David", image: "https://api.dicebear.com/9.x/micah/svg?seed=David&hair=dougFunny&shirtColor=f4d150&backgroundColor=e0ddff" },
  ];
  
  constructor() {}

  selectProfile(profile: Profile) {
    console.log(`Profil sélectionné : ${profile.name}`)
  }

  manageProfiles() {
    console.log("Gérer les profils")
  }
}
