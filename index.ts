import dotenv from "dotenv"
import { BOT } from "./src/bot/bot"
import { Commands } from "@/shared/constants/commands"
import { Actions } from "@/shared/constants/actions"
import { setNextScene } from "@/actions/setNextScene"
import { start } from "@/commands/start"
import { search } from "@/commands/search"
import "./server"

dotenv.config()

BOT.on("message", async (ctx) => {
   const chatId = ctx.chat.id

   switch (ctx.text) {
      case Commands.Start:
         await start(chatId)
         break
      case Commands.Search:
         await search(chatId)
         break
   }
})

BOT.on("callback_query", async (ctx) => {
   const chatId = ctx.message.chat.id
   const queryId = ctx.id
   const data = ctx.data.split(":")
   const messageId = ctx.message.message_id

   switch (data[0]) {
      case Actions.SetNextScene:
         await setNextScene(chatId, messageId, queryId, data)
         break
      default:
         BOT.sendMessage(chatId, "Command not found")
         break
   }
})
