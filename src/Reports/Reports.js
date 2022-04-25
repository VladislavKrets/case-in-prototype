import React, {useEffect, useState} from "react";
import {ResponsiveBar} from "@nivo/bar";
import ReportBar from "../ReportBar/ReportBar";
import ReportRadialBar from "../ReportRadialBar/ReportRadialBar";
import './Reports.css'
import {useParams} from "react-router";

export default function Reports(props) {
    let {id} = useParams();
    const [dataConsumptionHour, setDataConsumptionHour] = useState([
        {
            "month": "Декабрь",
            "consumption": 3.24,
        },
        {
            "month": "Январь",
            "consumption": 3.17,
        },
        {
            "month": "Февраль",
            "consumption": 2.29,
        },
        {
            "month": "Март",
            "consumption": 15.6,
        },
    ]);

    const [dataObjects, setDataObjects] = useState([
        {
            "id": "Нет данных",
            "data": [
                {
                    "x": "Объекты",
                    "y": 3
                },
            ]
        },
        {
            "id": "Со сливами",
            "data": [
                {
                    "x": "Объекты",
                    "y": 0
                },
            ]
        },
        {
            "id": "В порядке",
            "data": [
                {
                    "x": "Объекты",
                    "y": 3
                },
            ]
        },
    ])

    const [dataConsumptionLiters, setDataConsumptionLiters] = useState([
        {
            "month": "Декабрь",
            "consumption": 31,
        },
        {
            "month": "Январь",
            "consumption": 50,
        },
        {
            "month": "Февраль",
            "consumption": 28,
        },
        {
            "month": "Март",
            "consumption": 15,
        },
    ]);

    const [dataWorkMinutes, setDataWorkMinutes] = useState([
        {
            "month": "Декабрь",
            "minutes": 2,
        },
        {
            "month": "Январь",
            "minutes": 15,
        },
        {
            "month": "Февраль",
            "minutes": 3,
        },
        {
            "month": "Март",
            "minutes": 6,
        },
    ]);

    const [dataSinkVolume, setDataSinkVolume] = useState([
        {
            "month": "Декабрь",
            "volume": 0,
        },
        {
            "month": "Январь",
            "volume": 686,
        },
        {
            "month": "Февраль",
            "volume": 0,
        },
        {
            "month": "Март",
            "volume": 0,
        },
    ]);

    const [dataConsumptionCurrent, setDataConsumptionCurrent] = useState([
        {
            "month": "Декабрь",
            "consumption": 3.24,
        },
        {
            "month": "Январь",
            "consumption": 0.88,
        },
        {
            "month": "Февраль",
            "consumption": 2.29,
        },
        {
            "month": "Март",
            "consumption": 1.01,
        },
    ]);

    const object = props.objects[id - 1];
    return <div className={'report-wrapper'}>
        <div className={'reports-object-title'}>
            {object.name}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>

            <div className={'report-list'}>
                <ReportRadialBar data={dataObjects}/>
                <ReportBar data={dataConsumptionHour} keys={['consumption']} indexBy={'month'}
                           legend={'Расход топлива за 3 месяца (на моточас)'}/>
                <ReportBar data={dataConsumptionLiters} keys={['consumption']} indexBy={'month'}
                           legend={'Расход топлива (литры)'}/>
                <ReportBar data={dataWorkMinutes} keys={['minutes']} indexBy={'month'}
                           legend={'Среднее время работы за сутки (минуты)'}/>
                <ReportBar data={dataSinkVolume} keys={['volume']} indexBy={'month'} legend={'Объем сливов (литры)'}/>
                <ReportBar data={dataConsumptionCurrent} keys={['consumption']} indexBy={'month'}
                           legend={'Расход топлива за текущий месяц (на моточас)'}/>
            </div>
        </div>
    </div>
}