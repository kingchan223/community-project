import React, { useEffect, useState } from "react";
import { Carousel, Table } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import BoardItem from "../../components/BoardItem";
import Header from "../../components/Header";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const maxPage = null;
  // const { member } = useSelector((store) => store);
  const changePage = (page) => {
    if (page < 1) {
      alert("이미 첫 페이지입니다.");
    } else {
      fetch("http://localhost:8080/api/home?page=" + page)
        .then((res) => res.json())
        .then((res) => {
          setPages(res.pageList);
          setBoards(res.boardList);
          console.log(boards);
          setPageNow(page);
        });
    }
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/home", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setBoards(res.boardList);
        setPages(res.pageList);
        console.log(pages);
      });
  }, []);

  return (
    <div>
      <Header />
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
      <span onClick={() => changePage(pageNow - 1)}>⬅️</span>
      {pages.map((page, index) => (
        <span key={index} onClick={() => changePage(page)}>
          {page}
          {"  "}
        </span>
      ))}
      <span onClick={() => changePage(pageNow + 1)}>➡️</span>
    </div>
  );
};

export default Home;
