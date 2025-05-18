import { defineDb } from "astro:db";
import { LectureLists } from "db/models/lectureLists";
import { Books } from "db/models/Books";
import { LectureBooks } from "db/models/LectureBooks";
import { LectureListBooks } from "db/models/LectureListBook";
import { Notes } from "db/models/Notes";

// https://astro.build/db/config
export default defineDb({
  tables: {
    Books,
    LectureBooks,
    LectureLists,
    LectureListBooks,
    Notes,
  },
});
