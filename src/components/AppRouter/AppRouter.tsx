
import { Navigate, Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import IBookmarksRepository from "../../domain/repository/bookmarks/IBookmarksRepository";
import RemoteBookmarksRepository from "../../domain/repository/bookmarks/RemoteBookmarksRepository";
import ITagsRepository from "../../domain/repository/tags/ITagsRepository";
import RemoteTagsBookmarksRepository from "../../domain/repository/tags/RemoteTagsRepository";
import BookmarksPage from "../../pages/BookmarksPage";
import CalendarPage from "../../pages/CalendarPage";
import TagsPage from "../../pages/TagsPage";
import RemoteDatesRepository from '../../domain/repository/dates/RemoteDatesRepository';
import BookmarkPage from "../../pages/BookmarkPage";
import ICommentsRepository from '../../domain/repository/comments/ICommentsRepository';
import RemoteCommentsRepository from '../../domain/repository/comments/RemoteCommentsRepository';
import BookmarksViewPage from "../../pages/BookmarksViewPage";
import BaseEntityRepository from "../../domain/repository/BaseEntityRepository";
import UserDto from "../../domain/dto/UserDto";
import { USERS_ENDPOINT_ADD, USERS_ENDPOINT_DELETE, USERS_ENDPOINT_EDIT, USERS_ENDPOINT_GETBYID, USERS_ENDPOINT_LIST } from "../../constants/backend";
import UsersPage from "../../pages/UsersPage";
import AuthService from "../../services/AuthService";
import LoginPage from "../../pages/LoginPage";

const AppRouter = () => {

    const navigate = useNavigate();

    const authService = AuthService;

    if (!authService.isLoggedIn()) {
        // navigate("/login");
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )
    }

    const bookmarksRepository: IBookmarksRepository = new RemoteBookmarksRepository();
    const tagsRepository: ITagsRepository = new RemoteTagsBookmarksRepository();
    const commentsRepository: ICommentsRepository = new RemoteCommentsRepository();
    const datesRepository = new RemoteDatesRepository();
    const usersRepository = new BaseEntityRepository<UserDto>({
        listEndpoint: () => {
            return USERS_ENDPOINT_LIST;
        },
  
        getEndpoint: (id: string) => {
            return USERS_ENDPOINT_GETBYID + id;
        },

        createEndpoint: () => {
            return USERS_ENDPOINT_ADD;
        },

        updateEndpoint: (id: string) => {
            return USERS_ENDPOINT_EDIT;
        },
        
        deleteEndpoint: (id: string) => {
            return USERS_ENDPOINT_DELETE;
        }
    });

    return (
        <Routes>
            <Route path="/user/:d" element={<UsersPage usersRepository={usersRepository} />} />
            <Route path="/users" element={<UsersPage usersRepository={usersRepository} />} />
            <Route path="/bookmark/:bookmarkId" element={<BookmarkPage bookmarksRepository={bookmarksRepository} commentsRepository={commentsRepository} />} />
            <Route path="/bookmarks" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/bookmarks/:tag" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/search/:searchQuery" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/filter" element={<BookmarksViewPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/date/:date" element={<BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />} />
            <Route path="/tags" element={<TagsPage tagsRepository={tagsRepository} />} />
            <Route path="/calendar" element={<CalendarPage datesRepository={datesRepository} />} />
            <Route path="/" element={<Navigate to="/bookmarks" />} />
        </Routes>
    )
}

export default AppRouter;