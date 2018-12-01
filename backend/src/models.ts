export interface IUserRepos {
  children: IUserRepo[];
  name: string;
}
interface IUserRepo {
  id: string;
  name: string;
  size: number;
  language: string;
}

export interface IRepoContributions {
  name: string;

  weeks: IWeek[];
}

interface IWeek {
  week: string;
  stats: IStats[];
}

interface IStats {
  author: string;
  additions: number;
  deletions: number;
  net: number;
  commits: number;
}
