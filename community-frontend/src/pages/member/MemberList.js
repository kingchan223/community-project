import React, {useEffect, useState} from 'react';
import ChatUserItem from "../../components/ChatUserItem";

const MemberList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:8080/api/allmember",{method:"GET"})
            .then((res)=>res.json())
            .then((res)=>{
                setUsers(res);
            });
    },[]);
    return (
        <div className={"post-body"}>
            <div className={"post-body-div"}>
                <div className={"post-body-middle-div1"}>
                    <thead>
                    <tr>
                        <th>*</th>
                        <th>Id</th>
                        <th> name</th>
                        <th> email</th>
                        <th> button</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user)=>(
                        <ChatUserItem key={user.id} user={user}/>
                    ))}
                    </tbody>
                </div>
            </div>
        </div>
    );
};

export default MemberList;