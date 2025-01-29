import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule],
})
export class ProfileDetailPage implements OnInit {
    profile: Profile | undefined;
    profileId: number | null = null;
    numberOfTasks: number | null = null;


    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private taskService: TaskService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.profileId = params['id'] ? +params['id'] : null;
            this.loadProfile();
        });
    }

    loadProfile() {
      if(this.profileId) {
          this.profile = this.profileService.getProfiles().find(profile => profile.id === this.profileId);
           if (this.profile) {
                this.numberOfTasks = this.taskService.getTasks().filter(task => this.profile?.tasks.includes(task.id)).length;
           }
      }
    }

    goBack() {
        if(this.profileId){
            this.router.navigate(['/task-list', this.profileId]);
        } else {
            this.router.navigate(['/task-list']);
        }
    }
}