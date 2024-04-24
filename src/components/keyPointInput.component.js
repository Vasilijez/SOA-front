import React from 'react';

const KeyPointInput = ({ keyPoint, onChange, onAdd }) => {
    return (
        <div>
            <input type="text" name="name" placeholder="Name" value={keyPoint.name} onChange={onChange} />
            <input type="number" name="longitude" placeholder="Longitude" value={keyPoint.longitude} onChange={onChange} />
            <input type="number" name="latitude" placeholder="Latitude" value={keyPoint.latitude} onChange={onChange} />
            <button type="button" onClick={onAdd}>Add Key Point</button>
        </div>
    );
}

export default KeyPointInput;
