import { BOT } from "@/bot/bot"
import { WEBSITE_URL, WEBSITE_ROUTES } from "@/constants/links"
import { Story } from "@/types/story"
import { setPath } from "@/utils/setPath"
import { setStoryTags } from "./model/setStoryTags"
import { setStoryCardOptions } from "./model/options"

export const sendStoryCard = async (chatId: number, story: Story) => {
   const caption = `*${story.name}*\n${story.description}\n${setStoryTags(
      story.tags,
   )}\n[Browser version](${setPath(WEBSITE_URL, WEBSITE_ROUTES.Stories, story._id)})`

   const options = setStoryCardOptions(story._id, caption)

   try {
      await BOT.sendPhoto(chatId, story.img, options)
   } catch (error) {
      console.error("Error sending photo for story:", story.name, error)
      BOT.sendMessage(chatId, caption, options)
   }
}
