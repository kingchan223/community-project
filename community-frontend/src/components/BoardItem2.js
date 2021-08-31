import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoardItem2 = (props) => {
    const { id, title, author } = props.board;
    return (
        <>
            <div className={"post-item-div"}>
                <div><Link to={"/board/" + id}>{title}</Link></div>
                <div>작성자:{author}</div>
            </div>
            <br/>
        </>
    );
};
export default BoardItem2;
