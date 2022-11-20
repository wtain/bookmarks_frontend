
import BookmarkDto from "../../../../domain/dto/BookmarkDto";
import cl from '../Bookmark.module.css'

interface Props {
    onClick: () => void;
    bookmark: BookmarkDto;
}

const BookmarkStatic = (props: Props) => {

    return (
        <div className={cl.contents}
            onClick={props.onClick}>
            {props.bookmark.contents}
        </div>
    )
}

export default BookmarkStatic