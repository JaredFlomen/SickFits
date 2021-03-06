import { User } from './schemas/User';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, //How long signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    //Todo: add data seeding
  },
  lists: createSchema({
    User,
    //Schema items go here
  }),
  ui: {
    //Todo: change for roles
    isAccessAllowed: () => true,
  },
  //Todo: add session values
});