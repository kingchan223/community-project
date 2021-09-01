import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Header.css";
import {useSelector} from "react-redux";
import BeforeLogin from "./BeforeLogin";
import Footer from "./Footer";
import AfterLogin from "./AfterLogin";

const Header = () => {
    const { member, isLogin } = useSelector((store) => store);
    const a = 10;
    function Greeting(props) {
        const isLogin = props.isLogin;
        if (isLogin) {
            return <AfterLogin />;
        }
        return <BeforeLogin />;
    }
    return (
        <>
            <section>
                <haeder className={"home-header"}>
                    <div className={"home-title-div1"}>
                        <div className={"home-title-left"}/>
                        <div className={"home-title-center"}><Link to={"/"}>HOME PAGE</Link></div>
                        <div className={"home-title-right"}>
                            <button className={"home-header-ctn"}>
                                <Link to={"/search"} style={{ textDecoration: 'none', color:"black" }}>
                                    🔎<p>search</p>
                                </Link>
                            </button>
                            <button className={"home-header-ctn"}>
                                {/*<Link to={"/login"} style={{ textDecoration: 'none', color:"black" }}>*/}
                                {/*    🚪️<p>Login</p>*/}
                                {/*</Link>*/}
                                <Greeting isLogin={isLogin}/>
                            </button>
                        </div>
                    </div>
                    <nav className={"home-body-nav"}>
                        <div className={"home-body-nav-div"}>
                            <button className={"nav-btn"}>🐬
                                <Link to={"/posts"} style={{ textDecoration: 'none', color:"black" }}>
                                    <span>자유게시판</span>
                                </Link>
                            </button>
                            <button className={"nav-btn"}>🐳️<Link to={"/notice"} style={{ textDecoration: 'none', color:"black" }}><span>공지사항</span></Link></button>
                            <button className={"nav-btn"}>🐋<Link to={"/#"} style={{ textDecoration: 'none', color:"black" }}><span>menu3</span></Link></button>
                            <button className={"nav-btn"}>🦈<Link to={"/#"} style={{ textDecoration: 'none', color:"black" }}><span>menu4</span></Link></button>
                            <button className={"nav-btn"}>🦭<Link to={"/#"} style={{ textDecoration: 'none', color:"black" }}><span>menu5</span></Link></button>
                        </div>
                    </nav>
                </haeder>
            </section>
        </>
    );
};

export default Header;

// <Link to="/" className="navbar-brand">
//   HOME
// </Link>
// <Nav className="me-auto">
//   <Link to="/join" className="nav-link">
//     JOIN
//   </Link>
//   <Link to="/login" className="nav-link">
//     LOGIN
//   </Link>
// </Nav>
