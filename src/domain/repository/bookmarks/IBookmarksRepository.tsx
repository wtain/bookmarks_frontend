
import BookmarkDto from "../../dto/BookmarkDto";
import BookmarksFilterDto from "../../dto/BookmarksFilterDto";

interface IBookmarksRepository {
    getBookmarks: () => Promise<BookmarkDto[]>;

    getBookmark: (id: string) => Promise<BookmarkDto>;

    getBookmarksByTag: (tag: string) => Promise<BookmarkDto[]>;

    getBookmarksByDate: (date: Date) => Promise<BookmarkDto[]>;

    addBookmark: (bookmark: BookmarkDto) => Promise<void>;

    removeBookmark: (bookmark: BookmarkDto) => Promise<void>;

    editBookmark: (bookmark: BookmarkDto) => Promise<void>;

    searchBookmarks: (query: string) => Promise<BookmarkDto[]>;

    filterBookmarks: (filter: BookmarksFilterDto) => Promise<BookmarkDto[]>;
}

export default IBookmarksRepository;