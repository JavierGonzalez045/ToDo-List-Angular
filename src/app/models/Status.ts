
export enum Status {
  pending = "Pending",
  canceled = "Canceled",
  completed = "Completed",
}

export let Taskstatus: Status;
 Taskstatus = Status.pending;
 export const StatusCanceled =  Status.canceled
 export const StatusCompleted=  Status.completed