var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        console.log("passport user:", accessToken, refreshToken);
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'google',
            google: profile._json,
          });
          user.google.accessToken = accessToken;
          user.google.refreshToken = refreshToken;
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          console.log("passport found user:", user);

          user.google.accessToken = accessToken;
          user.google.refreshToken = refreshToken;
          user.save(function() {
            console.log("passport found user2:", user);

            return done(err, user);
          });
        }
      });
    }
  ));
};