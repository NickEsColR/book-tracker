import { Books, db, LectureBooks, LectureListBooks, LectureLists, Notes } from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
  // Insertar libros
  await db.insert(Books).values([
    { 
      bookId: 'book-1', 
      openLibraryKey: '/works/OL17203233W', 
      title: 'To All the Boys I\'ve Loved Before', 
      author: 'Jenny Han', 
      cover: '7370711' 
    },
    { 
      bookId: 'book-2', 
      openLibraryKey: '/works/OL16821606W', 
      title: 'All the Light We Cannot See', 
      author: 'Anthony Doerr', 
      cover: '14559680' 
    },
    { 
      bookId: 'book-3', 
      openLibraryKey: '/works/OL27258W', 
      title: 'El Hobbit', 
      author: 'J.R.R. Tolkien', 
      cover: '12003329' 
    },
    { 
      bookId: 'book-4', 
      openLibraryKey: '/works/OL17914663W', 
      title: 'Steve Jobs', 
      author: 'Martha Wells', 
      cover: '9157148' 
    }
  ]);

  // Insertar LectureBooks (estado de lectura de los libros)
  await db.insert(LectureBooks).values([
    { 
      lectureBooksId: 'lecture-book-1', 
      bookId: 'book-1', 
      currentPage: 120, 
      readingStatus: 'reading' 
    },
    { 
      lectureBooksId: 'lecture-book-2', 
      bookId: 'book-2', 
      currentPage: 50, 
      readingStatus: 'reading' 
    },
    { 
      lectureBooksId: 'lecture-book-3', 
      bookId: 'book-3', 
      currentPage: 200, 
      readingStatus: 'completed' 
    },
    { 
      lectureBooksId: 'lecture-book-4', 
      bookId: 'book-4', 
      currentPage: 0, 
      readingStatus: 'pending' 
    }
  ]);

  // Insertar notas para cada LectureBook
  await db.insert(Notes).values([
    { 
      id: 'note-1', 
      lectureBookId: 'lecture-book-1', 
      content: 'Me encanta la descripción de Macondo y la forma en que García Márquez desarrolla a los personajes.' 
    },
    { 
      id: 'note-2', 
      lectureBookId: 'lecture-book-2', 
      content: 'La distopía de Orwell sigue siendo relevante y profética en la era digital.' 
    },
    { 
      id: 'note-3', 
      lectureBookId: 'lecture-book-3', 
      content: 'La aventura de Bilbo Bolsón es fascinante. El mundo creado por Tolkien es increíblemente detallado.' 
    },
    { 
      id: 'note-4', 
      lectureBookId: 'lecture-book-4', 
      content: 'Quiero aprender sobre la vida y filosofía de diseño de Steve Jobs.' 
    }
  ]);

  // Crear listas de lectura para el usuario "123"
  await db.insert(LectureLists).values([
    { 
      listId: 'f4b1a98a-7374-47c1-9056-68e708c840ef', 
      userId: 'user_2xC2IEI2zxJDbODtqkkk2ybWYDM', 
      name: 'Main', 
      description: 'Libros que estoy leyendo o quiero leer pronto', 
      type: 'main' 
    },
    { 
      listId: 'f4b1a98a-7374-47c1-9056-68e708c840eg', 
      userId: 'user_2xC2IEI2zxJDbODtqkkk2ybWYDM', 
      name: 'Liked', 
      description: 'Libros que me han encantado', 
      type: 'liked' 
    }
  ]);

  // Asociar libros a las listas
  // Lista principal: contiene 3 libros
  await db.insert(LectureListBooks).values([
    { listId: 'f4b1a98a-7374-47c1-9056-68e708c840ef', lectureBookId: 'lecture-book-1' }, // "Cien años de soledad" en lista principal
    { listId: 'f4b1a98a-7374-47c1-9056-68e708c840ef', lectureBookId: 'lecture-book-2' }, // "1984" en lista principal
    { listId: 'f4b1a98a-7374-47c1-9056-68e708c840ef', lectureBookId: 'lecture-book-4' }, // "Steve Jobs" en lista principal
  ]);

  // Lista de favoritos: contiene 2 libros
  await db.insert(LectureListBooks).values([
    { listId: 'f4b1a98a-7374-47c1-9056-68e708c840eg', lectureBookId: 'lecture-book-1' }, // "Cien años de soledad" también en lista de favoritos
    { listId: 'f4b1a98a-7374-47c1-9056-68e708c840eg', lectureBookId: 'lecture-book-3' }, // "El Hobbit" en lista de favoritos
  ]);
}
