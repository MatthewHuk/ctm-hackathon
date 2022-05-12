import * as React from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker, Popup, Polygon, CircleMarker} from 'react-leaflet'
import England from "./data/England-Counties.json"

export const CountiesMapDisplay = () => {

    return (

        <MapContainer style={{height: "600px", width: "1000px"}} center={[51, 0]}
                      zoom={12}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
                attribution="Fishcake"
                data={England}
            />


            {/*<Marker position={[sourcePoint.lat, sourcePoint.lon]}>*/}
            {/*    <Popup>*/}
            {/*        your postcode search <br/> {sourcePoint.postcode}*/}
            {/*    <span>&nbsp;&nbsp;</span>*/}
            {/*    <a href="https://youtu.be/dQw4w9WgXcQ">location preview</a>*/}
            {/*    </Popup>*/}
            {/*</Marker>*/}
            {/*<Polygon pathOptions={{color: 'purple'}} positions={createPolygon(sourcePoint.lat, sourcePoint.lon, 5000)}/>*/}
        </MapContainer>
    )
}
