import TGApi from "node-telegram-bot-api"
import { TOKEN } from "@/shared/constants/process"
import { Commands } from "@/shared/constants/commands"

export const BOT = new TGApi(TOKEN, { polling: true })

BOT.setMyCommands([
   { command: Commands.Start, description: "Start using the bot" },
   { command: Commands.Search, description: "Search for the stories" },
])
