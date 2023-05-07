export type Role = "admin" | "general";
export class NewUser {
  private _mustBeInstance: undefined;
  email: string;
  name: string;
  role: string;
  constructor(fields: Required<NewUser>) {
    this.email = fields.email;
    this.name = fields.name;
    this.role = fields.role;
  }
}

export class User {
  private _mustBeInstance: undefined;
  id: string;
  email: string;
  name: string;
  role: string;
  constructor(fields: Required<User>) {
    this.id = fields.id;
    this.email = fields.email;
    this.name = fields.name;
    this.role = fields.role;
  }
}

// 認証済みだが登録されていないユーザ
export class UnregisteredUser {
  constructor(private fields: { email: string }) {}
  get email(): string {
    return this.fields.email;
  }
}

// 未認証ユーザ
export class NotAuthenticatedUser {
  constructor() {}
}

export interface UserRepository {
  findAll: () => Promise<User[]>;
  findOneById: (id: string) => Promise<User | undefined>;
  findOneByEmail: (email: string) => Promise<User | undefined>;
  findIdToken: () => Promise<string | undefined>;
  create: (newUser: NewUser) => Promise<User>;
  update: (User: User) => Promise<User>;
  removeBy: (id: string) => Promise<void>;
}
