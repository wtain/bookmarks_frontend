import CommentDto from "../../dto/CommentDto";
import IEntityRepository from '../IEntityRepository';

interface ICommentsRepository extends IEntityRepository<CommentDto> {
  getComments: () => Promise<CommentDto[]>;
  
  addComment: (comment: CommentDto) => Promise<CommentDto>;

  deleteComment: (id: string) => Promise<void>;

  updateComment: (comment: CommentDto) => Promise<CommentDto>;
}

export default ICommentsRepository;