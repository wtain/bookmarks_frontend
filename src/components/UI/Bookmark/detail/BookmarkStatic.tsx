
import BookmarkDto from "../../../../domain/dto/BookmarkDto";
import cl from '../Bookmark.module.css'

interface Props {
    onlClick: () => void;
    bookmark: BookmarkDto;
}

const BookmarkStatic = (props: Props) => {

    return (
        <div className={cl.contents} 
            onClick={props.onlClick}>
            {props.bookmark.contents} 
        </div>
    )
}

export default BookmarkStatic