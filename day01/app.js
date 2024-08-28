const http = require("http");
const express = require("express");
const app = express();

app.set('port', 3000);

app.use((req, res, next) => {
    console.log("미들웨어 호출");
    res.end("<h1>Hello nodejs</h1>")
});

app.get("/", (req, res) => {
    
})
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중>>> http://localhost:${app.get('port')}`);
});