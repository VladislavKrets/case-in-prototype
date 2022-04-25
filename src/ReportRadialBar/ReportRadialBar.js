import React from "react";
import {ResponsiveRadialBar} from "@nivo/radial-bar";

export default function ReportRadialBar(props) {
    return <div className={'graph-wrapper'}>
        <ResponsiveRadialBar
            data={props.data}
            valueFormat=">-.2f"
            padding={0.4}
            cornerRadius={2}
            margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
            maxValue={6}
        />
    </div>
}