import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/printLog';

export async function getAllPrintLogs() {
    return await axios.get(API_URL+"s")
}
export async function getAllPrintLogsByID(name) {
    return await axios.get(`http://localhost:8080/api/v1/printer/${name}/printLogs`)
}
export async function updatePrintLogByID(id, newProps) {
    return await axios.put(API_URL+`/${id}`, newProps)
}