import React from "react";
import axios from "axios";

class bbsWrite extends React.Component {
  state = {
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  /*
    axios를 사용하여 서버로 데이터를 전송
  */
  bbsInsert = () => {
    let formData = new FormData();
    formData.append("bbsDate", this.state.bbsDate);
    formData.append("bbsAuth", this.state.bbsAuth);
    formData.append("bbsTitle", this.state.bbsTitle);
    formData.append("bbsText", this.state.bbsText);

    axios
      .post("http://localhost:8080/bbs/api/insert", formData)
      .then((result) => console.log(result))
      .catch(console.log(Error));
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="form-group">
        <div className="form-group">
          <label>작성일자</label>
          <input
            onChange={this.handleOnChange}
            type="date"
            className="form-control"
            placeholder="날짜를 입력"
            value={this.state.bbsDate}
            name="bbsDate"
          />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input
            onChange={this.handleOnChange}
            className="form-control"
            placeholder="작성자를 입력"
            value={this.state.bbsAuth}
            name="bbsAuth"
          />
        </div>
        <div className="form-group">
          <label>제목</label>
          <input
            onChange={this.handleOnChange}
            className="form-control"
            placeholder="제목을 입력"
            value={this.state.bbsTitle}
            name="bbsTitle"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={this.handleOnChange}
            rows="5"
            className="form-control"
            value={this.state.bbsText}
            name="bbsText"
          />
        </div>
        <div className="button-group text-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.bbsInsert}
          >
            저장
          </button>
        </div>
      </div>
    );
  }
}

export default bbsWrite;
