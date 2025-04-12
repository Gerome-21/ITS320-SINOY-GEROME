import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'todolist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  taskControl = new FormControl('');
  tasks: { task: string; _id: string }[] = [];

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  addTask() {
    const task = this.taskControl.value?.trim();
    if (task) {
      this.http.post<any>('http://localhost:3000/api/todo/create', { task }).subscribe({
        next: (res) => {
          this.tasks.push(res); // push full response (includes task + _id)
          this.taskControl.reset();
        },
        error: (err) => {
          console.error('Error adding task:', err);
        }
      });
    }
  }

  getTasks() {
    this.http.get<any[]>('http://localhost:3000/api/todo').subscribe({
      next: (res) => {
        this.tasks = res; // full list of tasks from backend
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  removeTask(index: number) {
    // This just removes it from UI; for full feature, implement DELETE in backend
    this.tasks.splice(index, 1);
  }
}

