
import React from "react";
import BookmarkDto from "../dto/BookmarkDto";

interface IBookmarksRepository {
    getBookmarks: () => Promise<BookmarkDto[]>;

    addBookmark: (bookmark: BookmarkDto) => void;

    removeBookmark: (bookmark: BookmarkDto) => void;

    editBookmark: (bookmark: BookmarkDto) => void;
}

export default IBookmarksRepository;