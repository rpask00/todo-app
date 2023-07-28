export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  dueDate: Date;
}

export interface AppState {
  tasks: Task[];
}

export const initialState: AppState = {
  tasks: []
};
