const path = require('path')
const fs = require('fs')
// const request = require('request')
const request_promise = require('request-promise')
const dataPath = path.join(__dirname, "popular_articles.json")

request_promise("https://reddit.com/r/popular.json")
    .then((body) => {
        let arr = JSON.parse(body).data.children.map((element) => {
            return {
                title: element.data.title,
                url: element.data.url,
                author: element.data.author,
            }
        })

        fs.writeFile(dataPath, JSON.stringify(arr), err => {
            if (err) { console.log(err) }
        })

    })
    .catch((error) => {
        console.log(error)
    })

