// Subject categories from Open Library
// https://openlibrary.org/subjects

// Main subject categories
export const MAIN_SUBJECTS = [
  'Arts',
  'Animals',
  'Fiction',
  'Science & Mathematics',
  'Business & Finance',
  'Children\'s',
  'History',
  'Health & Wellness',
  'Biography',
  'Social Sciences'
];

// Arts subjects
export const ARTS_SUBJECTS = [
  'architecture',
  'art instruction',
  'history of art art design styles',
  'dance',
  'design',
  'fashion',
  'film',
  'graphic design',
  'music',
  'music theory',
  'painting paintings',
  'photography'
];

// Animals subjects
export const ANIMALS_SUBJECTS = [
  'bears',
  'cats',
  'kittens',
  'dogs',
  'puppies'
];

// Fiction subjects
export const FICTION_SUBJECTS = [
  'fantasy',
  'historical fiction',
  'horror',
  'humor',
  'literature',
  'magic',
  'mystery and detective stories',
  'plays',
  'poetry',
  'romance',
  'science fiction',
  'short stories',
  'thriller',
  'young adult fiction'
];

// Science & Mathematics subjects
export const SCIENCE_MATHEMATICS_SUBJECTS = [
  'biology',
  'chemistry',
  'mathematics',
  'physics',
  'programming'
];

// Business & Finance subjects
export const BUSINESS_FINANCE_SUBJECTS = [
  'management',
  'entrepreneurship',
  'business economics',
  'success in business',
  'finance'
];

// Children's subjects
export const CHILDRENS_SUBJECTS = [
  'juvenile fiction',
  'juvenile literature',
  'stories in rhyme',
  'infancy',
  'bedtime',
  'picture books'
];

// History subjects
export const HISTORY_SUBJECTS = [
  'ancient civilization',
  'archaeology',
  'anthropology',
  'world war ii',
  'Social Life and Customs'
];

// Health & Wellness subjects
export const HEALTH_WELLNESS_SUBJECTS = [
  'cooking',
  'cookbooks',
  'mental health',
  'exercise',
  'nutrition',
  'self-help'
];

// Biography subjects
export const BIOGRAPHY_SUBJECTS = [
  'biography',
  'autobiography',
  'history',
  'politics and government',
  'world war ii',
  'women',
  'kings and rulers',
  'composers',
  'artists'
];

// Social Sciences subjects
export const SOCIAL_SCIENCES_SUBJECTS = [
  'anthropology',
  'religion',
  'political science',
  'psychology'
];

// All subjects combined
export const SUBJECTS = [
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

// Map of main subjects to their sub-subjects
export const SUBJECT_MAP = {
  'Arts': ARTS_SUBJECTS,
  'Animals': ANIMALS_SUBJECTS,
  'Fiction': FICTION_SUBJECTS,
  'Science & Mathematics': SCIENCE_MATHEMATICS_SUBJECTS,
  'Business & Finance': BUSINESS_FINANCE_SUBJECTS,
  'Children\'s': CHILDRENS_SUBJECTS,
  'History': HISTORY_SUBJECTS,
  'Health & Wellness': HEALTH_WELLNESS_SUBJECTS,
  'Biography': BIOGRAPHY_SUBJECTS,
  'Social Sciences': SOCIAL_SCIENCES_SUBJECTS
};

// Helper function to get all subjects in a flat array
export const getAllSubjects = () => {
  return SUBJECTS;
};

// Helper function to get subject by path
export const getSubjectByPath = (path: string) => {
  return SUBJECTS.find(subject => subject === path);
};

// Helper function to get all subjects for a main category
export const getSubjectsByCategory = (category: string) => {
  return category in SUBJECT_MAP ? SUBJECT_MAP[category as keyof typeof SUBJECT_MAP] : [];
};

// Helper function to find which category a subject belongs to
export const getCategoryForSubject = (subject: string) => {
  for (const [category, subjects] of Object.entries(SUBJECT_MAP)) {
    if (subjects.includes(subject)) {
      return category;
    }
  }
  return null;
};