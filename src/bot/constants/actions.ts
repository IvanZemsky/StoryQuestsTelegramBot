import { setNextScene } from "@/actions";
import { BotActionInfo } from "@/bot/types";

export enum Actions {
   SetNextScene = 'sns',
}

export const BOT_ACTIONS: BotActionInfo[] = [
   {
      type: Actions.SetNextScene,
      handler: setNextScene
   },
]