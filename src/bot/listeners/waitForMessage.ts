import { Message } from "node-telegram-bot-api"
import { BOT } from "../bot"

export const waitForMessage = async (chatId: number): Promise<Message> => {
   return new Promise((resolve, reject) => {
      const listener = (msg: Message) => {
         if (msg.chat.id === chatId) {
            BOT.removeListener("message", listener)
            resolve(msg)
         }
      }
      BOT.on("message", listener)
   })
}
