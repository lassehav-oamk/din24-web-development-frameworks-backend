const express = require('express')
const Database = require('better-sqlite3')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

// Initialize database
const db = new Database('greetings.db')

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL
  )
`)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/greetings', (req, res) => {
    // query the datbase for all greetings
    const greetings = db.prepare('SELECT * FROM greetings').all();
    console.log(greetings)
    res.send('Hello');
})

// body structure
/*
    {
        "greeting" :"Foo bar"
    }
*/
app.post('/greetings', (req, res) => {
    // read the request body for incoming data
    const bodyData = req.body;
    const greeting = bodyData.greeting;
    console.log(bodyData)

    // use prepared insert statement to insert the incoming data
    const insertStatement = db.prepare(`
        INSERT INTO greetings (message)
        VALUES (?)
    `)
    const result = insertStatement.run(greeting);
    console.log('Db operation result')
    console.log(result);

    // respond something to the request, like OK for example
    res.send('OK')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
