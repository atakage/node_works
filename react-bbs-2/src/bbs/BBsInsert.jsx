import React, { Component } from "react";
import axios from "axios";

class BBsInsert extends Component {
  state = {
    b_title: ""
  };

  // 키보드로 입력박스에 문자를 입력하면 그 문자를 b_title에 저장
  handleChange = e => {
    this.setState({ ...this.setState, b_title: e.target.value });
  };

  bbsAxiosSubmit = ev => {
    //기본 submit 이벤트 무력화
    ev.preventDefault();
    const { bbs_insert_url } = this.props;

    axios
      .post(bbs_insert_url, { b_title: this.state.b_title })
      .then(result => alert(result))
      .catch(err => console.log(err));
    // return false;
  };

  // ajax를 이용해 서버에 데이터 보내기
  bbsInsertSubmit = ev => {
    // 기본적으로 수행되는 이벤트를 하지말라
    // submit()을 수행하지 말라
    ev.preventDefault();

    const { bbs_insert_url } = this.props;
    let data = new FormData();
    data.append("b_title", this.state.b_title);
    fetch(bbs_insert_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      //JSON.stringify() : JSON 객체를 Serialize된 문자열로 변환
      //JSON.parse()와 반대되는 개념
      // JSON.parse : json형태의  문자열로 (수신)된  값을 json 객체로 변환
      body: JSON.stringify({
        b_title: this.state.b_title
      })
    })
      .then(response => response.json())
      .catch(result => alert(result));

    // 표준 js에서는 return false를 마지막에 써주면 submit() 이벤트를 중단할 수 있었는데
    // react에서는 return false가 아무런 효과를 내지 못함, 그래서 react에서는 이벤트가 시작되는 부분에 이벤트 버블링을 방지하는 코드를 넣어주어야 함(위쪽 참조)
    // return false;
  };

  render() {
    return (
      <form
        onSubmit={this.bbsInsertSubmit}
        className="w3-container w3-row-padding"
      >
        <div className="w3-col s9 w3-padding">
          <input
            value={this.state.b_title}
            onChange={this.handleChange}
            className="w3-input w3-border "
          />
        </div>
        <div className="w3-col s3 w3-padding">
          <button className="w3-button w3-blue">저장</button>
        </div>
      </form>
    );
  }
}

export default BBsInsert;
