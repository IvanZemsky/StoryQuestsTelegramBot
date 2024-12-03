import dotenv from "dotenv"
import { BOT } from "./src/bot/bot"
import "./server"
import { Commands } from "@/constants/commands"
import { Actions } from "@/constants/actions"
import { startQuest } from "@/actions/startQuest"
import { setNextScene } from "@/actions/setNextScene"

dotenv.config()

BOT.on("message", async (msg) => {
   const chatId = msg.chat.id

   switch (msg.text) {
      case Commands.Start:
         await startQuest(chatId)
         break
      default:
         BOT.sendMessage(chatId, "Command not found")
         break
   }
})

BOT.on("callback_query", async (msg) => {
   const chatId = msg.message.chat.id;
   const data = msg.data.split(':');

   switch (data[0]) {
      case Actions.StartQuest:
         await startQuest(chatId);
         break
      case Actions.SetNextScene:
         await setNextScene(chatId, data);
         break
      default:
         BOT.sendMessage(chatId, "Command not found");
         break;
   }
});
