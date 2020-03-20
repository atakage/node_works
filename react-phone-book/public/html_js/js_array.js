// arr 배열의 각 요소들을 개별 변수에 담아 사용하고 싶을 때
var arr = ["홍길동", "이모욜ㅇ", "성춘향", "라푼젤"];

// // ES5 이하의 old version
// var hong = arr[0];
// var lee = arr[1];
// var sung = arr[2];
// var rha = arr[3];

const [hong, lee, sung, rha] = arr;
console.log("hong", hong);
console.log("lee", lee);
console.log("sung", sung);
console.log("rha", rha);

const names = { name: "홍기동", phone: "1234", addr: "서울특별시" };
const { name, addr, phone } = names;

// var name = names.name;
// name = names["name"];

console.log(name);
console.log(phone);
console.log(addr);

const my = { [name]: "홍길동" };
console.log(my.홍기동);
