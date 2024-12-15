import { Story } from "@/shared/types/story"
import axios from "axios"
import { SearchStoryArgs } from "./types"
import { API } from "@/shared/api/config"
import { APIEndpoints } from "@/shared/api/constants"
import { setPath } from "@/shared/utils/setPath"

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
         if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message)
         } else {
            console.error("Unexpected error:", error)
         }
         throw error
      }
   }

   async getStoryById(id: string): Promise<Story> {
      try {
         const response = await API.get(setPath(APIEndpoints.Stories, id))
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

export const storyService = new StoryService()
