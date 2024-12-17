import { BOT } from "@/bot"
import { sceneService } from "@/services/scene"
import { NextSceneData } from "@/shared/types/scene"
import { sendSceneCard } from "@/view/scene"
import { CallbackQuery } from "node-telegram-bot-api"

export const setNextScene = async (ctx: CallbackQuery) => {
   const chatId = ctx.message.chat.id
   const queryId = ctx.id
   const data = ctx.data.split(":")
   const messageId = ctx.message.message_id

   const payload: NextSceneData = {
      storyId: data[1],
      nextSceneId: data[2],
   }

   try {
      const scene = await sceneService.getScene(payload.storyId, payload.nextSceneId)
      await sendSceneCard(chatId, scene, messageId)
   } catch (error) {
      console.error('setNextScene, ', error)
   } finally {
      await BOT.answerCallbackQuery(queryId)
   }
}
