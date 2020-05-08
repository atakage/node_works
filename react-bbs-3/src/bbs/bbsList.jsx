import React, { Component } from "react";
import BBsItem from "./bbsItem";
class bbsList extends Component {
  render() {
    const { bbsList } = this.props;
    const bbsMap = bbsList.map((bbsVO) => {
      return <BBsItem bbsVO={bbsVO} />;
    });

    return (
      <table className="table table-all table-striped table-hover">
        <thead>
          <tr>
            <th>날짜</th>
            <th>작성자</th>
            <th>제목</th>
          </tr>
        </thead>
        {bbsMap}
      </table>
    );
  }
}

export default bbsList;
