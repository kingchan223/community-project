import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import BoardItem from "../../components/BoardItem";
import Header from "../../components/Header";
import "../../css/home.css";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  // const { member } = useSelector((store) => store);
  useEffect(() => {
    fetch("http://localhost:8080/api/home", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setBoards(res.boardList);
        setPages(res.pageList);
      });

    fetch("http://localhost:8080/api/maxPage", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setMaxPage(res);
      });
  }, []);

  const changePage = (page) => {
    if (page < 1) {
      alert("이미 첫 페이지입니다.");
    } else if (maxPage < page) {
      alert("마지막 페이지 입니다.");
    } else {
      fetch("http://localhost:8080/api/home?page=" + page)
        .then((res) => res.json())
        .then((res) => {
          setPages(res.pageList);
          setBoards(res.boardList);
          setPageNow(page);
        });
    }
  };
  return (
    <div>
      <Header />
      <div class="body-box">
        <div class="boards-box right-box">
          {boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))}
        </div>
        <div class="left-box">
          <div class="search-box">
            <input type="text" placeholder="검색어를 입력해주세요." />
            <button>검색</button>
          </div>
        </div>
      </div>
      <div class="page-box">
        <span onClick={() => changePage(pageNow - 1)}>⬅️</span>
        {pages.map((page, index) => (
          <span key={index} onClick={() => changePage(page)}>
            {page}
            {"  "}
          </span>
        ))}
        <span onClick={() => changePage(pageNow + 1)}>➡️</span>
      </div>
    </div>
  );
};

export default Home;
