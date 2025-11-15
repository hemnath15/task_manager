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
import { Observable } from 'rxjs';
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
  tasks$!: Observable<Task[]>;
colDefs: ColDef[] = [
    { headerName: 'Done', field: 'completed', cellRenderer: (params:any) => `<input type="checkbox" ${params.value ? 'checked' : ''}/>`, },
    { headerName: 'Title', field: 'title', flex: 1 },
     { headerName: 'Priority', field: 'priority', flex: 1 },
     { headerName: 'Created On', field: 'createdOn', valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '' },
    { headerName: 'Date Limit to Finish', field: 'dueDate', valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '' },
    { headerName: 'Actions', cellRenderer: () => `<button class="delete-btn">Delete</button>` }
  ];

  constructor(private taskStore: TaskStore) {}

  ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.tasks$ = this.taskStore.getTasks();
    this.showGrid = true;
  }
  }

  deleteTask(id: string) {
    this.taskStore.deleteTask(id);
  }
}