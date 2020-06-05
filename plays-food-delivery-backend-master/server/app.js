import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import passport from './middlewares/passport';
import errHandle from './middlewares/errHandle';

const app = express();

const whitelist = (process.env.CORS_WHITELIST || '').split('|');
const corsOptions = {
  origin(origin, cb) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return cb(null, true);
    }

    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      const errmsg = 'The CORS policy for this site does not allow access from the specified Origin.';
      cb(new Error(errmsg));
    }
  }
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(errHandle);

export default app;
