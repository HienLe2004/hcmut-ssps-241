import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/students';

export async function getAllStudents() {
    return await axios.get(API_URL)
}