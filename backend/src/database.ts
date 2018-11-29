import { UserRepos } from './data';
import { getUserRepos as getRepos } from './requests';

export const getUserRepos = async (userName: string, callback: any, error: any) => {
  let ret = await UserRepos.findOne({ userName });

  if (!ret) {
    const data = new UserRepos();
    const userRepos = await getRepos(userName);

    data.username = userName;

    let index = 0;
    for (const repo of userRepos.repos) {
      data.repos[index] = {
        id: repo.id,
        language: repo.language,
        name: repo.name,
        size: repo.size,
      };
      index++;
    }

    await data.save();

    ret = await UserRepos.findOne({ userName });

    if (!ret) {
      error();
    } else {
      callback(ret);
    }
  } else {
    callback(ret);
  }
};
