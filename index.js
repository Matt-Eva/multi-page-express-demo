const express = require('express')
const app = express()
const port = 3000

app.use(express.static(`public`))

app.use((req, res, next) =>{
    if (res.status(404)){
        res.redirect('/home/home.html')
    }
})

app.listen(port, () =>{
    console.log(`app open on port ${port}`)
})