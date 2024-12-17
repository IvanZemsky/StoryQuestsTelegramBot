import { BOT } from "@/bot"
import { Message } from "node-telegram-bot-api"

export async function start(ctx: Message) {
   const chatId = ctx.chat.id

   await BOT.sendMessage(
      chatId,
      "Welcome to the official StoryQuests Telegram bot.\nTo start a story, find it with the /search command",
   )
}
