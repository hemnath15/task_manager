import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStore } from '../../services/task-store'; 
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  standalone: true,
  selector: 'task-list',
  imports: [CommonModule,TaskFormComponent,FormsModule,AgGridModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  showGrid = false;

  private platformId = inject(PLATFORM_ID);
  tasks:Task[]=[]
  colDefs: ColDef[] = [
    {
      headerName: 'Done',
      field: 'completed',
      cellRenderer: (params: any) => {
        return `<input type="checkbox" ${params.value ? 'checked' : ''} />`;
      },
      cellRendererParams: {
        clicked: (id: string) => this.handleToggle(id),
      },
    },
    { headerName: 'Title', field: 'title', flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        `;
      },
    },
  ];
  constructor(public taskStore: TaskStore) {

  }
  ngOnInit() {
    this.showGrid = isPlatformBrowser(this.platformId);
    this.getTasks();
  }

  getTasks() {
    this.tasks = this.taskStore.loadFromStorage();
    return this.tasks;
  }

  handleToggle(id: string) {
    this.taskStore.toggleTask(id);
  }

  handleDelete(id: string) {
    this.taskStore.deleteTask(id);
  }

  handleEdit(task: any) {
    this.taskStore.editTask(task);
  }
}
