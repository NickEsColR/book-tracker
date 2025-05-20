// Subject categories from Open Library
// https://openlibrary.org/subjects

// --- TYPE DEFINITIONS ---
export type Lang = 'en' | 'es';

export interface SubjectObject {
  id: string;
  en: string;
  es: string;
}


// --- MAIN SUBJECT CATEGORIES ---
export const MAIN_SUBJECTS: SubjectObject[] = [
  { id: 'arts', en: 'Arts', es: 'Artes' },
  { id: 'animals', en: 'Animals', es: 'Animales' },
  { id: 'fiction', en: 'Fiction', es: 'Ficción' },
  { id: 'science-mathematics', en: 'Science & Mathematics', es: 'Ciencia y Matemáticas' },
  { id: 'business-finance', en: 'Business & Finance', es: 'Negocios y Finanzas' },
  { id: 'childrens', en: 'Children\'s', es: 'Infantil' },
  { id: 'history', en: 'History', es: 'Historia' },
  { id: 'health-wellness', en: 'Health & Wellness', es: 'Salud y Bienestar' },
  { id: 'biography', en: 'Biography', es: 'Biografía' },
  { id: 'social-sciences', en: 'Social Sciences', es: 'Ciencias Sociales' }
];

// --- ARTS SUBJECTS ---
export const ARTS_SUBJECTS: SubjectObject[] = [
  { id: 'architecture', en: 'Architecture', es: 'Arquitectura' },
  { id: 'art instruction', en: 'Art Instruction', es: 'Instrucción de Arte' },
  { id: 'history of art art design styles', en: 'History of Art, Art & Design Styles', es: 'Historia del Arte, Estilos de Arte y Diseño' },
  { id: 'dance', en: 'Dance', es: 'Danza' },
  { id: 'design', en: 'Design', es: 'Diseño' },
  { id: 'fashion', en: 'Fashion', es: 'Moda' },
  { id: 'film', en: 'Film', es: 'Cine' },
  { id: 'graphic design', en: 'Graphic Design', es: 'Diseño Gráfico' },
  { id: 'music', en: 'Music', es: 'Música' },
  { id: 'music theory', en: 'Music Theory', es: 'Teoría Musical' },
  { id: 'painting paintings', en: 'Painting, Paintings', es: 'Pintura' },
  { id: 'photography', en: 'Photography', es: 'Fotografía' }
];

// --- ANIMALS SUBJECTS ---
export const ANIMALS_SUBJECTS: SubjectObject[] = [
  { id: 'bears', en: 'Bears', es: 'Osos' },
  { id: 'cats', en: 'Cats', es: 'Gatos' },
  { id: 'kittens', en: 'Kittens', es: 'Gatitos' },
  { id: 'dogs', en: 'Dogs', es: 'Perros' },
  { id: 'puppies', en: 'Puppies', es: 'Cachorros' }
];

// --- FICTION SUBJECTS ---
export const FICTION_SUBJECTS: SubjectObject[] = [
  { id: 'fantasy', en: 'Fantasy', es: 'Fantasía' },
  { id: 'historical fiction', en: 'Historical Fiction', es: 'Ficción Histórica' },
  { id: 'horror', en: 'Horror', es: 'Terror' },
  { id: 'humor', en: 'Humor', es: 'Humor' },
  { id: 'literature', en: 'Literature', es: 'Literatura' },
  { id: 'magic', en: 'Magic', es: 'Magia' },
  { id: 'mystery and detective stories', en: 'Mystery and Detective Stories', es: 'Misterio y Detectives' },
  { id: 'plays', en: 'Plays', es: 'Obras de Teatro' },
  { id: 'poetry', en: 'Poetry', es: 'Poesía' },
  { id: 'romance', en: 'Romance', es: 'Romance' },
  { id: 'science fiction', en: 'Science Fiction', es: 'Ciencia Ficción' },
  { id: 'short stories', en: 'Short Stories', es: 'Cuentos Cortos' },
  { id: 'thriller', en: 'Thriller', es: 'Suspense' }, // Corrected Spanish translation for Thriller
  { id: 'young adult fiction', en: 'Young Adult Fiction', es: 'Ficción Juvenil' }
];

// --- SCIENCE & MATHEMATICS SUBJECTS ---
export const SCIENCE_MATHEMATICS_SUBJECTS: SubjectObject[] = [
  { id: 'biology', en: 'Biology', es: 'Biología' },
  { id: 'chemistry', en: 'Chemistry', es: 'Química' },
  { id: 'mathematics', en: 'Mathematics', es: 'Matemáticas' },
  { id: 'physics', en: 'Physics', es: 'Física' },
  { id: 'programming', en: 'Programming', es: 'Programación' }
];

// --- BUSINESS & FINANCE SUBJECTS ---
export const BUSINESS_FINANCE_SUBJECTS: SubjectObject[] = [
  { id: 'management', en: 'Management', es: 'Gestión' },
  { id: 'entrepreneurship', en: 'Entrepreneurship', es: 'Emprendimiento' },
  { id: 'business economics', en: 'Business Economics', es: 'Economía de la Empresa' },
  { id: 'success in business', en: 'Success in Business', es: 'Éxito en los Negocios' },
  { id: 'finance', en: 'Finance', es: 'Finanzas' }
];

