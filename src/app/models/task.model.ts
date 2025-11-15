export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdOn: Date;
  updatedOn?: Date;
  dueDate?: Date;
  assignedTo?: string;
  tags?: string[];
}

