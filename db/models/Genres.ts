import { column, defineTable } from "astro:db";

export const Genres = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  },
});
