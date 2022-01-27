import { Status } from './Status';

export interface Task {
  title: string;
  dueDate: string;
  createdDate?: string;
  status: Status;
  id: string;
}
