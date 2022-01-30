
import React from "react";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import IBookmarksRepository from "../../domain/repository/IBookmarksRepository";
import MockBookmarksRepository from "../../domain/repository/MockBookmarksRepository";
import RemoteBookmarksRepository from "../../domain/repository/RemoteBookmarksRepository";
import BookmarksPage from "../../pages/BookmarksPage";
import TagsPage from "../../pages/TagsPage";

const AppRouter = () => {

    // const bookmarksRepository: IBookmarksRepository = new MockBookmarksRepository();

    const bookmarksRepository: IBookmarksRepository = new RemoteBookmarksRepository();

    return (
        <Routes>
            <Route path="/bookmarks" element={<BookmarksPage bookmarksRepository={bookmarksRepository} />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/" element={<Navigate to="/bookmarks" />} />
        </Routes>
    )
}

export default AppRouter;