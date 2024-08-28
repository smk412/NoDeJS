function task1 (callback) {
    console.log('1. Task1 시작');
    let num = 0;
    setTimeout(function() {
        console.log('Task1 끝');
        callback('Task1 결과');
    }, 1000);
    console.log("2. 이 부분은 언제 실행 될까?");
}


task1(function (result) {
    console.log('fullfilled : ', result);
});



console.log("1. 이 부분은 언제 실행 될까?");