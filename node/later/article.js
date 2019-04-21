const express = require('express')
const app = express()
const articles = [{title: 'example'}]
const bodyParser = require('body-parser')  
app.set('port', process.env.PORT || 3000) 

app.use(bodyParser.json()) // 支持编码json请求体
app.use(bodyParser.urlencoded({extended:true})) // 表单请求体
app.get('/articles', (req, res, next) => {
    res.send(articles)
})
app.post('/articles', (req, res, next) => {
    res.send('OK')
})

app.get('/articles/:id', (req, res, next) =>{
    const id = req.params.id
    console.log('Fetching:', id);
    delete articles[id]
    res.send({message: 'Deleted'})
})

app.listen(app.get('port'), () =>{
    console.log('App started on port', app.get('port'));
})

module.exports = app