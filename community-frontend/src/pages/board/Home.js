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
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("title");
  const selectList = ["title", "content"];

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
  const changeValue = (e) => {
    setKeyword(e.target.value);
  };
  const changeValueSelect = (e) => {
    setCategory(e.target.value);
  };
  const submitKeyword = (e) => {
    e.preventDefault();
    console.log(category);
    console.log(keyword);
  };

  return (
    <div>
      <Header />
      <div className="body-box">
        <div className="boards-box left-box">
          {boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))}
        </div>
        <div className="right-box">
          <div className="search-box">
            <form onSubmit={submitKeyword}>
              <select
                className="search"
                onChange={changeValueSelect}
                value={category}
              >
                {selectList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                className="search"
                type="text"
                placeholder="검색어를 입력해주세요."
                name="keyword"
                onChange={changeValue}
              />
              <button className="search" type="submit">
                search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="page-box">
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
