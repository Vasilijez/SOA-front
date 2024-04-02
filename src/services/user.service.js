import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class UserService {
  getPublicContent() {
    // return axios.get(API_URL + 'all');
    return axios.get(API_URL + 'validate', { headers: authHeader() });
  }

  getAdministratorBoard() {
    // return axios.get(API_URL + 'user', { headers: authHeader() });
    return axios.get(API_URL + 'validate', { headers: authHeader() });
  }

  getGuideBoard() {
    // return axios.get(API_URL + 'company-admin', { headers: authHeader() });
    return axios.get(API_URL + 'validate', { headers: authHeader() });
  }

  getTouristBoard() {
    // return axios.get(API_URL + 'system-admin', { headers: authHeader() });
    return axios.get(API_URL + 'validate', { headers: authHeader() });
  }
  getUserBy(id){
    return axios.get(API_URL + id, { headers: authHeader() })
  }
  follow(username){
    return axios.post(API_URL + "follow/" + username,{}, { headers: authHeader() })
  }
  checkIfFollows(loggedInUserId, userToFollowId){
    return axios.get(API_URL +"does-follow/" + loggedInUserId + "/" +userToFollowId, { headers: authHeader() })
  }
}

export default new UserService();
