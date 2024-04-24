import React, { Component } from 'react';
import TourService from '../services/tourService';
import KeyPointInput from './keyPointInput.component';

class TourForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            type: 1,
            tags: '',
            price: 0.0,
            userId: JSON.parse(localStorage.getItem('user')).id,
            keyPoints: [],
            newKeyPoint: {longitude: 0.0, latitude: 0.0},
        };
    }

    handleChange = (e) => {
        const value = e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value;
        this.setState({ [e.target.name]: value });
    }
    

    handleTypeChange = (e) => {
        this.setState({ type: parseInt(e.target.value) });
    }

    handleAddKeyPoint = (latitude, longitude) => {
        const { keyPoints } = this.state; 
        this.setState({
            keyPoints: [...keyPoints, { latitude, longitude }],
            newKeyPoint: { latitude: 0, longitude: 0 },
        });
    }

    handleRemoveKeyPoint = (latitude, longitude) => {
        const { keyPoints } = this.state;
        const updatedKeyPoints = keyPoints.filter(point => point.latitude !== latitude || point.longitude !== longitude);
        this.setState({ keyPoints: updatedKeyPoints });
    }
    
    handleKeyPointChange = (e) => {
        const { newKeyPoint } = this.state;
        let value = e.target.value;
    
        if (e.target.name === "latitude" || e.target.name === "longitude") {
            value = parseFloat(value);
        }
    
        this.setState({
            newKeyPoint: { ...newKeyPoint, [e.target.name]: value },
        });
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, description, type, tags, price, userId, keyPoints } = this.state;
        const formData = { name, description, type, tags, price, userId, keyPoints };

        console.log(formData)
        TourService.createTour(formData)
            .then(response => {
                console.log('Tour created successfully:', response);
                this.setState({
                    name: '',
                    description: '',
                    type: 1,
                    tags: '',
                    price: 0,
                    userId: JSON.parse(localStorage.getItem('user')).id,
                    keyPoints: [],
                    newKeyPoint: {longitude: 0, latitude: 0 },
                });
            })
            .catch(error => {
                console.error('Error creating tour:', error);
            });
    }

    render() {
        const { name, description, type, tags, price, newKeyPoint, keyPoints } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={name} onChange={this.handleChange} />
                <label>Description:</label>
                <input type="text" name="description" value={description} onChange={this.handleChange} />
                <label>Type:</label>
                <select name="type" value={type} onChange={this.handleTypeChange}>
                    <option value={1}>Easy</option>
                    <option value={2}>Moderate</option>
                    <option value={3}>Hard</option>
                </select>
                <label>Tags:</label>
                <input type="text" name="tags" value={tags} onChange={this.handleChange} />
                <label>Price:</label>
                <input type="number" name="price" value={price} onChange={this.handleChange} />
                <KeyPointInput 
                    keyPoint={newKeyPoint}
                    onChange={this.handleKeyPointChange}
                    onAdd={this.handleAddKeyPoint}
                    onRemove={this.handleRemoveKeyPoint}
                />
                <button type="submit">Create Tour</button>
            </form>
        );
    }
}

export default TourForm;
