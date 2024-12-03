import TGApi from "node-telegram-bot-api"
import { TOKEN } from "@/constants/process"
import { Commands } from "@/constants/commands"

export const BOT = new TGApi(TOKEN, { polling: true })

BOT.setMyCommands([
   {command: Commands.Start, description: 'Start using the bot'}
])