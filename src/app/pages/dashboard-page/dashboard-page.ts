import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list'; 
import { TaskFormComponent } from '../../components/task-form/task-form';

@Component({
  selector: 'app-dashboard-page',
 imports: [TaskListComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  standalone:true
})
export class DashboardPage {

}
