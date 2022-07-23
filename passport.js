const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

  //user login endpoint
passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    if (!user) {
      console.log('Whoa Whoa Whoa! That\'s the incorrect username.');
      return callback(null, false, {message: 'DENIED! You\'ve entered an incorrect username or password.'});
    }
    if (!user.validatePassword(password)) {
      console.log('Whoa Whoa Whoa! That\'s the incorrect username.');
      return callback(null, false, {message: 'DENIED! You\'ve entered an incorrect username or password.'});
    }
    console.log('Hot dog! It\'s finished.');
    return callback(null, user);
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'gQMTKHxbNQHCX63m'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));