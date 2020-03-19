import React, { Component } from "react";

// 임의로 작성된 컴포넌트 파일(*.jsx, *.js)을 사용하기 위해 먼저 import를 수행
// main 폴더에 있는 TodoMain.jsx 파일을 TodoMain이라는 이름으로 사용

// 이렇게 선언을 하면 render() 함수 내에서 일반 tag와 같은 방식으로 사용할 수 있음
import TodoMain from "./main/TodoMain";

/*

  클래스type 컴포넌트
  class 키워드로 시작되고
  반드시 Component를 extends(상속)하여 준비

*/

class App extends Component {
  id = 5;

  state = {
    input: "",
    todoList: [
      { id: 0, text: "오늘 마감할 일", checked: true },
      { id: 1, text: "공모전 서류 제출", checked: true },
      { id: 2, text: "리액트 폼 작성", checked: false },
      { id: 3, text: "스프링 시큐리티", checked: false },
      { id: 4, text: "Naver RestTemplate", checked: false }
    ]
  };

  /*
  
    TodoForm input box에 value={input}과 같은 형태가 되고
    {input}은 props 상태로 컴포넌트에 전달되어 readOnly 상태가 됨
    그래서 input box에 onChange 이벤트를 설정하여 
    키보드에서 입력된 글자를 {input}에 강제로 붙여주는 일을 수행해야 함
  
    e.target.value : 키보드 입력을 캡쳐하는 키보드 이벤트 메시지
  */
  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  // Enter키를 눌렀을 때 자동으로 추가 버튼이 클릭되도록
  // == : equal 연산자, eq 연산을 할 때 자동으로 형변환을 수행
  // 어떤 경우에는 전혀 예상치 못한 true가 나오기도 함

  // === : identity 연산자
  //  객체, 배열 등을 eq 연산을 하거나 형변환이 되면 안 되는 부분들에서
  // is 연산자와 비슷한 기능
  handleKeyPress = e => {
    if (e.key == "Enter") {
      this.handleCreateMethod();
    }
  };

  handleCreateMethod = () => {
    const { input, todoList } = this.state;

    this.setState({
      input: "",
      // 기존 객체 배열(JSON)에 새로운 객체 배열을 추가
      todoList: todoList.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  };

  handleToggle = id => {
    // this: 화살표 함수로 되어있는 이벤트 핸들러는 this가 바로 현재 컴포넌트
    // this = App.js의 context(문맥, thread의 모든 정보를 담고 있는 것)
    const { todoList } = this.state;

    // id 매개변수에 담겨있는 값이 객체 배열에 몇 번째 위치값
    const index = todoList.findIndex(todo => todo.id === id);

    // 인덱스에 해당하는 요소 추출
    const selectTodo = todoList[index];
    // this.setState({

    //   checked : !selectTodo.checked
    // })

    // 기존의 todoList를 nextTodoList에 복사해 두기
    const nextTodoList = [...todoList];

    // 기존 checked값이 true -> false, false -> true
    nextTodoList[index] = {
      ...selectTodo,
      checked: !selectTodo.checked
    };

    // 여기까지가 1개 item의 checked값을 변경시키는 코드

    // 여기에 오면 비로소 render 호출하여 화면에 반영
    this.setState({
      todoList: nextTodoList
    });
  };

  // 현재 클릭된(id가 선택된) 아이템만 남기고 나머지 리스트만 추출하여
  handleDelete = id => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(todo => todo.id !== id)
    });
  };

  // react lifeCycle중에 작동되는 method
  // 최초에 어플이 실행화면 한번 작동이 되고
  // 데이터나, 화면 디자인이 변경되면 호출되는 method
  render() {
    // 자식 컴포넌트에 데이터를 전달하기 위해서
    // state로 선언된 데이터들을 props로 변환

    // constructor(props) {
    //   super(props)
    //   this.props.bind(this)
    // }

    const { input, todoList } = this.state;

    // 현재 클래스에서 만든 method를 통째로 자식 컴포넌트에 전달하기 위해 props로 생성
    const {
      handleCreateMethod,
      handleChange,
      handleKeyPress,
      handleToggle,
      handleDelete
    } = this;

    return (
      <div>
        <TodoMain
          input={input}
          todoList={todoList}
          onCreate={handleCreateMethod}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    );
  }
}

export default App;
