
import React from "react";
import BookmarkDto from "../../dto/BookmarkDto";
import IBookmarksRepository from "./IBookmarksRepository";
import ReactHelpers from "../../../utils/ReactHelpers"
import BookmarkUtils from "../../../utils/BookmarkUtils";

class MockBookmarksRepository implements IBookmarksRepository {

    private bookmarks: BookmarkDto[];

    constructor() {
        this.bookmarks = Array.from(Array(20).keys()).map(i => 
            BookmarkUtils.createBookmark("Summary " + i, 
                "Contents " + i + "\nLorem ipsum\nLorem ipsum", 
                Array.from(Array(i).keys()).map(j => { 
                    return { ...BookmarkUtils.createNewTag(), name: "tag " + j }
                })
            ));
    }

    public async getBookmarks(): Promise<BookmarkDto[]> {
        await ReactHelpers.delay(300);
        return this.bookmarks;
    }

    async getBookmarksByTag(tag: string): Promise<BookmarkDto[]> {
        await ReactHelpers.delay(300);
        return this.bookmarks; // todo: implement
    }

    public async addBookmark(bookmark: BookmarkDto) {
        this.bookmarks = [...this.bookmarks, bookmark]
    }

    public async removeBookmark(bookmark: BookmarkDto) {
        this.bookmarks = this.bookmarks.filter(b => b.id != bookmark.id);
    }

    public async editBookmark(bookmark: BookmarkDto) {
        this.bookmarks = this.bookmarks.map(b => b.id === bookmark.id ? bookmark : b);
    }
}

export default MockBookmarksRepository;