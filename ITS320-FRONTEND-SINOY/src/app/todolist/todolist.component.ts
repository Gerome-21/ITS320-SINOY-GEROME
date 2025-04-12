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
  editingIndex: number | null = null;

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  addTask() {
    const task = this.taskControl.value?.trim();

    if (!task) return;

    if (this.editingIndex !== null) {
      // ✏️ Update existing task
      const taskId = this.tasks[this.editingIndex]._id;
      this.http.put(`http://localhost:3000/api/todo/${taskId}`, { task }).subscribe({
        next: (res: any) => {
          this.tasks[this.editingIndex!] = res;
          this.taskControl.reset();
          this.editingIndex = null;
        },
        error: (err) => console.error('Error updating task:', err)
      });
    } else {
      // ➕ Create new task
      this.http.post<any>('http://localhost:3000/api/todo/create', { task }).subscribe({
        next: (res) => {
          this.tasks.push(res);
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
      next: (res) => this.tasks = res,
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  editTask(index: number) {
    this.editingIndex = index;
    this.taskControl.setValue(this.tasks[index].task);
  }

  removeTask(index: number) {
    const taskId = this.tasks[index]._id;
    this.http.delete(`http://localhost:3000/api/todo/${taskId}`).subscribe({
      next: () => this.tasks.splice(index, 1),
      error: (err) => console.error('Error deleting task:', err)
    });
  }
}
