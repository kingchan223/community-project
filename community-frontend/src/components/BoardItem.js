import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/borderItem.css"
const BoardItem = (props) => {
    const { id, title, author } = props.board;
    return (
        <>
            <div className={"post-item-div"}>
                <div className={"post-item-title"}>
                    <Link to={"/post/" + id}>
                        <p className={"bp"}>{title}</p>
                    </Link>
                </div>
                &nbsp; &nbsp;
                <div className={"post-item-author-id"}>작성자:{author}</div>
            </div>
            <br/>
        </>
    );
};
export default BoardItem;
