import axios from "axios";


const API_URL = 'http://localhost:3003/';

class TourService{

    getToursByUser(id){
        return axios.get(API_URL + "guide/" + id + "/tours")
    }
}

export default new TourService();

