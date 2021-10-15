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

export interface INoteSection {
  subtitle: string;
  content: string;
  index: number;
  noteId: string;
}
