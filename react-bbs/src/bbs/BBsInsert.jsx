import React, { Component } from "react";
import axios from "axios";

class BBsInsert extends Component {
  state = {
    bTitle: ""
  };

  // 키보드로 입력박스에 문자를 입력하면 그 문자를 b_title에 저장
  handleChange = e => {
    this.setState({ ...this.setState, bTitle: e.target.value });
  };

  bbsAxiosSubmit = e => {
    const { bbs_insert_url } = this.props;

    axios
      .post(bbs_insert_url, { b_title: this.state.bTitle })
      .then(result => alert(result))
      .catch(err => console.log(err));
    return false;
  };

  // ajax를 이용해 서버에 데이터 보내기
  bbsInsertSubmit = e => {
    const { bbs_insert_url } = this.props;
    let data = new FormData();
    data.append("b_title", this.state.bTitle);
    fetch(bbs_insert_url, { method: "POST", body: data }).catch(result =>
      alert(result)
    );

    return false;
  };

  render() {
    return (
      <form
        onSubmit={this.bbsAxiosSubmit}
        className="w3-container w3-row-padding"
      >
        <div className="w3-col s9 w3-padding">
          <input
            value={this.state.bTitle}
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
