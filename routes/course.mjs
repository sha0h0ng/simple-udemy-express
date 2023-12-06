import express from 'express';
import sqlite from '../database_conn/sqlite.mjs';

const router = express.Router();

router.get('/:courseId', async (request, response) => {
    const db = sqlite();
    const sql = 'SELECT * FROM courses where id = ?';

    db.all(sql, [request.params.courseId], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.title);
        });
    });
    response.send({}).status(200);
});

router.get('/all', async (request, response) => {
    const db = sqlite();
    const sql = 'SELECT * FROM courses';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.title);
        });
    });
    response.send({}).status(200);
});

export default router;
