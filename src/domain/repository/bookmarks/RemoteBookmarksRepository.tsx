import BookmarkDto from "../../dto/BookmarkDto";
import IBookmarksRepository from "./IBookmarksRepository";
import axios from 'axios'
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_BASE, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_GET_ALL, BOOKMARKS_ENDPOINT_GET_BY_TAG, BOOKMARKS_ENDPOINT_UPDATE } from "../../../constants/backend";

class RemoteBookmarksRepository implements IBookmarksRepository {

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
        return await axios.get<BookmarkDto>(BOOKMARKS_ENDPOINT_BASE + "/" + id)
            .then((response) => RemoteBookmarksRepository.convertBookmark(response.data));
    }

    async getBookmarksByTag(tag: string): Promise<BookmarkDto[]> {
        return await axios.get<BookmarkDto[]>(BOOKMARKS_ENDPOINT_GET_BY_TAG + tag)
            .then((response) => RemoteBookmarksRepository.convertBookmarks(response.data));
    }

    async addBookmark(bookmark: BookmarkDto) {
        await axios.post(BOOKMARKS_ENDPOINT_ADD, bookmark);
    }

    async removeBookmark(bookmark: BookmarkDto) {
        await axios.delete(BOOKMARKS_ENDPOINT_DELETE + bookmark.id);
    }

    async editBookmark(bookmark: BookmarkDto) {
        await axios.put(BOOKMARKS_ENDPOINT_UPDATE, bookmark);
    }

}

export default RemoteBookmarksRepository;