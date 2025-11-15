// src/app/services/task-store.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collectionData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { serverTimestamp } from 'firebase/firestore';
import { taskConverter } from '../models/task.converter';
@Injectable({ providedIn: 'root' })
export class TaskStore {

  constructor(private firestore: Firestore) {}

 private tasksCollection() {
  return collection(this.firestore, 'tasks').withConverter(taskConverter);
}


  // CREATE
addTask(task: Partial<Task>) {
  const newTask: Task = {
    ...task,
    id: '', // Firestore will assign id automatically
    createdOn: new Date(),
    updatedOn: new Date(),
    completed: task.completed ?? false,
    priority: task.priority ?? 'medium',
    dueDate: task.dueDate,
    assignedTo: task.assignedTo,
    tags: task.tags ?? []
  };
  return addDoc(this.tasksCollection(), newTask);
}


  // READ
getTasks(): Observable<Task[]> {
  return collectionData(this.tasksCollection(), { idField: 'id' }) as Observable<Task[]>;
}


  // UPDATE
updateTask(task: Task) {
  const docRef = doc(this.firestore, `tasks/${task.id}`).withConverter(taskConverter);
  return updateDoc(docRef, { ...task, updatedOn: new Date() });
}

  // DELETE
  deleteTask(id: string) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(docRef);
  }
}
