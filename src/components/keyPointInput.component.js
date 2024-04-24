import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { Icon} from 'leaflet';

const KeyPointInput = ({ keyPoint, onChange, onAdd }) => {

    const [clickedPosition, setClickedPosition] = useState(null);

    const customIcon = new Icon({
        iconUrl: require("../location-pin.png"),
        iconSize : [38,38]
    })

    function MyComponent() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setClickedPosition({ latitude: lat, longitude: lng });
            },
        });

        return null;
    }

    return (
        <div>
            {/* <div>
                <input type="number" name="longitude" placeholder="Longitude" value={keyPoint.longitude} onChange={onChange} />
                <input type="number" name="latitude" placeholder="Latitude" value={keyPoint.latitude} onChange={onChange} />
                <button type="button" onClick={onAdd}>Add Key Point</button>
            </div> */}

            <MapContainer center={[48.8566, 2.3533]} zoom={13}>
                <TileLayer
                    attribution='https://www.openstreetmap.org/copyright'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <MyComponent />
                {clickedPosition && (
                    <Marker icon={customIcon} position={[clickedPosition.latitude, clickedPosition.longitude]}>
                        <Popup>
                            Latitude: {clickedPosition.latitude}<br />
                            Longitude: {clickedPosition.longitude}
                            <button type='button' onClick={() => onAdd(clickedPosition.latitude, clickedPosition.longitude)}>Add Key Point</button>                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default KeyPointInput;
