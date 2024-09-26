import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const DB_PATH = "./db/dev.sqlite3";
const JWT_SECRET = 'your_jwt_secret';

const db = new sqlite3.Database(DB_PATH);

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    db.get('SELECT * FROM users WHERE id = ?', [jwt_payload.id], (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

export const registerUser = (username, password, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return callback(err);
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function (err) {
            if (err) return callback(err);
            const user = { id: this.lastID, username };
            const token = jwt.sign({ id: user.id }, JWT_SECRET);
            callback(null, { user, token });
        });
    });
};

export const authenticateUser = (username, password, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(null, false);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return callback(err);
            if (isMatch) {
                const token = jwt.sign({ id: user.id }, JWT_SECRET);
                callback(null, { token });
            } else {
                callback(null, false);
            }
        });
    });
};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const optsCookie = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET
};

passport.use('jwt-cookie', new JwtStrategy(optsCookie, (jwt_payload, done) => {
    console.log("jwt_payload", jwt_payload)
    db.get('SELECT * FROM users WHERE id = ?', [jwt_payload.id], (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));