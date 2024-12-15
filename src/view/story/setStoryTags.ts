import { storyTagEmojis } from "./constants"

export const setStoryTags = (tags: string[]): string => {
   return tags
      .map((tag) => (storyTagEmojis[tag] || "") + tag[0].toUpperCase() + tag.slice(1))
      .join(", ")
}
