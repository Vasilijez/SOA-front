import React, { Component, useState } from 'react';

import BlogService from '../services/blogService';


class CreateCompanyComponent extends Component {
    

    constructor(props){
        super(props)

        this.state = {
            title: '',
            description: '',
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        // this.saveBlog = this.saveBlog.bind(this);
    }

    changeTitleHandler=(event) =>{
        this.setState({title: event.target.value});
    }

    changeDescriptionHandler=(event) =>{
        this.setState({description: event.target.value});
    }

    // saveBlog= async(e) =>{
    //     e.preventDefault();

    //     if(this.state.openingTime === null){
    //         console.log('Warning: Opening time is empty.');
    //         return; 
    //     }

    //     if(this.state.closingTime === null){
    //         console.log('Warning: Closing time is empty.');
    //         return; 
    //     }

    //     if(this.state.openingTime.isAfter(this.state.closingTime)){
    //         console.log('Error: Opening time cannot be after closing time.');
    //         return;
    //     }
        
    //     let company = {name: this.state.title, description: this.state.description, country: this.state.country, 
    //                    city: this.state.city, streetName: this.state.streetName, streetNumber: this.state.streetNumber,
    //                    openingTime: this.state.openingTime, closingTime: this.state.closingTime};
    //     console.log('company =>' + JSON.stringify(company));

    //     try{
    //         await CompanyService.createCompany(company);

    //         this.props.history.push('/api/companies');
    //     }catch(error){
    //         console.error('Error creating company:', error);
    //     }
        
        
    //     //window.location.reload(); // jer nece da mi ucita komponent koji je na /api/companies putanji
    // }

    render() {
        const buttonStyle = {
            margin: '10px 0 0 0', // top right bottom left
          };

        return (
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Create your new blog</h3>
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

                                    
                                        
                                    {/* <button className='btn btn-success' onClick={this.saveBlog} style={buttonStyle}>Publish</button>
                                    <button className='btn btn-success' onClick={this.changeCitynHandler.bind(this)} style={{marginLeft: "10px"}}>
                                        Cancel
                                    </button> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CreateCompanyComponent;