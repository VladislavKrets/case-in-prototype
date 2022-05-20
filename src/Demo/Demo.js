import React from "react";
import './Demo.css'
import {useNavigate} from "react-router-dom";

export default function Demo(props) {
    let navigate = useNavigate();

    return <div style={{minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
        <header className={'demo-header'}>
        </header>
        <div className={'demo-wrapper'}>
            <div className={'object-container'}>
                <div className={'object-title'}>
                    Выберите объект
                </div>
                {
                    props.objects.map((item, index) => {
                        return <div className={'object-item'}
                                    onClick={() => navigate("reports/" + (index + 1), {replace: false})}>
                            {item.name}
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}