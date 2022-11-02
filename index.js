const express = require('express')
const app = express()
const path = require('path')
const port = 3000


app.get('/about', (req, res) =>{
    app.use('/public/about', express.static(`${__dirname}/public/about`))
    res.sendFile(path.join(__dirname, '/public/about/about.html'))
})

app.get('/dev', (req, res) =>{
    app.use('/public/dev', express.static(`${__dirname}/public/dev`))
    res.sendFile(path.join(__dirname, '/public/dev/dev.html'))
})

app.get('/', (req, res) =>{
    app.use('/public/home', express.static(`${__dirname}/public/home`))
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () =>{
    console.log(`app open on port ${port}`)
})