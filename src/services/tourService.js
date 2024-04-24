import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:3003/';

class TourService{

    getToursByUser(id){
        return axios.get(API_URL + "guide/" + id + "/tours")
    }
    createTour(blog){
        return axios.post(API_URL + "create-tour", blog, { headers: authHeader() })
    }
}

export default new TourService();

