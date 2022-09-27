import CommentDto from '../../../domain/dto/CommentDto';
import cl from './Comment.module.css'

interface Props {
  comment: CommentDto;
}

const Comment = (props: Props) => {

  // todo: created & updated + style + tests + events

  return (
    <div className={cl.comment}>
      {props.comment.contents}
    </div>
  )

}

export default Comment;