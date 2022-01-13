export interface User {
  id: number;
  username: string;
  name: string;
}

export type NewUser = Omit<User, 'id'>;
