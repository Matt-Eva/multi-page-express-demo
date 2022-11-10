console.log('running home')

fetch("http://localhost:3000/data")
.then(r => r.json())
.then(console.log)

fetch("https://anapioficeandfire.com/api/characters/583")
.then(r => r.json())
.then(console.log)