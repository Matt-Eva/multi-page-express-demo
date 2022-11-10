const express = require('express')
const app = express()
const port = 4000

app.listen(port, () =>{
    console.log(`app open on port ${port}`)
})

app.use(express.static(`public`))

app.use((req, res, next) =>{
    if (res.status(404)){
        res.redirect('/home/home.html')
    }
})

