import { API } from "@/shared/api/config"
import { APIEndpoints } from "@/shared/api/constants"
import { Scene } from "@/shared/types/scene"
import { setPath } from "@/shared/utils/setPath"
import axios from "axios"

class SceneService {
   async getScene(storyId: string, nextSceneId: string): Promise<Scene> {
      try {
         const response = await API.get(setPath(APIEndpoints.Scenes, "one"), {
            params: {
               storyId,
               nextSceneId,
            },
         })
         return response.data
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message)
         } else {
            console.error("Unexpected error:", error)
         }
         throw error
      }
   }
}

export const sceneService = new SceneService()
