import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';

const GooglePassportStrategy = GoogleStrategy.OAuth2Strategy;

const passportInit = () => {
    if (
        !process.env['GOOGLE_CLIENT_SECRET'] ||
        !process.env['GOOGLE_CLIENT_ID']
    ) {
        throw new Error(
            `process variables not found ${process.env['GOOGLE_CLIENT_SECRET']}`,
        );
    }

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
};

export { passportInit };
