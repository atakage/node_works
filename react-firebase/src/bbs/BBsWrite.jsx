import React, { Component } from "react";
import { database } from "../config/firebaseConfig";
import moment from "moment";
import "moment-timezone";

class BBsWrite extends Component {
  state = {
    b_write: "",
    b_title: "",
    b_text: "",
  };

  bbsInsert = () => {
    var newKey = database.ref().child("bbs").push().key;

    database.ref("bbs/" + newKey).set({
      seq: newKey,
      b_date: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
      b_time: moment().tz("Asia/Seoul").format("HH:mm:ss"),
      b_title: this.state.b_title,
      b_writer: this.state.b_write,
      b_text: this.state.b_text,
    });
  };

  // input box에 데이터를 입력할 수 있도록 event 설정
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container-fluid p-5">
        <div className="form-group">
          <input
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.b_write}
            name="b_write"
            placeholder="작성자"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.b_title}
            name="b_title"
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.b_text}
            name="b_text"
            placeholder="내용"
          />
        </div>

        <div className="button-group text-right">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.bbsInsert}
          >
            저장
          </button>
        </div>
      </div>
    );
  }
}

export default BBsWrite;
