import * as React from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker, Popup, Polygon, CircleMarker} from 'react-leaflet'
import England from "./data/England-Counties.json"
import {useEffect, useState} from "react";
import axios from "axios";

const colors = (d) => {
    return d > 1200 ? '#800026' :
        d > 1100  ? '#BD0026' :
            d > 1000  ? '#E31A1C' :
                d > 900  ? '#FC4E2A' :
                    d > 800   ? '#FD8D3C' :
                        d > 700   ? '#FEB24C' :
                            d > 600   ? '#FED976' :
                                '#FFEDA0'
}

const stylesFunction = (feature) => {
    console.log(feature)
    return {
        color: feature.properties.color
    }
}

export const CountiesMapDisplay = () => {
    const [count, setCount] = useState(0)
    const [geojson, setGeojson] = useState()

    useEffect(async ()=> {
        var response = await axios.get("http://localhost:3001/enquiry/all");
        console.log(response.data);
        var englandGeojson = {...England};
        englandGeojson.features = englandGeojson.features.map(feature => {
            return {
                ...feature,
                properties: {
                    ...feature.properties,
                    color: "blue",
                    nEnquiries:0,
                    totalPremium:0,
                    averagePremium:0
                }
            }
        })
        response.data.forEach(enq => {
            const f = englandGeojson.features[Math.floor(Math.random() * englandGeojson.features.length)]
            f.properties.nEnquiries++;
            f.properties.totalPremium+=enq.annualPremium;
        });
        englandGeojson.features.forEach((feature)=>{
            const avg = feature.properties.totalPremium/ feature.properties.nEnquiries;
            feature.properties.averagePremium = avg;
            feature.properties.color = colors(avg);
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

            {geojson && (
                <GeoJSON
                    attribution="Fishcake"
                    data={geojson}
                    style={stylesFunction}
                />
            )}



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
