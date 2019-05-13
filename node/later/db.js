const sqlite3 = require('sqlite3').verbose()
const dbName = 'later.sqlite'
const db = new sqlite3.Database(dbName)
db.serialize(() =>{
    const sql = `CREATE TABLE IF NOT EXISTS article
    (id integer primary key ,title, content TEXT)
    `;
    db.run(sql)
})

class Article {
    static all(cb) {
        db.all('SELECT * FROM article', cb)
    }

    
}