interface IUser {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  correctPassword?: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser | undefined;
    }
  }
}

export { IUser };
