export type SceneAnswer = {
   id: string
   text: string
   nextSceneId: string
}

export type NextSceneData = {
   storyId: string
   nextSceneId: string
}

export type Scene = {
   _id: string
   number: string
   storyId: string
   title: string
   description: string
   type: string
   img: string
   answers: SceneAnswer[]
}
