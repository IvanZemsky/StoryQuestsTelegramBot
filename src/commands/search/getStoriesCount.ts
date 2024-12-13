import { pageLimit } from "@/api/constants"
import { getStories } from "../../api/getStories"

export const getStoriesCount = async (query: string | null) => {
   try {
      const response = await getStories({
         search: query,
         limit: pageLimit,
         page: 0,
         only_count: true,
      })
      
      return response.totalCount

   } catch (error) {
      throw new Error("Failed to get count of stories: " + error)
   }
}
