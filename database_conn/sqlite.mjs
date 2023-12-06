import sqlite3 from 'sqlite3';
import config from 'config';

const DBPATH = config.get('database.path');

function connect() {
    const SQLite3 = sqlite3.verbose();

    let db = new sqlite3.Database(DBPATH, sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });

    return db;
}

export default connect;
