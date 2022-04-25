import React from "react";
import {Link} from "react-router-dom";

export default function Main(props) {
    return <div>
        <Link to={"/login"}>Войти</Link>
    </div>
}