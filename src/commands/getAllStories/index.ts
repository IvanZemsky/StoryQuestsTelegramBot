import { searchProcess } from "@/processes/search";
import { Message } from "node-telegram-bot-api";

export async function getAllStories(ctx: Message) {
   const chatId = ctx.chat.id
   await searchProcess(chatId, "all")
}