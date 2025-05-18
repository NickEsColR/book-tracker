import { defineDb } from "astro:db";
import { Books } from "db/models/Books";
import { Genres } from "db/models/Genres";
import { LectureBooks } from "db/models/LectureBooks";
import { LectureListBooks } from "db/models/LectureListBook";
import { LectureLists } from "db/models/lectureLists";
import { Notes } from "db/models/Notes";

// https://astro.build/db/config
export default defineDb({
  tables: {
    LectureLists,
    LectureListBooks,
    LectureBooks,
    Books,
    Genres,
    Notes,
  },
});
