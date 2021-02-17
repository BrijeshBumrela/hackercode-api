import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import { OAuthOptions } from '../components/auth/Auth.types';
import { register, getUserById } from '../components/users/User.service';

const GooglePassportStrategy = GoogleStrategy.OAuth2Strategy;

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser<string>(async (id, done) => {
    const user = await getUserById(id);
    done(null, user);
});

const passportInit = () => {
    if (
        !process.env['GOOGLE_CLIENT_SECRET'] ||
        !process.env['GOOGLE_CLIENT_ID']
    ) {
        throw new Error(
            `env variables not found ${process.env['GOOGLE_CLIENT_SECRET']}`,
        );
    }

    passport.use(
        new GooglePassportStrategy(
            {
                clientID: process.env['GOOGLE_CLIENT_ID'],
                clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: '/auth/google/redirect',
            },
            async (accessToken, refreshToken, profile, done) => {
                const { displayName: name, emails, id: identifier } = profile;
                if (!emails || emails?.length === 0) {
                    throw new Error(`Email not found`);
                }
                const email = emails[0].value;
                const user = await register(
                    { name, email, identifier },
                    OAuthOptions.GOOGLE,
                );
                return done(null, user);
            },
        ),
    );
};

export { passportInit };
