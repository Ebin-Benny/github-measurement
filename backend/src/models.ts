export interface IUserRepos {
  repos: IRepo[];
  userName: string;
}
interface IRepo {
  repoID: string;
  repoName: string;
  repoSize: number;
}
