import { RepoContributions, UserRepos } from './data';
import { getRepoContributions as getContributions, getUserRepos as getUsers } from './requests';

export const getUserRepos = async (userName: string, callback: any, error: any) => {
  let ret = await UserRepos.findOne({ name: userName });

  if (!ret) {
    const data = new UserRepos();
    const userRepos = await getUsers(userName);

    data.name = userName;

    let index = 0;
    for (const repo of userRepos.children) {
      if (repo.language === undefined) {
        repo.language = 'N/A';
      }
      data.children[index] = {
        id: repo.id,
        language: repo.language,
        name: repo.name,
        size: repo.size,
      };
      index++;
    }

    await data.save();

    ret = await UserRepos.findOne({ name: userName });

    if (!ret) {
      error();
    } else {
      callback(ret);
    }
  } else {
    callback(ret);
  }
};

export const getRepoContributions = async (owner: string, repo: string, callback: any, error: any) => {
  let ret = await RepoContributions.findOne({ name: owner + '/' + repo });

  if (!ret) {
    const data = new RepoContributions();
    const repoContributions = await getContributions(owner, repo);

    data.name = repoContributions.name;

    let index = 0;
    for (const week of repoContributions.weeks) {
      let statIndex = 0;
      data.weeks[index] = { week: week.week, stats: [] };
      for (const stat of week.stats) {
        data.weeks[index].stats[statIndex++] = {
          author: stat.author,
          additions: stat.additions,
          deletions: stat.deletions,
          net: stat.net,
          commits: stat.commits,
        };
      }
      index++;
    }

    await data.save();

    ret = await RepoContributions.findOne({ name: owner + '/' + repo });

    if (!ret) {
      error();
    } else {
      callback(ret);
    }
  } else {
    callback(ret);
  }
};
