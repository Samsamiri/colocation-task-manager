import { Injectable } from '@angular/core';
import { Task, TaskStatus, TaskCategory } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [
        { id: 1, title: 'Nettoyer la cuisine', description: 'Laver les sols et la vaisselle', category: TaskCategory.HOUSEHOLD, status: TaskStatus.TODO, deadline: '2025-01-30', assignedTo: 'Alice', points: 10 },
        { id: 2, title: 'Faire les courses', description: 'Acheter les produits de la liste', category: TaskCategory.SHOPPING, status: TaskStatus.TODO, deadline: '2025-02-15', assignedTo: 'Alice', points: 15 },
        { id: 3, title: 'Sortir les poubelles', description: 'Sortir les poubelles et les trier', category: TaskCategory.HOUSEHOLD, status: TaskStatus.TODO, deadline: '2025-01-28', assignedTo: 'Bob', points: 5 },
        { id: 4, title: 'Arroser les plantes', description: 'Arroser toutes les plantes de la maison', category: TaskCategory.GARDENING, status: TaskStatus.TODO, deadline: '2025-02-05', assignedTo: 'David', points: 5 },
        { id: 5, title: 'test', description: 'test', category: TaskCategory.GARDENING, status: TaskStatus.TODO, deadline: '2025-02-05', assignedTo: '', points: 30 },
        { id: 6, title: 'test2', description: 'test2', category: TaskCategory.HOUSEHOLD, status: TaskStatus.TODO, deadline: '2025-02-05', assignedTo: '', points: 15 },

    ];


  getTasks(): Task[] {
      return [...this.tasks];
  }

  addTask(task: Task): void {
    //todo
  }

  updateTask(index: number, updatedTask: Task): void {
       if (index !== -1) {
            this.tasks[index] = updatedTask;
        }
  }

  deleteTask(index: number): void {
    //todo
  }
}
