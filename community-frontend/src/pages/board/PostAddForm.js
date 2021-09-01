import React, { useState } from "react";
import "../../css/postAddForm.css"

const PostAddForm = (props) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const submitPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
      body: JSON.stringify(post),
    })
        .then((res) => {
          if (res.code === 1) return res.json();
          else if (res.code === 2) {
            let accessToken = res.headers.get("ACCESS_TOKEN");
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            fetch("http://localhost:8080/api/member", {
              method: "GET",
              headers: {
                ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
                REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
              },
            })
                .then((res) => {
                  return res.json;
                })
                .then((res) => {
                  alert("글 작성에 성공하셨습니다!");
                  props.history.push("/posts");
                });
          } else if (res.code === 3) {
            alert("세션이 만료되었습니다. 다시 로그인 해주세요");
            props.history.push("/login");
          } else {
            return res.json();
          }
        })
        .then((res) => {
          alert("글 작성에 성공하셨습니다!");
          props.history.push("/posts");
        })
        .catch((err) => console.log(err));
  };

  const changeValue = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <div className={"postAddForm-body"}>
        <div className={"postAddForm-body-div"}>
          <form>
            <div className={"postAddForm-body-middle-div1"}>
              <section className={"postAddForm-body-middle-image"}>
                제목:
                <input name={"title"} onChange={changeValue} className={"title-input"} type={"text"} placeholder={"제목을 입력하세요."} />
              </section>
            </div>
            <div className={"postAddForm-body-middle-div2"}>
              <section className={"postAddForm-body-middle-notice"}>
                내용:
                <textarea name={"content"} onChange={changeValue} className={"content-input"} type={"text"} placeholder={"내용을 입력하세요."} rows={"12"} cols={"130"}/>
              </section>
            </div>
            <div className={"userDetail-body-div3"}>
              <button className={"userInfo-edit-btn"} onClick={submitPost}>제출하기</button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default PostAddForm;
{/*<LoginHeader />*/}
{/*<h1>글쓰기</h1>*/}
{/*<Form onSubmit={submitText}>*/}
{/*  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
{/*    <Form.Label>글 제목</Form.Label>*/}
{/*    <Form.Control*/}
{/*        type="text"*/}
{/*        placeholder="글 제목을 입력하세요"*/}
{/*        name="title"*/}
{/*        onChange={changeValue}*/}
{/*    />*/}
{/*  </Form.Group>*/}
{/*  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">*/}
{/*    <Form.Label>글 내용</Form.Label>*/}
{/*    <Form.Control*/}
{/*        as="textarea"*/}
{/*        rows={3}*/}
{/*        placeholder="글 내용을 입력하세요"*/}
{/*        name="content"*/}
{/*        onChange={changeValue}*/}
{/*    />*/}
{/*  </Form.Group>*/}
{/*  <Button variant="success" type="submit">*/}
{/*    SUBMIT*/}
{/*  </Button>*/}
{/*</Form>*/}
