import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/printLog';

export async function getAllPrintLogs() {
    return await axios.get(API_URL+"s")
}
export async function createPrintLog() {
    return await axios.post(API_URL, )
}