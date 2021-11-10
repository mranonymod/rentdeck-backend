const passport = require("passport");
require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/User");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          
          done(null, existingUser);
        } else {
          // new user case
          // insert new user id
          new User({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.email,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
