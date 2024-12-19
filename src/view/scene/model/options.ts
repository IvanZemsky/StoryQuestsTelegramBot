import { Actions } from "@/bot/constants/actions"
import { setCallbackData } from "@/shared/helpers/setCallbackData"
import { SceneAnswer } from "@/shared/types/scene"
import { SendPhotoOptions } from "node-telegram-bot-api"

export const setSceneOptions = (
   caption: string,
   storyId: string,
   answers: SceneAnswer[],
): SendPhotoOptions => ({
   caption,
   parse_mode: "Markdown",
   reply_markup: {
      inline_keyboard: answers.map((answer) => [
         {
            text: answer.text,
            callback_data: setCallbackData(
               Actions.SetNextScene,
               storyId,
               answer.nextSceneId,
            ),
         },
      ]),
   },
})
