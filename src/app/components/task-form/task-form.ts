import { Component, EventEmitter, Output, signal } from '@angular/core';
import { TaskStore } from '../../services/task-store';
import { Priority } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports:[FormsModule],
   templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent {
title = signal('');
  priority = signal<Priority>('medium');


  constructor(private taskStore: TaskStore) {}

  onSubmit(event: Event) {
    event.preventDefault();

    const trimmed = this.title().trim();
    if (!trimmed) return;

    this.taskStore.addTask({
      title: trimmed,
      priority: this.priority()
    });

    this.title.set('');
    this.priority.set('medium');
  }
}

