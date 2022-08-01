export type NewTask = {
  userId: string;
  title: string;
  status: string;
};

export type Task = {
  id: string;
  userId: string;
  title: string;
  status: string;
};

export interface TaskRepository {
  findAll: () => Promise<Task[]>;
  findByUserId: (userId: string) => Promise<Task[] | undefined>;
  findOneBy: (id: string) => Promise<Task | undefined>;
  create: (newTask: NewTask) => Promise<Task>;
  update: (task: Task) => Promise<Task>;
  removeBy: (id: string) => Promise<void>;
}
