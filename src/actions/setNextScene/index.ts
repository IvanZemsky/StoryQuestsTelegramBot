import { BOT } from "@/bot/bot"
import { sceneService } from "@/services/scene"
import { NextSceneData } from "@/shared/types/scene"
import { sendSceneCard } from "@/view/scene"

export const setNextScene = async (chatId: number, messageId: number, queryId: string, data: string[]) => {
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
