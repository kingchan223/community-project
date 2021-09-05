import React, {useState} from 'react';
import {Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import webStomp from 'webstomp-client';

const Chatting = (props) => {
    const sender = props.match.params.sender;
    const receiver = props.match.params.receiver;
    let subscription = null;
    let message = "hi";
    let username = "";
    let stompClient = null;
    let [content, setContent] = useState({val:""});
    let [roomName , setRoomName] = useState({roomname:""})
    let messageArea = document.querySelector('#greetings');
    const [chatRoomDto, setChatRoomDto] = useState([]);

//     let stompClient = null;
//     let username = null;
//
//     function setConnected(connected) {
//         $("#connect").prop("disabled", connected);
//         $("#disconnect").prop("disabled", !connected);
//         if (connected) {
//             $("#conversation").show();
//         }
//         else {
//             $("#conversation").hide();
//         }
//         $("#greetings").html("");
//     }
//
//connect(): socket를 할당하고 해당 페이지의 sub을 선언하고 메세지가 들어올 경우 showGreeting을 통해 메세지를 화면에 띄우는 역할을 담당합니다.
//     function connect() {
//         let socket = new SockJS('/gs-guide-websocket');//대부분의 브라우저가 웹소켓을 지원하지만 오래된 버전의 브라우저의 경우 아직 웹소켓을 지원하지 않음으로 Long Polling 방식을 지원해야 하는데 이를 위해 SockJS 같은 라이브러리가 존재
//         // "/gs-guide-websocket", which is where our SockJS server waits for connections.
//         stompClient = Stomp.over(socket);
//         console.log(1, stompClient);
//         stompClient.connect({}, function (frame) {//frame에는 연결정보 들어있음
//             setConnected(true);
//             console.log('Connected: ' + frame);
//             stompClient.subscribe('/topic/greetings', function (gre) {//즉 사용자가 '/topic/greetings'를 구독하게 된다.
//                 showGreeting(JSON.parse(gre.body).content);
//             });
//         });
//     }
//
//     function disconnect() {
//         if (stompClient !== null) {
//             stompClient.disconnect();
//         }
//         setConnected(false);
//         $("#name-space").show();
//         console.log("Disconnected");
//     }
//
// //추가//
//     function sendName() {
//         stompClient.send("/app/hello", {}, JSON.stringify({'content': $("#content").val(), 'username':username}));
//     }
//
//     function showGreeting(message) {
//         $("#greetings").append("<tr><td>" + message + "</td></tr>");
//     }
// //
//     function setUsername(){
//         username = $("#username").val();
//         $("#message-space").append("<div>" +"your name:"+ username + "</div>");
//         $("#name-space").hide();
//     }
//
//     $(function () {
//         $("form").on('submit', function (e) {
//             e.preventDefault();
//         });
//         $( "#connect" ).click(function() { connect(); });
//         $( "#disconnect" ).click(function() { disconnect(); });
//         $( "#send" ).click(function() { sendName(); });
//         $( "#set-username" ).click(function() { setUsername(); });
//     });

    function connect(e) {
        e.preventDefault();
        console.log(sender);
        username = sender;
        console.log("asd");
        if(username) {
            let socket = new SockJS("/stomp/chat");
            let stomp = webStomp.over(socket);
            stomp.connect({}, onConnected, onError);
        }else{
            console.log("name없음");
        }
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    function showGreeting(message) {
        console.log(message);
    }

    function onConnected() {
        // Subscribe to the Public Topic
        stompClient.subscribe("/sub/chat/room/", onMessageReceived);
        // Tell your username to the server
        stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )
    }
    function onError(error) {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    }

    function sendMessage(e) {
        console.log(content.val);
        console.log("content.val && stompClient");
        let chatMessage = {
            sender: username,
            content: content.val,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.addUser", {}, JSON.stringify(chatMessage));
        setContent({...content, val: "",});
        e.preventDefault();
    }

    function onMessageReceived(payload) {
        let message = JSON.parse(payload.body);
        console.log("  222   :" + message.content);
        let messageElement = document.createElement('tr');

        if(message.type === 'JOIN') {
            console.log("JOIN")
            messageElement.classList.add('event-message');
            message.content = message.sender + ' joined!';
        } else if (message.type === 'LEAVE') {
            console.log("LEAVE");
            messageElement.classList.add('event-message');
            message.content = message.sender + ' left!';
        } else {
            messageElement.classList.add('chat-message');
            console.log(message.sender[0])
            let avatarElement = document.createElement('tr');
            let avatarText = document.createTextNode(message.sender[0]);
            avatarElement.appendChild(avatarText);

            messageElement.appendChild(avatarElement);
            console.log(message.sender);
            let usernameElement = document.createElement('tr');
            let usernameText = document.createTextNode(message.sender);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
        }
        console.log(message.content);
        let textElement = document.createElement('p');
        let messageText = document.createTextNode(message.content);
        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);
        messageArea.appendChild(messageElement);
        // messageArea.scrollTop = messageArea.scrollHeight;
    }
    const changeValue = (e) => {
        setContent({
            ...content,
            [e.target.name]:e.target.value,
        })
    }

    const changeValue2 = (e) => {
        setRoomName({
            ...roomName,
            [e.target.name]:e.target.value,
        })
    }

    const createRoom = () => {
        fetch("http://localhost:8080/chat/room",{method:"POST",body:{"name":roomName.roomname}})
            .then((res)=>res.json())
            .then((res)=>{
                setChatRoomDto(res);
            });
    }

    return (
        <div>
            <noscript>
                <h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being
                    enabled. Please enable
                    Javascript and reload this page!</h2>
            </noscript>
            <div className={"post-body"}>
                <div className={"post-body-div"}>
                    <div className={"post-body-middle-div1"}>
                        <div id="main-content" className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <form className="form-inline">
                                        <div className="form-group">
                                            <label htmlFor="roomName">방만들기:</label>
                                            <input type={"text"} name={"roomname"} onChange={"changeValue2"}/>
                                            <button id="connect" className="btn btn-default" onClick={createRoom}>방만들기</button>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="connect">WebSocket connection:</label>
                                            <button id="connect" className="btn btn-default" onClick={connect}>Connect</button>
                                            <button id="disconnect" className="btn btn-default" onClick={disconnect}>Disconnect
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <form className="form-inline">
                                        <div id="message-space" className="form-group">
                                            <label htmlFor="content">Send your message</label>
                                            <input type="text" id="content" name={"val"} className="form-control" placeholder="Your name here..." onChange={changeValue}/>
                                        </div>
                                        <button id="send" className="btn btn-default" onClick={sendMessage}>Send</button>
                                    </form>
                                </div>
                            </div>
                            <table id="conversation" className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Greetings</th>
                                </tr>
                                </thead>
                                <tbody id="greetings">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatting;