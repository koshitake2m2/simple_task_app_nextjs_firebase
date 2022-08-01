import { NewUser, User, UserRepository } from "domain/user";
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

export class FirestoreUserRepository implements UserRepository {
  private db: Firestore;
  private userCollection;
  constructor(firebaseDb: Firestore) {
    this.db = firebaseDb;
    this.userCollection = collection(this.db, "users").withConverter(
      this.userConverter
    );
  }
  private userDocBy = (id: string) => {
    return doc(this.db, "users", id).withConverter(this.userConverter);
  };

  private userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      const user: User = new User({
        id: snapshot.id,
        email: data.email,
        name: data.name,
        role: data.role,
      });
      return user;
    },
  };

  findAll = async (): Promise<User[]> => {
    return getDocs(this.userCollection).then((snapshot) => {
      return snapshot.docs.map((wow) => wow.data());
    });
  };

  findOneById = async (id: string): Promise<User | undefined> => {
    return getDoc(this.userDocBy(id)).then((snapshot) => snapshot.data());
  };

  findOneByEmail = async (email: string): Promise<User | undefined> => {
    return getDocs(query(this.userCollection, where("email", "==", email)))
      .then((snapshot) => {
        const res = snapshot.docs.map((s) => s.data());
        return res.length > 0 ? res[0] : undefined;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
  };

  create = async (newUser: NewUser): Promise<User> => {
    return addDoc(collection(this.db, "users"), {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    }).then((generated) => {
      const user: User = new User({
        id: generated.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      });
      return user;
    });
  };

  update = async (user: User): Promise<User> => {
    // TODO: firebase authenticationとの連携を要確認.
    // NOTE: 同一トランザクションにはできないらしい
    await runTransaction(this.db, async (transaction) => {
      transaction.update(this.userDocBy(user.id), user);
    });
    return user;
  };

  removeBy = async (id: string): Promise<void> => {
    // TODO: firebase authenticationとの連携を要確認.
    return runTransaction(this.db, async (transaction) => {
      transaction.delete(this.userDocBy(id));
    });
  };
}
