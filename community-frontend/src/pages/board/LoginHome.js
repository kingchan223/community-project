import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import BoardItem from "../../components/BoardItem";
import { Table } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const Home = (props) => {
  // const loginId = props.match.params.loginId;
  const [boards, setBoards] = useState([]);
  const { member } = useSelector((store) => store);
  // console.log(1, member);
  useEffect(() => {
    fetch("http://localhost:8080/api/home2", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setBoards(res);
      });
  }, []);

  return (
    <div>
      <LoginHeader />

      <h3>안녕하세요 {member.name} 님!</h3>
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Home;
