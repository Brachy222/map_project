import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import { map } from 'leaflet'
import "leaflet/dist/leaflet.css"
import {useState} from 'react'
 const UpdateMapCenter = ({ position }) => {
        const map = useMap();
        map.setView(position); // מעדכן את המיקום של המפה
        return null; // לא מחזיר רכיב ויזואלי
      };
function MyMapContainer(props) {
   
    // const [position, setPosition] = useState(props.position)
    return ( <>
    
        <MapContainer center={props.position} zoom={13} scrollWheelZoom={true} style={{height:536,width:"33vw"}}>
            {console.log(props.position + " position")}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             <UpdateMapCenter position={props.position} />
            <Marker position={props.position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>,
        </>
     );
}

export default MyMapContainer;