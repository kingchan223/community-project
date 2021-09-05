import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BoardItemAdmin from "../../components/AdminBoardItem";
import LoginHeader from "../../components/LoginHeader";

const AdminBoard = () => {
    const [boards, setBoards] = useState([]);
    // const { member } = useSelector((store) => store);
    useEffect(() => {
        fetch("http://localhost:8080/api/home", { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                setBoards(res);
            });
    }, []);
    return (
        <>
            <LoginHeader />
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>글 제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
            </Table>
            {boards.map((board) => (
                <BoardItemAdmin key={board.id} board={board} />
            ))}
        </>
    );
};

export default AdminBoard;
