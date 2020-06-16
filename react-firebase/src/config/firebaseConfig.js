import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAfphi_gApy_tYAHbh1BnjEeKnPwAOh8CQ",
  authDomain: "react-firebase-56cb1.firebaseapp.com",
  databaseURL: "https://react-firebase-56cb1.firebaseio.com",
  projectId: "react-firebase-56cb1",
  storageBucket: "react-firebase-56cb1.appspot.com",
  messagingSenderId: "764661619321",
  appId: "1:764661619321:web:dfcebd9291a4d87c83d2a8",
};

//let database;
/*
    다른 js파일에서 fire() 함수를 호출하여
    firebase 초기화와 database 연동까지 할 수 있도록 모듈 구성

    firebaseConfig.js 모듈을 여러 곳의 Component에서 공유하며 사용할 예정인데
    공유하여 사용할 경우 firebase.initializeApp() method가 여러 번 실행되어 문제를 일으킴
    그래서 firebase.apps 항목이 이미 있으면 새로 생성하지 않고
    없으면(!firebase.apps.length) 새로 생성하도록 코드를 변경
*/
//export const fire = () => {
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
//};

export const database = firebase.database();
