import ReactHelpers from '../../../utils/ReactHelpers';
import ITagsRepository from './ITagsRepository';


class MockTagsRepository implements ITagsRepository {
  async getTags(): Promise<string[]> {
    await ReactHelpers.delay(300);
    return ["tag1", "tag2", "tag3"];
  }
  
}

export default MockTagsRepository;