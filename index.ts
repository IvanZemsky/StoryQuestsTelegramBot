import dotenv from "dotenv"
import { startServer } from "./server"
import { startBot } from "@/bot"

dotenv.config()

async function bootstrap() {
   startBot()
   await startServer() // needed for deploying on render.com
}

bootstrap()
