import { BOT } from "@/bot/bot";
import { Actions } from "@/constants/actions";
import { WEBSITE_URL, WEBSITE_ROUTES } from "@/constants/links";
import { setCallbackData } from "@/helpers/setCallbackData";
import { Story } from "@/types/story";
import { setPath } from "@/utils/setPath";
import { InlineKeyboardButton, SendPhotoOptions } from "node-telegram-bot-api";

const setInlineKeyboard = (storyId: string): InlineKeyboardButton[][] => [
   [
      {
         text: "Start",
         callback_data: setCallbackData(Actions.SetNextScene, storyId, 'scene_1'),
      },
   ],
];

export const setStoryCard = async (chatId: number, story: Story) => {
   const caption = `*${story.name}*\n${story.description}\n[Browser version](${setPath(
      WEBSITE_URL,
      WEBSITE_ROUTES.Stories,
      story._id
   )})`;

   const options: SendPhotoOptions = {
      caption,
      parse_mode: "Markdown",
      reply_markup: {
         inline_keyboard: setInlineKeyboard(story._id),
      },
   };

   try {
      await BOT.sendPhoto(chatId, story.img, options);
   } catch (error) {
      console.error("Error sending photo for story:", story.name, error);
      BOT.sendMessage(chatId, `Error sending story: ${story.name}`);
   }
}