const express = require('express')
const moongose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo');



const app = express()
app.use(cors())
app.use(express.json())

moongose.connect('mongodb://localhost:27017/test')

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result) )
    .catch(err => res.json(err))
    })

app.post('/add',(req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result) )
    .catch(err => res.json(err))
    });

    
app.listen(3001, () => {
    console.log('Server is running on port 3001')
});