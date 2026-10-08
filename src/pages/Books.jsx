import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import BooksGrid from "../features/Books/component/booksGrid";
import BooksHeader from "../features/Books/component/booksHeader";
import {
  useFetchBooks,
  useFetchBooksPage,
} from "../features/Books/hook/useFetchBooks";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

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
      <HelmetProvider>
        <MetaHelmet
          title={booksPageData?.data?.meta_title}
          description={booksPageData?.data?.meta_description}
        />
        <div className="container5 mx-auto">
          <BooksHeader booksPageData={booksPageData} />
          <BooksGrid booksData={booksData} />
        </div>
      </HelmetProvider>
    </div>
  );
};
export default Books;
