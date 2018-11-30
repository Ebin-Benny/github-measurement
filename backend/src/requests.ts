import Octokit from '@octokit/rest';
import { IUserRepos } from './models';
const octokit = new Octokit();

export const getUserRepos = async (username: string): Promise<IUserRepos> => {
  const result = await octokit.repos.listForUser({ username, type: 'all', per_page: 100 });
  const data = result.data;

  const userRepos: IUserRepos = {
    children: [],
    name: username,
  };

  let index = 0;
  for (const repo of data) {
    userRepos.children[index++] = { id: repo.id, name: repo.name, size: repo.size, language: repo.language };
  }

  return userRepos;
};
