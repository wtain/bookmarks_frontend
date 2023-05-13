import CommentDto from "../../dto/CommentDto";
// import IEntityRepository from '../IEntityRepository';

// extends IEntityRepository<CommentDto>
interface ICommentsRepository {
  // bookmarkId: string
  getComments: (bookmarkId: string) => Promise<CommentDto[]>;
  
  addComment: (comment: CommentDto) => Promise<CommentDto>;

  deleteComment: (id: string) => Promise<void>;

  updateComment: (comment: CommentDto) => Promise<CommentDto>;
}

export default ICommentsRepository;