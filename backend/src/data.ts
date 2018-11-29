import { Document, Model, model, Schema } from 'mongoose';
import { IUserRepos } from './models';

export interface IUserReposData extends Document, IUserRepos {}

const userRepos = new Schema({
  repos: [
    {
      id: String,
      language: String,
      name: String,
      size: Number,
    },
  ],
  userName: String,
});

export const UserRepos: Model<IUserReposData> = model<IUserReposData>('UserRepos', userRepos);
