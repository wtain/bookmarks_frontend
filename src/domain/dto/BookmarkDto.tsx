
import TagDto from "./TagDto";

interface BookmarkDto {
    summary: string;
    contents: string;
    created: string;
    updated?: string;
    id: string;
    tags: TagDto[];
    isDone: boolean;
}

export default BookmarkDto;