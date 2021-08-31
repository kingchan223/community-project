import React, {useEffect, useState} from 'react';
import BoardItem from "../../components/BoardItem";
import BoardItem2 from "../../components/BoardItem2";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageNow, setPageNow] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [selected, setSelected] = useState("title");
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

    return (
        <div>
            <div className={"home-body"}>
                {/*<Header/>*/}
                <div className={"home-body-div"}>
                    <div className={"home-body-middle-div1"}>
                        <section className={"home-body-middle-image"}>
                            {posts.map((board) => (
                                <BoardItem2 key={board.id} board={board} />
                            ))}
                        </section>
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
            );
        </div>
    );
};

export default Posts;