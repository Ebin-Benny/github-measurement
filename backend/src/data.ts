import { Document, Model, model, Schema } from 'mongoose';

export interface IUserRepos extends Document {
    repoName: string;
    repoSize: number;
    userID: number;
}

const userRepos = new Schema({
    repoName: String,
    repoSize: Number,
    userId: Number,
});

export const UserRepos: Model<IUserRepos> = model<IUserRepos>('UserRepos', userRepos);
