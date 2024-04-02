import React, { Component } from 'react';
import blogService from '../services/blogService';
import UserService from "../services/user.service";
import userService from '../services/user.service';



class userFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs : [],
            users: [],
            blogsWithUsers : [],
            followedUsersIds: [], // Initialize as an empty array        }

        }

    }

    componentDidMount() {
        this.fetchFollowedUsers();
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

    Follow(username){
        userService.follow(username)
    }

    fetchFollowedUsers() {
        UserService.getFollowedUsers().then(
            response => {
                console.log("Response for followed users:", response.data);
                // Check if the response data contains the expected followed_user_ids field
                if (response.data && Array.isArray(response.data.followed_user_ids)) {
                    this.setState({
                        followedUsersIds: response.data.followed_user_ids
                    });
                } else {
                    // Handle the case when the response data is not as expected
                    console.error('Invalid response format for followed users');
                }
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }
    
    
    render() {
        const { blogsWithUsers, followedUsersIds } = this.state;
        const loggedInUserId = JSON.parse(localStorage.getItem('user')).id;
    
        return (
            <div>
                {/* Map through blogsWithUsers array and create a div for each blog */}
                {blogsWithUsers.map((blogWithUser) => (
                    <div key={blogWithUser.blog.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <h2>{blogWithUser.blog.title}</h2>
                        <p>{blogWithUser.blog.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '10px' }}><strong>Posted by:</strong> {blogWithUser.user.username}</p>
                            {/* Conditionally render the Follow button as disabled if the logged-in user posted the blog */}
                            {blogWithUser.blog['user id'] !== loggedInUserId && (
                                <button
                                    style={{ marginBottom: '20px' }}
                                    onClick={() => this.Follow(blogWithUser.user.username)}
                                    className='btn-btn-info'
                                    disabled={followedUsersIds.includes(blogWithUser.blog['user id'])}
                                >
                                    {followedUsersIds.includes(blogWithUser.blog['user id']) ? 'Following' : 'Follow'}
                                </button>
                            )}
                            {blogWithUser.blog['user id'] === loggedInUserId && (
                                <button style={{ marginBottom: '20px' }} disabled className='btn-btn-info'>You</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    
}    
export default userFeed;