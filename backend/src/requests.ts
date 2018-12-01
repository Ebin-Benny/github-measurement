import Octokit from '@octokit/rest';
import fs from 'fs';
import { IRepoContributions, IUserRepos } from './models';
const octokit = new Octokit();
const token = fs.readFileSync('token.txt', 'utf8');

octokit.authenticate({
  token,
  type: 'token',
});
export const getUserRepos = async (username: string): Promise<IUserRepos> => {
  try {
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
  } catch (e) {
    return Promise.reject();
  }
};

export const getRepoContributions = async (owner: string, repo: string): Promise<IRepoContributions> => {
  let result;
  let status;

  do {
    try {
      result = await octokit.repos.getContributorsStats({ owner, repo });
      status = result.status;
      if (status !== 200 && status !== 202) {
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject();
    }
  } while (status === 202);

  const data = result.data;
  const repoContributions: IRepoContributions = {
    name: owner + '/' + repo,
    totalAdditions: [],
    totalCommits: [],
    totalDeletions: [],
    totalNet: [],
    weeks: [],
  };

  let index = 0;
  let weekCount = 0;
  for (const author of data) {
    weekCount = 0;
    for (const week of author.weeks) {
      if (index === 0) {
        repoContributions.weeks[weekCount] = {
          stats: [
            {
              additions: week.a,
              author: author.author.login,
              commits: week.c,
              deletions: week.d,
              net: week.a - week.d,
            },
          ],
          week: week.w,
        };
      } else {
        repoContributions.weeks[weekCount].stats[index] = {
          additions: week.a,
          author: author.author.login,
          commits: week.c,
          deletions: week.d,
          net: week.a - week.d,
        };
      }
      if (weekCount === 0) {
        repoContributions.totalAdditions[index] = { name: author.author.login, stat: week.a };
        repoContributions.totalDeletions[index] = { name: author.author.login, stat: week.d };
        repoContributions.totalNet[index] = { name: author.author.login, stat: week.a - week.d };
        repoContributions.totalCommits[index] = { name: author.author.login, stat: week.c };
      } else {
        repoContributions.totalAdditions[index].stat = repoContributions.totalAdditions[index].stat + week.a;
        repoContributions.totalDeletions[index].stat = repoContributions.totalDeletions[index].stat + week.d;
        repoContributions.totalNet[index].stat = repoContributions.totalNet[index].stat + (week.a - week.d);
        repoContributions.totalCommits[index].stat = repoContributions.totalCommits[index].stat + week.c;
      }
      weekCount++;
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
