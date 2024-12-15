import { BOT } from "@/bot/bot"
import { sceneService } from "@/services/scene"
import { Actions } from "@/shared/constants/actions"
import { setCallbackData } from "@/shared/helpers/setCallbackData"
import { NextSceneData, SceneAnswer } from "@/shared/types/scene"
import { InlineKeyboardButton, SendPhotoOptions } from "node-telegram-bot-api"

const setInlineKeyboard = (
   storyId: string,
   answers: SceneAnswer[],
): InlineKeyboardButton[][] =>
   answers.map((answer) => [
      {
         text: answer.text,
         callback_data: setCallbackData(Actions.SetNextScene, storyId, answer.nextSceneId)
      },
   ])

export const setNextScene = async (chatId: number, queryId: string, data: string[]) => {
   const payload: NextSceneData = {
      storyId: data[1],
      nextSceneId: data[2],
   }

   try {
      const res = await sceneService.getScene(payload.storyId, payload.nextSceneId)
      const caption = `*${res.title}*\n${res.description}`

      const options: SendPhotoOptions = {
         caption,
         parse_mode: "Markdown",
         reply_markup: {
            inline_keyboard: setInlineKeyboard(res.storyId, res.answers),
         },
      }

      BOT.sendPhoto(chatId, res.img, options)
      if (res.type === "end") {
         BOT.sendMessage(chatId, "*This is the end of the story*", {
            parse_mode: "MarkdownV2",
         })
      }
   } catch (error) {
      BOT.sendMessage(
         chatId,
         "An error occurred while sending the message. Please try again later.",
      )
   } finally {
      await BOT.answerCallbackQuery(queryId)
   }
}
