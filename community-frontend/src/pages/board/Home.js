import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/home", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBoards(res);
      });
  }, []);

  return (
    <div>
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Home;
