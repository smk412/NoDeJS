const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.set('port', 3000);
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));
// POST 방식으로 파라미터 전달받기 위한 설정
app.use(bodyParser.urlencoded({extedned: false}));
app.use(bodyParser.json());

const memberList = [
    {no:101, id:"user01", password:"1234", name:"홍길동", email:"hong@gmail.com"},
    {no:102, id:"user02", password:"123324", name:"김길동", email:"kim@gmail.com"},
    {no:103, id:"user03", password:"1232131244", name:"박길동", email:"park@gmail.com"},
    {no:104, id:"user04", password:"122342434", name:"이길동", email:"lee@gmail.com"}
];
let noCnt = 105;

// 요청 라우팅 사용
const router = express.Router();

router.route("/home").get((req,res)=> {
    req.app.render("home/Home", {}, (err,html)=> {
        res.end(html);
    });
});


router.route("/profile").get((req,res)=> {
    req.app.render("profile/Profile", {}, (err,html)=> {
        res.end(html);
    });
});

router.route("/member").get((req,res)=> {
    req.app.render("member/Member", {}, (err,html)=> {
        res.end(html);
    });
});

router.route("/login").get((req,res)=> {
    req.app.render("member/Login", {}, (err,html)=> {
        res.end(html);
    });
});

router.route("/login").post((req,res)=> {
    console.log(req.body.id, req.body.password);
    const idx = memberList.findIndex(member=> member.id===req.body.id);
    if(idx != -1) {
        if(memberList[idx].password === req.body.password) {
            console.log("로그인 성공!");
            // 세션에 로그인 정보를 등록 후 멤버 페이지로 이동
        } else {
            console.log("로그인 실패!");
            // 다시 로그인 페이지로 이동
        }
    };
    res.redirect("/member");
});

router.route("/joinus").get((req,res)=> {
    // 회원가입 ejs 페이지 forward
    req.app.render("member/Joinus", {}, (err,html)=> {
        res.end(html);
    });
});

router.route("/joinus").post((req,res)=> {
    // 회원 가입 처리 후 목록으로 갱신
    res.redirect("/member");
});

// app.get("/gallery", (req,res) => {
router.route("/gallery").get((req,res)=> {
    req.app.render("gallery/Gallery", {}, (err,html)=> {
        res.end(html);
    });
});

// app.get("/shop", (req,res) => {
router.route("/shop").get((req,res)=> {
    req.app.render("shop/Shop", {}, (err,html)=> {
        res.end(html);
    });
});

// router 설정 맨 아래에 미들웨어 등록
app.use('/',router);

//등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res) {
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다')
// });

const expressErrorHandler = require('express-error-handler');

// 모든 라우터 처리 후 404 오류 페이지 처리
const errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 서버 생성 및 실행
const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`Run on server >>> http://localhost:${app.get('port')}`);
});