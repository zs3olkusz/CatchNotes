export interface IPaginatedResult<T> {
  total: number;
  limit: number;
  skip: number;
  data: T[];
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface INote {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  sections: INoteSection[];
}

export type INoteSectionType = 'text' | 'quiz' | 'image' | 'voice' | 'file';

export interface INoteSection {
  subtitle?: string;
  content?: string;
  file?: string;
  type: INoteSectionType;
  questions?: IPaginatedResult<IQuizQuestion>;
  index: number;
  noteId: string;
}

export interface IQuizQuestion {
  id: string;
  text: string;
  isCorrect: boolean;
}
