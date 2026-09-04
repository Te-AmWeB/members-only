const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db/pool');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(async(username,password, done) =>{
    try{
        const result = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
        const user = result.rows[0];
        if(!user){
            return done(null, false,{message: 'Неверный логин'});
        }
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match){
            return done (null, false, {message: 'Неверный пароль'});
        }
    return done(null, user);
    } catch (err) {
        return done(err);
    }
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async(id, done) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
            done(null, result.rows[0]);
        } catch(err) {
            done(err);
        }
    });
    const authRoutes = require('./routes/auth');
    const postsRoutes = require('./routes/posts');
    const clubRoutes = require('./routes/club');
    app.use(authRoutes);
    app.use(postsRoutes);
    app.use(clubRoutes);

const PORT = 6767;
app.listen(PORT, () =>{
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});