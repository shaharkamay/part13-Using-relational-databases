export interface ReadingList {
  id: number;
  userId: number;
  blogId: number;
}

export type NewReadingList = Omit<ReadingList, 'id'>;
