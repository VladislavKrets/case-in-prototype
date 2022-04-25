import Spreadsheet from "react-spreadsheet";
import React, {useEffect, useState} from "react";

export default function SpreadSheets(props) {

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
        const headers = props.transport[0].data[0]
        newData[0] = headers;
        const totalData = []
        props.transport.filter(item => item.isMarker).forEach(item => totalData.push(...item.data.slice(1)))

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
    }, [props.transport])

    return <div style={{
        display: 'flex',
        width: '100%',
        height: 'calc(100vh - 65px)',
        maxHeight: 'calc(100vh - 65px)',
        overflow: 'auto'
    }}>
        <Spreadsheet data={data} readOnly={true} />
    </div>
}