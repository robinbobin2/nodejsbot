const express = require('express');
const app = express();
const PORT = 2000;
const API = require('node-vk-bot-api');
const bodyParser = require('body-parser');
const {Botact} = require('botact');
const request = require('request');
im = require("im");
const fs = require("fs");
const restler = require("restler");
const path = require("path");
gm = require('gm').subClass({imageMagick: true});
var FormData = require('form-data');
const Readable = require('stream').Readable;
const s = new Readable();
const base64ToImage = require('base64-to-image');
const rgbHex = require('rgb-hex');

let baseImage = '';
let pathToImg = [];
var currentdate = new Date();
let minutes;
var str = []


const Browser = require('zombie');
var url = 'https://www.fiverr.com/search/gigs?acmpl=1&utf8=✓&source=guest-homepage&locale=en&search_in=everywhere&query=image%20editing&search-autocomplete-original-term=&search-autocomplete-original-term=image&search-autocomplete-type=suggest&search-autocomplete-position=0'
Browser.visit(url, function(error, browser) {
    console.log(browser.html());
});

if (currentdate.getMinutes() < 10) {
     minutes = '0'+currentdate.getMinutes();
} else {
     minutes = currentdate.getMinutes();
}
let time = currentdate.getHours()+ ":"+ minutes;
console.log(time)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/', function (req, res) {
    for (let item of req.body.objects) {
        console.log(item)
        if (item.type === 'image' && baseImage === '') {
            baseImage = base64ToImage(item.src, __dirname + "/");
            console.log(baseImage.fileName)
        } else if(baseImage !== '' && (item.type === "i-text"||item.type === "textbox") ) {

            gm( __dirname + "/"+baseImage.fileName)
                .fill(item.fill)
                .fontSize(item.fontSize)
                .drawText(item.left, item.top, item.text)
                .write(__dirname + "/covernew2.jpg", function (err) {
                                if (!err)
                                    console.log(' hooray! ');
                                else
                                    console.log(err);
                            });

        }
    }

    //
    // if (imageInfo) {
    //     gm()
    //         .command("composite")
    //         .in("-gravity", "center")
    //         .in(__dirname + "/cover2.jpg")
    //         .in(__dirname + "/covernew.jpg")
    //         .write(__dirname + "/cover2new.jpg", function (err) {
    //             if (!err)
    //                 console.log(' hooray! ');
    //             else
    //                 console.log(err);
    //         });
    // }
});


app.post('/uploadwall', function (req, res) {

    pathToImg = [];
    let callback = []

    var picStream = []
        for (let item of JSON.parse(req.body.photos)) {


            // console.log(picStream);
            // console.log(JSON.parse(req.body.photos)[i]);

        }
        for (let item of JSON.parse(req.body.photos)) {
            var str = path.join(__dirname+'/img/3', 'file'+currentdate.getHours()+minutes+currentdate.getSeconds()+currentdate.getMilliseconds()+getRandomInt(1111,9999)+'.jpg');
            // console.log(str);
            let stream = fs.createWriteStream(str);
            stream.on('close', function() {

                var form = new FormData();
                form.append("photo", fs.createReadStream(stream.path));

                form.getLength(function (err, length) {
                    if (err) {
                        return requestCallback(err);
                    }
                    var r = request.post(
                        req.body.url,

                        requestCallback);

                    r._form = form;
                    console.log(stream.path)
                });

                function requestCallback(err, response, body) {

                    callback.push(body);

                    // console.log(err)
                    // const access_token = '7f8457f4eb68476ad5c943aa7eb236737504772e8191c0d3484279804be5b8947c4427f23d910e75216c2';
                    // console.log('http://ppql.ru?access_token=' + access_token + "&hash=" + result.hash + "&photo=" + result.photo);
                    // request.get(
                    //     'http://ppql.ru?access_token=' + access_token + "&hash=" + result.hash + "&photo=" + result.photo,
                    //     function (error, response, body) {
                    //         if (!error && response.statusCode === 200) {
                    //             console.log(body)
                    //
                    //         }
                    //     }
                    // );
                }
            });
                request(item).pipe(stream)

        }
        setTimeout(
            ()=>{
                res.send(callback)
            }, 3000
        )

});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
app.listen(3000);

