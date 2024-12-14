import react from "react"
import 'leaflet/dist/leaflet.css'
import {MapContainer , TileLayer, Marker, Popup} from 'react-leaflet'


const MapComponents = ({coordinates}) => {
    console.log(coordinates , 'reading');
    
    const position = [coordinates.lat , coordinates.lng ]
  return (
    <>
    <MapContainer
    center={position}
    zoom={5}
    style={{height : "400px" , width : "100%" }}
    >

    <TileLayer 
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker position={position} >
        <Popup>
            A pretty popup of new york city
        </Popup>
    </Marker>
    </MapContainer>
    </>
  )
}

export default MapComponents