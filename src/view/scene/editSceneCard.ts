import { BOT } from "@/bot"
import { Scene } from "@/shared/types/scene"
import { InlineKeyboardMarkup, SendPhotoOptions } from "node-telegram-bot-api"

export async function editSceneCard(
   chatId: number,
   messageId: number,
   scene: Scene,
   options: SendPhotoOptions,
) {
   await BOT.editMessageMedia(
      {
         media: scene.img,
         type: "photo",
         caption: options.caption,
         parse_mode: "Markdown",
      },
      {
         message_id: messageId,
         chat_id: chatId,
         reply_markup: options.reply_markup as InlineKeyboardMarkup,
      },
   )
}
