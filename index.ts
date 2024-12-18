import dotenv from "dotenv"
import "./server"
import { startBot } from "@/bot"

dotenv.config()

function bootstrap() {
   startBot()
}

bootstrap()
