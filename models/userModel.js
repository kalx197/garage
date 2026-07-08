const db = require('../config/db');

const User = {
    async create(username, email, passwordHash) {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        return result.insertId;
    },

    async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    async findById(id) {
        const [rows] = await db.execute('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = User;
