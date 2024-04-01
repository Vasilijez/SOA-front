import React, { Component } from 'react';
import blogService from '../services/blogService';


class userFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs : [],
            users: [],
            userIds :{}
        }

    }

    componentDidMount() {
        this.fetchBlogs();
        

    }

    fetchBlogs = () => {
        blogService.getAllBlogs().then((res) => {
            this.setState({blogs:res.data})
        })
    }

    render() {
        const { blogs } = this.state;

        return (
            <div>
                {/* Map through blogs array and create a div for each blog */}
                {blogs.map(blog => (
                    <div key={blog.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <h2>{blog.title}</h2>
                        <p><strong>Description:</strong> {blog.description}</p>
                        <p><strong>Publish Date:</strong> {new Date(blog['publish date']).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}</p>
                        {/* You can render other properties here */}
                    </div>
                ))}
            </div>
        );
    }
}

export default userFeed;