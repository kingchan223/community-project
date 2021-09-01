import React from 'react';
import "../../css/Home2.css"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Link} from "react-router-dom";
const Home2 = () => {
    return (
        <div className={"home-body"}>
            {/*<Header/>*/}
            <div className={"home-body-div"}>
                <div className={"home-body-middle-div1"}>
                    <section className={"home-body-middle-image"}>
                        modal
                    </section>
                </div>
                <div className={"home-body-middle-div2"}>
                    <section className={"home-body-middle-notice"}>
                        notice
                    </section>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>
    );
};

export default Home2;