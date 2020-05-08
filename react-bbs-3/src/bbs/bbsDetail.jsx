import React, { Component } from "react";
import "../App.css";
import { withRouter } from "react-router-dom";

class bbsDetail extends Component {
  state = {
    id: 0,
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  state = {
    bbsVO: {},
  };
  handleUpdate = (e, bbsid) => {
    alert(bbsid);

    this.props.history.push("/bbsWrite/" + bbsid);
  };

  // 서버에게 bbsid값을 전달하고 bbs detail 정보를 가져와서 보여줌
  bbsDetailFetch = () => {
    const bbsid = this.props.match.params.bbsid;

    fetch("http://localhost:8080/bbs/api/detail?bbsid=" + bbsid)
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((result) => {
        this.setState({
          bbsDate: result.bbsDate,
          bbsAuth: result.bbsAuth,
          bbsTitle: result.bbsTitle,
          bbsText: result.bbsText,

          bbsVO: result,
        });
      });
  };

  componentDidMount() {
    this.bbsDetailFetch();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const bbsid = this.props.match.params.bbsid;
    const { bbsVO } = this.state;
    const { bbsDate, bbsAuth, bbsTitle, bbsText } = this.state.bbsVO;

    return (
      <div class="boxDiv">
        <h3 class="detailIdH3">나느 ㄴ {bbsid}입니다</h3>

        <p class="detailContent">작성일자: {bbsDate}</p>
        <p class="detailContent">작성자: {bbsAuth}</p>
        <p class="detailContent">제목: {bbsTitle}</p>
        <p class="detailContent">내용: {bbsText}</p>

        <button type="button" onClick={(e) => this.handleUpdate(e, bbsid)}>
          수정
        </button>
        <button type="button" onClick>
          삭제
        </button>

        <p
          class="goList"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.props.history.push("/")}
        >
          목록으로 돌아가기
        </p>
      </div>
    );
  }
}

export default bbsDetail;
