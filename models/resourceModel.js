const db = require('../config/db');

const Resource = {
    async create(userId, title, description) {
        const [result] = await db.execute(
            'INSERT INTO resources (user_id, title, description) VALUES (?, ?, ?)',
            [userId, title, description]
        );
        return result.insertId;
    },

    async findByUserId(userId) {
        const [rows] = await db.execute('SELECT * FROM resources WHERE user_id = ?', [userId]);
        return rows;
    }
};

module.exports = Resource;
