export interface LectureLists {
  listId: string;
  userId: string;
  name: string;
  description: string;
  type: "main" | "liked" | "custom"; // Type of the list
}