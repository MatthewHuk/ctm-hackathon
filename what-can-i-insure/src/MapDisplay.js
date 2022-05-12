import * as React from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polygon, CircleMarker} from 'react-leaflet'


export const MapDisplay = ({sourcePoint}) => {



    if (sourcePoint.lat && sourcePoint.lon) {
        console.log(sourcePoint.lat)
        console.log(sourcePoint.lon)
        return (

            <MapContainer style={{height: "600px", width: "1000px"}} center={[sourcePoint.lat, sourcePoint.lon]}
                          zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[sourcePoint.lat, sourcePoint.lon]}>
                    <Popup>
                        your postcode search <br/> {sourcePoint.postcode}
                    <span>&nbsp;&nbsp;</span>
                    <a href="https://youtu.be/dQw4w9WgXcQ">location preview</a>
                    </Popup>
                </Marker>
                <Polygon pathOptions={{color: 'purple'}} positions={createPolygon(sourcePoint.lat, sourcePoint.lon, 5000)}/>
            </MapContainer>
        )
    }
    else return null
}

const createPolygon = (sourceLat, sourceLon, radius, tess = 40.0) => {
    const polygon = [];
    for (let i = 0; i<tess; i++){
        const bearing = i * (360.0 / tess)
        const coords = destinationPoint(sourceLat, sourceLon, radius, bearing);
        polygon.push([coords.lat, coords.lon])
    }
    return polygon;
}


// Extend Number object with methods to convert between degrees & radians
const toRadians = (deg) => { return deg * Math.PI / 180; };
const toDegrees = (rad) => { return rad * 180 / Math.PI; };



const destinationPoint = (lat, lon,distance, bearing, radius=6371e3) => {

    const angularDistance = distance / radius; // angular distance in radians
    const bearingR = toRadians(bearing);

    const latR = toRadians(lat);
    const lonR = toRadians(lon);

    const signEndLat = Math.sin(latR) * Math.cos(angularDistance) + Math.cos(latR) * Math.sin(angularDistance) * Math.cos(bearingR);
    const endLatitude = Math.asin(signEndLat);
    const y = Math.sin(bearingR) * Math.sin(angularDistance) * Math.cos(latR);
    const x = Math.cos(angularDistance) - Math.sin(latR) * signEndLat;
    const endLongitude = lonR + Math.atan2(y, x);

    const lat2 = toDegrees(endLatitude);
    const lon2 = toDegrees(endLongitude);

    return {lat:lat2, lon:lon2};
}

