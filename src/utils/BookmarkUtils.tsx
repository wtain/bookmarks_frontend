
import React from "react";
import BookmarkDto from "../domain/dto/BookmarkDto";
import {v4 as uuidv4} from 'uuid';
import TagDto from "../domain/dto/TagDto";

const createBookmark = (summary: string, contents: string, tags: TagDto[]): BookmarkDto => {
    return {
                summary, 
                contents, 
                id: uuidv4(), 
                created: new Date().toLocaleString(),
                tags
            }
}

const createNewTag = (): TagDto => {
    return { name: "", id: uuidv4() }
}

const BookmarkUtils = { createBookmark, createNewTag };

export default BookmarkUtils;