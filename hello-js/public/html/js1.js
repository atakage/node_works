console.log("나는 자바스크립ㅌ으");

// json type의 객체를 선언
var std = { name: "홍길동", age: 30, tel: "1234" };

// 숫자형 배열
var arrNumber = [1, 2, 3, 4, 5];

var arrString = ["홍길동", "이몽룡", "성춘향", "장보고"];

// console.log(값,값,값) : 각자의 값들을 형변환 하지않고 있는 그대로 콘솔에 출력
console.log("객체", std);
console.log("숫자형", arrNumber);
console.log("문자형", arrString);

// 객체의 요소 중 일부를 변경하고자 할 대
var std = { ...std, age: 100 };
std.age = 100;
var std = { name: std.name, age: std.age };
console.log("객체std:", std);

var sum = 0;
// forEach문은 배열을 한 개씩 순회하면서 요소들을 callback 함수에 전달하며 코드를 수행
// forEach를 이용하여 요소를 연산한 후 forEach가 끝난 후 값을 조회하면
// forEach의 순회에서 계산된 결과가 정확히 조회된다는 보장이 없음
// forEach는 비동기 방식이기 때문
arrNumber.forEach(function(item, index, ogirinalArray) {
  sum += item; // 1번 코드
  //sum += originalArray[index]; // 1번과 같은 코드
});

// 배열 순회 후 연산 결과를 보장 받으려면 전통적 코드를 사용해야 함
for (let i = 0; i < arrNumber.length; i++) {
  sum += arrNumber[i];
}

console.log("합계=", sum);

arrNumber.forEach(item => {});

// 배열을 순회하면서
// 각 요소를 callback 함수에 전달하고
// callback 함수가 return하는 값들을 모아서 다른 배열로 생성해줌
const arrNumber2 = arrNumber.map(num => {
  return num + 2;
});

console.log("원래 배열", arrNumber);
console.log("map 이후 배열", arrNumber2);

var arrString = ["홍길동", "이몽룡", "성춘향", "장보고", "성춘향"];

// find는 배열 요소 중 값 찾기
// 화살표 함수에서 다른 코드가 없이 return문 한 줄만 있을 경우
// 함수 몸체의 {} 를 생략하고 return 키워드를 사용하지 않음
// 화살표 함수의 매개변수가 1개만 있을 때는() 없이 사용
// 매개 변수가 1개도 없을 때는 빈(blank) 괄호만 반드시 사용
// 매개 변수가 2개 이상일 때는 필수적으로 괄호로 묶음
const arrString3 = arrString.find(item => item === "성춘향");

// 찾는 아이템이 몇 번째 요소에서 처음 나타나나?
const index = arrString.findIndex(item => item === "성춘향");
console.log("성춘향", index, arrString3);

const arrString4 = arrString.find(item => {
  console.log(item);
  return item === "장영실";
});

console.log("장영실", arrString4);

const arrNumber4 = [2, 4, 2, 3, 41, 3, 2, 1, 5, 1];
const evenNumber = arrNumber4.filter(item => {
  return item % 2 === 0;
});
console.log("짝수", evenNumber);

const arrayNumber5 = [1, 2, 3, 4, 5];
// acc = 0으로 시작하고
// arrNumber4에 각 요소를 item에 보내고 내부에서 code를 실행한 후 결과값을 return
// forEach 수행이 끝난 후 연산결과를 조회하였을 때 연산결과의 정확도를 보장할 수 없는
// 문제를 해결한 함수
const reduce = arrayNumber5.reduce((acc, item) => {
  return acc + item;
});

console.log("reduce", arrayNumber5, reduce);

// 1차원 배열일 경ㅇ 배열을 정렬하는 기능
const sortString = arrNumber4.sort();
console.log("정렬", sortString);

// callback 함수를 사용해서 역순 정렬
// callback 함수에서 결과 조건을 연산한 후
// -1이나 1을 return하면 asc,desc 정렬 조절 가능
const sortString2 = arrString.sort((item, item2) => {
  if (item > item2) return -1;
});

console.log("정렬", sortString2);

const mask = [
  { name: "가든약국", stat: "P" },
  { name: "뒷집약국", stat: "E" },
  { name: "앞집약국", stat: "E" },
  { name: "푸른약국", stat: "S" },
  { name: "중흥약국", stat: "E" },
  { name: "용봉약국", stat: "P" }
];

const p_mask = mask.filter(item => {
  return item.stat === "P";
});
console.log("p_mask", p_mask);

const e_mask = mask.filter(item => {
  return item.stat === "E";
});
console.log("e_mask", e_mask);

const p_sort_mask = p_mask.sort((item1, item2) => {
  if (item1.name > item2.name) return 1;
});

console.log("p_sort_mask", p_sort_mask);

const e_sort_mask = e_mask.sort((item1, item2) => {
  if (item1.name > item2.name) return 1;
});

console.log("e_sort_mask", e_sort_mask);

const mask_list = [...p_sort_mask, ...e_sort_mask];
console.log("마스크 구입처", mask_list);
