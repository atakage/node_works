import React, { Component } from "react";

class PhoneList extends Component {
  render() {
    // phoneMain에서 보내준 모든 매개변수 중 phoneList가 있을 테니 내가 사용할 수 있도록 추출해달라
    const { phoneList, name, tel, addr, my_value } = this.props;
    return (
      <div>
        <p>전화번호 리스트</p>

        <p>List의 my_value : {my_value}</p>
      </div>
    );
  }
}

export default PhoneList;
