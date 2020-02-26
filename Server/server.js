const path = require('path')
const fs = require('fs')
const request = require('request')
const dataPath = path.join(__dirname, "../data.json")

let chirp_objects = [{
    chirp: "Tired",
    id: 1,
}, {
    chirp: "Tired again",
    id: 2,
}, {
    chirp: "Tired even again",
    id: 3,
}, {
    chirp: "Tired even more",
    id: 4,
}, {
    chirp: "Tired even again more",
    id: 5,
}]


fs.writeFile(dataPath, JSON.stringify(chirp_objects), err => {
    if (err) { console.log(err) }
})

fs.readFile(dataPath, 'utf8', (err, body) => {
    console.log(dataPath)
    if (err) { console.log(err) }

    JSON.parse(body).forEach((element) => {
        console.log(`${element.chirp} ${element.id}`)
    })
})
