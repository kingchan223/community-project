import React from 'react';
import {Link} from "react-router-dom";

const BeforeLogin = () => {
    return (
        <Link to={"/login"} style={{ textDecoration: 'none', color:"black" }}>
            🚪️<p>Login</p>
        </Link>
    );
};

export default BeforeLogin;