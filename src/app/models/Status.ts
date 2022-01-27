export enum Status {
  pending = 0,
  canceled = 1,
  completed = 2,
}

export let Taskstatus: Status;
Taskstatus = Status.pending;
export const StatusCanceled = Status.canceled;
export const StatusCompleted = Status.completed;
