import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/printModification';

export async function getAllPrintModifications() {
    return await axios.get(API_URL+"s")
}
export async function createPrintModification(newPrintModification) {
    return await axios.post(API_URL, newPrintModification)
}