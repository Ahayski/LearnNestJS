export interface Task {
  task_id: number;
  task_name: string;
  task_desc: string;
}

export const task: Task[] = [
  {
    task_id: 1,
    task_name: 'Task 1',
    task_desc: 'Task 1 description',
  },
  {
    task_id: 2,
    task_name: 'Task 2',
    task_desc: 'Task 2 description',
  }
];
