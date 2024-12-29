import axios from "axios"

export function logApiError(error: any) {
   if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message)
   } else {
      console.error("Unexpected error:", error)
   }
}
