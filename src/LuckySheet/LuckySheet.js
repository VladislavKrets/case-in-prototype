import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import './LuckySheet.css'

export default function LuckySheet(props) {
    let {id} = useParams();

    useEffect(() => {
        const luckysheet = window.luckysheet;
        const luckyConfig = {...props.luckyConfig}
        luckyConfig.myFolderUrl = `/demo/reports/${id}`
        luckysheet.create(luckyConfig);
        const elements = document.getElementsByClassName('luckysheet-share-logo')
        for (let i = 0; i < elements.length; i++) elements[i].remove();
    }, [props.luckyConfig])
    const luckyCss = {
        margin: '0px',
        padding: '0px',
        width: '100%',
        height: '100%',
    }
    return (
        <div
            id="luckysheet"
            style={luckyCss}
        ></div>
    )
}