import React from "react";
import './Video.css'

export default function Video(props) {
    return <div className={'video-container'}>
        {!props.isCamChecked.reduce((prev, current) => prev || current, false) ? <div className={'video'}>
            Для начала работы выберите камеры
        </div> : <iframe style={{width: '100%', height: '100%'}} src="https://www.youtube.com/embed/dcHI_qFzI4c?autoplay=1&mute=1"
                         title="YouTube video player" frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen></iframe>}

    </div>
}