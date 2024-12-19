import { IncomingMessage, ServerResponse } from "http"
import { PORT } from "./src/shared/constants/process"
import http from "http"

// This code is responsible for starting the server on a specific port for deployment to render.com

try {
   const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { "Content-Type": "text/plain" })
      res.end("Telegram bot is running...")
   })

   server.on("error", (err: Error) => {
      console.error(`Server error: ${err.message}`)
   })

   server.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`)
   })
} catch (err) {
   console.error(`Failed to start server: ${err}`)
}
