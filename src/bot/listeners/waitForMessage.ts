import { Message } from "node-telegram-bot-api"
import { BOT } from "../bot"

export const waitForMessage = async (chatId: number): Promise<Message> => {
   return new Promise((resolve, reject) => {
      const listener = (ctx: Message) => {
         if (ctx.chat.id === chatId) {
            BOT.removeListener("message", listener)
            resolve(ctx)
         }
      }
      BOT.on("message", listener)
   })
}
