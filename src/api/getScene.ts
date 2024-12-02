import axios from "axios";
import { Scene } from "../types/scene";

export const getScene = async (storyId: string, nextSceneId: string): Promise<Scene>  => {
   try {
     const response = await axios.get(
       `https://story-quests-backend.onrender.com/scenes/one`,
       {
         params: {
            storyId, nextSceneId
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