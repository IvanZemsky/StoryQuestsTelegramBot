import { BOT } from "@/bot"
import { waitForMessage } from "@/bot/listeners/waitForMessage"
import { pageLimit } from "@/shared/api/constants"
import { displayPagination } from "@/shared/helpers/pagination"
import { SearchProcess } from "./steps"

export async function searchProcess(
   chatId: number,
   search: "all" | "userInput" = "userInput",
) {
   try {
      let searchQuery: string | null = null

      if (search === "userInput") {
         BOT.sendMessage(chatId, "🔍 Please enter your search query:")
         const { text } = await waitForMessage(chatId)
         searchQuery = text
      }

      const { totalCount, pageCount } = await SearchProcess.getPreliminaryStoriesData(
         searchQuery,
      )
      await displayPagination(chatId, totalCount, pageLimit)

      if (totalCount === 0) return

      while (true) {
         const selectedPageData = await SearchProcess.getSelectedPage(chatId, pageCount)
         await SearchProcess.sendSearchResult(
            chatId,
            searchQuery,
            pageCount,
            selectedPageData,
         )

         if (selectedPageData.data !== "invalidPage") break
      }
   } catch (error) {
      console.error(error)
      throw new Error(error)
   }
}
