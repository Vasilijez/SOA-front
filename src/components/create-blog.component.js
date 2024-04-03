import React, { Component, useState } from 'react';

import BlogService from '../services/blogService';


class CreateBlogComponent extends Component {
    

    constructor(props){
        super(props)

        this.state = {
            title: '',
            description: '',
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        this.saveBlog = this.saveBlog.bind(this);
    }

    changeTitleHandler=(event) =>{
        this.setState({title: event.target.value});
    }

    changeDescriptionHandler=(event) =>{
        this.setState({description: event.target.value});
    }

    saveBlog = async (e) => {
        e.preventDefault();
    
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            console.error('User data not found in localStorage or missing user ID');
            return;
        }
    
        const blog = { userID: user.id, title: this.state.title, description: this.state.description };
        console.log('blog =>', blog);
    
        try {
            await BlogService.createBlog(blog);
            this.props.history.push('/feed');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    }

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

                                    <button className='btn btn-success' onClick={this.saveBlog} style={buttonStyle}>Publish</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CreateBlogComponent;