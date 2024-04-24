import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationPicker = ({ onLatitudeChange, onLongitudeChange }) => {
    const [position, setPosition] = useState({ lat: 0, lng: 0 });

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onLatitudeChange(lat);
        onLongitudeChange(lng);
    };

    const MapClickHandler = () => {
        const map = useMapEvents({
            click: handleMapClick,
        });

        return null;
    };

    return (
        <div>
            <h3>Choose Location</h3>
            <div style={{ height: '300px', width: '100%', marginBottom: '20px' }}>
                <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <MapClickHandler />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>You selected here</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default LocationPicker;
