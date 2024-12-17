import { BotCommand, CallbackQuery, Message } from "node-telegram-bot-api"
import { BotActionInfo, BotCommandInfo } from "./types"

export function mapCommands(commands: BotCommandInfo[]): BotCommand[] {
   return commands.map((command) => ({
      command: command.text,
      description: command.description,
   }))
}

export function setCommandHandlers(commands: BotCommandInfo[], ctx: Message): void {
   commands.forEach(async (command) => {
      if (ctx.text === command.text) {
         await command.handler(ctx)
      }
   })
}

export function setActionHandlers(actions: BotActionInfo[], ctx: CallbackQuery): void {
   const data = ctx.data.split(":")

   actions.forEach(async (action) => {
      if (data[0] === action.type) {
         await action.handler(ctx)
      }
   })
}
