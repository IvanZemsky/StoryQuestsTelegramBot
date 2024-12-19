import { BOT } from "@/bot"
import { Scene } from "@/shared/types/scene"
import { setSceneOptions } from "./model/options"
import { sendStoryEndMessage } from "./helpers/sendStoryEndMessage"
import { editSceneCard } from "./helpers/editSceneCard"

export const sendSceneCard = async (chatId: number, scene: Scene, messageId?: number) => {
   try {
      const caption = `*${scene.title}*\n${scene.description}`
      const options = setSceneOptions(caption, scene.storyId, scene.answers)

      if (messageId && scene.sceneId !== "scene_1") {
         await editSceneCard(chatId, messageId, scene, options)

         if (scene.type === "end") {
            await sendStoryEndMessage(chatId)
         }

         return messageId
      }

      const message = await BOT.sendPhoto(chatId, scene.img, options)

      if (scene.type === "end") {
         await BOT.sendMessage(chatId, "*This is the end of the story*", {
            parse_mode: "MarkdownV2",
         })
      }
      return message.message_id
   } catch (error) {
      console.log(error)
      await BOT.sendMessage(
         chatId,
         "An error occurred while sending the scene card. Please try again later.",
      )
   }
}
