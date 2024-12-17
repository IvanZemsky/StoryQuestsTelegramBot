import TGApi from "node-telegram-bot-api"
import { TOKEN } from "@/shared/constants/process"
import { mapCommands, setActionHandlers, setCommandHandlers } from "./helpers"
import { BOT_COMMANDS } from "./constants/commands"
import { BOT_ACTIONS } from "./constants/actions"

export const BOT = new TGApi(TOKEN, { polling: true })

export function startBot() {
   BOT.setMyCommands(mapCommands(BOT_COMMANDS))

   BOT.on("message", (ctx) => {
      setCommandHandlers(BOT_COMMANDS, ctx)
   })

   BOT.on("callback_query", (ctx) => {
      setActionHandlers(BOT_ACTIONS, ctx)
   })
}
