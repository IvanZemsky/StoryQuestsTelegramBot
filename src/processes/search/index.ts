import { BOT } from "@/bot"
import { waitForMessage } from "@/bot/listeners/waitForMessage"
import { pageLimit } from "@/shared/api/constants"
import { displayPagination, getSelectedPage } from "@/shared/helpers/pagination"
import { SearchProcess } from "./steps"
import { isValueMatches } from "@/shared/utils/isValueMatches"
import { Commands } from "@/bot/constants/commands"

export async function searchProcess(
   chatId: number,
   search: "all" | "userInput" = "userInput",
) {
   try {
      let searchQuery: string | null = null

      if (search === "userInput") {
         BOT.sendMessage(chatId, "🔍 Enter your search query:")
         const { text } = await waitForMessage(chatId)

         if (isValueMatches(Commands, text)) return

         searchQuery = text
      }

      const { totalCount, pageCount } = await SearchProcess.getPreliminaryStoriesData(
         searchQuery,
      )
      await displayPagination(chatId, totalCount, pageLimit)

      if (totalCount === 0) return

      while (true) {
         const selectedPageData = await getSelectedPage(chatId, pageCount)
         
         if (selectedPageData.data === 'stopped') return

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
