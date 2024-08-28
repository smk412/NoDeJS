
new Promise ((fullfill) => {
    console.log('1. Task1 시작', this);
    let num = 0;
    setTimeout(() => {
        num = 1004;
        fullfill({data: '3. Task1 결과', num});
        console.log(this);
    }, 300);
    console.log('2. Task1 끝', num);
}).then(function (result) {
    console.log('fullfilled 함수 : ', result.data, result.num);
    console.log(this);
});