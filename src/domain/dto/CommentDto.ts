import BaseEntity from '../repository/BaseEntity';

interface CommentDto extends BaseEntity {
  bookmarkId: string;
  contents: string;
}

export default CommentDto;