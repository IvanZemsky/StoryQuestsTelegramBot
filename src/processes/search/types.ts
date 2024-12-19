export type PaginationData = {
   totalCount: number
   pageCount: number
}

export type SelectedPageData = {
   page: number | null
   data: "cancelled" | "validPage" | "invalidPage"
}