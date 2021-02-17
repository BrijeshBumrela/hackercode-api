import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';

const GooglePassportStrategy = GoogleStrategy.OAuth2Strategy;

passport.use(
    new GooglePassportStrategy(
        {
            clientID: process.env['GOOGLE_CLIENT_ID'],
            clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
            callbackURL: '/auth/google/redirect',
        },
        () => {},
    ),
);
