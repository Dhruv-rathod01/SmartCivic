
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(null, false);
                }

                let user = await userModel.findOne({
                    googleId: profile.id
                });

                if (!user) {
                    user = await userModel.findOne({ email });

                    
                    if (user) {
                        return done(null, false);
                    }

                    user = await userModel.create({
                        googleId: profile.id,
                        email,
                        name: profile.displayName,
                        username: `google_${profile.id}`,
                        password: undefined
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

module.exports = passport;
