import { BOT } from "@/bot/bot"

export const start = async (chatId: number) => {
   BOT.sendMessage(
      chatId,
      "Welcome to the official StoryQuests Telegram bot.\nTo start a story, find it with the /search command",
   )
}
