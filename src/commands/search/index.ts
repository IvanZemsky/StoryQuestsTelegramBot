import { getStories } from "@/api/getStories";
import { BOT } from "@/bot/bot";
import { Story } from "@/types/story";
import { setStoryCard } from "./setStoryCard";

const limit = 5
const page = 0

export const search = async (chatId: number) => {
   try {
      const response = await getStories({ limit, page });
      const { totalCount } = response;

      const pages = Math.ceil(totalCount / limit);

      if (totalCount === 0) {
         BOT.sendMessage(chatId, "Nothing found");
      } else {
         BOT.sendMessage(chatId, `Found ${pages} pages. Select a page (1-${pages}):`);

         BOT.once("message", async (pageMsg) => {
            const pageNumber = +pageMsg.text;
            if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > pages) {
               BOT.sendMessage(chatId, "Invalid page number. Try again.");
               return;
            }

            const storiesResponse = await getStories({ limit, page: pageNumber - 1 });
            const stories: Story[] = storiesResponse.data;

            if (stories.length > 0) {
               stories.forEach(async story => setStoryCard(chatId, story))
            } else {
               BOT.sendMessage(chatId, "No stories found on this page.");
            }
         });
      }
   } catch (error) {
      BOT.sendMessage(chatId, "An error occurred during the search.");
      console.error(error);
   }
};