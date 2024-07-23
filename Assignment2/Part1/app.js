const http = require('http');
const fs = require('fs');
const path = require('path');

const serveAllRequest = function (req, res) {
    let statusCode;
    let fileBuffer;

    if (req.method === 'POST') {
        console.log("POST request");
        statusCode = 200;
        res.writeHead(statusCode);
        res.end("{name: 'Alice', age: 25}");
    } else {
        switch (req.url) {
            case '/':
                res.setHeader("Content-Type", "text/html");
                fs.readFile(path.join(__dirname + "/index.html"),
                    function (err, buffer) {
                        if (err) {
                            statusCode = 404;
                            fileBuffer = "File not Found";
                        } else {
                            statusCode = 200;
                            fileBuffer = buffer;
                        }
                        res.writeHead(statusCode);
                        res.end(fileBuffer);
                    });
                break;

            case '/index1':
                res.setHeader("Content-Type", "text/html");
                fs.readFile(__dirname + "/index1.html",
                    function (err, buffer) {
                        if (err) {
                            statusCode = 404;
                            fileBuffer = "File not Found";
                        } else {
                            statusCode = 200;
                            fileBuffer = buffer;
                        }
                        res.writeHead(statusCode);
                        res.end(fileBuffer);
                    });
                break;

            case '/index2':
                res.setHeader("Content-Type", "text/html");
                fs.readFile(__dirname + "/index2.html",
                    function (err, buffer) {
                        if (err) {
                            statusCode = 404;
                            fileBuffer = "File not Found";
                        } else {
                            statusCode = 200;
                            fileBuffer = buffer;
                        }
                        res.writeHead(statusCode);
                        res.end(fileBuffer);
                    });
                break;
        }
    }
}

const server = http.createServer(serveAllRequest);

server.listen(8282, "localhost", function () {
    console.log("Server is running on http://localhost:8282");
});





