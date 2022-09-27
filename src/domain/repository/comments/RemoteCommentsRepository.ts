import { BOOKMARKS_ENDPOINT_GET_BY_ID, COMMENTS_ENDPOINTS_ADD, COMMENTS_ENDPOINTS_BASE, COMMENTS_ENDPOINTS_DELETE_BY_ID, COMMENTS_ENDPOINTS_GET_BY_ID, COMMENTS_ENDPOINTS_UPDATE_BY_ID } from '../../../constants/backend';
import CommentDto from '../../dto/CommentDto';
// import BaseEntityRepository from '../BaseEntityRepository';
import ICommentsRepository from './ICommentsRepository';
import axios from 'axios'

// extends BaseEntityRepository<CommentDto>
class RemoteCommentsRepository implements ICommentsRepository {

  // bookmarkId: string
  public constructor() {
    // super({
    //   listEndpoint: () => { return BOOKMARKS_ENDPOINT_GET_BY_ID + bookmarkId + "/comments"},
  
    //   getEndpoint: (id: string) => { return COMMENTS_ENDPOINTS_GET_BY_ID + id; },

    //   createEndpoint: () => { return COMMENTS_ENDPOINTS_BASE },

    //   updateEndpoint: (id: string) => { return COMMENTS_ENDPOINTS_UPDATE_BY_ID + id; },
  
    //   deleteEndpoint: (id: string) => { return COMMENTS_ENDPOINTS_DELETE_BY_ID + id; },
    // });
  }

  public async getComments(bookmarkId: string): Promise<CommentDto[]> {
    return await axios
            .get<CommentDto[]>(BOOKMARKS_ENDPOINT_GET_BY_ID + bookmarkId + "/comments")
            .then((response) => response.data);
  }

  public async addComment(comment: CommentDto): Promise<CommentDto> {
    // todo: adjust timestamps on server or better on database
    // return this.create(comment);
    return await axios.post(COMMENTS_ENDPOINTS_ADD, comment)
              .then((response) => response.data);
  }

  public async deleteComment(id: string): Promise<void> {
    // return this.delete(id);
    await axios.delete(COMMENTS_ENDPOINTS_DELETE_BY_ID + id);
  }
  
  public async updateComment(comment: CommentDto): Promise<CommentDto> {
    // return this.update(comment);
    return await axios.put(COMMENTS_ENDPOINTS_UPDATE_BY_ID + comment.id, comment)
          .then((response) => response.data);
  }

}

export default RemoteCommentsRepository;