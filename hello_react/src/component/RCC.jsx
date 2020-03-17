// 지금부터 이 문서는 React의 컴포넌트
import React, { Component } from "react";
import "./RCC.css";
import RCC_SUB from "./RCC_SUB";

/*

ES6의 class 문법으로 컴포넌트 생성
보통 jsx(js) 파일의 형식으로 저장
가급적 파일의 첫 글자, 클래스의 첫글자는 대문자
파일이름과 클래스 이름을 일치
모든 따옴표는 큰따움표로 통일
클래스는 1개의 파일에 1개만 작성할 수 있음

*/
class RCC extends Component {
  render() {
    return (
      <div>
        <div className="myDiv">나는 첫 번째 RCC 컴포넌트</div>
        <RCC_SUB name="홍길동" />
      </div>
    );
  }
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 선언
// export default는 한 파일에 한 개만 이을 수 있음
export default RCC;
