import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/document';

export async function getAllDocuments() {
    return await axios.get(API_URL+"s")
}