import { BOT } from "@/bot/bot"

export const calculatePages = (totalCount: number, limit: number) => {
   return Math.ceil(totalCount / limit)
}

export const displayPagination = async (
   chatId: number,
   totalCount: number,
   limit: number,
): Promise<void> => {
   const pages = calculatePages(totalCount, limit)
   if (totalCount === 0) {
      await BOT.sendMessage(chatId, "0️⃣Nothing found")
      return
   } else {
      await BOT.sendMessage(
         chatId,
         `✅Found ${totalCount} stories across ${pages} pages. Select a page (1-${pages}) or enter a search query:`,
      )
   }
}
