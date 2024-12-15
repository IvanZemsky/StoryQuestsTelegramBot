import { searchProcess } from "@/processes/search"

export async function search(chatId: number): Promise<void> {
   await searchProcess(chatId)
}
