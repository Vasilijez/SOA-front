import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';

const KeyPointInput = ({ keyPoint, onChange, onAdd, onRemove }) => {
    const [clickedPosition, setClickedPosition] = useState(null);
    const [keyPoints, setKeyPoints] = useState([]);

    const customIcon = new Icon({
        iconUrl: require("../location-pin.png"),
        iconSize: [38, 38]
    });

    function MyComponent() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setClickedPosition({ latitude: lat, longitude: lng });
            },
        });

        return null;
    }

    const handleAddKeyPoint = () => {
        if (clickedPosition) {
            setKeyPoints([...keyPoints, clickedPosition]);
            setClickedPosition(null); // Reset clicked position after adding
        }
    };

    const handleRemoveKeyPoint = (latitude, longitude) => {
        setKeyPoints(keyPoints.filter(point => point.latitude !== latitude || point.longitude !== longitude));
    };

    return (
        <div>
            <MapContainer center={[48.8566, 2.3533]} zoom={13}>
                <TileLayer
                    attribution='https://www.openstreetmap.org/copyright'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <MyComponent />
                {keyPoints.map((point, index) => (
                    <Marker key={index} icon={customIcon} position={[point.latitude, point.longitude]}>
                        <Popup>
                            Latitude: {point.latitude}<br />
                            Longitude: {point.longitude}
                            <button type='button' onClick={() => { onRemove(point.latitude, point.longitude); handleRemoveKeyPoint(point.latitude, point.longitude)}}>Remove Key Point</button>
                        </Popup>
                    </Marker>
                ))}
                {clickedPosition && (
                    <Marker icon={customIcon} position={[clickedPosition.latitude, clickedPosition.longitude]}>
                        <Popup>
                            Latitude: {clickedPosition.latitude}<br />
                            Longitude: {clickedPosition.longitude}
                            <button type='button' onClick={() => { onAdd(clickedPosition.latitude, clickedPosition.longitude); handleAddKeyPoint(); }}>Add Key Point</button>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default KeyPointInput;
