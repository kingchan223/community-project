import React from 'react';
import {Link} from "react-router-dom";

const ChatRoomItem = (props) => {
    const {roomId, name, sessions} = props.chatRoom;
    return (
        <div>
            <tr>
                <td>{roomId}</td>
                <td>{name}</td>
                <td >{sessions}</td>
                <td><Link to={"/chatRoom/"+name+"/"+roomId}><button>방 입장하기</button></Link></td>
            </tr>
        </div>
    );
};

export default ChatRoomItem;