import React, { Component } from "react";
import { database } from "../config/firebaseConfig";

class BBsList extends Component {
  state = {
    bbsList: [],
  };

  // db 읽어와 List에 뿌려줄 LifeCycle Method
  componentDidMount() {
    const resultList = [];
    database
      .ref("bbs")
      .bbsList.on("value")
      .then((result) => {
       - resultList.forEach((item) =>{
           resultList.push(item.val())
       })
      });

    this.setState({ bbsList: [...resultList] });
  }

  render() {
    const bbsMap = bbsList.map( (bbs) =>{
        return <p>{bbs.title}</p>
    })

    return 
}

export default BBsList;
