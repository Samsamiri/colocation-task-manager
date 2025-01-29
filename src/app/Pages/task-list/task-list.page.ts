import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.page.html',
    styleUrls: ['./task-list.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class TaskListPage implements OnInit {
    tasks: Task[] = [];
    profileId: number | null = null;
    profiles: Profile[] = [];
    selectedProfile: string | null = null;
    TaskStatus = TaskStatus;
    selectedStatus: TaskStatus | null = null;

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        private profileService: ProfileService,
        private router: Router
    ) { }

    async ngOnInit() {
      this.route.params.subscribe(params => {
          this.profileId = params['id'] ? +params['id'] : null;
          this.loadTasks();
          this.loadProfiles();
      });
        await this.requestPermissions();
  }

  async requestPermissions() {
      if (Capacitor.getPlatform() !== 'web') {
           let perm = await LocalNotifications.checkPermissions();
          if(perm.display !== 'granted'){
            perm = await LocalNotifications.requestPermissions();
          }
         console.log(perm);
         if(perm.display !== 'granted'){
             console.log('permission not granted')
          }
          
      }
  }

    loadTasks() {
        this.tasks = this.taskService.getTasks();
    }

    loadProfiles() {
        this.profiles = this.profileService.getProfiles();
    }

    filterTasks() {
        let filteredTasks = this.taskService.getTasks();

        if (this.selectedProfile === 'me' && this.profileId) {
           filteredTasks = filteredTasks.filter(task => {
                const profile = this.profiles.find(profile => profile.id === this.profileId);
                return profile?.tasks.includes(task.id);
            });
        }
        else if (this.selectedProfile) {
           filteredTasks =  filteredTasks.filter(task => task.assignedTo === this.selectedProfile);
        }

          if(this.selectedStatus) {
            filteredTasks = filteredTasks.filter(task => task.status === this.selectedStatus);
        }
          
        this.tasks = filteredTasks;
    }


    assignTask(task: Task) {
      if (this.profileId) {
          const profile = this.profiles.find(profile => profile.id === this.profileId);
          if (profile) {
              if (!profile.tasks.includes(task.id)) {
                const taskIndex = this.tasks.findIndex(t => t.id === task.id);
                  if (taskIndex !== -1) {
                        this.tasks[taskIndex] = { ...this.tasks[taskIndex], assignedTo: profile.name, status: TaskStatus.IN_PROGRESS };
                        this.taskService.updateTask(taskIndex, this.tasks[taskIndex]);
                    }
                  profile.tasks.push(task.id);
                  this.profileService.updateProfile(profile);

                this.filterTasks();
                console.log(`Task ${task.id} assigned to ${profile.name}`);
            } else {
                  console.log(`Task ${task.id} is already assigned to ${profile.name}`);
                }
          }
      }
  }

  async markTaskAsDone(task: Task) {
      if (this.profileId) {
          const profile = this.profiles.find(p => p.id === this.profileId);
          if (profile) {
              const taskIndex = this.tasks.findIndex(t => t.id === task.id);
              if (taskIndex !== -1 && this.tasks[taskIndex].assignedTo === profile.name && this.tasks[taskIndex].status === TaskStatus.IN_PROGRESS) {
                  
                this.tasks[taskIndex] = { ...this.tasks[taskIndex], status: TaskStatus.DONE };
                this.taskService.updateTask(taskIndex, this.tasks[taskIndex]);
                profile.points += task.points;
                this.profileService.updateProfile(profile);
                   this.sendCongratsNotification(task.points);
              }
              this.filterTasks();
            }
      }
    }

    async sendCongratsNotification(points: number) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: `Félicitations !`,
              body: `Vous avez gagné ${points} points !`,
              id: 1,
                schedule: { at: new Date(Date.now() + 1000) },
            },
          ],
        });
    }


    isTaskAssignedToCurrentUser(task: Task): boolean {
      if (!this.profileId || !task.assignedTo) {
        return false;
      }
      const profile = this.profiles.find(p => p.id === this.profileId);
      return profile?.name === task.assignedTo;
    }


  getProfileAvatar(name: string): string {
    const profile = this.profiles.find(p => p.name === name);
    return profile?.image || 'assets/default-avatar.png';
  }

  openProfileDetail() {
    if(this.profileId) {
        this.router.navigate(['/profile-detail', this.profileId]);
    }
}
  
}