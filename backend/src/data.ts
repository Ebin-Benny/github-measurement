import { Document, Model, model, Schema } from 'mongoose';

const userRepos = new Schema({
    repoName: String,
    repoSize: Number,
    userId: Number,
});

export const UserRepos = model('UserRepos', userRepos);
