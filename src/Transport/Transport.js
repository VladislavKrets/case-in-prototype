import React from "react";
import {useParams} from "react-router";
import './Transport.css'
import volumeLevelSVG from '../assets/volume_level.svg'

export default function Transport(props) {
    let {id, transportId} = useParams();
    const transport = props.objects[id - 1].transport[transportId - 1];
    return <div style={{width: '100%'}}>
        <div className={'object-container transport'} style={{boxSizing: 'border-box'}}>
            <div className={'object-title'}>
                {transport.name}
            </div>
            <div className={'transport-table'}>
                <div className={'transport-properties'}>
                    <div className={'transport-data'}>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Тип ТС:</span> {transport.type}
                        </div>
                        <div>
                        <span style={{
                            color: '#20305E',
                            fontWeight: 'bold'
                        }}>Серийный номер:</span> {transport.serialNumber}
                        </div>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Статус:</span> {transport.state}
                        </div>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Уровень шума:</span> {transport.noise}
                        </div>
                    </div>
                    <div className={'transport-data'}>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Год выпуска:</span> {transport.year}
                        </div>
                        <div>
                        <span style={{
                            color: '#20305E',
                            fontWeight: 'bold'
                        }}>Максимальная конструктивная скорость:</span> {transport.maxConstructiveSpeed}
                        </div>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Водитель:</span> {transport.driver}
                        </div>
                        <div>
                        <span style={{
                            color: '#20305E',
                            fontWeight: 'bold'
                        }}>Расход топлива:</span> {transport.volumeConsumption}
                        </div>
                    </div>
                </div>
                <div className={'transport-properties'} style={{marginTop: '20px'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} className={'transport-data'}>
                        <div className={'transport-props-title'}>
                            Уровень топлива
                        </div>
                        <div>
                            <img src={volumeLevelSVG}/>
                        </div>
                        <div className={'transport-props-title'}>
                            93%
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} className={'transport-data'}>
                        <div className={'transport-props-title'}>
                            Потребление
                        </div>
                        <div>
                            <div className={'volume-info'}>
                                <div>Сегодня</div>
                                <div className={'volume-percent'}>
                                    <div style={{
                                        padding: '10px 0',
                                        boxSizing: 'borderBox',
                                        width: '10%',
                                        backgroundColor: '#20305E'
                                    }}>
                                    </div>
                                </div>
                                <div>10 л</div>
                            </div>
                            <div className={'volume-info'}>
                                <div>7 дней</div>
                                <div className={'volume-percent'}>
                                    <div style={{
                                        padding: '10px 0',
                                        boxSizing: 'borderBox',
                                        width: '30%',
                                        backgroundColor: '#20305E'
                                    }}>
                                    </div>
                                </div>
                                <div>50 л</div>
                            </div>
                            <div className={'volume-info'}>
                                <div>30 дней</div>
                                <div className={'volume-percent'}>
                                    <div style={{
                                        padding: '10px 0',
                                        boxSizing: 'borderBox',
                                        width: '70%',
                                        backgroundColor: '#20305E'
                                    }}>
                                    </div>
                                </div>
                                <div>130 л</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'transport-properties'}>
                    <div className={'transport-data'}>
                        <div className={'transport-props-title'}>
                            Показатели обслуживания
                        </div>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Дата последнего ТО:</span> 22.04.2021
                        </div>
                        <div>
                            <span style={{color: '#20305E', fontWeight: 'bold'}}>Класс работоспособности:</span> 1 класс
                        </div>
                    </div>
                    <div className={'transport-data'}>
                        <div className={'transport-props-title'}>
                            Время наработки до капитального ремонта
                        </div>
                        <div className={'transport-percent-data'}>
                            <div className={'volume-percent'}>
                                <div style={{
                                    padding: '10px 0',
                                    boxSizing: 'borderBox',
                                    width: '20%',
                                    backgroundColor: '#20305E'
                                }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}