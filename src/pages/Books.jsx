import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
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
  if (booksPageDataLoading || booksDataLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <div className="container5 mx-auto">
        <BooksHeader booksPageData={booksPageData} />
        <BooksGrid booksData={booksData} />
      </div>
    </div>
  );
};
export default Books;
