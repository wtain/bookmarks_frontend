import CommentDto from '../../../domain/dto/CommentDto';
import BookmarkDto from '../../../domain/dto/BookmarkDto';
import Comment from '../Comment/Comment';

interface Props {
  bookmark: BookmarkDto;
  comments: CommentDto[];
}

const CommentList = (props: Props) => {

  // todo: style + tests + events

  return (
    <div>
      {props.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
  )

}

export default CommentList;