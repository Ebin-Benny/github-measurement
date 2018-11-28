import { Document, Model, model, Schema } from 'mongoose';
import { IUserRepos } from './models';

export interface IUserReposData extends Document, IUserRepos {}

const userRepos = new Schema({
  repos: [
    {
      repoID: String,
      repoName: String,
      repoSize: Number,
    },
  ],
  userName: String,
});

export const UserRepos: Model<IUserReposData> = model<IUserReposData>('UserRepos', userRepos);
