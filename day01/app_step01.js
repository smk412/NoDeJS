const http = require("http");
const express = require("express");
const app = express();

app.set('port', 3000);

app.use((req, res, next) => {
    // 전체 요청에 적용될 한글 처리 기능
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    console.log("미들웨어 호출");
    // res.end("<h1>Hello nodejs</h1>")
    next(req, res);
});

app.use("/", (req,res, next) => {
    console.log("/ 요청 미들웨어 호출");
    next(req, res);
});


app.get("/", (req, res) => {
    console.log("Get / 요청 실행");
    res.end("<h1>Hello nodejs 2</h1>"); 
})
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중>>> http://localhost:${app.get('port')}`);
});