const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const fs = require('fs');
const path = require('path');
// Go up one directory, then look for file name
const pathToKey = path.join(__dirname, '../../keys', 'public.pem');

// The verifying public key
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const cookieExtractor = (req) => {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

const User = require('../models').User;
module.exports = (passport) => {
    const options = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: PUB_KEY,
        algorithms: ['RS256'],
        jsonWebTokenOptions: {
            maxAge: '1d'
        },
        passReqToCallback: true
    };
    passport.use(
        new Strategy(options, (req, payload, done) => {
            User.findOne({ where: { email: payload.email } }) //, (err, user) => {
                .then(function (user) {
                    if (!user) {
                        return done(null, false, {
                            errors: ['Incorrect email.']
                        });
                    }
                    req.user = user;
                    return done(null, user);
                });
        })
    );
};
