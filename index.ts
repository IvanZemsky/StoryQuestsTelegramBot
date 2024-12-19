import dotenv from "dotenv"
import { startBot } from "@/bot"
import "./server"

dotenv.config()

function bootstrap() {
   console.clear()
   startBot()
}

bootstrap()
