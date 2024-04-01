import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/';

class blogService {

  getAllBlogs() {
    // return axios.get(API_URL + 'all');
    return axios.get(API_URL + 'feed', { headers: authHeader() });
  }

  getUserBy(id){
    return axios.get(API_URL + id, { headers: authHeader() })
  }
}

export default new blogService();
