import axios from "axios"
import { Story } from "@/types/story"

type Args = {
   limit: number
   page: number
}

export const getStories = async ({
   limit,
   page,
}: Args): Promise<{ data: Story[]; totalCount: number }> => {
   try {
      const response = await axios.get(
         `https://story-quests-backend.onrender.com/stories`,
         {
            params: {
               limit,
               page,
            },
         },
      )

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
