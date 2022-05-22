import React, {useEffect, useState} from "react";
import {ResponsiveBar} from "@nivo/bar";
import ReportBar from "../ReportBar/ReportBar";
import ReportRadialBar from "../ReportRadialBar/ReportRadialBar";
import './Reports.css'
import {Outlet, useParams} from "react-router";

export default function Reports(props) {
    let {id} = useParams();

    const object = props.objects[id - 1];
    return window.location.pathname === "/demo/reports/" + id ? <div className={'report-wrapper'}>
        <div className={'reports-object-title'}>
            {object.name}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {object.data.dataObjects ?
                <div className={'report-list'}>
                <ReportRadialBar data={object.data.dataObjects}/>
                <ReportBar data={object.data.dataConsumptionHour} keys={['consumption']} indexBy={'month'}
                           legend={'Расход топлива за 3 месяца (на моточас)'}/>
                <ReportBar data={object.data.dataConsumptionLiters} keys={['consumption']} indexBy={'month'}
                           legend={'Расход топлива (литры)'}/>
                <ReportBar data={object.data.dataWorkMinutes} keys={['minutes']} indexBy={'month'}
                           legend={'Среднее время работы за сутки (минуты)'}/>
                <ReportBar data={object.data.dataSinkVolume} keys={['volume']} indexBy={'month'} legend={'Объем сливов (литры)'}/>
                <ReportBar data={object.data.dataConsumptionCurrent} keys={['consumption']} indexBy={'month'}
                           legend={'Расход топлива за текущий месяц (на моточас)'}/>
                    <div className={'graph-wrapper-imitator'}/>
                    <div className={'graph-wrapper-imitator'}/>
                </div> : <div style={{paddingTop: '40px', fontSize: '1.2em'}}>Данные отсутствуют</div>
            }
        </div>
    </div> : <Outlet/>
}