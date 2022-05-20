import React, {useEffect, useState, useRef} from "react";
import transportSVG from "../assets/record2.svg"
import {useParams} from "react-router";
import {
    TileLayer,
    MapContainer,
    LayersControl, Marker, Popup, useMapEvents, useMap
} from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import L from "leaflet";

import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

import "./Maps.css"

const maps = {
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function Maps(props) {
    let {id} = useParams();
    const [map, setMap] = React.useState(null)

    const containerStyle = {
        width: '100%',
        height: '100%',
        cursor: props.isPointsAdditionState ? 'crosshair !important' : undefined
    };

    const [center, setCenter] = useState([
        63.259060,
        125.273935
    ]);

    const [popups, setPopups] = useState(props.objects[id - 1].transport.map(item => false));

    useEffect(() => {
        setPopups(popups.map(item => false))
    }, [props.objects[id - 1].transport])


    function Routing(props) {
        const map = useMap();
        useEffect(() => {
            if (!map) return;

            const routingControl = L.Routing.control({
                waypoints: props.userMapPoints.map(item => L.latLng(item.lat, item.lng)),
                routeWhileDragging: true
            }).addTo(map);

            return () => map.removeControl(routingControl);
        }, [map]);

        return <></>;
    }

    const onMapClick = (event) => {
        if (props.isPointsAdditionState) {
            const lat = event.latlng.lat;
            const lng = event.latlng.lng;
            const userMapPoints = [...props.userMapPoints]
            userMapPoints.push({lat: lat, lng: lng})
            props.setUserMapPoints(userMapPoints)
            props.setPointsAdditionState(false);
        }
    }


    const CoordsLayer = () => {
        const mapEvents = useMapEvents({
            click(e) {
                onMapClick(e);
            },
        })
        return (
            <></>
        )

    }

    return <div style={{flex: '1 1 auto'}} className={props.isPointsAdditionState ? 'map-crosshair' : undefined}>
        <MapContainer
            center={center}
            zoom={5}
            zoomControl={true}
            style={containerStyle}
            doubleClickZoom
            whenCreated={map => setMap(map)}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                props.objects[id - 1].transport.filter(item => item.isMarker).map((item, index) => {
                    return <Marker
                        key={index}
                        position={[item.lat, item.lng]}
                        icon={L.icon({
                            iconUrl: transportSVG,
                            iconAnchor: [5, 58],
                            iconSize: [40, 40],
                        })}
                    >
                        <Popup>
                            <div style={{width: '250px'}}>
                                <div style={{textAlign: 'center', fontWeight: 'bold'}}>{item.name}</div>
                                <div
                                    style={{whiteSpace: "pre-line", lineHeight: '2em'}}>{item.description}</div>
                            </div>
                        </Popup>
                    </Marker>
                })
            }
            {
                props.userMapPoints.map((item, index) => {
                    return <Marker
                        key={index}
                        position={{lat: item.lat, lng: item.lng}}>
                    </Marker>
                })
            }
            {
                <Routing userMapPoints={props.userMapPoints}/>
            }
            <CoordsLayer/>
        </MapContainer>
    </div>
}

export default Maps;