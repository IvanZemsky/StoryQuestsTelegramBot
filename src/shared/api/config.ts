import axios from "axios"
import { API_URL } from "../constants/process"

export const API = axios.create({
   baseURL: API_URL,
})