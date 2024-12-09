import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/report';

export async function getAllReports() {
    return await axios.get(API_URL+"s")
}