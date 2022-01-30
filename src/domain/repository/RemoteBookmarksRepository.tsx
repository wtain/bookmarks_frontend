import BookmarkDto from "../dto/BookmarkDto";
import IBookmarksRepository from "./IBookmarksRepository";
import axios from 'axios'
import { BOOKMARKS_ENDPOINT_ADD, BOOKMARKS_ENDPOINT_DELETE, BOOKMARKS_ENDPOINT_GET_ALL, BOOKMARKS_ENDPOINT_UPDATE } from "../../constants/backend";

class RemoteBookmarksRepository implements IBookmarksRepository {
    async getBookmarks(): Promise<BookmarkDto[]> {
        return axios.get<BookmarkDto[]>(BOOKMARKS_ENDPOINT_GET_ALL)
            .then((response) => response.data);
    }

    async addBookmark(bookmark: BookmarkDto) {
        axios.post(BOOKMARKS_ENDPOINT_ADD, bookmark);
    }

    async removeBookmark(bookmark: BookmarkDto) {
        axios.delete(BOOKMARKS_ENDPOINT_DELETE + bookmark.id);
    }

    async editBookmark(bookmark: BookmarkDto) {
        axios.put(BOOKMARKS_ENDPOINT_UPDATE, bookmark);
    }

}

export default RemoteBookmarksRepository;