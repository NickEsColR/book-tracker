# Book Tracker

Book Tracker is a web application designed to help you manage and track your favorite books. Built with Astro, this application allows users to add books to their reading list, view book details, and manage their reading progress.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CardBook.astro
│   │   ├── DialogBookForm.astro
│   │   └── GridBooks.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── store/
│       ├── bookDialog.store.ts
│       └── lectureList.store.ts
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`                 | Starts local dev server at `localhost:4321`      |
| `bun build`               | Build your production site to `./dist/`          |
| `bun preview`             | Preview your build locally, before deploying     |
| `bun astro ...`           | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help`     | Get help using the Astro CLI                     |

## 📚 Features

- **Add books to the reading list**: Allows users to add books to their reading list.
- **View book details**: Displays detailed information about each book, including author, genre, publication year, and number of pages.
- **Manage reading progress**: Users can update their reading progress and save this information to local storage.
- **Intuitive user interface**: A clean and easy-to-use user interface, built with reusable Astro components.

## 🔮 Future Features

- **Download and upload lecture list**: Allow users to download books in the list and upload it to persist their collection.
- **Use OpenLibrary API to get books**: Increase the books pool by using the API provided by Open Library.
- **Social features**: Enable users to share their reading lists and progress with friends.
- **Advanced search**: Implement advanced search functionality to filter books by various criteria.
- **Sign Up**: Allow users to create an account to manage the lecture list, preferences and get suggestions.

## 🛠️ Technologies Used

- **Astro**: A modern framework for building fast, optimized websites.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Bun**: A new, fast, and modern package manager.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## 🤝 Contributing

Contributions are welcome. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## 📧 Contact

If you have any questions or suggestions, feel free to contact me
Thank you for using Book Tracker!
