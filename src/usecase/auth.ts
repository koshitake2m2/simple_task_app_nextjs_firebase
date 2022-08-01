import { firebase } from "config/firebase";
import { dependencies } from "di/dependencies";
import { NotAuthenticatedUser, UnregisteredUser, User } from "domain/user";

import * as firebaseAuth from "firebase/auth";

type Email = string;
type Password = string;

// TODO: NotAuthenticatedUserを追加する.
export const getMaybeCurrentUser = async (): Promise<
  User | UnregisteredUser | NotAuthenticatedUser
> => {
  const firebaseAuthCurrentUser: firebaseAuth.User | undefined =
    firebase.auth.currentUser || undefined;

  if (firebaseAuthCurrentUser == undefined) return new NotAuthenticatedUser();

  // NOTE: このアプリではEmailによる認証のみおこなっているためnullになることはない.
  const email = firebaseAuthCurrentUser.email!!;
  return await dependencies.userRepository
    .findOneByEmail(email)
    .then((maybeUser) => {
      if (maybeUser != undefined) {
        return maybeUser;
      } else {
        const user: UnregisteredUser = new UnregisteredUser({ email: email });
        return user;
      }
    });
};

export const signInWithEmailAndPassword = async (
  email: Email,
  password: Password
): Promise<void> => {
  return firebaseAuth
    .signInWithEmailAndPassword(firebase.auth, email, password)
    .then((userCredential) => {
      userCredential.user.getIdToken().then((idToken) => {
        // TODO: cookieを作成するためにapi作成
        // const csrfToken = getCookie('csrfToken')
        // return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
      });
    });
};

export const sendPasswordResetEmail = async (email: Email): Promise<void> => {
  return firebaseAuth.sendPasswordResetEmail(firebase.auth, email);
};

export const createUserWithEmailAndPassword = async (
  email: Email,
  password: Password
): Promise<void> => {
  return firebaseAuth
    .createUserWithEmailAndPassword(firebase.auth, email, password)
    .then(() => {
      // TODO: firestoreでユーザ登録？
    });
};
