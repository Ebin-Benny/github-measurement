export interface IUserRepos {
  children: IRepo[];
  name: string;
}
interface IRepo {
  id: string;
  name: string;
  size: number;
  language: string;
}
