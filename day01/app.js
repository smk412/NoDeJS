const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

//views로부터 ejs 파일을 사용하겠다
app.set('port', 3000);
console.log("__dirname: ", __dirname);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", express,static(path.join(__dirname, "public")));

// ejs 뷰 엔진에서 파라미터 확인
app.get("/home", (req, res) => {
    console.log("Get /home 요청 실행");
    const name = req.query.name;
    const age = req.query.age;
    req.app.render("home", {name, age}, (err,html)=> {
        res.end(html);
    });
});

// 브라우저 body에서 바로 ㅎ출력
app.get("/home2", (req, res) => {
    console.log("Get /home 요청 실행");
    res.send(req.query);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중>>> http://localhost:${app.get('port')}`);
});