import axios from "axios";
import { Story } from "../types/story";

export const getStoryById = async (id: string): Promise<Story>  => {
   try {
     const response = await axios.get(
       `https://story-quests-backend.onrender.com/stories/${id}`
     );
     return response.data;
   } catch (error) {
     if (axios.isAxiosError(error)) {
       console.error("Axios error:", error.response?.data || error.message);
     } else {
       console.error("Unexpected error:", error);
     }
     throw error;
   }
 };