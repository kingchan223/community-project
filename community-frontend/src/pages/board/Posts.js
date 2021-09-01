import React, {useEffect, useState} from 'react';
import BoardItem from "../../components/BoardItem";
import queryStirng from 'query-string'
import "../../css/posts.css"
import {Link} from "react-router-dom";
const Posts = (props) => {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageNow, setPageNow] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [selected, setSelected] = useState("title");
    const [query, setQuery] = useState({
        "selected":"",
        "keyword":"",
    })
    const selectList = ["title", "content"];

    useEffect(() => {
        fetch("http://localhost:8080/api/home", { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                setPosts(res.boardList);
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
                    setPosts(res.boardList);
                    setPageNow(page);
                });
        }
    };

    const changeValue = (e) => {
        setKeyword(e.target.value);
    };

    const changeValueSelect = (e) => {
        setSelected(e.target.value);
    };
    const submitKeyword = (e) => {
        e.preventDefault();
        // fetch(
        //     "http://localhost:8080/api/home/search?selected=" +
        //     selected +
        //     "&keyword=" +
        //     keyword,
        //     { method: "GET" }
        // )
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setPages(res.pageList);
        //         setPosts(res.boardList);
        //         setPageNow(1);
        //     });
        // /posts/search?selected=:keyword1&keyword=:keyword2
        props.history.push("/posts/search/"+selected+"/"+keyword);
    };

    return (
        <div>
            <div className={"post-body"}>
                <div className={"post-body-div"}>
                    <div className={"post-body-middle-div1"}>
                        <section className={"post-body-middle-image"}>
                            {posts.map((post) => (
                                <BoardItem key={post.id} board={post} />
                            ))}
                        </section>
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
            <div className="search-box">
                <form onSubmit={submitKeyword}>
                    <select
                        className="search"
                        onChange={changeValueSelect}
                        value={selected}
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
            <div className="page-box">
                <span onClick={() => changePage(pageNow - 1)}>⬅️</span>
                {pages.map((page, index) => (
                    <span key={index} onClick={() => changePage(page)}>
                        {page}
                        {"  "}
                    </span>
                ))}
                <span onClick={() => changePage(pageNow + 1)}>➡️</span>
                <span className={"post-span-btn"}>
                    <Link to="/post/add" className={"post-btn-link"}>
                        <button className={"post-btn"} >글작성</button>
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Posts;








