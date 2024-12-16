import { BOT } from "@/bot/bot"
import { WEBSITE_URL, WEBSITE_ROUTES } from "@/shared/constants/links"
import { Story } from "@/shared/types/story"
import { setStoryTags } from "./model/helpers/setStoryTags"
import { setStoryCardOptions } from "./model/options"
import { setPath } from "@/shared/utils/setPath"

export const sendStoryCard = async (chatId: number, story: Story) => {
   const caption = `*${story.name}*\n${story.description}\n${setStoryTags(
      story.tags,
   )}\n[Browser version](${setPath(WEBSITE_URL, WEBSITE_ROUTES.Stories, story._id)})`

   const options = setStoryCardOptions(story._id, caption)

   try {
      await BOT.sendPhoto(chatId, story.img, options)
   } catch (error) {
      console.error("Error sending photo for story: ", story.name, error)
      BOT.sendMessage(chatId, caption, options)
   }
}
