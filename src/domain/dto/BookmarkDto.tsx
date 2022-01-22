
import React from "react";
import TagDto from "./TagDto";

interface BookmarkDto {
    summary: string;
    contents: string;
    created: string;
    id: string;
    tags: TagDto[];
}

export default BookmarkDto;