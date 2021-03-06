const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/book')
//mongoose.connect('mongodb://user:user123@ds135852.mlab.com:35852/codegurukul')
// protocol+ url +database 
// url =  username + password + IP/domain + port
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"))


var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    surname: String
})
var Book = mongoose.model('Book', bookSchema)



app.post('/api/books', (request, response) => {
    console.log(request.body)
    const book = new Book({
        name: request.body.name,
        author: request.body.author,
        surname: request.body.surname

    })
    book.save().then((book) => {
        console.log('Added successfully')
        //response.send('Added successfully')
        response.json(book)
    })

})


app.del('/api/books/:id', (request, response) => {
    Book.deleteOne({ _id: request.params._id }, function (err) { });
    response.json({
        message: 'Id deleted',
    })
})
app.listen(3000, () => console.log('Express server at 3000'))

app.get('/api/books/life', (request, response) => {
   Book.find({name: 'Life',},function (err, docs) {});
   response.json({
       message:'Found',
   })
})

app.put('/api/books',(request,response)=>{
    Book.update({name:'Life'},{author:'Aniket'},function(err,data){});
    response.json({
        message:'Updated',
    })
})