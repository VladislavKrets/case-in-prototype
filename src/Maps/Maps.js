import React, {useEffect, useState} from "react";
import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import transportSVG from "../assets/record2.svg"
import {useParams} from "react-router";

function Maps(props) {
    let {id} = useParams();
    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const [center, setCenter] = useState({
        lat: 63.259060,
        lng: 125.273935
    });

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCHazPeqHjDMS5-0IpU-fN3_P_ixxN-wqo"
    })

    const [map, setMap] = React.useState(null)
    const [isAllLoaded, setAllLoaded] = useState(false);
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [zoom, setZoom] = useState(10);
    useEffect(() => {
        if (!isAllLoaded)
            setTimeout(() => {
                const elements = document.querySelectorAll('img[src="https://maps.gstatic.com/mapfiles/api-3/images/google_gray.svg"]');
                elements.forEach((element) => {
                    const parent = element.parentElement.parentElement;
                    parent.remove();
                })
                setMap(map);
                setAllLoaded(true);
                setZoom(4);
                setCenter({
                    lat: 63.259060,
                    lng: 125.273935
                })
            }, 800);
    }, [map])

    const [popups, setPopups] = useState(props.objects[id - 1].transport.map(item => false));

    useEffect(() => {
        setPopups(popups.map(item => false))
    }, [props.objects[id - 1].transport])

    return <div style={{flex: '1 1 auto'}}>
        {
            isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {
                        props.objects[id - 1].transport.filter(item => item.isMarker).map((item, index) => {
                            return <Marker
                                key={index}
                                position={{lat: item.lat, lng: item.lng}}
                                icon={{
                                    url: transportSVG,
                                    anchor: new window.google.maps.Point(5, 58),
                                    scaledSize: new window.google.maps.Size(40, 40)
                                }}
                                onClick={() => {
                                    const newPopups = [...popups];
                                    newPopups[index] = !newPopups[index]
                                    setPopups(newPopups)
                                    setCenter({
                                        lat: item.lat,
                                        lng: item.lng
                                    })
                                }}
                            >
                                {item.isMarker && popups[index] && <InfoWindow
                                    onCloseClick={() => {
                                        const newPopups = [...popups];
                                        newPopups[index] = false;
                                        setPopups(newPopups);
                                    }}
                                    visible={popups[index]}>
                                    <div>
                                        <div style={{textAlign: 'center', fontWeight: 'bold'}}>{item.name}</div>
                                        <div style={{whiteSpace: "pre-line", lineHeight: '2em'}}>{item.description}</div>
                                    </div>
                                </InfoWindow>}
                            </Marker>
                        })
                    }
                    <></>
                </GoogleMap>
            ) : <></>
        }
    </div>
}

export default Maps;