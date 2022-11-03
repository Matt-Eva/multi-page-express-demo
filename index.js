const express = require('express')
const app = express()
const port = 3000

app.use(express.static(`public`))

// app.get('/about', (req, res) =>{
//     res.sendFile(path.join(__dirname, '/public/about/about.html'))
// })

// app.get('/dev', (req, res) =>{
//     res.sendFile(path.join(__dirname, '/public/dev/dev.html'))
// })

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, '/public/home/index.html'))
// })

app.use((req, res, next) =>{
    if (res.status(404)){
        res.redirect('/home/home.html')
    }
})

app.listen(port, () =>{
    console.log(`app open on port ${port}`)
})