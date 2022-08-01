import { NewTask, Task, TaskRepository } from "domain/task";
import { Firestore } from "firebase/firestore";
import {
  doc,
  collection,
  query,
  where,
  addDoc,
  getDoc,
  getDocs,
  runTransaction,
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
} from "firebase/firestore";

export class FirestoreTaskRepository implements TaskRepository {
  private db: Firestore;
  private taskCollection;
  constructor(firebaseDb: Firestore) {
    this.db = firebaseDb;
    this.taskCollection = collection(this.db, "tasks").withConverter(
      taskConverter
    );
  }
  private taskDocBy = (id: string) => {
    return doc(this.db, "tasks", id).withConverter(taskConverter);
  };

  findAll = async (): Promise<Task[]> => {
    return getDocs(this.taskCollection).then((snapshot) => {
      return snapshot.docs.map((wow) => wow.data());
    });
  };

  findByUserId = async (userId: string): Promise<Task[]> => {
    return getDocs(
      query(this.taskCollection, where("userId", "==", true))
    ).then((snapshot) => {
      return snapshot.docs.map((s) => s.data());
    });
  };

  findOneBy = async (id: string): Promise<Task | undefined> => {
    return getDoc(this.taskDocBy(id)).then((snapshot) => snapshot.data());
  };

  create = async (newTask: NewTask): Promise<Task> => {
    return addDoc(collection(this.db, "tasks"), {
      userId: newTask.userId,
      title: newTask.title,
      status: newTask.status,
    }).then((generated) => {
      const task: Task = {
        id: generated.id,
        userId: newTask.userId,
        title: newTask.title,
        status: newTask.status,
      };
      return task;
    });
  };

  update = async (task: Task): Promise<Task> => {
    await runTransaction(this.db, async (transaction) => {
      transaction.update(this.taskDocBy(task.id), task);
    });
    return task;
  };

  removeBy = async (id: string): Promise<void> => {
    return runTransaction(this.db, async (transaction) => {
      transaction.delete(this.taskDocBy(id));
    });
  };
}

const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore: (task: Task) => {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      status: task.status,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const task: Task = {
      id: data.id,
      userId: data.userId,
      title: data.title,
      status: data.status,
    };
    return task;
  },
};
