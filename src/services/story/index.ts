import { Story } from "@/shared/types/story"
import { SearchStoryArgs } from "./types"
import { API } from "@/shared/api/config"
import { APIEndpoints } from "@/shared/api/constants"
import { setPath } from "@/shared/utils/setPath"
import { logApiError } from "@/shared/helpers/logApiError"

class StoryService {
   async getStories(
      params: SearchStoryArgs,
   ): Promise<{ data: Story[]; totalCount: number }> {
      try {
         const response = await API.get(APIEndpoints.Stories, {
            params: { ...params, page: params.page ?? 0 },
         })

         return {
            data: response.data,
            totalCount: +response.headers["x-total-count"],
         }
      } catch (error) {
         logApiError(error)
         throw error
      }
   }

   async getStoryById(id: string): Promise<Story> {
      try {
         const response = await API.get(setPath(APIEndpoints.Stories, id))
         return response.data
      } catch (error) {
         logApiError(error)
         throw error
      }
   }
}

export const storyService = new StoryService()
