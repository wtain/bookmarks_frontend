
import React from "react";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import IBookmarksRepository from "../../domain/repository/IBookmarksRepository";
import MockBookmarksRepository from "../../domain/repository/MockBookmarksRepository";
import BookmarksPage from "../../pages/BookmarksPage";

const AppRouter = () => {

    const bookmarksRepository: IBookmarksRepository = new MockBookmarksRepository();

    return (
        <Routes>
            <Route path="/bookmarks" element={<BookmarksPage bookmarksRepository={bookmarksRepository} />} />
            <Route path="*" element={<Navigate to="/bookmarks" />} />
        </Routes>
    )
}

export default AppRouter;