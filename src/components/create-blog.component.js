import React, { Component, useState } from 'react';

import BlogService from '../services/blogService';


class CreateCompanyComponent extends Component {
    

    constructor(props){
        super(props)

        this.state = {
            title: '',
            description: '',
            country: '',
            city: '',
            streetName: '',
            streetNumber: '',
            openingTime: null,
            closingTime: null,
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);
        this.changeCitynHandler = this.changeCitynHandler.bind(this);
        this.changeStreetNameHandler = this.changeStreetNameHandler.bind(this);
        this.changeStreetNumberHandler = this.changeStreetNumberHandler.bind(this);
        this.changeOpeningTimeHanler = this.changeOpeningTimeHanler.bind(this);
        this.changeClosingTimeHandler = this.changeClosingTimeHandler.bind(this);

        this.saveBlog = this.saveBlog.bind(this);
    }

    changeTitleHandler=(event) =>{
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler=(event) =>{
        this.setState({description: event.target.value});
    }

    changeCountryHandler=(event) =>{
        this.setState({country: event.target.value});
    }

    changeCitynHandler=(event) =>{
        this.setState({city: event.target.value});
    }

    changeStreetNameHandler=(event) =>{
        this.setState({streetName: event.target.value});
    }

    changeStreetNumberHandler=(event) =>{
        this.setState({streetNumber: event.target.value});
    }

    changeOpeningTimeHanler=(value) =>{
        this.setState({openingTime: value});
        console.log("vreme: " + JSON.stringify(this.state.openingTime));
    }

    changeClosingTimeHandler=(value) =>{
        this.setState({closingTime: value});
    }

    saveBlog= async(e) =>{
        e.preventDefault();

        if(this.state.openingTime === null){
            console.log('Warning: Opening time is empty.');
            return; 
        }

        if(this.state.closingTime === null){
            console.log('Warning: Closing time is empty.');
            return; 
        }

        if(this.state.openingTime.isAfter(this.state.closingTime)){
            console.log('Error: Opening time cannot be after closing time.');
            return;
        }
        
        let company = {name: this.state.title, description: this.state.description, country: this.state.country, 
                       city: this.state.city, streetName: this.state.streetName, streetNumber: this.state.streetNumber,
                       openingTime: this.state.openingTime, closingTime: this.state.closingTime};
        console.log('company =>' + JSON.stringify(company));

        try{
            await CompanyService.createCompany(company);

            this.props.history.push('/api/companies');
        }catch(error){
            console.error('Error creating company:', error);
        }
        
        
        //window.location.reload(); // jer nece da mi ucita komponent koji je na /api/companies putanji
    }

    render() {
        const buttonStyle = {
            margin: '10px 0 0 0', // top right bottom left
          };

        return (
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Register Company</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Blog title: </label>
                                        <input placeholder='Title' name='title' className='form-control'
                                                value={this.state.title} onChange={this.changeTitleHandler}/>                                      
                                    </div>

                                    <div>
                                        <label>Company description: </label>
                                        <input placeholder='Description' name='description' className='form-control'
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>

                                    <div>
                                        <label>Country the company is in: </label>
                                        <input placeholder='Country' name='country' className='form-control'
                                                value={this.state.country} onChange={this.changeCountryHandler}/>
                                    </div>

                                    <div>
                                        <label>City the company is in: </label>
                                        <input placeholder='City' name='city' className='form-control'
                                                value={this.state.city} onChange={this.changeCitynHandler}/>
                                    </div>

                                    <div>
                                        <label>Name of the street the company located on: </label>
                                        <input placeholder='Name' name='description' className='form-control'
                                                value={this.state.streetName} onChange={this.changeStreetNameHandler}/>
                                    </div>

                                    <div>
                                        <label>Street number : </label>
                                        <input placeholder='Number' name='description' className='form-control'
                                                value={this.state.streetNumber} onChange={this.changeStreetNumberHandler}/>
                                    </div>
                                        
                                    <button className='btn btn-success' onClick={this.saveBlog} style={buttonStyle}>Save</button>
                                    {/*<button className='btn btn-success' onClick={this.changeCitynHandler.bind(this)} style={{marginLeft: "10px"}}>
                                        Cancel
                                    </button>*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CreateCompanyComponent;