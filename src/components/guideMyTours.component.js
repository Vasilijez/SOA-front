import React, { Component } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon} from "leaflet";
import TourService from '../services/tourService';

const customIcon = new Icon({
    iconUrl: require("../location-pin.png"),
    iconSize: [38, 38]
});

class GuideMyTours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tours: [],
            userId: JSON.parse(localStorage.getItem('user')).id
            
 
        };
    }
    

    componentDidMount() {
        if (this.state.userId) {
            this.fetchTours(this.state.userId);
        } else {
            console.error("No user ID found in local storage.");
        }
    }

    fetchTours = (userId) => {
        TourService.getToursByUser(userId)
            .then(response => {
                const toursArray = response.data.tours.map(tour => ({
                    ...tour,
                    tagsArray: tour.tags.split(';')  
                }));
                this.setState({ tours: toursArray });
            })
            .catch(error => {
                console.error('Error fetching tours:', error);
            });
    }
    
    
    render() {
        const { tours } = this.state;
        return (
            <div>
                <h1>My Tours</h1>
                <ul>
                {Array.isArray(tours) && tours.map(tour => (
                    <li key={tour.id}>
                        <h2>{tour.name}</h2>
                        <p>Description: {tour.description}</p>
                        <p>Price: {tour.price}</p>
                        <p>Tags:</p>
                        <ul>
                            {tour.tagsArray.map((tag, index) => (
                                <li key={index}>{tag}</li> 
                            ))}
                        </ul>
                        <MapContainer center={[tour.keyPoints[0].latitude, tour.keyPoints[0].longitude]} zoom={13}>
                            <TileLayer
                                attribution='https://www.openstreetmap.org/copyright'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {tour.keyPoints.map((marker) => (
                                <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon}>
                                    <Popup>{marker.popUp}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </li>
                ))}
                </ul>
            </div>
        );
    }
}

export default GuideMyTours;