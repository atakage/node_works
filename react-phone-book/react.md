## react에서 변수

- props와 state형 변수
- props는 상위 부모 컴포넌트로부터 전달받은 모든 변수값들
- state 현재 컴포넌트 내에서 자유롭게 읽고 제한적으로 변경할 수 있는 변수
- state의 제한적 변경 : react는 state형 변수의 값이 변동되면, 화면을 재 rendering(mount, 갱신, refresh) 하기 때문에 함부로 변경하지 못하도록 하고 반드시 this.setState() 내에서만 변경하도록
  허락, 즉 this.aa = 3 과 같은 코드는 절대 사용 불가
- this.setState({this.aa:3})과 같은 방식으로 변경
- this.setState() 메서드에서 state형 변수를 변경하면 정해진 LifeCycle에 따라 화면을 다시 rendering

## react에서 컴포넌트 공통변수 사용

- Main 컴포넌트에 포함된 서브 컴포넌트에서 공통으로 변수를 사용하고자 할 때는 Main 컴포넌트에서 state형 변수를 선언하고 각각 Sub 컴포넌트로 내려보내면 됨
- 단 Sub 컴포넌트에서는 이 변수는 절대 변경이 불가

## 서브 컴포넌트에서 변화가 생긴 변수내용을 이웃하는 컴포넌트가 고융하기

- 서브로 연결되어 있는 컴포넌트 한 곳에서 변수를 변경하면 다른 이웃하는 또는 연관된
  컴포넌트들에 변경된 값들이 보이도록 할 때가 있는데
- 첫 번째 Main컴포넌트에서 state 변수 선언
- 두 번째 Main 컴포넌트에서 state 변수를 변경하는 method를 선언
- 세 번째 이 method를 값을 변경하고자 하는 sub 컴포넌트에게 props로 전달
- 이때 Main에 선언된 컴포넌트에 매개변수를 받을 수 있도록 선언할 수 있음
- 네 번째 props로 전달받은 method를 callback으로 호출
  이때 callback method에 필요한 값을 파라미터로 전달할 수 있음
  그러면 실제로는 Main 컴포넌트에 선언된 method가 실행되면서 Main 컴포넌트에 선언된 state 변수가 변경이 될 것이고 이와 동시에 state 변수를 props로 전달받아 화면에 표시해 놓은 sub 컴포넌트도 같이 rendering 되어 값이 변경표시됨

## 단방향 변수 전달 방식

- Main 컴포넌트에서 state로 선언된 변수는 Main 컴포넌트의 어디에서나 this.setState() method로 사용하여 변경이 가능
  그러나 props로 Sub컴포넌트에 전달이 되는 순간 그 변수는 모두 readOnly가 됨 이러한 방식을 하향식 단방향 변수 전달 방식이라고 함
- React는 state 변수들의 변화를 감지하여 화면을 rendering하는 엔진을 가지고 있음
  -props로 받은 state로 선언된 변수를 sub 컴포넌트에서 변경하게 되면 이유없는 rendering이 발생하고 성능상 여러가지 문제를 일으킬 수 있음 특히 메모리 누수가 발생하여 서버가 다운될 수도 있음
- 이러한 이유로 변수 변경을 제한하는 방식을 사용한 것이고 철저한 캡슐화 원칙의 철학이 담겨 있음
