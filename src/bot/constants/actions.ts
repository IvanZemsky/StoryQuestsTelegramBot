import { setNextScene } from "@/actions";
import { BotActionInfo } from "@/bot/types";
import { Actions } from "@/shared/constants/actions";

export const BOT_ACTIONS: BotActionInfo[] = [
   {
      type: Actions.SetNextScene,
      handler: setNextScene
   },
]