import { BOT } from "@/bot"
import { Commands } from "@/bot/constants/commands"
import { waitForMessage } from "@/bot/listeners/waitForMessage"
import { SelectedPageData } from "../types/pagination"
import { isValueMatches } from "../utils/isValueMatches"

export function calculatePages(totalCount: number, limit: number) {
   return Math.ceil(totalCount / limit)
}

export async function displayPagination(
   chatId: number,
   totalCount: number,
   limit: number,
): Promise<void> {
   const pages = calculatePages(totalCount, limit)
   if (totalCount === 0) {
      await BOT.sendMessage(chatId, "0️⃣ Nothing found")
      return
   } else {
      await BOT.sendMessage(
         chatId,
         `✅ Found ${totalCount} stories across ${pages} pages. Select a page (1-${pages}) or type "cancel" to stop search:`,
      )
   }
}

export async function getSelectedPage(
   chatId: number,
   pages: number,
): Promise<SelectedPageData> {
   const pageMessage = await waitForMessage(chatId)
   const pageInput = pageMessage.text.trim().toLowerCase()

   if (pageInput === "cancel") {
      return { page: null, data: "cancelled" }
   }

   if (isValueMatches(Commands, pageInput)) {
      return { page: null, data: "stopped" }
   }

   const pageNumber = parseInt(pageInput, 10)
   const isValid = !isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pages

   if (isValid) {
      return { page: pageNumber, data: "validPage" }
   } else {
      return { page: null, data: "invalidPage" }
   }
}