// --- CHILDREN'S SUBJECTS ---
export const CHILDRENS_SUBJECTS: SubjectObject[] = [
  { id: 'juvenile fiction', en: 'Juvenile Fiction', es: 'Ficción Juvenil' }, // Note: "Children's" category often maps to "Juvenile Fiction"
  { id: 'juvenile literature', en: 'Juvenile Literature', es: 'Literatura Juvenil' },
  { id: 'stories in rhyme', en: 'Stories in Rhyme', es: 'Cuentos en Rima' },
  { id: 'infancy', en: 'Infancy', es: 'Infancia Temprana' }, // Adjusted for clarity
  { id: 'bedtime', en: 'Bedtime', es: 'Cuentos para Dormir' },
  { id: 'picture books', en: 'Picture Books', es: 'Libros Ilustrados' }
];

// --- HISTORY SUBJECTS ---
export const HISTORY_SUBJECTS: SubjectObject[] = [
  { id: 'ancient civilization', en: 'Ancient Civilization', es: 'Civilizaciones Antiguas' },
  { id: 'archaeology', en: 'Archaeology', es: 'Arqueología' },
  { id: 'anthropology', en: 'Anthropology', es: 'Antropología' }, // Consider if this is primary here or in Social Sciences
  { id: 'world war ii', en: 'World War II', es: 'Segunda Guerra Mundial' },
  { id: 'social life and customs', en: 'Social Life and Customs', es: 'Vida Social y Costumbres' }
];

// --- HEALTH & WELLNESS SUBJECTS ---
export const HEALTH_WELLNESS_SUBJECTS: SubjectObject[] = [
  { id: 'cooking', en: 'Cooking', es: 'Cocina' },
  { id: 'cookbooks', en: 'Cookbooks', es: 'Libros de Cocina' },
  { id: 'mental health', en: 'Mental Health', es: 'Salud Mental' },
  { id: 'exercise', en: 'Exercise', es: 'Ejercicio' },
  { id: 'nutrition', en: 'Nutrition', es: 'Nutrición' },
  { id: 'self-help', en: 'Self-Help', es: 'Autoayuda' }
];

// --- BIOGRAPHY SUBJECTS ---
export const BIOGRAPHY_SUBJECTS: SubjectObject[] = [
  { id: 'biography', en: 'Biography', es: 'Biografía' }, // Main category subject
  { id: 'autobiography', en: 'Autobiography', es: 'Autobiografía' },
  { id: 'history', en: 'History', es: 'Historia' }, // Sub-subject within Biography
  { id: 'politics and government', en: 'Politics and Government', es: 'Política y Gobierno' },
  { id: 'world war ii', en: 'World War II', es: 'Segunda Guerra Mundial' }, // Repeated, consider context
  { id: 'women', en: 'Women', es: 'Mujeres' },
  { id: 'kings and rulers', en: 'Kings and Rulers', es: 'Reyes y Gobernantes' },
  { id: 'composers', en: 'Composers', es: 'Compositores' },
  { id: 'artists', en: 'Artists', es: 'Artistas' }
];

// --- SOCIAL SCIENCES SUBJECTS ---
export const SOCIAL_SCIENCES_SUBJECTS: SubjectObject[] = [
  { id: 'anthropology', en: 'Anthropology', es: 'Antropología' },
  { id: 'religion', en: 'Religion', es: 'Religión' },
  { id: 'political science', en: 'Political Science', es: 'Ciencia Política' },
  { id: 'psychology', en: 'Psychology', es: 'Psicología' }
];

// --- COMBINED SUBJECTS & MAP ---
export const ALL_SUBJECT_OBJECTS: SubjectObject[] = [
  ...ARTS_SUBJECTS,
  ...ANIMALS_SUBJECTS,
  ...FICTION_SUBJECTS,
  ...SCIENCE_MATHEMATICS_SUBJECTS,
  ...BUSINESS_FINANCE_SUBJECTS,
  ...CHILDRENS_SUBJECTS,
  ...HISTORY_SUBJECTS,
  ...HEALTH_WELLNESS_SUBJECTS,
  ...BIOGRAPHY_SUBJECTS,
  ...SOCIAL_SCIENCES_SUBJECTS
];

export const SUBJECT_MAP: Record<string, SubjectObject[]> = {
  'arts': ARTS_SUBJECTS,
  'animals': ANIMALS_SUBJECTS,
  'fiction': FICTION_SUBJECTS,
  'science-mathematics': SCIENCE_MATHEMATICS_SUBJECTS,
  'business-finance': BUSINESS_FINANCE_SUBJECTS,
  'childrens': CHILDRENS_SUBJECTS,
  'history': HISTORY_SUBJECTS,
  'health-wellness': HEALTH_WELLNESS_SUBJECTS,
  'biography': BIOGRAPHY_SUBJECTS,
  'social-sciences': SOCIAL_SCIENCES_SUBJECTS
};