import Octokit from '@octokit/rest';
const octokit = new Octokit();

export const getUserRepos = async (username: string): Promise<any> => {
  const result = await octokit.repos.listForUser({ username, type: 'all' });
};
