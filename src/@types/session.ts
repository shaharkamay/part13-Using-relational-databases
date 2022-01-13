export interface Session {
  id: number;
  token: string;
  userId: number;
}

export type NewSession = Omit<Session, 'id'>;
