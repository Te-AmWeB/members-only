const pool = require('../db/pool');
async function isAdmin (req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    const userId = req.user.id;
    const result = await pool.query('SELECT is_admin FROM users WHERE id = $1', [userId]);
    if(result.rows.length > 0 && result.rows[0].is_admin === true) {
        return next();
    }
    req.status(403).send('Доступ запрещён: только для администраторов');
}

module.exports = isAdmin