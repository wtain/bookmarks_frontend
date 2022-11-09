import BookmarkDto from "../../dto/BookmarkDto";
import IBookmarksRepository from "./IBookmarksRepository";
import axios from 'axios'
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_GET_ALL, BOOKMARKS_ENDPOINT_GET_BY_DATE, BOOKMARKS_ENDPOINT_GET_BY_ID, BOOKMARKS_ENDPOINT_GET_BY_TAG, BOOKMARKS_ENDPOINT_SEARCH, BOOKMARKS_ENDPOINT_UPDATE, BOOKMARKS_ENDPOINT_FILTER } from '../../../constants/backend';
import BookmarksFilterDto from "../../dto/BookmarksFilterDto";
import FilterResultDto from "../../dto/FilterResultDto";

class RemoteBookmarksRepository implements IBookmarksRepository {
    
    // todo: No longer required?
    private static convertBookmark(bm: BookmarkDto) {
        return {
            ...bm,
            created: new Date(bm.created),
            updated: bm.updated ? new Date(bm.updated) : undefined
        };
    }

    private static convertBookmarks(data: BookmarkDto[]) {
        return data.map(RemoteBookmarksRepository.convertBookmark);
    }

    async getBookmarks(): Promise<BookmarkDto[]> {
        return await axios.get<BookmarkDto[]>(BOOKMARKS_ENDPOINT_GET_ALL)
            .then((response) => RemoteBookmarksRepository.convertBookmarks(response.data));
    }

    async getBookmark(id: string): Promise<BookmarkDto> {
        return await axios.get<BookmarkDto>(BOOKMARKS_ENDPOINT_GET_BY_ID + id)
            .then((response) => RemoteBookmarksRepository.convertBookmark(response.data));
    }

    async getBookmarksByTag(tag: string): Promise<BookmarkDto[]> {
        return await axios.get<BookmarkDto[]>(BOOKMARKS_ENDPOINT_GET_BY_TAG + tag)
            .then((response) => RemoteBookmarksRepository.convertBookmarks(response.data));
    }

    async getBookmarksByDate(date: Date): Promise<BookmarkDto[]> {
        return await axios.get<BookmarkDto[]>(BOOKMARKS_ENDPOINT_GET_BY_DATE + date.toISOString())
            .then((response) => RemoteBookmarksRepository.convertBookmarks(response.data));
    }

    async addBookmark(bookmark: BookmarkDto) {
        await axios.post(BOOKMARKS_ENDPOINT_ADD, bookmark);
    }

    async removeBookmark(bookmark: BookmarkDto) {
        // todo: return value
        // todo: cascade delete
        await axios.delete(BOOKMARKS_ENDPOINT_DELETE + bookmark.id);
    }

    async editBookmark(bookmark: BookmarkDto) {
        await axios.put(BOOKMARKS_ENDPOINT_UPDATE, bookmark);
    }

    // todo: get rid of convertBookmarks

    async searchBookmarks(query: string): Promise<BookmarkDto[]> {
        return await axios.get<BookmarkDto[]>(BOOKMARKS_ENDPOINT_SEARCH + query)
            .then((response) => RemoteBookmarksRepository.convertBookmarks(response.data));
    }

    async filterBookmarks(filter: BookmarksFilterDto): Promise<FilterResultDto> {
        return await axios.post<FilterResultDto>(BOOKMARKS_ENDPOINT_FILTER,
            filter)
            .then((response) => {
                return {
                    bookmarks: RemoteBookmarksRepository.convertBookmarks(response.data.bookmarks),
                    count: response.data.count
                }
            });
    }
}

export default RemoteBookmarksRepository;