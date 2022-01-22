
import React from "react";
import BookmarkDto from "../dto/BookmarkDto";
import IBookmarksRepository from "./IBookmarksRepository";
import ReactHelpers from "../../utils/ReactHelpers"
import BookmarkUtils from "../../utils/BookmarkUtils";

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

    public async addBookmark(bookmark: BookmarkDto) {
        // this.bookmarks.push(bookmark);
        this.bookmarks = [...this.bookmarks, bookmark]
    }

    public async removeBookmark(bookmark: BookmarkDto) {
        // let index = this.bookmarks.indexOf(bookmark);
        // if (index !== -1) {
        //     this.bookmarks.splice(index, 1);
        // }
        this.bookmarks = this.bookmarks.filter(b => b.id != bookmark.id);
        // console.log("Removing " + bookmark.id)
        // console.log("Removing " + this.bookmarks.length)
        // this.bookmarks = this.bookmarks.filter(b => b.id != bookmark.id);
        // console.log("Removing " + this.bookmarks.length)
    }

    public async editBookmark(bookmark: BookmarkDto) {
        this.bookmarks = this.bookmarks.map(b => b.id === bookmark.id ? bookmark : b);
    }
}

export default MockBookmarksRepository;