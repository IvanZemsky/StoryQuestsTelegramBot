import { BOT } from "@/bot"
import { sceneService } from "@/services/scene"
import { parseSceneData } from "@/shared/helpers/parsers/parseSceneData"
import { sendSceneCard } from "@/view/scene"
import { CallbackQuery } from "node-telegram-bot-api"

export const setNextScene = async (ctx: CallbackQuery) => {
   const chatId = ctx.message.chat.id
   const queryId = ctx.id
   const messageId = ctx.message.message_id

   const payload = parseSceneData(ctx.data)

   try {
      const scene = await sceneService.getScene(payload.storyId, payload.nextSceneId)
      await sendSceneCard(chatId, scene, messageId)
   } catch (error) {
      console.error('setNextScene, ', error)
   } finally {
      await BOT.answerCallbackQuery(queryId)
   }
}
