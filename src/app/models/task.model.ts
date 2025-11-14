export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: string;
  completed: boolean;
  updatedAt?: string; // ISO
  notes?:string;
  due?:string;
  tags?:string
}
