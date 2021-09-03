import { Route } from "react-router";


import PostAddForm from "./pages/board/PostAddForm.js";

import LoginPage from "./pages/member/LoginPage";

import UserDetail from "./pages/member/UserDetail";

import Footer from "./components/Footer";

import Header from "./components/Header";
import Home2 from "./pages/board/Home2";
import Posts from "./pages/board/Posts";
import PostDetail from "./pages/board/PostDetail";
import PostsByKeyword from "./pages/board/PostsByKeyword";
import EditPost from "./pages/board/EditPost";
import MessagePage from "./pages/member/MessagePage";
import JoinPage from "./pages/board/JoinPage";

function App() {
    return (
        <div>
            <Header />
            <Route path="/" exact={true} component={Home2}/>
            <Route path="/posts" exact={true} component={Posts}/>
            <Route path="/posts/search/:selected/:keyword" exact={true} component={PostsByKeyword}/>
            {/*  <Route path="/home" exact={true} component={LoginHome}></Route>*/}
            {/*  /!* board *!/*/}
            <Route path="/post/detail/:id" exact={true} component={PostDetail}/>
            <Route path="/post/add" exact={true} component={PostAddForm}/>
            <Route path="/board/edit/:id" exact={true} component={EditPost}/>
            {/*  /!* user *!/*/}
            <Route path="/join" exact={true} component={JoinPage}/>
            <Route path="/userinfo/message" exact={true} component={MessagePage}/>
            {/*  <Route*/}
            {/*      path="/member/editinfo"*/}
            {/*      exact={true}*/}
            {/*      component={EditMemberInfo}*/}
            {/*  />*/}
            <Route path="/login" exact={true} component={LoginPage}/>
            <Route path="/userInfo" exact={true} component={UserDetail}/>
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
