import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import SockJsClient from 'react-stomp'
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ChatRoom = (props) => {
    const name = props.match.params.name;
    const roomId = props.match.params.roomId;
    const { member } = useSelector((store) => store);
    const [text, setText] = useState("");
    let username = member.loginId;
    const [textLine, setTextLine] = useState(["a","b","c"]);

    let stompClient = null;

    const connecting = ()=>{

        const Stomp = require('stompjs')
        let SockJS = require('sockjs-client',)
        SockJS = new SockJS('/stomp/chat', {transports: ['websocket']});
        stompClient = Stomp.over(SockJS);
        console.log(1,stompClient);

        stompClient.connect({},function(){
            stompClient.subscribe("/sub/chat/room/" + roomId, function (chat) {
                let content = JSON.parse(chat.body);
                let writer = content.writer;
                let message = content.message;
                console.log(writer + " : " + message);
                // Registering user to server as a public chat user
                stompClient.send('/pub/chat/enter', {}, JSON.stringify({roomId: roomId, writer: username}));
            });
        });
    };

    const disconnect = () => {
        stompClient.disconnect();
    };

    const sendMessage = () =>{
        console.log(stompClient);
        if(stompClient!=null)
            stompClient.send('/pub/chat/message', {}, JSON.stringify({roomId: roomId, message: text, writer: username}));
        else
            alert("아직 연결중 입니다. 잠시 기다려주세요");
    };

    const changeValue = (e) => {
        setText(e.target.value);
    };

    return (
        <div>
            <div className={"post-body"}>
                <div className={"post-body-div"}>
                    <div className={"post-body-middle-div1"}>
                        <div className="container">
                            <div className="col-6">
                                <h1>{name}</h1>
                            </div>
                            <div>
                                <div id="msgArea" className="col">
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <button className="btn btn-outline-secondary" type="button" id="button-connect" onClick={connecting}>connect
                                        </button>
                                        <button className="btn btn-outline-secondary" type="button" id="button-disconnect" onClick={disconnect}>disconnect
                                        </button>
                                        <input type="text" id="msg" className="form-control" name={"text"} onChange={changeValue}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button" id="button-send" onClick={sendMessage}>전송
                                            </button>
                                            {textLine.map((item) => (
                                                <div value={item} key={item}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;