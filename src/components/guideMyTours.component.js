import React, { Component } from 'react';
import TourService from '../services/tourService';

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
                const toursArray = response.data.tours; // Access the tours array from the response data
                if (Array.isArray(toursArray)) {
                    this.setState({ tours: toursArray });
                } else {
                    console.error('Invalid response format:', response.data);
                }
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
                        <p>Tags: {tour.tags}</p>
                        
                    </li>
                ))}
                </ul>
            </div>
        );
    }
}

export default GuideMyTours;
