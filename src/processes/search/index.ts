import { BOT } from "@/bot/bot"
import { waitForMessage } from "@/bot/listeners/waitForMessage"
import { storyService } from "@/services/story"
import { pageLimit } from "@/shared/api/constants"
import { calculatePages, displayPagination } from "@/shared/helpers/pagination"
import { PaginationData } from "./types"
import { sendStoryCard } from "@/view/story"
import { Story } from "@/shared/types/story"

type SelectedPageData = {
   page: number | null
   data: "cancelled" | "validPage" | "invalidPage"
}

async function getPreliminaryStoriesData(query: string | null): Promise<PaginationData> {
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

async function sendPage(chatId: number, query: string | null, pageNumber: number) {
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

async function getSelectedPage(chatId: number, pages: number): Promise<SelectedPageData> {
   const pageMessage = await waitForMessage(chatId)
   const pageInput = pageMessage.text.trim().toLowerCase()

   if (pageInput === "cancel") {
      return { page: null, data: "cancelled" }
   }

   const pageNumber = parseInt(pageInput, 10)
   const isValid = !isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pages

   if (isValid) {
      return { page: pageNumber, data: "validPage" }
   } else {
      return { page: null, data: "invalidPage" }
   }
}

async function sendSearchResult(
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
            `Invalid page number. Please enter a number between 1 and ${pageCount}.`,
         )
         break
      case "cancelled":
         await BOT.sendMessage(chatId, "Search cancelled.")
         break
   }
}

export async function searchProcess(chatId: number) {
   try {
      BOT.sendMessage(chatId, "🔍 Please enter your search query:")

      const { text: searchQuery } = await waitForMessage(chatId)

      const { totalCount, pageCount } = await getPreliminaryStoriesData(searchQuery)
      await displayPagination(chatId, totalCount, pageLimit)

      if (totalCount === 0) return

      while (true) {
         const selectedPageData = await getSelectedPage(chatId, pageCount)
         await sendSearchResult(chatId, searchQuery, pageCount, selectedPageData)
         if (selectedPageData.data !== "invalidPage") break
      }
   } catch (error) {
      console.error(error)
      throw new Error(error)
   }
}
