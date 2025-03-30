require('dotenv').config();

module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'email']
  },
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }
};