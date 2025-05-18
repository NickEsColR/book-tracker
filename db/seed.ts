import { Books, db, LectureBooks, LectureListBooks, LectureLists, Notes } from 'astro:db';


// https://astro.build/db/seed
export default async function seed() {
  // Insertar libros
  await db.insert(Books).values([
    { 
      bookId: 'book-1', 
      openLibraryKey: 'OL24986186M', 
      title: 'Cien años de soledad', 
      author: 'Gabriel García Márquez', 
      cover: '8231990' 
    },
    { 
      bookId: 'book-2', 
      openLibraryKey: 'OL7826058M', 
      title: '1984', 
      author: 'George Orwell', 
      cover: '8575101' 
    },
    { 
      bookId: 'book-3', 
      openLibraryKey: 'OL27258W', 
      title: 'El Hobbit', 
      author: 'J.R.R. Tolkien', 
      cover: '12003329' 
    },
    { 
      bookId: 'book-4', 
      openLibraryKey: 'OL39180W', 
      title: 'Steve Jobs', 
      author: 'Walter Isaacson', 
      cover: '7327476' 
    }
  ]);

  // Insertar LectureBooks (estado de lectura de los libros)
  await db.insert(LectureBooks).values([
    { 
      lectureBooksId: 'lecture-book-1', 
      bookId: 'book-1', 
      currentPage: 120, 
      readingStatus: 'in-progress' 
    },
    { 
      lectureBooksId: 'lecture-book-2', 
      bookId: 'book-2', 
      currentPage: 50, 
      readingStatus: 'in-progress' 
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
      readingStatus: 'not-started' 
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
      listId: 'list-main', 
      userId: '123', 
      name: 'Mi Lista Principal', 
      description: 'Libros que estoy leyendo o quiero leer pronto', 
      type: 'main' 
    },
    { 
      listId: 'list-liked', 
      userId: '123', 
      name: 'Mis Favoritos', 
      description: 'Libros que me han encantado', 
      type: 'liked' 
    }
  ]);

  // Asociar libros a las listas
  // Lista principal: contiene 3 libros
  await db.insert(LectureListBooks).values([
    { listId: 'list-main', lectureBookId: 'lecture-book-1' }, // "Cien años de soledad" en lista principal
    { listId: 'list-main', lectureBookId: 'lecture-book-2' }, // "1984" en lista principal
    { listId: 'list-main', lectureBookId: 'lecture-book-4' }, // "Steve Jobs" en lista principal
  ]);

  // Lista de favoritos: contiene 2 libros
  await db.insert(LectureListBooks).values([
    { listId: 'list-liked', lectureBookId: 'lecture-book-1' }, // "Cien años de soledad" también en lista de favoritos
    { listId: 'list-liked', lectureBookId: 'lecture-book-3' }, // "El Hobbit" en lista de favoritos
  ]);
}
