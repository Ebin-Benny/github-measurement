export interface IUserRepos {
  repos: IRepo[];
  username: string;
}
interface IRepo {
  id: string;
  name: string;
  size: number;
  language: string;
}
