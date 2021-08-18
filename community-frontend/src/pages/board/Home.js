import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BoardItem from "../../components/BoardItem";
import Header from "../../components/Header";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const { member } = useSelector((store) => store);
  useEffect(() => {
    fetch("http://localhost:8080/api/home", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setBoards(res);
      });
  }, []);

  return (
    <div>
      <Header />
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Home;
