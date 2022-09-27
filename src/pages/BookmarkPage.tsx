import IBookmarksRepository from "../domain/repository/bookmarks/IBookmarksRepository";
import BookmarkDto from '../domain/dto/BookmarkDto';
import { useEffect, useState } from "react";
import Bookmark from "../components/UI/Bookmark/Bookmark";
import { useParams } from "react-router-dom";
import CommentList from "../components/UI/CommentList/CommentList";
import CommentDto from "../domain/dto/CommentDto";
import ICommentsRepository from '../domain/repository/comments/ICommentsRepository';
import CommentEditor from "../components/UI/CommentEditor/CommentEditor";
import {v4 as uuidv4} from 'uuid';

interface Props {
  bookmarksRepository: IBookmarksRepository;
  commentsRepository: ICommentsRepository;
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
      const comments = await props.commentsRepository.getComments(bookmarkId!);
      setComments(comments);
    })()
  }, []);

  const doUpdatePoll = async () => {
    setComments(
      await props.commentsRepository.getComments(bookmarkId!)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => doUpdatePoll(), 20 * 1000);
    return () => clearInterval(interval);
  }, [bookmarkId]);
  
  // todo: separate component for comment editor textarea
  // todo: edit comments

  if (bookmark !== undefined) {
    return (
      <div>
        <Bookmark bookmark={bookmark} showExpanded={true} />
        <CommentList bookmark={bookmark} comments={comments} />
        <CommentEditor onDone={(commentText: string) => {
          // todo: Check result
          // todo: reuse this component in bookmarkform

          (async function () {
            await props.commentsRepository.addComment({
              bookmarkId: bookmarkId!,
              contents: commentText,
              id: uuidv4(), 
              created: new Date()
            });
            doUpdatePoll();
          })();
          
        }} />
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