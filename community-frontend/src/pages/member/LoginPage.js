import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memberLogin } from "../../Store";
import {Link} from "react-router-dom";
import "../../css/loginPage.css"

const LoginPage = (props) => {
    const dispatcher = useDispatch();
    // const { isLogin, member } = useSelector((store) => store);
    const [tryMember, setTryMember] = useState({
        loginId: "",
        password: "",
    });
    const submitLogin = (e) => {
        console.log(tryMember);
        e.preventDefault();
        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tryMember),
        })
            .then((res) => {
                let accessToken = res.headers.get("ACCESS_TOKEN");
                let refreshToken = res.headers.get("REFRESH_TOKEN");
                localStorage.setItem("ACCESS_TOKEN", accessToken);
                localStorage.setItem("REFRESH_TOKEN", refreshToken);
                return res.json();
            })
            .then((res) => {
                if (res.code === 1) {
                    dispatcher(memberLogin(res.member));
                    console.log(1, res.member);
                    setTryMember(res.member);
                    if (res.member.role === "ADMIN") {
                        alert("관리자 화면으로 이동합니다.");
                        props.history.push("/admin/board/manage");
                    } else {
                        alert(res.member.name + "님 환영합니다! 로그인에 성공하셨습니다.");
                        props.history.push("/");
                    }
                } else if (res.code === -1) {
                    alert("로그인에 실패하였습니다. 아이디, 패스워드를 확인해주세요");
                } else {
                    alert("error가 발생했습니다.");
                }
            });
    };

    const changeValue = (e) => {
        setTryMember({
            ...tryMember,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={"login-body"}>
            <div className={"login-body-div"}>
                <div className={"login-body-div2"}>
                    <div className={"loginPage-container"}>
                        <p className={"heading"} style={{color:"white"}}>Login in</p>
                        <div className={"box"}>
                            <p style={{color:"white"}}>id</p>
                            <div>
                                <input className={"login-input"}
                                       type={"text"}
                                       name={"loginId"}
                                       id={""}
                                       placeholder={"Enter your email"}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className={"box"}>
                            <p style={{color:"white"}}>Password</p>
                            <div>
                                <input className={"login-input"}
                                       type={"password"}
                                       name={"password"}
                                       placeholder={"Enter your password"}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <button className={"loginButton"} style={{color:"white", backgroundColor:"#6a9ddc"}} onClick={submitLogin}>
                            Login
                        </button>
                        <p className={"text"} style={{color:"white"}}>Dont you have account?
                            <Link to={"/join"}>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
{/*<h1>로그인</h1>*/}
{/*<Form onSubmit={submitLogin}>*/}
{/*  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
{/*    <Form.Label>아이디</Form.Label>*/}
{/*    <Form.Control*/}
{/*      type="text"*/}
{/*      placeholder="아이디를 입력하세요"*/}
{/*      onChange={changeValue}*/}
{/*      name="loginId"*/}
{/*    />*/}
{/*  </Form.Group>*/}

{/*  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
{/*    <Form.Label>비밀번호</Form.Label>*/}
{/*    <Form.Control*/}
{/*      type="password"*/}
{/*      placeholder="*******"*/}
{/*      onChange={changeValue}*/}
{/*      name="password"*/}
{/*    />*/}
{/*  </Form.Group>*/}
{/*  <Button variant="success" type="submit">*/}
{/*    LOGIN*/}
{/*  </Button>*/}
{/*</Form>*/}
