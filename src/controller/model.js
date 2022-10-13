let sqlite3 = require('sqlite3');
let path = require('path')

let db = new sqlite3.Database(path.join(__dirname, '../../db/todos.db') , (err) => {
    if(err) return console.error(err.message)

    console.log("success")
})


const connection = function(){
    db.on('open', (stream) =>{
        console.log("Open DB")
    });
   
}

const create = function(){
    db.serialize(function() {
        const sql = "CREATE TABLE IF NOT EXISTS todo(id integer primary key autoincrement, title CHAR(100), memo TEXT, created_at datetime, updated_at datetime, deleted_at datetime)"
    
        db.exec(sql, (err) => {
            if(err) return console.error(err.message)
            console.log('Create table successful')
          
        })
        
    })
 
}

const initialize =  function(){
    db.serialize( async function() {
        const value1 = `INSERT INTO todo(title, memo, created_at, updated_at) VALUES('Hello Text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', datetime('now', 'localtime'), datetime('now', 'localtime'))`
        const value2 = `INSERT INTO todo(title, memo, created_at, updated_at) VALUES('Memo Text', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo..', datetime('now', 'localtime'), datetime('now', 'localtime'))`
        const value3 = `INSERT INTO todo(title, memo, created_at, updated_at) VALUES('Lorem Text', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.', datetime('now', 'localtime'), datetime('now', 'localtime'))`


         const data = async function() {
            return new Promise((resolve, reject) =>{
                db.all('SELECT * FROM todo', (err, rows) =>{
                    if(err) reject(err.message)
    
                    resolve(rows)
                })
            })
          
         }

        const response = await data()

        if(response?.length) return

        exec(value1)
        exec(value2)
        exec(value3)
    })
}




const insert = function(payload){
    return new Promise((resolve, reject) =>{
    db.serialize(function() {
        const sql = `INSERT INTO todo(title, memo, created_at, updated_at) VALUES('${payload?.title}', '${payload?.memo}', datetime('now', 'localtime'), datetime('now', 'localtime'))`

        db.all(sql, (err) => {
            if(err) reject(err.message)

            console.log('Insert data successful')

            resolve(true)
            
        })

       

    })
})
}

const update = function(id, payload){
    return new Promise((resolve, reject) =>{
  
    db.serialize(function() {
        const sql = `UPDATE todo SET title='${payload?.title}', memo='${payload?.memo}', updated_at=datetime('now', 'localtime') WHERE id=${id}`

        db.all(sql, (err) => {
            if(err) reject(err.message)

            console.log('Update data successful')

            resolve(true)
        })

       
        
    })
})
}


const remove = function(id){
    return new Promise((resolve, reject) =>{
    db.serialize(function() {
        const sql = `UPDATE todo SET deleted_at=datetime('now', 'localtime') WHERE id=${id}`

        db.all(sql, (err) => {
            if(err) reject(err.message)

            console.log('Remove data successful')

            resolve(true)
        })

       
        
    })
})
}

const select = function(keyword){
    return new Promise((resolve, reject) =>{

        let sql;

        if(keyword){
            sql = `SELECT * FROM todo WHERE title LIKE '%${keyword}%' OR memo LIKE '%${keyword}% ORDER BY updated_at DESC'`
        } else{
            sql = `SELECT * FROM todo ORDER BY updated_at DESC`
        }

        db.all(sql, (err, rows) =>{
            if(err) reject(err.message)

            const newRows = rows
            rows = null

            resolve(newRows)
        })

       

})
}









module.exports = { connection, initialize, create, insert, update, remove, select }