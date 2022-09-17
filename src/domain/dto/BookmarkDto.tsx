
import TagDto from "./TagDto";

interface BookmarkDto {
    summary: string;
    contents: string;
    created: Date;
    updated?: Date;
    id: string;
    tags: TagDto[];
    isDone: boolean;
}

export default BookmarkDto;