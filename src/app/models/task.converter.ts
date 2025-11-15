// src/app/models/task.converter.ts
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { Task } from './task.model';

function toDateSafe(value: any, fallback?: Date): Date | undefined {
  if (!value) return fallback;
  if (value instanceof Object && 'toDate' in value) return value.toDate();
  return new Date(value);
}

export const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task: Task): any {
    return {
      title: task.title,
      description: task.description ?? '',
      priority: task.priority,
      completed: task.completed,
      createdOn: task.createdOn,
      updatedOn: task.updatedOn ?? task.createdOn,
      dueDate: task.dueDate ?? null,
      assignedTo: task.assignedTo ?? null,
      tags: task.tags ?? []
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Task {
    const data = snapshot.data(options)!;

    return {
      id: snapshot.id,
      title: data['title'] ?? '',              // ensures title is never undefined
      description: data['description'] ?? '',  // optional description
      priority: data['priority'],
      completed: data['completed'],
      createdOn: toDateSafe(data['createdOn'], new Date())!,  // fallback to now
      updatedOn: toDateSafe(data['updatedOn'], toDateSafe(data['createdOn'], new Date()))!,
      dueDate: toDateSafe(data['dueDate']),
      assignedTo: data['assignedTo'] ?? undefined,
      tags: data['tags'] ?? []
    };
  }
};
