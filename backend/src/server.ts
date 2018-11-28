import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import { UserRepos } from './data';

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = 'mongodb://github:measurement1@ds119049.mlab.com:19049/github-measurement';

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true },
);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getUserRepos', (req, res) => {
    UserRepos.find((err, data) => {
        if (err) { return res.json({ success: false, error: err }); }
        return res.json({
            data,
            success: true,
        });
    });
});

router.post('/putUserData', (req, res) => {
    const data = new UserRepos();

    const { repoName, repoSize, userId } = req.body;

    if (!repoName || !repoSize || !userId) {
        return res.json({
            error: 'INVALID INPUTS',
            success: false,
        });
    }

    data.repoName = repoName;
    data.repoSize = repoSize;
    data.userID = userId;

    data.save((err) => {
        if (err) { return res.json({ success: false, error: err }); }
        return res.json({ success: true });
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
