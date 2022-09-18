
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import IBookmarksRepository from "../../domain/repository/bookmarks/IBookmarksRepository";
import RemoteBookmarksRepository from "../../domain/repository/bookmarks/RemoteBookmarksRepository";
import ITagsRepository from "../../domain/repository/tags/ITagsRepository";
import RemoteTagsBookmarksRepository from "../../domain/repository/tags/RemoteTagsRepository";
import BookmarksPage from "../../pages/BookmarksPage";
import CalendarPage from "../../pages/CalendarPage";
import TagsPage from "../../pages/TagsPage";
import RemoteDatesRepository from '../../domain/repository/dates/RemoteDatesRepository';

const AppRouter = () => {

    const bookmarksRepository: IBookmarksRepository = new RemoteBookmarksRepository();
    const tagsRepository: ITagsRepository = new RemoteTagsBookmarksRepository();
    const datesRepository = new RemoteDatesRepository();

    return (
        <Routes>
            <Route path="/bookmark/:id" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/bookmarks" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/bookmarks/:tag" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/date/:date" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/tags" element={<TagsPage tagsRepository={tagsRepository} />} />
            <Route path="/calendar" element={<CalendarPage datesRepository={datesRepository} />} />
            <Route path="/" element={<Navigate to="/bookmarks" />} />
        </Routes>
    )
}

export default AppRouter;