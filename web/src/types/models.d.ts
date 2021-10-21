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
  id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  user?: IUser;
  sections?: INoteSection[];
}

export type INoteSectionType = 'text' | 'quiz' | 'image' | 'voice' | 'file';

export interface INoteSection {
  id?: string;
  subtitle?: string;
  content?: string;
  file?: string;
  type: INoteSectionType;
  answers?: IQuizAnswer[];
  index: number;
  noteId?: string;
}

export interface IQuizAnswer {
  id?: string;
  answer: string;
  isCorrect: boolean;
  noteSectionId?: string;
}
