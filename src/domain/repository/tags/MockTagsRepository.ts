import ITagsRepository from './ITagsRepository';

class MockTagsRepository implements ITagsRepository {
  async getTags(): Promise<string[]> {
    return ["tag1", "tag2", "tag3"];
  }
  
}

export default MockTagsRepository;