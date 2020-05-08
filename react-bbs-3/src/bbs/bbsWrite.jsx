import React from "react";
import axios from "axios";

class bbsWrite extends React.Component {
  state = {
    id: 0,
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  /*
    axios를 사용하여 서버로 데이터를 전송

    Router로 감싸진 상태의 컴포넌트들은 props로 match, location, history와 같은 객체를
    상위 Router로부터 전달 받음
    match, location은 보통 query 문자열을 통하여 변수값을 전달받을 때 사용하고
    history는 push() 메서드를 사용하여 어떤 일을 수행한 후 원하는 path로 점프하는 코드를 수행할 수 있음
  */
  bbsInsert = () => {
    let formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("bbsDate", this.state.bbsDate);
    formData.append("bbsAuth", this.state.bbsAuth);
    formData.append("bbsTitle", this.state.bbsTitle);
    formData.append("bbsText", this.state.bbsText);

    axios
      .post("http://localhost:8080/bbs/api/insert", formData)
      .then((result) => {
        const bbsid = result.data.id;
        this.props.history.push("/bbsDetail/" + bbsid);
      })
      .catch((error) => console.log(Error));
  };

  bbsUpdateSetting = () => {
    // 만약 ...bbsid값이 undefinded이면 0을 id에 저장하고
    // 그렇지 않으면 그 문자열을 id에 저장
    const id = this.props.match.params.bbsid || 0;
    // id = this.props.match.params.bbsid == 'undefinded' ? 0 : bbsid
    alert(id);

    if (id == 0) {
      return;
    }

    fetch("http://localhost:8080/bbs/api/detail?bbsid=" + id)
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((result) => {
        this.setState({
          id: result.id,
          bbsDate: result.bbsDate,
          bbsAuth: result.bbsAuth,
          bbsTitle: result.bbsTitle,
          bbsText: result.bbsText,
        });
      });
  };

  componentDidMount() {
    this.bbsUpdateSetting();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log(this.props);

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
