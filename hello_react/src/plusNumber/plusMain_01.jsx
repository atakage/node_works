import React, { Component } from "react";

class plusMain_01 extends Component {
  /*

    부모로부터 변수를 받을 수 있는 또 하나의 방법
    props는 부모로부터 받은 변수를 자식이 변경할 수 없음
    state는 자식이 자유롭게 변수를 변경하여 사용할 수 있음


    클래스의 필드 변수 number를 선언하고 0으로 초기화


    */

  state = {
    number: 5
  };

  /*
    두 개의 버튼 클릭 이벤트 핸들러


    state에 선언된 변수 값을 변경시키고자 할 때
    this.setState() method 내부에서 변경하는 코드를 작성하면 됨

    plus 버튼이 클릭되면 원래 number가 가지고 있는 값ㅔ(this.state.number)에 plus 1을 하여 다시 number에 저장
  */

  /*
  plus = () => {
    this.setState({
      number: this.state.number + 1
    });
  };
  */

  plus = () => {
    this.setState(({ number }) => ({
      number: number + 1
    }));
  };

  /*
  
    js 구조 분해 할당, 비구조화 할당
    배열이나 객체의 속성을 unpack하여 값을 개별 변수에 담아 사용할 수 있도록 하는 JS 새로운 문법(ES6,7)
    

  */

  plus1 = () => {
    this.setState(({ number }) => ({
      number: number + 1
    }));
  };

  minus = () => {
    this.setState({
      number: this.state.number - 1
    });
  };

  minus1 = () => {
    this.setState(state => ({
      number: state.number - 1
    }));
  };

  render() {
    return (
      <div>
        <h1>카운트 : {this.state.number}</h1>
        <button onClick={this.plus}>plus</button>
        <button onClick={this.minus}>minus</button>
      </div>
    );
  }
}

export default plusMain_01;
