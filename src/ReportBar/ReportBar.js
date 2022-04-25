import {ResponsiveBar} from "@nivo/bar";
import React, {useEffect, useState} from "react";

export default function ReportBar(props){
    const [padding, setPadding] = useState(0);
    useEffect(() => {
        setTimeout(() => setPadding(0.3), 200);
    });
    return <div className={'graph-wrapper'}>
        <ResponsiveBar
            data={props.data}
            keys={props.keys}
            indexBy={props.indexBy}
            margin={{ top: 30, right: 30, bottom: 30, left: 50 }}
            padding={padding}
            colors={{ scheme: 'paired' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: props.legend,
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={6}
            labelSkipHeight={6}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            role="application"
            ariaLabel="Nivo bar chart demo"
        />
    </div>
}