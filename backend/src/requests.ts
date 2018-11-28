import Octokit from '@octokit/rest';
import { IUserRepos } from './models';
const octokit = new Octokit();

export const getUserRepos = async (userName: string): Promise<IUserRepos> => {
  const result = await octokit.repos.listForUser({ username: userName, type: 'all', per_page: 100 });
  const data = result.data;

  const userRepos: IUserRepos = {
    repos: [],
    userName,
  };

  let index = 0;
  for (const repo of data) {
    userRepos.repos[index++] = { repoID: repo.id, repoName: repo.name, repoSize: repo.size };
  }

  return userRepos;
};
