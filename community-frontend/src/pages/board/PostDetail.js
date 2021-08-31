import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import LoginHeader from "../../components/LoginHeader";

const PostDetail = (props) => {
    const id = props.match.params.id;
    const { member } = useSelector((store) => store);
    const [post, setPost] = useState({
        title: "",
        commentsDtos:[],
        content: "",
        loginId: "",
        id: "",
        author: "",
        date: ""
    });
    const [commentDtos, setCommentDtos] = useState([{content:"",authorLoginId:"",date:""}]);
    const [comment, setComment] = useState({content:"",});

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
                setPost(res);
                setCommentDtos(res.commentDtos);
            });
    }, [id]);
    const deletePost = () => {
        if (!(post.loginId === member.loginId)) {
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
                setPost(res);
                setCommentDtos(res.commentDtos);
            });
    }

    const editPost = () => {
        if (!(post.loginId === member.loginId)) {
            alert("게시글 작성자만이 수정할 수 있습니다.");
        } else {
            props.history.push("/post/edit/" + id);
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
            <h1>글 상세보기</h1>
            <br/>
            <h2>제목:{post.title}</h2>
            <h3>작성자:{post.author}</h3>
            <h4>작성일:{post.date}</h4>
            <label>글 내용:</label>
            <div >{post.content}</div>
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
                    <textarea id={"new-comment"} name={"content"} rows={5} placeholder={"댓글을 작성해보세요."} onChange={changeValue}/>
                    <button onClick={submitComment}>Submit</button>
                </div>
                {commentDtos.map((comment) => (
                    <div className={"comments-row comment-list"} >
                        <div className={"comment-content"}>내용:{comment.content}</div>
                        <div className={"comment-author"}>작성자:{comment.authorLoginId}</div>
                        <div className={"comment-date"}>날짜:{comment.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;