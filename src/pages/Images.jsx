import { useEffect, useState } from "react";
import {
  useFetchImagesCategory,
  useFetchImages,
} from "../features/Media/Images/hook/useFetchImages";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import AlbumsGrid from "../features/Media/Images/component/AlbumsGrid";
import AlbumGallery from "../features/Media/Images/component/AlbumGallery";
import ImageLightbox from "../features/Media/Images/component/ImageLightbox";



const Images = () => {
  const {
    data: imagesCategoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useFetchImagesCategory();

  const [activeAlbum, setActiveAlbum] = useState(null);
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isFetching: isImagesFetching,
  } = useFetchImages({
    id: activeAlbum?.id,
    page,
    enabled: !!activeAlbum,
  });

  useEffect(() => {
    if (!imagesData) return;
    const list = Array.isArray(imagesData)
      ? imagesData
      : imagesData?.data ?? [];
    const meta = imagesData?.meta;
    const more =
      meta?.current_page != null && meta?.last_page != null
        ? meta.current_page < meta.last_page
        : list.length >= (meta?.per_page ?? 12);

    setHasMore(more);

    if (page === 1) {
      setGalleryImages(list);
    } else {
      setGalleryImages((prev) => {
        const seen = new Set(prev.map((i) => i.id));
        return [...prev, ...list.filter((i) => !seen.has(i.id))];
      });
    }
  }, [imagesData, page]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeAlbum]);

  if (isCategoryLoading) return <Loader />;
  if (categoryError) return <ErrorMessageNetwork />;

  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet title="Albums" description="Photo Albums" />
        <div className="container4 mx-auto mt-[2rem] lg:mt-[6rem] pb-20">
          {!activeAlbum && (
            <AlbumsGrid
              albums={imagesCategoryData}
              onOpenAlbum={(album) => {
                setActiveAlbum(album);
                setPage(1);
                setGalleryImages([]);
              }}
            />
          )}

          {activeAlbum && (
            <AlbumGallery
              album={activeAlbum}
              onBack={() => setActiveAlbum(null)}
              images={galleryImages}
              isLoading={isImagesLoading && page === 1}
              isFetching={isImagesFetching}
              hasMore={hasMore}
              onLoadMore={() => setPage((p) => p + 1)}
              onImageClick={(index) => setLightboxIndex(index)}
            />
          )}
        </div>

        {lightboxIndex !== null && galleryImages.length > 0 && (
          <ImageLightbox
            images={galleryImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </HelmetProvider>
    </div>
  );
};

export default Images;