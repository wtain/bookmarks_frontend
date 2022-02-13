
import React from "react";
import BookmarkDto from "../../dto/BookmarkDto";

interface IBookmarksRepository {
    getBookmarks: () => Promise<BookmarkDto[]>;

    getBookmarksByTag: (tag: string) => Promise<BookmarkDto[]>;

    addBookmark: (bookmark: BookmarkDto) => Promise<void>;

    removeBookmark: (bookmark: BookmarkDto) => Promise<void>;

    editBookmark: (bookmark: BookmarkDto) => Promise<void>;
}

export default IBookmarksRepository;