import React, { Component } from 'react';
import blogService from '../services/blogService';
import UserService from "../services/user.service";



class userFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs : [],
            users: [],
            blogsWithUsers : [],
        }

    }

    componentDidMount() {
        this.fetchBlogs();
        

    }

    fetchBlogs = () => {
        blogService.getAllBlogs().then((res) => {
            this.setState({ blogs: res.data }, () => {
                // After fetching blogs, fetch user data for each blog
                this.fetchUsersForBlogs();
            });
        });
    };

    fetchUsersForBlogs = () => {
        const { blogs } = this.state;
        const promises = [];

        // Fetch user data for each blog
        blogs.forEach((blog) => {
            const promise = UserService.getUserBy(blog['user id']);
            promises.push(promise);
        });

        // Resolve all promises asynchronously
        Promise.all(promises).then((userResponses) => {
            const blogsWithUsers = [];

            // Iterate over user responses and create instances of BlogWithUser
            userResponses.forEach((userResponse, index) => {
                const blog = blogs[index];
                const user = userResponse.data;
                const blogWithUser = { blog, user };
                blogsWithUsers.push(blogWithUser);
            });

            // Update the state with blogsWithUsers
            this.setState({ blogsWithUsers });
        });
    };
    
    render() {
        const { blogsWithUsers } = this.state;

        return (
            <div>
                {/* Map through blogsWithUsers array and create a div for each blog */}
                {blogsWithUsers.map((blogWithUser) => (
                    <div key={blogWithUser.blog.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <h2>{blogWithUser.blog.title}</h2>
                        <p><strong>Description:</strong> {blogWithUser.blog.description}</p>
                        <p><strong>Posted by:</strong> {blogWithUser.user.username}</p>
                    </div>
                ))}
            </div>
        );
    }
}
export default userFeed;