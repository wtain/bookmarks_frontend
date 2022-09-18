
interface CommentDto {
  created: Date;
  updated?: Date;
  id: string;
  bookmarkId: string;
  contents: string;
}

export default CommentDto;