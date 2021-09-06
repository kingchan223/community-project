import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ChatUserItem = (props) => {
    const {id, loginId, name, email} = props.user;
    const { member } = useSelector((store) => store);
    const cl = () =>{
        console.log(loginId);
        console.log(member.loginId);
    }
    return (
        <tr>
            <th>{id}</th>
            <td>{loginId}</td>
            <td>{name}</td>
            <td >{email}</td>
            <td><Link to={"/chat/"+loginId+"/"+member.loginId}><button>채팅하기</button></Link></td>
        </tr>
    );
};

export default ChatUserItem;