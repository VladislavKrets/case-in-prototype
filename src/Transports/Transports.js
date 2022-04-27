import React from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";

export default function Transports(props){
    let navigate = useNavigate();
    let {id} = useParams();
    return <div style={{width: '100%'}}>
        <div className={'object-container'}>
            <div className={'object-title'}>
                Выберите транспортное средство
            </div>
            {
                props.objects[id - 1].transport.length > 0 ? props.objects[id - 1].transport.map((item, index) => {
                    return <div className={'object-item'}
                                key={index}
                                onClick={() => navigate("" + (index + 1), {replace: false})}>
                        {item.name}
                    </div>
                }) : <div style={{textAlign: 'center', paddingTop: '40px', width: '100%'}}>
                    Нет данных
                </div>
            }
        </div>
    </div>
}