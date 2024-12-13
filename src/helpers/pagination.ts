import { pageLimit } from "@/api/constants"
import { getStories } from "@/api/getStories"
import { BOT } from "@/bot/bot"
import { sendStoryCard } from "@/components/story"
import { Story } from "@/types/story"

export const calculatePages = (totalCount: number, limit: number) => {
   return Math.ceil(totalCount / limit)
}

export const displayPagination = async (
   chatId: number,
   totalCount: number,
   limit: number,
) => {
   const pages = calculatePages(totalCount, limit)
   if (totalCount === 0) {
      await BOT.sendMessage(chatId, "Nothing found")
      return
   } else {
      await BOT.sendMessage(
         chatId,
         `Found ${totalCount} stories across ${pages} pages. Select a page (1-${pages}) or enter a search query:`,
      )
   }
}

export const sendPage = async (
   chatId: number,
   query: string | null,
   pageNumber: number,
) => {
   try {
      const storiesResponse = await getStories({
         search: query,
         limit: pageLimit,
         page: pageNumber - 1,
      })
      const stories: Story[] = storiesResponse.data

      if (stories.length > 0) {
         stories.forEach(async (story) => await sendStoryCard(chatId, story))
      } else {
         await BOT.sendMessage(chatId, "No stories found on this page.")
      }
   } catch (error) {
      await BOT.sendMessage(
         chatId,
         "An error occurred while fetching results. Please try again.",
      )
      console.error("Error fetching results:", error)
   }
}
