import IBookmarksRepository from "../domain/repository/bookmarks/IBookmarksRepository";
import BookmarkDto from '../domain/dto/BookmarkDto';
import { useEffect, useState } from "react";
import Bookmark from "../components/UI/Bookmark/Bookmark";
import { useParams } from "react-router-dom";
import CommentList from "../components/UI/CommentList/CommentList";
import CommentDto from "../domain/dto/CommentDto";
import ICommentsRepository from '../domain/repository/comments/ICommentsRepository';

interface Props {
  bookmarksRepository: IBookmarksRepository;
  // commentsRepository: ICommentsRepository;
}

const BookmarkPage = (props: Props) => {

  const { bookmarkId } = useParams();

  const [bookmark, setBookmark] = useState<BookmarkDto>();
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    (async function () {
      const bookmark = await props.bookmarksRepository.getBookmark(bookmarkId!);
      setBookmark(bookmark);
    })()
  }, []);

  // todo: factory for comments repository? to be created from bookmarks repository??
  useEffect(() => {
    (async function () {
      const bookmark = await props.bookmarksRepository.getBookmark(bookmarkId!);
      setBookmark(bookmark);
    })()
  }, []);

  // todo: background refresh

  if (bookmark !== undefined) {
    return (
      <div>
        <Bookmark bookmark={bookmark} showExpanded={true} />
        <CommentList bookmark={bookmark} comments={comments} />
      </div>
    )
  }
  return (
    <div>(Not found)</div>
  )
  // todo: + comments list + add comment form
  // todo: snapshot test
}

export default BookmarkPage;