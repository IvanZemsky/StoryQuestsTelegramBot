import { BOT } from "@/bot/bot"
import { waitForMessage } from "@/bot/listeners/waitForMessage"
import { getStoriesCount } from "./getStoriesCount"
import { pageLimit } from "@/api/constants"
import { calculatePages, displayPagination, sendPage } from "@/helpers/pagination"

export const handleStorySearchQuery = async (chatId: number, query: string | null) => {
   try {
      const totalCount = await getStoriesCount(query)
      const pages = calculatePages(totalCount, pageLimit)

      displayPagination(chatId, totalCount, pageLimit)

      if (totalCount === 0) return

      while (true) {
         const pageMessage = await waitForMessage(chatId)
         const pageInput = pageMessage.text.trim().toLowerCase()

         if (pageInput === "cancel") {
            await BOT.sendMessage(chatId, "Search cancelled.")
            return
         }

         const pageNumber = parseInt(pageInput, 10)
         if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pages) {
            await sendPage(chatId, query, pageNumber)
            break
         } else {
            await BOT.sendMessage(
               chatId,
               `Invalid page number. Please enter a number between 1 and ${pages}.`,
            )
         }
      }
   } catch (error) {
      BOT.sendMessage(
         chatId,
         "An error occurred during the search. Please try again later.",
      )
      console.error("Search error:", error)
   }
}

export const search = async (chatId: number) => {
   BOT.sendMessage(chatId, "🔍 Please enter your search query:")

   const queryMessage = await waitForMessage(chatId)
   const searchQuery = queryMessage.text

   await handleStorySearchQuery(chatId, searchQuery)
}
