import Octokit from '@octokit/rest';
import { IRepoContributions, IUserRepos } from './models';
const octokit = new Octokit();

octokit.authenticate({
  token: 'a88c4e417353a20bb93e096cb135f99c828b5f0b',
  type: 'token',
});
export const getUserRepos = async (username: string): Promise<IUserRepos> => {
  const result = await octokit.repos.listForUser({ username, type: 'all', per_page: 100 });
  const data = result.data;

  const userRepos: IUserRepos = {
    children: [],
    name: username,
  };

  let index = 0;
  for (const repo of data) {
    userRepos.children[index++] = { id: repo.id, name: repo.full_name, size: repo.size, language: repo.language };
  }

  return userRepos;
};

export const getRepoContributions = async (owner: string, repo: string): Promise<IRepoContributions> => {
  const result = await octokit.repos.getContributorsStats({ owner, repo });
  const data = result.data;

  const repoContributions: IRepoContributions = {
    name: owner + '/' + repo,
    weeks: [],
  };

  let index = 0;
  let weekCount = 0;
  for (const author of data) {
    weekCount = 0;
    for (const week of author.weeks) {
      if (index === 0) {
        repoContributions.weeks[weekCount++] = {
          week: week.w,
          stats: [
            {
              author: author.author.login,
              additions: week.a,
              deletions: week.d,
              net: week.a - week.d,
              commits: week.c,
            },
          ],
        };
      } else {
        repoContributions.weeks[weekCount++].stats[index] = {
          author: author.author.login,
          additions: week.a,
          deletions: week.d,
          net: week.a - week.d,
          commits: week.c,
        };
      }
    }
    index++;
  }

  weekCount--;
  while (weekCount >= 0) {
    let commitCount = 0;
    for (const stat of repoContributions.weeks[weekCount].stats) {
      commitCount += stat.commits;
    }
    if (commitCount === 0) {
      repoContributions.weeks.pop();
    } else {
      break;
    }
    weekCount--;
  }

  return repoContributions;
};
