import { BOT } from "@/bot"
import { storyService } from "@/services/story"
import { pageLimit } from "@/shared/api/constants"
import { calculatePages } from "@/shared/helpers/pagination"
import { Story } from "@/shared/types/story"
import { sendStoryCard } from "@/view/story"
import { PaginationData, SelectedPageData } from "@/shared/types/pagination"

export namespace SearchProcess {
   export async function getPreliminaryStoriesData(
      query: string | null,
   ): Promise<PaginationData> {
      try {
         const { totalCount } = await storyService.getStories({
            search: query,
            only_count: true,
            limit: pageLimit,
         })

         const pageCount = calculatePages(totalCount, pageLimit)

         return { totalCount, pageCount }
      } catch (error) {
         throw new Error(error)
      }
   }

   export async function sendPage(chatId: number, query: string | null, pageNumber: number) {
      try {
         const storiesResponse = await storyService.getStories({
            search: query,
            limit: pageLimit,
            page: pageNumber - 1,
         })
         const stories: Story[] = storiesResponse.data

         if (stories.length > 0) {
            stories.forEach(async (story) => await sendStoryCard(chatId, story))
         } else {
            await BOT.sendMessage(chatId, "0️⃣ No stories found on this page.")
         }
      } catch (error) {
         await BOT.sendMessage(
            chatId,
            "❌ An error occurred while fetching results. Please try again.",
         )
         console.error("Error fetching results:", error)
      }
   }

   export async function sendSearchResult(
      chatId: number,
      query: string | null,
      pageCount: number,
      selectedPageData: SelectedPageData,
   ) {
      switch (selectedPageData.data) {
         case "validPage":
            await sendPage(chatId, query, selectedPageData.page)
            break
         case "invalidPage":
            await BOT.sendMessage(
               chatId,
               `⚠️ Invalid page number. Please enter a number between 1 and ${pageCount}.`,
            )
            break
         case "cancelled":
            await BOT.sendMessage(chatId, "⏹️ Search cancelled.")
            break
      }
   }
}
