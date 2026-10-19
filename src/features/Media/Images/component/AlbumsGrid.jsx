const AlbumsGrid = ({ albums, onOpenAlbum }) => {
  const list = Array.isArray(albums) ? albums : albums?.data ?? [];

  if (!list.length) {
    return (
      <div className="text-gray-500 text-center py-10">لا توجد ألبومات</div>
    );
  }

  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((album) => {
        const cover = album.image || album.cover;
        return (
          <div
            key={album.id}
            onClick={() => onOpenAlbum(album)}
            className="group flex flex-col cursor-pointer transition-transform duration-300"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1a2235] border border-gray-200">
              {cover ? (
                <img
                  src={cover}
                  alt={album.name}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  لا توجد صورة
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-secondary group-hover:text-[#0f172a] transition-colors">
                {album.name}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumsGrid;