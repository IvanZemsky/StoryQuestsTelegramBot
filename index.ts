import dotenv from "dotenv"
import TGApi, { SendPhotoOptions } from "node-telegram-bot-api"
import { getStoryById } from "./src/api/getStoryById"
import { setPath } from "./src/utils/setPath"
import { WEBSITE_ROUTES, WEBSITE_URL } from "./src/constants/links"
import { getScene } from "./src/api/getScene"

dotenv.config()

type NextSceneData = {
   storyId: string
   nextSceneId: string
}

const TOKEN = process.env.TOKEN!

const BOT = new TGApi(TOKEN, { polling: true })

BOT.on("message", async (msg) => {
   const chatId = msg.chat.id

   try {
      const res = await getStoryById("66cb6fb8ebae2e4b8fffd198")
      const caption = `*${res.name}*\n${res.description}\n[Browser version](${setPath(
         WEBSITE_URL,
         WEBSITE_ROUTES.Stories,
         res._id,
      )})`

      const options: SendPhotoOptions = {
         caption,
         parse_mode: "Markdown",
         reply_markup: {
            inline_keyboard: [
               [
                  {
                     text: "Start",
                     callback_data: JSON.stringify({
                        storyId: res._id,
                        nextSceneId: "scene_1",
                     }),
                  },
               ],
            ],
         },
      }

      BOT.sendPhoto(chatId, res.img, options)
   } catch (error) {
      BOT.sendMessage(
         chatId,
         "An error occurred while sending the message. Please try again later.",
      )
   }
})

BOT.on("callback_query", async (msg) => {
   const chatId = msg.message!.chat.id
   const data: NextSceneData = JSON.parse(msg.data!)

   try {
      const res = await getScene(data.storyId, data.nextSceneId)
      const caption = `*${res.title}*\n${res.description}`

      const options: SendPhotoOptions = {
         caption,
         parse_mode: "Markdown",
         reply_markup: {
            inline_keyboard: [
               res.answers.map((answer) => ({
                  text: answer.text,
                  callback_data: JSON.stringify({
                     storyId: res.storyId,
                     nextSceneId: answer.nextSceneId,
                  }),
               })),
            ],
         },
      }

      BOT.sendPhoto(chatId, res.img, options)
      if (res.type === 'end') {
         BOT.sendMessage(chatId, "*This is the end of the story*", {parse_mode: 'MarkdownV2'})
      }
   } catch (error) {
      BOT.sendMessage(
         chatId,
         "An error occurred while sending the message. Please try again later.",
      )
   }
})
