import Spreadsheet from "react-spreadsheet";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import LuckySheet from "../LuckySheet/LuckySheet";
import RedirectJsRouter from "../RedirectJsRouter";
import './SpreadSheets.css'

export default function SpreadSheets(props) {
    let {id} = useParams();
    const updateSheets = () => {
        const c_data = Array.from(
            Array(100).keys()
        )
            .map(_ =>
                Array.from(
                    Array(20).keys()
                )
                    .map(_ => {
                    })
            )
        let newData = [...c_data]
        const headers = props.objects[id - 1].transport.length > 0 ? props.objects[id - 1].transport[0].data[0] : [];
        newData[0] = headers.length > 0 ? headers : newData[0];
        const totalData = []
        props.objects[id - 1].transport.filter(item => item.isMarker).forEach(item => totalData.push(...item.data.slice(1)))

        if (c_data.length > totalData.length) {
            for (let i = 1; i < totalData.length; i++) {
                for (let j = 0; j < totalData[i].length; j++) {
                    newData[i][j] = totalData[i][j]
                }
            }
        } else {
            totalData.unshift(headers);
            newData = totalData;
        }
        return newData;
    }

    const [data, setData] = useState(updateSheets());
    useEffect(() => {
        setData(updateSheets())
    }, [props.objects[id - 1].transport])

    return <div className={'demo-spreadsheets'}>
        {/*<Spreadsheet data={data} readOnly={true} />*/}
        <LuckySheet luckyConfig={props.luckyConfig} setLuckyConfig={props.setLuckyConfig}/>
    </div>
}