import React from "react";
import './Auth.css'
import {Link} from "react-router-dom";

export default function Auth(props) {
    return <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '500px', height: '490px', backgroundColor: '#ECF4FF', border: '10px solid #FF7A00', display: 'flex',
            alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '300px'}}>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{textAlign: 'center', fontWeight: 'bold', color: '#20305E', fontSize: '35px', paddingBottom: '50px', fontFamily: "Montserrat-ExtraBold, sans-serif"}}>
                        АВТОРИЗАЦИЯ
                    </div>
                    <div className={'input-text-wrapper'} style={{marginBottom: '20px'}}>
                        <input placeholder={"Логин"} required={'required'}/>
                    </div>
                    <div className={'input-text-wrapper'} style={{marginBottom: '20px'}}>
                        <input placeholder={"Пароль"} type={'password'} required={'required'}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input type={'submit'} value={"Войти"}
                               style={{backgroundColor: '#FF7A00', color: 'white', fontWeight: 'bold'}}/>
                        <Link to={'/demo'} className={'link-button'}
                              style={{color: 'white', backgroundColor: '#20305E', fontWeight: 'bold'}}>Демо версия</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
}