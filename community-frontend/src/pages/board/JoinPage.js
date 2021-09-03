import React, {useState} from 'react';
import "../../css/joinPage.css"

const JoinPage = (props) => {
    const [member, setMember] = useState({
        name: "",
        email: "",
        loginId: "",
        password: "",
        city: "",
        street: "",
        zipcode: "",
    });

    const changeValue = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value,
        });
    };

    const saveMember = (e) => {
        e.preventDefault();
        console.log(member);
        fetch("http://localhost:8080/api/join", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(member),
        })
            .then((res) => {
                if (res.status === 201) return res.json();
                else return null;
            })
            .then((res) => {
                if (res !== null) {
                    setMember(res);
                    alert(member.name + "님의 회원가입이 완료되었습니다.");
                    props.history.push("/");
                }
            });
    };

    return (
        <div className={"join-body"}>
            <div className={"join-body-div"}>
                <div className={"join-body-div2"}>
                    <div className={"joinPage-container"}>
                        <p className={"heading"} style={{color:"white"}}>Login in</p>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"loginId"}>로그인 아이디:</label>
                                <input className={"join-input"}
                                       type={"text"}
                                       name={"loginId"}
                                       id={""}
                                       placeholder={"아이디를 입력하세요."}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"email"}>이메일:</label>
                                <input className={"join-input"}
                                       type={"email"}
                                       name={"email"}
                                       id={""}
                                       placeholder={"이메일을 형식에 맞게 입력하세요."}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"name"}>이름:</label>
                                <input className={"join-input"}
                                       type={"text"}
                                       name={"name"}
                                       id={""}
                                       placeholder={"이름을 입력하세요."}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"password"}>패스워드:</label>
                                <input className={"join-input"}
                                       type={"password"}
                                       name={"password"}
                                       id={""}
                                       placeholder={"패스워드를 입력하세요."}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"city"}>주소1:</label>
                                <input className={"join-input"}
                                       type={"text"}
                                       name={"city"}
                                       id={""}
                                       placeholder={"도시를 입력하세요"}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"street"}>주소2:</label>
                                <input className={"join-input"}
                                       type={"password"}
                                       name={"street"}
                                       placeholder={"Enter your password"}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <div className={"box"}>
                            <div>
                                <label htmlFor={"zipcode"}>우편번호 :</label>
                                <input className={"join-input"}
                                       type={"text"}
                                       name={"zipcode"}
                                       id={""}
                                       placeholder={"우편번호를 입역하세요."}
                                       onChange={changeValue}/>
                            </div>
                        </div>
                        <button className={"joinButton"}
                                style={{color:"white", backgroundColor:"#6a9ddc"}}
                                onClick={saveMember}>
                            JOIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// <div>
//     <Header />
//     <h1>회원가입</h1>
//     <Form onSubmit={saveMember}>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>이름</Form.Label>
//             <Form.Control
//                 type="text"
//                 placeholder="이름을 입력하세요"
//                 onChange={changeValue}
//                 name="name"
//             />
//         </Form.Group>
//
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>아이디</Form.Label>
//             <Form.Control
//                 type="text"
//                 placeholder="아이디를 입력하세요"
//                 onChange={changeValue}
//                 name="loginId"
//             />
//         </Form.Group>
//
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>이메일</Form.Label>
//             <Form.Control
//                 type="email"
//                 placeholder="community@nav.com"
//                 onChange={changeValue}
//                 name="email"
//             />
//         </Form.Group>
//
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>패스워드</Form.Label>
//             <Form.Control
//                 type="password"
//                 placeholder="4자리 이상입력"
//                 onChange={changeValue}
//                 name="password"
//             />
//         </Form.Group>
//
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>주소1:도시</Form.Label>
//             <Form.Control
//                 type="text"
//                 placeholder="ex)안양시"
//                 onChange={changeValue}
//                 name="city"
//             />
//         </Form.Group>
//
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>주소2:동,구</Form.Label>
//             <Form.Control
//                 type="text"
//                 placeholder="ex)산본동"
//                 onChange={changeValue}
//                 name="street"
//             />
//         </Form.Group>
//
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>주소3:우편번호</Form.Label>
//             <Form.Control
//                 type="text"
//                 placeholder="5자리 우편번호 입력"
//                 onChange={changeValue}
//                 name="zipcode"
//             />
//         </Form.Group>
//         <Button variant="success" type="submit">
//             SUBMIT
//         </Button>
//     </Form>
// </div>
export default JoinPage;