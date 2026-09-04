const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

router.get('/', async (req, res)=>{
    try{
    const posts = await pool.query(`
        SELECT posts. *, users.first_name, users.last_name, users.is_admin
        FROM posts
        JOIN users ON  posts.user_id = users.id
        ORDER BY posts.created_at DESC
        `);
        const isLoggedIn = req.isAuthenticated();
        const isMember = isLoggedIn && req.user?.membership === true;
        const isAdminUser = isLoggedIn && req.user?.is_admin === true;

        res.render('posts/index',{
            posts: posts.rows,
            isLoggedIn,
            isMember,
            isAdminUser,
        });
    }catch (err) {
        console.error(err);
        res.send('Ошибка при загрузке постов');
    }
});
router.get('/posts/new', isAuth, (req, res)=>{
    res.render('posts/new');
});
router.post('/posts', isAuth, async (req, res)=>{
    const {title, content} = req.body;
    const userId = req.user.id;

    try{
        await pool.query(
            'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)',
            [userId, title, content]
        );
        res.redirect('/')
    } catch(err) {
        console.error(err);
        res.send('Ошибка при создании поста');
    }
});
router.post('/posts/:id/delete', isAdmin, async (req, res)=>{
    const postId = req.params.id;

    try{
        await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
        res.redirect('/');
    } catch(err) {
        console.error(err);
        res.send('Ошибка при удалени поста');
    }
});

module.exports = router