const tagEmojis = {
   mystery: "🔮",
   horror: "🧛‍♂️",
   fantasy: "🧙‍♂️",
   detective: "🕵️‍♂️",
   adventure: "🏕️",
   society: "📜",
}

export const setTags = (tags: string[]) => {
   return tags
      .map((tag) => (tagEmojis[tag] || "") + tag[0].toUpperCase() + tag.slice(1))
      .join(", ")
}
