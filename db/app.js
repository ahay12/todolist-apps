const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./db/todos.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to the todos database.");
  }
);

// db.run("CREATE TABLE todo(id, task, timestamp, isCompleted)");

// const sql = `INSERT INTO todo(id, task, timestamp, isCompleted) VALUES(?, ?, ?, ?)`;

// db.run(sql, [1, "test", "2021-01-01", 0], (err) => {
//   if (err) return console.error(err.message);
//   console.log("Row inserted");
// });

const sql = "SELECT * FROM todo";

db.all(sql, [], (err, rows) => {
  if (err) return console.info(err.message);

  rows.forEach((row) => {
    console.info(row);
  });
});

db.close((err) => {
  if (err) return console.error(err.message);
  console.log("Close the database connection.");
});
