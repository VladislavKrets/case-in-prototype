import React from "react";
import './Notifications.css'
import {useParams} from "react-router";
import {Alert} from "react-bootstrap";

export default function Notifications(props) {
    let {id} = useParams();
    const object = props.objects[id - 1];
    return <div style={{width: '100%'}}>
        <div className={'object-container'} style={{boxSizing: 'border-box'}}>
            <div className={'object-title'}>
                Уведомления
            </div>
            {
                object.notifications.map((item, index) => {
                    return <div className={'notification-alert'} key={index}>
                        <div className={'notification-datetime'}>
                            {item.datetime}
                        </div>
                        <Alert className={'notification-alert'} variant={item.isPositive ? 'success' : 'danger'}>
                            <div style={{color: 'black', fontWeight: 'bold'}}>{item.title}</div>
                            <div>{item.description}</div>
                        </Alert>
                    </div>
                })
            }
        </div>
        {object.notifications.length === 0 && <div style={{textAlign: 'center', paddingTop: '40px', width: '100%'}}>
            Нет уведомлений
        </div>
        }
    </div>
}