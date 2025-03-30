require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const authRoutes = require('./routes/auth');
const authConfig = require('./config/auth');

const app = express();

app.use(express.static('public'));
app.use(session(authConfig.session));
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new GoogleStrategy({
    clientID: authConfig.google.clientID,
    clientSecret: authConfig.google.clientSecret,
    callbackURL: authConfig.google.callbackURL
  },
  (accessToken, refreshToken, profile, done) => done(null, { id: profile.id, name: profile.displayName })
));

passport.use(new FacebookStrategy({
    clientID: authConfig.facebook.clientID,
    clientSecret: authConfig.facebook.clientSecret,
    callbackURL: authConfig.facebook.callbackURL,
    profileFields: authConfig.facebook.profileFields
  },
  (accessToken, refreshToken, profile, done) => done(null, { id: profile.id, name: profile.displayName })
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/room', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.sendFile(__dirname + '/public/room.html');
});

const PORT = process.env.PORT || 3000;
module.exports = app;
