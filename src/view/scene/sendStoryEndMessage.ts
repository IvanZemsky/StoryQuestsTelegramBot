import { BOT } from "@/bot/bot";

export async function sendStoryEndMessage(chatId: number) {
   await BOT.sendMessage(chatId, "*This is the end of the story*", {
      parse_mode: "MarkdownV2",
   })
}
