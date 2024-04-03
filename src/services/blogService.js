import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/';

class blogService {

  getAllBlogs() {
    // return axios.get(API_URL + 'all');
    return axios.get(API_URL + 'feed');
  }
  getCommentsByBlog(id){
    return axios.get(API_URL + "blogs/" + id + "/comments")
  }
  createBlog(blog){
    return axios.post(API_URL + "blogs/create", blog, { headers: authHeader() });
  }
  addCommentToBlog(comment){
    return axios.post(API_URL + "comments/create", comment, { headers: authHeader() });
  }
}

export default new blogService();
