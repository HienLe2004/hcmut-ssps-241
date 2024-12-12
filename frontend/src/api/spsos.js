import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/spsos';

export async function getAllSPSOs() {
    return await axios.get(API_URL)
}