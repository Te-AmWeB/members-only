const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const isAuth = require('../middleware/isAuth');

router.get('/join-club', isAuth, (req, res) =>{
    res.render('club/join');
});

router.post('/join-club', isAuth, async (req, res)=> {
    const {secret_code} = req.body;
    const userId = req.user.id;

    const SECRET = 'ILOVECOODING';

    if(secret_code === SECRET) {
        await pool.query('UPDATE users SET membership = true WHERE id = $1', [userId]);
        return res.redirect('/');
    }
    res.send('Неверный секретный код. <a href="/join-club">Попробовать снова</a>');
});

module.exports = router