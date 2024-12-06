import axios from "axios";
import { Story } from "@/types/story";

const limit = 5
const page = 0

export const getStories = async (storyId: string, nextSceneId: string): Promise<Story>  => {
   try {
     const response = await axios.get(
       `https://story-quests-backend.onrender.com/stories`,
       {
         params: {
            limit, page
         }
       }
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