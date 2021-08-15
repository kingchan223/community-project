import React, { useEffect, useState } from "react";

const Home = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/board", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  });

  return <div>home</div>;
};

export default Home;
