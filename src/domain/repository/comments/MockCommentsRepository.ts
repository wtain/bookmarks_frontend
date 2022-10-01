import CommentDto from '../../dto/CommentDto';
import ICommentsRepository from "./ICommentsRepository";

class MockCommentsRepository implements ICommentsRepository {

  private comments: CommentDto[];

  constructor() {
    this.comments = [
      {
        id: "1",
        created: new Date(),
        bookmarkId: "1",
        contents: "Test comment 1"
      },
      {
        id: "2",
        created: new Date(),
        bookmarkId: "1",
        contents: "Test comment 2"
      },
      {
        id: "3",
        created: new Date(),
        bookmarkId: "2",
        contents: "Test comment 3"
      }
    ];
  }

  async getComments(bookmarkId: string): Promise<CommentDto[]> {
    return this.comments.filter(comment => comment.bookmarkId == bookmarkId);
  }

  async addComment(comment: CommentDto): Promise<CommentDto> {
    this.comments = [...this.comments, comment];
    return comment;
  }

  async deleteComment(id: string): Promise<void> {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }

  async updateComment(comment: CommentDto): Promise<CommentDto> {
    this.comments = this.comments.map(c => c.id === comment.id ? comment : c);
    return comment;
  }

}

export default MockCommentsRepository;