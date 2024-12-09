import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/paperSetting';

export async function getPaperSetting() {
    return await axios.get(API_URL)
}
export async function updatePaperSetting(id, newProps) {
    return await axios.put(API_URL+`/${id}`, newProps)
}