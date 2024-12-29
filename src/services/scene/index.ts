import { API } from "@/shared/api/config"
import { APIEndpoints } from "@/shared/api/constants"
import { logApiError } from "@/shared/helpers/logApiError"
import { Scene } from "@/shared/types/scene"
import { setPath } from "@/shared/utils/setPath"

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
         logApiError(error)
         throw error
      }
   }
}

export const sceneService = new SceneService()
