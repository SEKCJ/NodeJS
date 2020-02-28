const path = require('path')
const fs = require('fs')
const request = require('request')
const request_promise = require('request-promise')
const blank_json = path.join(__dirname, 'blank.json')
const target = path.join(__dirname, './downloads')

request("https://reddit.com/r/popular.json", (err, res, data) => {
    if (err) console.log(err)

    let arr = JSON.parse(data).data.children.map((json) => {
        return {
            author: json.data.author_fullname,
            // jpg: json.data.thumbnail,
            // png: json.data.all_awardings.map((element) => element.icon_url),
            url: json.data.url,
        }
    })

    arr.forEach((element) => {
        let url = element.url
        if (path.extname(url) === ".jpg" || path.extname(url) === ".png" || path.extname(url) === ".gif") {
            let name = element.author;
            let filename = name + path.extname(url)
            request_promise(url, { encoding: 'base64' })
                .then(image => {
                    fs.writeFile(`${target}/${filename}`, image, { encoding: 'base64' }, err => {
                        if (err) console.log(err)
                    })
                })
        }
        // let extension = path.extname(element.jpg)
        // if (extension === ".jpg") {
        //     let fileNameJpg = element.author + extension;
        //     request_promise(element.jpg, { encoding: 'base64' })
        //         .then(image => {
        //             fs.writeFile(`${target}/${fileNameJpg}`, image, { encoding: 'base64' }, err => {
        //                 if (err) console.log(err)
        //             })
        //         })
        // }

        // if (pngArray.length !== 0) {
        //     pngArray.forEach((png, index) => {
        //         let name = element.author + index
        //         let pngExtension = path.extname(png)
        //         let fileNamePng = name + pngExtension;
        //         request_promise(png, { encoding: 'base64' })
        //             .then(image => {
        //                 fs.writeFile(`${target}/${fileNamePng}`, image, { encoding: 'base64' }, err => {
        //                     if (err) console.log(err)
        //                 })
        //             })
        //     })
        // }
    })
})