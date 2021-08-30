import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoginHeader from "../../components/LoginHeader";
import "../../css/Detail.css";
const StyledContentDiv = styled.div`
  border: 1px solid green;
`;

const Detail = (props) => {
  const id = props.match.params.id;
  const { member } = useSelector((store) => store);
  const [board, setBoard] = useState({
    title: "",
    content: "",
    loginId: "",
    id: "",
    author: "",
    date: "",
      commentsDtos:[]
  });
  const [commentDtos, setCommentDtos] = useState([]);
  const [comment, setComment] = useState({
      content:"",
  });
  useEffect(() => {
    fetch("http://localhost:8080/api/board/" + id, {
      method: "GET",
      headers: {
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
        setCommentDtos(res.commentDtos);
        // console.log(1, res.loginId);
        // console.log(2, member.loginId);
      });
  }, [id]);
  const deletePost = () => {
    if (!(board.loginId === member.loginId)) {
      alert("게시글 작성자만이 삭제할 수 있습니다.");
    } else {
      fetch("http://localhost:8080/api/board/" + id, {
        method: "DELETE",
        headers: {

          ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 1) {
            alert("게시글 삭제를 완료허였습니다.");
            props.history.push("/home");
          } else {
            alert("게시글 삭제에 실패하였습니다.");
          }
        });
    }
  };
  const submitComment = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/board/comment?board="+id,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain",
            ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
            REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
        body: JSON.stringify(comment),
    })
    .then((res) => res.json())
    .then((res) => {
        setBoard(res);
        setCommentDtos(res.commentDtos);
    });
  }

  const editPost = () => {
    if (!(board.loginId === member.loginId)) {
      alert("게시글 작성자만이 수정할 수 있습니다.");
    } else {
      props.history.push("/board/edit/" + id);
    }
  };

  const changeValue = (e) => {
      setComment({
          ...comment,
          [e.target.name]:e.target.value,
      })
  }
  return (
    <div>
      <LoginHeader />
      <h1>글 상세보기</h1>
      <br/>
      <h2>제목:{board.title}</h2>
      <h3>작성자:{board.author}</h3>
      <h4>작성일:{board.date}</h4>
      <label>글 내용:</label>
      <StyledContentDiv name="content">{board.content}</StyledContentDiv>
        <br/>
      <button onClick={deletePost}>DELETE</button>
      <button onClick={()=>editPost(id)}>EDIT</button>
        <br/>
        <br/>
        <br/>
        <hr />
        <div className="comments">
            <div id={"comment-head"} className={"comment-row"}>
                <span id={"comment-count"}>{commentDtos.length}{" "}</span>Comments
            </div>
            <div className={"comments-row"}>
                <textarea id={"new-comment"} name={"content"} row={5} placeholder={"댓글을 작성해보세요."} onChange={changeValue}/>
                <button onClick={submitComment}>Submit</button>
            </div>
            {commentDtos.map((comment) => (
                <div className={"comments-row comment-list"} >
                    <div>작성자:{comment.authorLoginId}</div>
                    <div>날짜:{comment.date}</div>
                    <div>내용:{comment.content}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Detail;
