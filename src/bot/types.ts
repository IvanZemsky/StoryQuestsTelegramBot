import { CallbackQuery, Message } from "node-telegram-bot-api"

export type BotCommandInfo = {
   text: string
   description: string
   handler: (ctx: Message) => Promise<any>
}

export type BotActionInfo = {
   type: string
   handler: (ctx: CallbackQuery) => Promise<any>
}