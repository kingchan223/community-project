import { Container } from "react-bootstrap";
import { Route } from "react-router";
// import Header from "./components/Header";
import Home from "./pages/board/Home";
import Detail from "./pages/board/Detail";
import AddBoardForm from "./pages/board/AddBoardForm.js";
import LoginHome from "./pages/board/LoginHome.js";
import LoginPage from "./pages/member/LoginPage";
import JoinPage from "./pages/member/JoinPage";
import UserDetail from "./pages/member/UserDetail";
import EditMemberInfo from "./pages/member/EditMemberInfo";
import AdminBoard from "./pages/admin/AdminBoard";
import AdminDetail from "./pages/admin/AdminDetail";
import Footer from "./components/Footer";
import EditPost from "./pages/board/EditPost";
import Header from "./components/Header";
import Home2 from "./pages/Home2";
import Posts from "./pages/board/Posts";
import PostDetail from "./pages/board/PostDetail";

function App() {
    return (
        <div>
            <Header />
            <Route path="/" exact={true} component={Home2}/>
            <Route path="/posts" exact={true} component={Posts}/>
            {/*  <Route path="/home" exact={true} component={LoginHome}></Route>*/}
            {/*  /!* board *!/*/}
            <Route path="/post/:id" exact={true} component={PostDetail}/>
            {/*  <Route path="/board/add" exact={true} component={AddBoardForm}></Route>*/}
            {/*  <Route path="/board/edit/:id" exact={true} component={EditPost}></Route>*/}
            {/*  /!* user *!/*/}
            {/*  <Route path="/join" exact={true} component={JoinPage}></Route>*/}
            {/*  <Route*/}
            {/*      path="/member/editinfo"*/}
            {/*      exact={true}*/}
            {/*      component={EditMemberInfo}*/}
            {/*  />*/}
            <Route path="/login" exact={true} component={LoginPage}/>
            {/*  <Route*/}
            {/*      path="/member/memberInfo"*/}
            {/*      exact={true}*/}
            {/*      component={UserDetail}*/}
            {/*  ></Route>*/}
            {/*  /!* admin *!/*/}
            {/*  <Route*/}
            {/*      path="/admin/board/manage"*/}
            {/*      exact={true}*/}
            {/*      component={AdminBoard}*/}
            {/*  ></Route>*/}
            {/*  <Route*/}
            {/*      path="/admin/board/detail/:id"*/}
            {/*      exact={true}*/}
            {/*      component={AdminDetail}*/}
            {/*  ></Route>*/}
            <Footer/>
        </div>
    );
}

export default App;
