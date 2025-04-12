import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from "./todolist/todolist.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ITS320-FRONTEND-SINOY';
}
