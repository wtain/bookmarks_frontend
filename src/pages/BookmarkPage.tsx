import IBookmarksRepository from "../domain/repository/bookmarks/IBookmarksRepository";
import BookmarkDto from '../domain/dto/BookmarkDto';
import { useEffect, useState } from "react";
import Bookmark from "../components/UI/Bookmark/Bookmark";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/UI/CommentList/CommentList";
import CommentDto from "../domain/dto/CommentDto";
import ICommentsRepository from '../domain/repository/comments/ICommentsRepository';
import CommentEditor from "../components/UI/CommentEditor/CommentEditor";
import {v4 as uuidv4} from 'uuid';
import TagDto from "../domain/dto/TagDto";

interface Props {
  bookmarksRepository: IBookmarksRepository;
  commentsRepository: ICommentsRepository;
  // copied from BookmarkList
  // todo: at least derive interface
  // onRemoveBookmark?: (bm: BookmarkDto) => void;
  // onBookmarkContentsChanged?: (bm: BookmarkDto, new_contents: string) => void;
  // onBookmarkSummaryChanged?: (bm: BookmarkDto, new_summary: string) => void;
  // onBookmarkTagAdded?: (bm: BookmarkDto, new_tag: TagDto) => void;
  // onBookmarkTagRemoved?: (bm: BookmarkDto, index: number) => void;
  // onBookmarkIsDoneChanged?: (bm: BookmarkDto, new_value: boolean) => void;
}

const BookmarkPage = (props: Props) => {

  const navigate = useNavigate();

  const { bookmarkId } = useParams();

  const [bookmark, setBookmark] = useState<BookmarkDto>();
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    doUpdatePollBookmark()
  }, []);

  const doUpdatePollBookmark = async () => {
    const bookmark = await props.bookmarksRepository.getBookmark(bookmarkId!);
      setBookmark(bookmark);
  };

  // todo: factory for comments repository? to be created from bookmarks repository??
  useEffect(() => {
    doUpdatePoll()
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
        {
        // handlers copied from BookmarkList
        }
        <Bookmark bookmark={bookmark} showExpanded={true}
          doRemove={async (bm: BookmarkDto) => {
            await props.bookmarksRepository.removeBookmark(bm);
            navigate("/bookmarks")
          }}
          doChangeContents={async (new_contents: string) => {
            await props.bookmarksRepository.editBookmark({...bookmark, contents: new_contents, updated: new Date()});
            doUpdatePollBookmark();
          }}
          doChangeSummary={async (new_summary: string) => {
            await props.bookmarksRepository.editBookmark({...bookmark, summary: new_summary, updated: new Date()});
            doUpdatePollBookmark();
          }}
          doAddTag={async (tag: TagDto) => {
            await props.bookmarksRepository.editBookmark({...bookmark, tags: [...bookmark.tags, tag], updated: new Date()});
            doUpdatePollBookmark();
          }}
          doRemoveTag={async (index: number) => {
            await props.bookmarksRepository.editBookmark({...bookmark, tags: bookmark.tags.filter((v, i) => i !== index), updated: new Date()});
            doUpdatePollBookmark();
          }}
          doChangeIsDone={async (new_value: boolean) => {
            await props.bookmarksRepository.editBookmark({...bookmark, isDone: new_value, updated: new Date()});
            doUpdatePollBookmark();
          }}
        
        />
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