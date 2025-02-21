import { API } from "@/shared/api/config"
import { APIEndpoints } from "@/shared/api/constants"
import { logApiError } from "@/shared/helpers/logApiError"
import { Scene } from "@/shared/types/scene"
import { setPath } from "@/shared/utils/setPath"

const { Stories, Scenes } = APIEndpoints

class SceneService {
   async getScene(storyId: string, nextSceneId: string): Promise<Scene> {
      try {
         const response = await API.get(setPath(Stories, storyId, Scenes, nextSceneId), {
            params: {
               storyId,
               nextSceneId,
            },
         })
         console.log(response.data)
         return response.data
      } catch (error) {
         logApiError(error)
         throw error
      }
   }
}

export const sceneService = new SceneService()
