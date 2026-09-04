const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'members_db',
    password:'Egor1488$',
    port: 5432,

});
module.exports = pool;