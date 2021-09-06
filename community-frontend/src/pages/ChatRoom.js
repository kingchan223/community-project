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
    let stompClient = null;



    const Stomp = require('stompjs')
    let SockJS = require('sockjs-client')
    SockJS = new SockJS('/stomp/chat')
    stompClient = Stomp.over(SockJS);

    const onConnected = () => {
        // Subscribing to the public topic
        stompClient.subscribe("/sub/chat/room/" + roomId, onMessageReceived);
        // Registering user to server as a public chat user
        stompClient.send('/pub/chat/enter', {}, JSON.stringify({roomId: roomId, writer: username}))
    }

    const onError = (error) => {
        console.log("error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'");
    }

    stompClient.connect({},onConnected, onError);


    const onMessageReceived = (payload) => {
        console.log(payload);
    }

    stompClient.connect({}, function (){
        console.log("STOMP Connection")
        //4. subscribe(path, callback)으로 메세지를 받을 수 있음
        stompClient.subscribe("/sub/chat/room/" + roomId, function (chat) {
            let content = JSON.parse(chat.body);
            let writer = content.writer;
            console.log(content + "  " + writer);
        });

        //3. send(path, header, message)로 메세지를 보낼 수 있음
        stompClient.send('/pub/chat/enter', {}, JSON.stringify({roomId: roomId, writer: username}))
    });

    const changeValue = (e) => {
        setText(e.target.value);
    }

    const sendMessage = () =>{
        stompClient.send('/pub/chat/message', {}, JSON.stringify({roomId: roomId, message: text, writer: username}));
    }


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
                                        <input type="text" id="msg" className="form-control" name={"text"} onChange={changeValue}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button" id="button-send" onClick={sendMessage}>전송
                                            </button>
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