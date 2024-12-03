import { getStoryById } from "@/api/getStoryById"
import { BOT } from "@/bot/bot"
import { Actions } from "@/constants/actions"
import { WEBSITE_URL, WEBSITE_ROUTES } from "@/constants/links"
import { setCallbackData } from "@/helpers/setCallbackData"
import { setPath } from "@/utils/setPath"
import { InlineKeyboardButton, SendPhotoOptions } from "node-telegram-bot-api"

const setInlineKeyboard = (storyId: string): InlineKeyboardButton[][] => [
   [
      {
         text: "Start",
         callback_data: setCallbackData(Actions.SetNextScene, storyId, 'scene_1')
      },
   ],
]

export const startQuest = async (chatId: number) => {
   try {
      const res = await getStoryById("66cb6fb8ebae2e4b8fffd198")
      const caption = `*${res.name}*\n${res.description}\n[Browser version](${setPath(
         WEBSITE_URL,
         WEBSITE_ROUTES.Stories,
         res._id,
      )})`

      const options: SendPhotoOptions = {
         caption,
         parse_mode: "Markdown",
         reply_markup: {
            inline_keyboard: setInlineKeyboard(res._id),
         },
      }

      BOT.sendPhoto(chatId, res.img, options)
   } catch (error) {
      BOT.sendMessage(
         chatId,
         "An error occurred while sending the message. Please try again later.",
      )
   }
}
