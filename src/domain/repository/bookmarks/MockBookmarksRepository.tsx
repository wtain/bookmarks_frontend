
import BookmarkDto from "../../dto/BookmarkDto";
import IBookmarksRepository from "./IBookmarksRepository";
import BookmarkUtils from "../../../utils/BookmarkUtils";
import BookmarksFilterDto from "../../dto/BookmarksFilterDto";
import FilterResultDto from "../../dto/FilterResultDto";

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
    
    async getBookmark(id: string): Promise<BookmarkDto> {
        // todo: implement
        return this.bookmarks[0];
    }

    public async getBookmarks(): Promise<BookmarkDto[]> {
        return this.bookmarks;
    }

    async getBookmarksByTag(tag: string): Promise<BookmarkDto[]> {
        return this.bookmarks; // todo: implement
    }

    async getBookmarksByDate(date: Date): Promise<BookmarkDto[]> {
        return this.bookmarks; // todo: implement
    }

    public async addBookmark(bookmark: BookmarkDto) {
        this.bookmarks = [...this.bookmarks, bookmark]
    }

    public async removeBookmark(bookmark: BookmarkDto) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== bookmark.id);
    }

    public async editBookmark(bookmark: BookmarkDto) {
        this.bookmarks = this.bookmarks.map(b => b.id === bookmark.id ? bookmark : b);
    }

    public async searchBookmarks(query: string): Promise<BookmarkDto[]> {
        return this.bookmarks.filter(b => b.contents.includes(query) || b.summary.includes(query));
    }

    public async filterBookmarks(filter: BookmarksFilterDto): Promise<FilterResultDto> {
        // todo: implement
        return {
            bookmarks: this.bookmarks.filter(b => b.contents.includes(filter.description!) || b.summary.includes(filter.summary!)),
            count: this.bookmarks.length
        };
    }
}

export default MockBookmarksRepository;