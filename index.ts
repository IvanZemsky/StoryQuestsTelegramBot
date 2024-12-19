import dotenv from "dotenv"
import { startBot } from "@/bot"
import "./server"

dotenv.config()

function bootstrap() {
   startBot()
}

bootstrap()
