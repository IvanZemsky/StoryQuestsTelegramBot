import { Actions } from "@/bot/constants/actions"
import { START_SCENE_NUMBER } from "@/shared/api/constants"
import { setCallbackData } from "@/shared/helpers/setCallbackData"
import { SendPhotoOptions } from "node-telegram-bot-api"

export const setStoryCardOptions = (
   storyId: string,
   caption: string,
): SendPhotoOptions => ({
   caption,
   parse_mode: "Markdown",
   reply_markup: {
      inline_keyboard: [
         [
            {
               text: "Start",
               callback_data: setCallbackData(
                  Actions.SetNextScene,
                  storyId,
                  START_SCENE_NUMBER,
               ),
            },
         ],
      ],
   },
})
