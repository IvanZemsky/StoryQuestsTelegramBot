import { Actions } from "@/bot/constants/actions"
import { NextSceneData } from "@/shared/types/scene"

export function parseSceneData(dataString: string) {
   const parsed = dataString.split(":")
   const actionType = parsed[0]

   if (actionType !== Actions.SetNextScene) {
      throw new Error(`Action type "${actionType}" is not valid`)
   }

   if (dataString.length > 64) {
      throw new Error(
         `Query data string must not be longer than 64 characters (Length: ${dataString.length}), Action type: ${parsed[0]}`,
      )
   }

   const data: NextSceneData = {
      storyId: parsed[1],
      nextSceneId: parsed[2],
   }

   return data
}
