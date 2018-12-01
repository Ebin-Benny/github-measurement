import { Document, Model, model, Schema } from 'mongoose';
import { IRepoContributions, IUserRepos } from './models';

export interface IUserReposData extends Document, IUserRepos {}
export interface IRepoContributionsData extends Document, IRepoContributions {}

const userRepos = new Schema({
  children: [
    {
      id: String,
      language: String,
      name: String,
      size: Number,
    },
  ],
  name: String,
});

const repoContributions = new Schema({
  name: String,
  totalAdditions: [{ name: String, stat: Number }],
  totalCommits: [{ name: String, stat: Number }],
  totalDeletions: [{ name: String, stat: Number }],
  totalNet: [{ name: String, stat: Number }],
  weeks: [
    {
      stats: [{ author: String, additions: Number, deletions: Number, net: Number, commits: Number }],
      week: Number,
    },
  ],
});

export const UserRepos: Model<IUserReposData> = model<IUserReposData>('UserRepos', userRepos);
export const RepoContributions: Model<IRepoContributionsData> = model<IRepoContributionsData>(
  'RepoContributions',
  repoContributions,
);
