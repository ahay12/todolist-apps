let express = require('express');
let app = express();
app.use(express.json())
let model = require('./model')


app.get('/todos', function(req, res){
   model.select(req.query.keyword).then((response) => {
    res.json(response)
   })
})

app.post('/todos', function(req, res){
    model.insert(req.body).then((response) => {
        res.json(response)
    })
 })

app.put('/todos/:id', function(req, res){
    model.update(req.params.id, req.body).then((response) => {
        res.end("yes");
    })
 })

 app.delete('/todos/:id', function(req, res){
    model.remove(req.params.id).then((response) => {
        res.end("yes");
    })
 })


app.listen(3000, function() {
    model.create()

    console.log("Server running")
})