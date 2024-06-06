import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:3003/';

class TourService{

    getToursByUser(id){
        return axios.get(API_URL + "guide/" + id + "/tours", { headers: authHeader() })
    }
    createTour(blog){
        return axios.post(API_URL + "create-tour", blog, { headers: authHeader() })
    }
    postReview(reviewData) {
        console.log(reviewData)
        return axios.post(API_URL + "postReview", reviewData, {
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            }
        });
    }
    
}

export default new TourService();

