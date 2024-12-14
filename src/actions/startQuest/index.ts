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
         callback_data: setCallbackData(Actions.SetNextScene, storyId, "scene_1"),
      },
   ],
]

export async function startQuest(chatId: number, queryId: string): Promise<void> {
   console.log('started quest')
   try {
     await BOT.answerCallbackQuery(queryId); // Acknowledge the callback immediately
     const res = await getStoryById("66cb6fb8ebae2e4b8fffd198");
     const caption = `*${res.name}*\n${res.description}\n[Browser version](${setPath(
       WEBSITE_URL,
       WEBSITE_ROUTES.Stories,
       res._id,
     )})`;
 
     const options: SendPhotoOptions = {
       caption,
       parse_mode: "Markdown",
       reply_markup: {
         inline_keyboard: setInlineKeyboard(res._id),
       },
     };
 
     await BOT.sendPhoto(chatId, res.img, options);
   } catch (error) {
     console.error("Error in startQuest:", error); // Log the error for debugging
     await BOT.answerCallbackQuery(queryId, {
       text: "An error occurred. Please try again later.",
     });
 
     BOT.sendMessage(
       chatId,
       "An error occurred while sending the message. Please try again later.",
     )
   }
 }
