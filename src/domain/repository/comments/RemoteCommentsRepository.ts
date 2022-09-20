import { BOOKMARKS_ENDPOINT_GET_BY_ID, COMMENTS_ENDPOINTS_BASE, COMMENTS_ENDPOINTS_DELETE_BY_ID, COMMENTS_ENDPOINTS_GET_BY_ID, COMMENTS_ENDPOINTS_UPDATE_BY_ID } from '../../../constants/backend';
import CommentDto from '../../dto/CommentDto';
import BaseEntityRepository from '../BaseEntityRepository';
import ICommentsRepository from './ICommentsRepository';

class RemoteCommentsRepository extends BaseEntityRepository<CommentDto>
                               implements ICommentsRepository {

  public constructor(bookmarkId: string) {
    super({
      listEndpoint: () => { return BOOKMARKS_ENDPOINT_GET_BY_ID + bookmarkId + "/comments"},
  
      getEndpoint: (id: string) => { return COMMENTS_ENDPOINTS_GET_BY_ID + id; },

      createEndpoint: () => { return COMMENTS_ENDPOINTS_BASE },

      updateEndpoint: (id: string) => { return COMMENTS_ENDPOINTS_UPDATE_BY_ID + id; },
  
      deleteEndpoint: (id: string) => { return COMMENTS_ENDPOINTS_DELETE_BY_ID + id; },
    });
  }

  public async getComments(): Promise<CommentDto[]> {
    return this.list()
  }

  public async addComment(comment: CommentDto): Promise<CommentDto> {
    return this.create(comment);
  }

  public async deleteComment(id: string): Promise<void> {
    return this.delete(id);
  }
  
  public async updateComment(comment: CommentDto): Promise<CommentDto> {
    return this.update(comment);
  }

}

export default RemoteCommentsRepository;