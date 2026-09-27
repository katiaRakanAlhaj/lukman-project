import BooksGrid from "../features/Books/component/booksGrid";
import BooksHeader from "../features/Books/component/booksHeader";
import {
  useFetchBooks,
  useFetchBooksPage,
} from "../features/Books/hook/useFetchBooks";

const Books = () => {
  const {
    data: booksPageData,
    isLoading: booksPageDataLoading,
    error: booksPageDataError,
  } = useFetchBooksPage();

  const {
    data: booksData,
    isLoading: booksDataLoading,
    error: booksDataError,
  } = useFetchBooks();
  return (
    <div className="container5 mx-auto">
      <BooksHeader booksPageData = {booksPageData}/>
      <BooksGrid booksData = {booksData}/>
    </div>
  );
};
export default Books;
