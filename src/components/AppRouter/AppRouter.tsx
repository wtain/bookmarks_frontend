
import React from "react";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import IBookmarksRepository from "../../domain/repository/bookmarks/IBookmarksRepository";
import MockBookmarksRepository from "../../domain/repository/bookmarks/MockBookmarksRepository";
import RemoteBookmarksRepository from "../../domain/repository/bookmarks/RemoteBookmarksRepository";
import ITagsRepository from "../../domain/repository/tags/ITagsRepository";
import RemoteTagsBookmarksRepository from "../../domain/repository/tags/RemoteTagsRepository";
import BookmarksPage from "../../pages/BookmarksPage";
import CalendarPage from "../../pages/CalendarPage";
import TagsPage from "../../pages/TagsPage";

const AppRouter = () => {

    // const bookmarksRepository: IBookmarksRepository = new MockBookmarksRepository();

    const bookmarksRepository: IBookmarksRepository = new RemoteBookmarksRepository();
    const tagsRepository: ITagsRepository = new RemoteTagsBookmarksRepository();

    return (
        <Routes>
            <Route path="/bookmark/:id" element={<BookmarksPage bookmarksRepository={bookmarksRepository} />} />
            <Route path="/bookmarks" element={<BookmarksPage bookmarksRepository={bookmarksRepository} />} />
            <Route path="/bookmarks/:tag" element={<BookmarksPage bookmarksRepository={bookmarksRepository} />} />
            <Route path="/tags" element={<TagsPage tagsRepository={tagsRepository} />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/" element={<Navigate to="/bookmarks" />} />
        </Routes>
    )
}

export default AppRouter;