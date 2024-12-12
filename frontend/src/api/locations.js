import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/location';

export async function getAllLocations() {
    return await axios.get(API_URL+"s")
}