import { computed, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { Task } from "../models/task.model";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private platformId = inject(PLATFORM_ID);

  private tasks = signal<Task[]>(this.loadFromStorage());

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  private saveToStorage(tasks: Task[]) {
    if (this.isBrowser()) {
      localStorage.setItem('my_tasks', JSON.stringify(tasks));
    }
  }

 public loadFromStorage(): Task[] {
  if (!this.isBrowser()) return [];

  const data = localStorage.getItem('my_tasks');
  const parsed = data ? JSON.parse(data) : [];

  return Array.isArray(parsed) ? parsed : [parsed];
}

  total = computed(() => this.tasks().length);

  addTask(data: { title: string; priority: string }) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      priority: data.priority,
      completed: false
    };

    this.tasks.update((list:any) => {
      const updated = [...list, newTask];
      this.saveToStorage(updated);
      return updated;
    });
  }

  toggleTask(id: string) {
    this.tasks.update((list:any) => {
      const updated = list.map((t:any) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      this.saveToStorage(updated);
      return updated;
    });
  }

  deleteTask(id: string) {
    this.tasks.update((list:any) => {
      const updated = list.filter((t:any) => t.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  editTask(updatedTask: Task) {
    this.tasks.update((list:any) => {
      const updated = list.map((t:any) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      this.saveToStorage(updated);
      return updated;
    });
  }

  getTasks() {
return this.tasks
  }
}
