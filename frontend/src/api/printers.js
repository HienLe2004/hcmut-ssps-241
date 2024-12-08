import axios from "axios"; 
const API_URL = 'http://localhost:8080/api/v1/printer';

export async function getAllPrinters() {
    return await axios.get(API_URL+"s")
}
export async function getPrinterByID(id) {
    return await axios.get(API_URL+`/${id}`)
}
export async function updatePrinterByID(id, newProps) {
    return await axios.put(API_URL+`/${id}`, newProps)
}
export async function createPrinter(printer) {
    return await axios.post(API_URL, printer)
}