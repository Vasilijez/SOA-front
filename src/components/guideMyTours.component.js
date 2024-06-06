import React, { Component } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
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
            userId: JSON.parse(localStorage.getItem('user')).id,
            ratings: {},  // stores ratings for each tour
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
                const toursArray = response.data.listTourRateView.map(tourRateView => ({
                    ...tourRateView.tour,
                    canRate: tourRateView.rate,
                    tagsArray: tourRateView.tour.tags.split(';'),
                }));
                this.setState({ tours: toursArray });
            })
            .catch(error => {
                console.error('Error fetching tours:', error);
            });
    }

    handleRateChange = (tourId, event) => {
        this.setState({
            ratings: { ...this.state.ratings, [tourId]: event.target.value }
        });
    }

    submitRate = (tourId) => {
        const rate = this.state.ratings[tourId];
        if (rate) {
            TourService.postReview({ tourID: parseInt(tourId, 10), rate: parseInt(rate, 10) })
                .then(response => {
                    alert("Review submitted successfully");
                    this.fetchTours(this.state.userId);  // Refresh tours after submitting the review
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                    alert(`Failed to submit review: ${error.response.data.error}`);
                });
        } else {
            alert("Please select a rate before submitting.");
        }
    }
    
    // submitRate = (tourId) => {
    //     const rate = this.state.ratings[tourId];
    //     if (rate) {
    //         TourService.postReview({ tourID: tourId, rate })
    //             .then(response => {
    //                 alert("Review submitted successfully");
    //                 this.fetchTours(this.state.userId);  // Refresh tours after submitting the review
    //             })
    //             .catch(error => {
    //                 console.error('Error submitting review:', error);
    //                 alert("Failed to submit review");
    //             });
    //     }
    // }

    render() {
        const { tours } = this.state;
        return (
            <div>
                <h1>My Tours</h1>
                <ul>
                    {tours.map(tour => (
                        <li key={tour.ID}>
                            <h2>{tour.name}</h2>
                            <p>Description: {tour.description}</p>
                            <p>Price: {tour.price}</p>
                            <p>Avg rate: {tour.avgRate}</p>
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
                            {tour.canRate && (
                                <div>
                                    <select onChange={(e) => this.handleRateChange(tour.ID, e)}>
                                        <option value="">Select Rate</option>
                                        {[1, 2, 3, 4, 5].map(rate => (
                                            <option key={rate} value={rate}>{rate}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => this.submitRate(tour.ID)}>Submit Review</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default GuideMyTours;



