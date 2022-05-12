import * as React from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker, Popup, Polygon, CircleMarker} from 'react-leaflet'
import England from "./data/England-Counties.json"
import {useEffect, useState} from "react";

const colors = [
    'blue',
    'red',
    'green',
    'purple',
    'yellow',
    'cyan'
]

const stylesFunction = (feature) => {
    console.log(feature)
    return {
        color: feature.properties.color
    }
}

export const CountiesMapDisplay = () => {
    const [count, setCount] = useState(0)
    const [geojson, setGeojson] = useState()

    useEffect(()=> {
        var englandGeojson = {...England};
        englandGeojson.features = englandGeojson.features.map(feature => {
            return {
                ...feature,
                properties: {
                    ...feature.properties,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
            }
        })
        setGeojson(englandGeojson);
    }, [])

    return (
<>
        <MapContainer style={{height: "600px", width: "1000px"}} center={[52, -0.5]}
                      zoom={7}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
                attribution="Fishcake"
                data={geojson}
                style={stylesFunction}
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
        <button onClick={()=> setCount(count+1)}>click me {count}</button>
</>
    )
}
