import { BotCommandInfo } from "@/bot/types";
import { getAllStories, search, start } from "@/commands";
import { Commands } from "@/shared/constants/commands";

export const BOT_COMMANDS: BotCommandInfo[] = [
   {
      text: Commands.Start,
      description: "Start using the bot",
      handler: start
   },
   {
      text: Commands.Search,
      description: "Search for the stories",
      handler: search
   },
   {
      text: Commands.GetAllStories,
      description: "Get all stories",
      handler: getAllStories
   }
]