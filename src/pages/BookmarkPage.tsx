import IBookmarksRepository from "../domain/repository/bookmarks/IBookmarksRepository";
import BookmarkDto from '../domain/dto/BookmarkDto';
import { useEffect, useState } from "react";
import Bookmark from "../components/UI/Bookmark/Bookmark";
import { useParams } from "react-router-dom";

interface Props {
  bookmarksRepository: IBookmarksRepository;
  // commentsRepository: 
}

const BookmarkPage = (props: Props) => {

  const { bookmarkId } = useParams();

  const [bookmark, setBookmark] = useState<BookmarkDto>();

  useEffect(() => {
    (async function () {
      const bookmark = await props.bookmarksRepository.getBookmark(bookmarkId!);
      setBookmark(bookmark);
    })()
  }, []);

  if (bookmark !== undefined) {
    return (
      <Bookmark bookmark={bookmark} showExpanded={true} />
    )
  }
  return (
    <div>(Not found)</div>
  )
  // todo: + comments list + add comment form
  // todo: snapshot test
}

export default BookmarkPage;