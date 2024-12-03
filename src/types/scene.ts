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
   sceneId: string
   storyId: string
   title: string
   description: string
   type: string
   img: string
   answers: SceneAnswer[]
}
