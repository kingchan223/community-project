import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import BoardItem from "../../components/BoardItem";

const Home = (props) => {
  // const loginId = props.match.params.loginId;
  const [boards, setBoards] = useState([]);
  const { member } = useSelector((store) => store);
  // console.log(1, member);
  useEffect(() => {
    fetch("http://localhost:8080/api/home", { method: "GET" })
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
