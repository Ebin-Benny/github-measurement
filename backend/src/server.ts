import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import { UserRepos } from './data';
import { getUserRepos } from './database';

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
  const userName = req.body.userName;

  if (!userName) {
    return res.json({
      error: 'INVALID INPUTS\n',
      success: false,
    });
  }

  getUserRepos(
    userName,
    data => {
      return res.json({
        data,
        success: true,
      });
    },
    () => {
      return res.json({
        success: false,
      });
    },
  );
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
