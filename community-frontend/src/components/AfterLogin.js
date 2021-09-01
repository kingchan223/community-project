import React from 'react';
import {Link} from "react-router-dom";

const AfterLogin = () => {
    const logoutBtnStyle = {
        display:"inline",
        color:"white"
    }
    return (
        <>
            <Link to={"/userinfo"} style={{ textDecoration: 'none', color:"black" }}>
                🏠<p>My page</p>
            </Link>
        </>
    );
};

export default AfterLogin;