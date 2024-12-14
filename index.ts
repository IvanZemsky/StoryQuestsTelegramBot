import dotenv from "dotenv"
import { BOT } from "./src/bot/bot"
import "./server"
import { Commands } from "@/constants/commands"
import { Actions } from "@/constants/actions"
import { startQuest } from "@/actions/startQuest"
import { setNextScene } from "@/actions/setNextScene"
import { start } from "@/commands/start"
import { search } from "@/commands/search"

dotenv.config()

BOT.on("message", async (msg) => {
   const chatId = msg.chat.id

   switch (msg.text) {
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

   switch (data[0]) {
      case Actions.StartQuest:
         await startQuest(chatId, queryId)
         break
      case Actions.SetNextScene:
         await setNextScene(chatId, queryId, data)
         break
      default:
         BOT.sendMessage(chatId, "Command not found")
         break
   }
})
