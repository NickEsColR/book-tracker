import { column, defineTable } from "astro:db";

export const LectureLists = defineTable({
  columns: {
    listId: column.text({ primaryKey: true }),
    userId: column.text(),
    name: column.text(),
    description: column.text(),
    type: column.text(), // "main" | "liked" | "custom"
  },
});
