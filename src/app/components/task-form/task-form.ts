import { Component, EventEmitter, Output, signal } from '@angular/core';
import { TaskStore } from '../../services/task-store';
import { Priority, Task } from '../../models/task.model';
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
  priority: 'low' | 'medium' | 'high' = 'medium';
newTask = '';

constructor(private taskStore: TaskStore) {}
isLoading = false;
dueDate?: string;
 @Output() taskAdded = new EventEmitter<void>();
 onSubmit(event: Event) {
    event.preventDefault();
    if (!this.newTask.trim()) return;

    const task: Task = {
      title: this.newTask,
      completed: false,
      priority: this.priority,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined,
      createdOn: new Date()
    };

    this.taskStore.addTask(task).then(() => {
      this.newTask = '';
      this.priority = 'medium';
      this.dueDate = undefined;
      this.taskAdded.emit(); // notify parent to reload tasks
    });
  }

}

