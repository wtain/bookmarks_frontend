import React from "react";
import cl from './CommentEditor.module.css'

interface Props {
  onDone?: (comment: string) => void;
}

const CommentEditor: React.FC<Props> = (props: Props) => {

  const [commentText, setCommentText] = React.useState("");

  return (
    <div className={cl.textarea_wrapper}>
      <textarea rows={3}
          placeholder="Comment here" 
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
          onKeyDown={(e) => {
              if (e.ctrlKey && e.code === "Enter") {
                props.onDone!(commentText);
                setCommentText("");
                e.stopPropagation();
              }
          }}
          className={cl.textarea}
        />    
      </div>
  )
};

export default CommentEditor;