const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const pool = require('../db/pool');

router.get('/register', (req, res)=>{
    res.render('auth/register');
});

router.post('/register', async (req, res)=> {
    const {first_name, last_name, username, password, confirm_password} = req.body;

    if (password !== confirm_password) {
        return res.send('Пароли не совпадают! <a href="/register">Назад</a>');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await pool.query(
            `INSERT INTO users (first_name, last_name, username, password_hash)
            VALUES ($1, $2, $3, $4)`,
            [first_name, last_name, username, hashedPassword]
        );
        res.redirect('/login');
    }catch(err) {
        console.error(err);
        res.send('Ошибка при регистрации. Возможно, username уже занят. <a href="/register">Назад</a>');
   }
});
router.get('/login', (req, res)=>{
    res.render('auth/login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res)=>{
    req.logout(() =>{
        res.redirect('/');
    });
});
module.exports = router;