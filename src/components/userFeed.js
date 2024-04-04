import React, { Component } from 'react';
import blogService from '../services/blogService';
import UserService from '../services/user.service';
import userService from '../services/user.service';

class userFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      users: [],
      blogsWithUsers: [],
      followedUsersIds: [],
      comments: {}, // State to store comments for each blog
      newCommentText: '', // State to store the text of the new comment
    };
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
        // After fetching blogs, fetch comments for each blog
        this.fetchCommentsForBlogs();
      });
    });
  };

  fetchUsersForBlogs = () => {
    const { blogs } = this.state;
    const promises = [];

    // Fetch user data for each blog
    blogs.forEach((blog) => {
      const promise = UserService.getUserBy(blog.userId);
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

  fetchCommentsForBlogs = () => {
    const { blogs } = this.state;
    const promises = [];

    // Fetch comments for each blog
    blogs.forEach((blog) => {
      const promise = blogService.getCommentsByBlog(blog.id);
      promises.push(promise);
    });

    // Resolve all promises asynchronously
    Promise.all(promises).then((commentResponses) => {
      const comments = {};

      // Iterate over comment responses and create a map of comments for each blog
      commentResponses.forEach((commentResponse, index) => {
        const blogId = blogs[index].id;
        comments[blogId] = commentResponse.data;
      });

      // Update the state with comments
      this.setState({ comments });
    });
  };

  Follow(username) {
    userService.follow(username)
      .then(() => {
        // Reload the page after successfully following the user
        window.location.reload();
      })
      .catch(error => {
        // Handle any errors
        console.error('Error following user:', error);
      });
  }

  fetchFollowedUsers() {
    UserService.getFollowedUsers().then(
      (response) => {
        console.log('Response for followed users:', response.data);
        // Check if the response data contains the expected followed_user_ids field
        if (response.data && Array.isArray(response.data.followed_user_ids)) {
          this.setState({
            followedUsersIds: response.data.followed_user_ids,
          });
        } else {
          // Handle the case when the response data is not as expected
          console.error('Invalid response format for followed users');
        }
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString(),
        });
      }
    );
  }

  handleCommentChange = (event) => {
    this.setState({ newCommentText: event.target.value });
  };



  handleSubmitComment = (event, blogId) => {
    event.preventDefault();

    const { newCommentText } = this.state;
    const commentData = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      blogId : blogId,
      text: newCommentText
    };
    console.log('comment =>', commentData);

    blogService.addCommentToBlog(commentData).then((res) => {
      this.fetchCommentsForBlogs();

      this.setState({ newCommentText: '' });
    });
  };

  render() {
    const { blogsWithUsers, followedUsersIds, comments, newCommentText } = this.state;
    const loggedInUserId = JSON.parse(localStorage.getItem('user')).id;

    return (
      <div>
        {/* Map through blogsWithUsers array and create a div for each blog */}
        {blogsWithUsers.map((blogWithUser) => (
          <div key={blogWithUser.blog.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{blogWithUser.blog.title}</h2>
            <p>{blogWithUser.blog.description}</p>
            <p>Comments:</p>
            {/* Map through comments for the current blog and display each comment */}
            {comments[blogWithUser.blog.id] &&
              comments[blogWithUser.blog.id].map((comment) => (
                <div key={comment.id} style={{ marginLeft: '20px' }}>
                  <p>{comment.text}</p>
                </div>
              ))}
            {/* Form to add a new comment */}
            {blogWithUser.blog.userId !== loggedInUserId && ( // Check if the logged-in user did not post the blog
            <form onSubmit={(event) => this.handleSubmitComment(event, blogWithUser.blog.id)}>
              <input
                type="text"
                value={newCommentText}
                onChange={this.handleCommentChange}
                placeholder="Add a comment..."
              />
              <button 
                type="submit" 
                disabled={!followedUsersIds.includes(blogWithUser.blog.userId) && loggedInUserId !== blogWithUser.blog.userId} // Disable button if the user hasn't followed the author and it's not their own post
              >
                Add Comment
              </button>
            </form>
            )}
          {blogWithUser.blog.userId === loggedInUserId && ( // Allow the logged-in user to comment on their own posts
            <form onSubmit={(event) => this.handleSubmitComment(event, blogWithUser.blog.id)}>
              <input
                type="text"
                value={newCommentText}
                onChange={this.handleCommentChange}
                placeholder="Add a comment..."
              />
              <button 
                type="submit"
              >
                Add Comment
              </button>
            </form>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ marginRight: '10px' }}>
                <strong>Posted by:</strong> {blogWithUser.user.username}
              </p>
              {/* Conditionally render the Follow button as disabled if the logged-in user posted the blog */}
              {blogWithUser.blog.userId !== loggedInUserId && (
                <button
                  style={{ marginBottom: '20px' }}
                  onClick={() => this.Follow(blogWithUser.user.username)}
                  className='btn-btn-info'
                  disabled={followedUsersIds.includes(blogWithUser.blog.userId)}
                >
                  {followedUsersIds.includes(blogWithUser.blog.userId) ? 'Following' : 'Follow'}
                </button>
              )}
              {blogWithUser.blog.userId === loggedInUserId && (
                <button style={{ marginBottom: '20px' }} disabled className='btn-btn-info'>
                  You
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default userFeed;
