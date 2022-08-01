import { firebase } from "config/firebase";
import { TaskRepository } from "domain/task";
import { UserRepository } from "domain/user";
import { FirestoreTaskRepository } from "infrastructure/db/taskRepository";
import { FirestoreUserRepository } from "infrastructure/db/userRepository";

export interface Dependencies {
  userRepository: UserRepository;
  taskRepository: TaskRepository;
}

export const dependencies: Dependencies = {
  userRepository: new FirestoreUserRepository(firebase.db),
  taskRepository: new FirestoreTaskRepository(firebase.db),
};
