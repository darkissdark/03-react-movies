import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  async function action(formData: FormData) {
    const getQuery = formData.get("query");
    if (typeof getQuery !== "string") {
      toast("Expected query to be a string.");
      return;
    }

    const query = getQuery.trim();
    if (!query) {
      toast("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={action}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
      <Toaster />
    </header>
  );
}

export default SearchBar;
