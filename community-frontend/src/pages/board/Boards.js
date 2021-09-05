import React, {useState} from 'react';
import "../../css/ha.css"
const Boards = () => {
    const [content, setContent] = useState({va: ""});

    const changeValue = (e) => {
        setContent({
            ...content,
            [e.target.name]:e.target.value,
        })
    }
    const hi = () =>{
        console.log(content);
    }
    return (
        <div id={"haha"}>
            <input type="text" id="content" name={"va"} className="form-control" placeholder="Your name here..." onChange={changeValue}/>
            <button onClick={hi}>HI</button>
        </div>
    );
};

export default Boards;